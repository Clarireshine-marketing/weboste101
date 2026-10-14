/* CLAIRESHINE — logo-bubble system.
 * <cs-bubbles assets="a.png,b.png" max="18"></cs-bubbles>
 *
 * 1. Cursor sprinkles: moving a fine pointer across any [data-bubble-zone] releases
 *    small Claireshine 3D objects that drift, rotate and settle out.
 * 2. Footer fall: when [data-bubble-fall] enters view, bubbles fall into it with
 *    gravity, bounce once and settle toward its lower edge.
 *
 * Each bubble is a white circular plate with the approved asset multiplied into it,
 * so the opaque library crops read correctly on both paper and black grounds.
 * Disabled for prefers-reduced-motion (footer renders a static settled row instead);
 * touch devices get a small tap burst instead of a cursor trail.
 */
(function () {
  if (window.customElements && customElements.get('cs-bubbles')) return;

  var DEFAULTS = [
    'assets/services/google-ads.png',
    'assets/services/meta-ads.png',
    'assets/services/seo.png',
    'assets/services/google-search-console.png',
    'assets/services/google-business-profile.png',
    'assets/services/social-media.png',
    'assets/services/analytics.png',
    'assets/services/growth.png'
  ];

  function rand(a, b) { return a + Math.random() * (b - a); }

  function plate(src, size) {
    var d = document.createElement('div');
    d.setAttribute('aria-hidden', 'true');
    d.style.cssText = 'position:absolute;top:0;left:0;width:' + size + 'px;height:' + size +
      'px;border-radius:50%;background:#fff;overflow:hidden;will-change:transform,opacity;' +
      'box-shadow:0 1px 2px rgba(8,10,13,.18),0 10px 22px rgba(8,10,13,.16);';
    var img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.decoding = 'async';
    img.loading = 'eager';
    img.style.cssText = 'position:absolute;inset:14%;width:72%;height:72%;object-fit:contain;' +
      'mix-blend-mode:multiply;pointer-events:none;';
    d.appendChild(img);
    return d;
  }

  class CSBubbles extends HTMLElement {
    connectedCallback() {
      if (this._init) return;
      this._init = true;
      var a = (this.getAttribute('assets') || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
      this.assets = a.length ? a : DEFAULTS;
      this.max = parseInt(this.getAttribute('max') || '18', 10);
      this.calm = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
      this.fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
      this.style.cssText = 'display:block;width:0;height:0';

      this.layer = document.createElement('div');
      this.layer.setAttribute('aria-hidden', 'true');
      this.layer.style.cssText = 'position:fixed;inset:0;z-index:70;pointer-events:none;overflow:hidden';
      document.body.appendChild(this.layer);

      this.live = [];
      this.acc = 0;
      this.last = null;
      this.raf = 0;

      // preload so the first sprinkle is not a blank plate
      this.assets.forEach(function (s) { var i = new Image(); i.src = s; });

      if (!this.calm) {
        if (this.fine) {
          this._move = this.onMove.bind(this);
          window.addEventListener('pointermove', this._move, { passive: true });
        } else {
          this._tap = this.onTap.bind(this);
          window.addEventListener('pointerdown', this._tap, { passive: true });
        }
      }
      this.watchFooter();
    }

    disconnectedCallback() {
      if (this._move) window.removeEventListener('pointermove', this._move);
      if (this._tap) window.removeEventListener('pointerdown', this._tap);
      if (this.raf) cancelAnimationFrame(this.raf);
      if (this.io) this.io.disconnect();
      if (this.mo) this.mo.disconnect();
      if (this.layer && this.layer.parentNode) this.layer.parentNode.removeChild(this.layer);
    }

    /* ---------- cursor sprinkles ---------- */

    onMove(e) {
      var zone = e.target instanceof Element ? e.target.closest('[data-bubble-zone]') : null;
      if (!zone) { this.last = null; return; }
      var p = { x: e.clientX, y: e.clientY };
      if (!this.last) { this.last = p; return; }
      var dx = p.x - this.last.x, dy = p.y - this.last.y;
      var d = Math.sqrt(dx * dx + dy * dy);
      this.acc += d;
      this.last = p;
      if (this.acc < 96 || this.live.length >= this.max) return;
      this.acc = 0;
      this.spawn(p.x, p.y, dx, dy);
    }

    onTap(e) {
      var zone = e.target instanceof Element ? e.target.closest('[data-bubble-zone]') : null;
      if (!zone) return;
      for (var i = 0; i < 3; i++) {
        this.spawn(e.clientX + rand(-18, 18), e.clientY + rand(-14, 14), rand(-4, 4), rand(-3, 1));
      }
    }

    spawn(x, y, dx, dy) {
      var size = rand(30, 58);
      var el = plate(this.assets[Math.floor(Math.random() * this.assets.length)], size);
      this.layer.appendChild(el);
      this.live.push({
        el: el, size: size,
        x: x + rand(-14, 14) - size / 2, y: y + rand(-12, 12) - size / 2,
        vx: dx * 0.16 + rand(-0.5, 0.5),
        vy: dy * 0.12 - rand(0.25, 0.85),
        rot: rand(-26, 26), vr: rand(-0.55, 0.55),
        life: 0, span: rand(1500, 2400), mode: 'drift'
      });
      this.run();
    }

    /* ---------- footer fall ---------- */

    // The footer subtree can be re-rendered by the host DC, so the landing band is
    // re-resolved on every DOM change until the fall has actually run once.
    watchFooter() {
      var self = this;
      this.rained = false;
      this.ensureBind();
      this.mo = new MutationObserver(function () { self.ensureBind(); });
      this.mo.observe(document.body, { childList: true, subtree: true });
    }

    ensureBind() {
      if (this.rained) return;
      var t = document.querySelector('[data-bubble-fall]');
      if (!t || t === this.bound) return;
      this.bound = t;
      if (this.calm) { this.rained = true; this.settleStatic(t); return; }
      var self = this;
      if (this.io) this.io.disconnect();
      this.io = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (!entries[i].isIntersecting || self.rained) continue;
          var live = document.querySelector('[data-bubble-fall]');
          if (!live) return;
          self.rained = true;
          self.io.disconnect(); self.io = null;
          if (self.mo) { self.mo.disconnect(); self.mo = null; }
          self.rain(live);
        }
      }, { threshold: 0.12 });
      this.io.observe(t);
    }

    // The stage is the whole footer (so plates are visible falling through it);
    // the landing band only decides where they settle.
    fallLayer(stage) {
      if (this._fl) return this._fl;
      if (getComputedStyle(stage).position === 'static') stage.style.position = 'relative';
      var l = document.createElement('div');
      l.setAttribute('aria-hidden', 'true');
      l.style.cssText = 'position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:1';
      stage.appendChild(l);
      this._fl = l;
      return l;
    }

    rain(target) {
      var stage = target.closest('footer') || target.parentElement || target;
      var sbox = stage.getBoundingClientRect();
      var box = target.getBoundingClientRect();
      var w = sbox.width, h = box.height;
      var layer = this.fallLayer(stage);
      var maxS = Math.max(72, Math.min(156, box.height - 10));
      var floor = box.bottom - sbox.top - 6;
      var n = Math.min(10, Math.max(5, Math.round(w / 210)));
      var self = this;
      for (var i = 0; i < n; i++) {
        (function (i) {
          setTimeout(function () {
            var size = rand(maxS * 0.58, maxS);
            var el = plate(self.assets[i % self.assets.length], size);
            layer.appendChild(el);
            var x = (w / n) * i + rand(6, Math.max(8, w / n - 6)) - size / 2;
            self.live.push({
              el: el, size: size,
              x: Math.max(6, Math.min(x, w - size - 6)),
              y: -rand(30, 180),
              vx: rand(-0.35, 0.35), vy: rand(0.4, 1.4),
              rot: rand(-40, 40), vr: rand(-1.1, 1.1),
              life: 0, span: Infinity, mode: 'fall',
              floor: floor - rand(0, 8), bounced: 0
            });
            self.run();
          }, i * rand(90, 190));
        })(i);
      }
    }

    settleStatic(target) {
      var stage = target.closest('footer') || target.parentElement || target;
      var sbox = stage.getBoundingClientRect();
      var tbox = target.getBoundingClientRect();
      var box = { width: sbox.width, height: tbox.bottom - sbox.top };
      var layer = this.fallLayer(stage);
      var n = 7;
      var sz = Math.max(96, Math.min(150, tbox.height));
      for (var i = 0; i < n; i++) {
        var size = sz;
        var el = plate(this.assets[i % this.assets.length], size);
        el.style.transform = 'translate3d(' + ((box.width / n) * i + 20) + 'px,' +
          Math.max(0, box.height - size - 10) + 'px,0)';
        layer.appendChild(el);
      }
    }

    /* ---------- loop ---------- */

    run() {
      if (this.raf) return;
      var self = this;
      var prev = performance.now();
      var tick = function (now) {
        var dt = Math.min(34, now - prev) / 16.67;
        prev = now;
        for (var i = self.live.length - 1; i >= 0; i--) {
          var b = self.live[i];
          b.life += dt * 16.67;
          if (b.mode === 'drift') {
            b.vy -= 0.008 * dt;
            b.vx *= 0.985; b.vy *= 0.99;
            b.x += b.vx * dt; b.y += b.vy * dt;
            b.rot += b.vr * dt;
            var t = b.life / b.span;
            var op = t < 0.1 ? t / 0.1 : t > 0.6 ? Math.max(0, 1 - (t - 0.6) / 0.4) : 1;
            var sc = t < 0.1 ? 0.6 + 0.4 * (t / 0.1) : 1;
            b.el.style.opacity = op;
            b.el.style.transform = 'translate3d(' + b.x + 'px,' + b.y + 'px,0) rotate(' + b.rot +
              'deg) scale(' + sc + ')';
            if (t >= 1) { b.el.remove(); self.live.splice(i, 1); }
          } else {
            b.vy += 0.16 * dt;
            b.x += b.vx * dt; b.y += b.vy * dt;
            b.rot += b.vr * dt;
            b.vr *= 0.99;
            var fl = b.floor - b.size;
            if (b.y > fl) {
              b.y = fl;
              if (b.bounced < 1 && b.vy > 1.2) { b.vy *= -0.32; b.vx *= 0.5; b.vr *= 0.4; b.bounced++; }
              else { b.vy = 0; b.vx *= 0.7; b.vr *= 0.8; }
            }
            b.el.style.transform = 'translate3d(' + b.x + 'px,' + b.y + 'px,0) rotate(' + b.rot + 'deg)';
          }
        }
        if (self.live.length) self.raf = requestAnimationFrame(tick);
        else self.raf = 0;
      };
      this.raf = requestAnimationFrame(tick);
    }
  }

  customElements.define('cs-bubbles', CSBubbles);
})();
