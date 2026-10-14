/* CLAIRESHINE — opening paper tear. <cs-paper></cs-paper>
 *
 * Covers the viewport with the wrinkled Claireshine sheet. Scrolling tears it,
 * scrubbed to the amount scrolled: a small rip opens at the centre, runs up and
 * down the sheet, then the two torn halves peel apart and fall away to reveal the
 * page that was underneath all along (nothing is re-rendered).
 *
 * While the rip is still inside the sheet it is ONE piece with a hole cut in it
 * (evenodd clip), so there is never a seam; it only becomes two pieces once the
 * tear has run edge to edge. Each torn edge carries a white fibre rim, a curl
 * shade and a cast shadow onto the page.
 *
 * Shown once per session (append ?intro to force it). Reduced motion: no sheet.
 */
(function () {
  if (window.customElements && customElements.get('cs-paper')) return;

  var KEY = 'cs-paper-seen-v2';
  var SRC = '/assets/brand/intro-paper.webp';
  var N = 128;               // points along the tear
  var STRAIN = 0.025;        // progress before the first visible rip
  var RUN = 0.46;            // progress at which the rip has run edge to edge
  var LEN = 0.64;            // lens half-length (x H) once fully run — past the edges
  var GAP = 0.05;            // widest opening (x W) while ripping
  var SCROLL_SPAN = 1.6;     // viewport-heights of wheel scrolling for a full tear
  var LET_GO = 0.7;          // past this, stopping lets the paper finish on its own

  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function smooth(t) { return t * t * (3 - 2 * t); }

  // Deterministic tear profile: coarse wander + fine teeth + the odd big tooth.
  function profile() {
    var s = 20260919;
    var r = function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    var pts = [];
    for (var i = 0; i < N; i++) {
      var t = i / (N - 1);
      var x = Math.sin(t * 9.1) * 0.011 + Math.sin(t * 23.7 + 1.3) * 0.005 + Math.sin(t * 4.3 + 0.4) * 0.008;
      x += (r() - 0.5) * 0.0065;
      if (r() < 0.12) x += (r() - 0.5) * 0.015;
      pts.push({ t: t, x: x, fl: 2.5 + r() * 7.5, fr: 1 + r() * 3 });
    }
    return pts;
  }

  var PAPER = 'background:#F1EDE4 url(' + SRC + ') center/cover no-repeat';
  var FIBRE = 'background:#FCFAF4 radial-gradient(rgba(8,10,13,.05) .6px,transparent .8px) 0 0/5px 5px';

  function layer(extra) {
    return '<div style="position:absolute;inset:0;' + extra + '"></div>';
  }
  function group(id, origin) {
    return '<div data-g="' + id + '" style="position:absolute;inset:0;will-change:transform,filter;' +
      'transform-origin:' + origin + '">' +
      layer('clip-path:inset(0);' + FIBRE) +
      layer('clip-path:inset(0);' + PAPER) +
      layer('clip-path:inset(0);pointer-events:none') +
      '</div>';
  }

  class CSPaper extends HTMLElement {
    connectedCallback() {
      if (this._init) return;
      this._init = true;
      this.style.cssText = 'display:block;width:0;height:0';
      if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
      var force = /[?&]intro\b/.test(location.search);
      try { if (sessionStorage.getItem(KEY) && !force) return; } catch (e) { if (!force) return; }
      try { sessionStorage.setItem(KEY, '1'); } catch (e) { /* private mode: still show once */ }
      this.build();
    }

    build() {
      this.pts = profile();
      this.p = 0;            // shown progress
      this.target = 0;       // progress the input asks for
      this.last = 0;         // time of last input
      this.locked = false;   // once fully torn, it cannot be un-torn

      var wrap = document.createElement('div');
      wrap.setAttribute('role', 'dialog');
      wrap.setAttribute('aria-label', 'Intro: scroll to tear the paper open');
      wrap.style.cssText = 'position:fixed;inset:0;z-index:9998;overflow:hidden;touch-action:none;perspective:1800px';
      wrap.innerHTML =
        group('one', '50% 50%') + group('l', '0% 50%') + group('r', '100% 50%') +
        '<button type="button" data-hint style="position:absolute;left:50%;bottom:clamp(22px,5vh,54px);' +
        'transform:translateX(-50%);display:inline-flex;align-items:center;gap:10px;padding:12px 20px;' +
        'background:#080A0D;color:#fff;border:0;border-radius:9999px;cursor:pointer;' +
        'font-family:Inter,system-ui,sans-serif;font-size:12px;font-weight:800;letter-spacing:.14em;' +
        'text-transform:uppercase;box-shadow:0 10px 26px rgba(8,10,13,.28);transition:opacity .3s">' +
        'Scroll to open<span aria-hidden="true" style="display:inline-block;animation:cs-paper-nudge 1.4s ease-in-out infinite">↓</span></button>' +
        '<style>@keyframes cs-paper-nudge{0%,100%{transform:translateY(-2px)}50%{transform:translateY(4px)}}</style>';
      this.wrap = wrap;
      var g = function (id) {
        var el = wrap.querySelector('[data-g="' + id + '"]');
        return { el: el, rim: el.children[0], print: el.children[1], shade: el.children[2] };
      };
      this.one = g('one');
      this.L = g('l');
      this.R = g('r');
      this.hint = wrap.querySelector('[data-hint]');

      document.documentElement.style.overflow = 'hidden';
      document.body.appendChild(wrap);

      var self = this;
      this.h = {
        wheel: function (e) {
          e.preventDefault();
          var dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1);
          self.push(dy / (window.innerHeight * SCROLL_SPAN));
        },
        touchstart: function (e) { self.ty = e.touches[0].clientY; },
        touchmove: function (e) {
          e.preventDefault();
          var y = e.touches[0].clientY;
          self.push((self.ty - y) / (window.innerHeight * 1.1));
          self.ty = y;
        },
        keydown: function (e) {
          var k = e.key;
          if (k === 'ArrowDown' || k === 'PageDown') { e.preventDefault(); self.push(0.16); }
          else if (k === 'ArrowUp' || k === 'PageUp') { e.preventDefault(); self.push(-0.16); }
          else if (k === ' ' || k === 'Enter' || k === 'Escape' || k === 'End') { e.preventDefault(); self.release(); }
        }
      };
      window.addEventListener('wheel', this.h.wheel, { passive: false });
      window.addEventListener('touchstart', this.h.touchstart, { passive: true });
      window.addEventListener('touchmove', this.h.touchmove, { passive: false });
      window.addEventListener('keydown', this.h.keydown);
      this.hint.addEventListener('click', function () { self.release(); });
      this.hint.focus({ preventScroll: true });

      this.draw(0);
    }

    push(d) {
      if (this.locked) return;
      this.target = clamp(this.target + d);
      this.last = performance.now();
      if (this.target >= 1) this.release();
      this.run();
    }

    // Let go: the rest of the tear plays out on its own.
    release() {
      this.locked = true;
      this.target = 1;
      this.run();
    }

    run() {
      if (this.raf) return;
      var self = this;
      var prev = performance.now();
      var tick = function (now) {
        var dt = Math.min(48, now - prev); prev = now;
        if (!self.locked && self.target >= LET_GO && now - self.last > 280) self.release();
        var k = 1 - Math.pow(1 - (self.locked ? 0.075 : 0.13), dt / 16.7);
        self.p += (self.target - self.p) * k;
        if (Math.abs(self.target - self.p) < 0.0004) self.p = self.target;
        self.draw(self.p);
        if (self.locked && self.p >= 0.999) { self.finish(); return; }
        if (self.p !== self.target || self.locked) self.raf = requestAnimationFrame(tick);
        else self.raf = 0;
      };
      this.raf = requestAnimationFrame(tick);
    }

    draw(p) {
      var W = window.innerWidth, H = window.innerHeight, pts = this.pts;
      var rip = smooth(clamp((p - STRAIN) / (RUN - STRAIN)));
      var sep = smooth(clamp((p - RUN) / (1 - RUN)));
      var L = rip * LEN * H;
      var gMax = W * (0.004 + GAP * rip);
      var cy = H / 2;

      this.hint.style.opacity = String(1 - clamp(p / 0.05));
      this.hint.style.pointerEvents = p > 0.05 ? 'none' : 'auto';

      // per-point geometry along the tear
      var geo = [];
      for (var i = 0; i < N; i++) {
        var y = pts[i].t * H;
        var cx = W * (0.5 + pts[i].x);
        var d = L > 0 ? (y - cy) / L : 2;
        var g = Math.abs(d) < 1 ? gMax * Math.sqrt(1 - d * d) : 0;
        var tf = Math.min(1, g / 8);
        geo.push({ y: y, cx: cx, g: g, fl: pts[i].fl * tf, fr: pts[i].fr * tf });
      }

      if (rip < 1) {
        this.one.el.style.display = '';
        this.L.el.style.display = this.R.el.style.display = 'none';
        this.drawOne(geo, W, H, cy, L, rip);
      } else {
        this.one.el.style.display = 'none';
        this.L.el.style.display = this.R.el.style.display = '';
        this.drawHalves(geo, W, H, sep);
      }
    }

    // Stage 1 — one sheet with a lens-shaped hole ripping through it.
    drawOne(geo, W, H, cy, L, rip) {
      var rect = 'M0 0H' + W + 'V' + H + 'H0Z';
      var o = this.one;
      if (L < 1) {
        o.print.style.clipPath = o.rim.style.clipPath = o.shade.style.clipPath = 'inset(0)';
        o.shade.style.background = 'none';
        o.el.style.filter = 'none';
        return;
      }
      var y0 = cy - L, y1 = cy + L;
      var inner = geo.filter(function (q) { return q.y > y0 && q.y < y1; });
      var tipX = function (y) {
        var best = geo[0];
        for (var i = 1; i < geo.length; i++) if (Math.abs(geo[i].y - y) < Math.abs(best.y - y)) best = geo[i];
        return best.cx;
      };
      var hole = function (shrinkL, shrinkR) {
        var right = inner.map(function (q) {
          var xr = q.cx + q.g / 2 - (shrinkR ? q.fr : 0);
          var xl = q.cx - q.g / 2 + (shrinkL ? q.fl : 0);
          return (xr < xl ? q.cx : xr).toFixed(1) + ' ' + q.y.toFixed(1);
        });
        var left = inner.slice().reverse().map(function (q) {
          var xr = q.cx + q.g / 2 - (shrinkR ? q.fr : 0);
          var xl = q.cx - q.g / 2 + (shrinkL ? q.fl : 0);
          return (xl > xr ? q.cx : xl).toFixed(1) + ' ' + q.y.toFixed(1);
        });
        return 'M' + tipX(y0).toFixed(1) + ' ' + y0.toFixed(1) + 'L' + right.join('L') +
          'L' + tipX(y1).toFixed(1) + ' ' + y1.toFixed(1) + 'L' + left.join('L') + 'Z';
      };
      var printPath = 'path(evenodd,"' + rect + hole(false, false) + '")';
      o.print.style.clipPath = printPath;
      o.shade.style.clipPath = printPath;
      o.rim.style.clipPath = 'path(evenodd,"' + rect + hole(true, true) + '")';
      // the sheet puckers around the rip and casts a shadow into it
      var gw = Math.max(40, W * (0.02 + 0.1 * rip)), gh = Math.max(40, L * 1.15);
      o.shade.style.background = 'radial-gradient(' + gw.toFixed(0) + 'px ' + gh.toFixed(0) + 'px at 50% 50%,rgba(8,10,13,' +
        (0.22 * rip).toFixed(3) + ') 0%,rgba(8,10,13,0) 100%)';
      o.el.style.filter = 'drop-shadow(0 ' + (2 + 5 * rip).toFixed(1) + 'px ' + (4 + 10 * rip).toFixed(1) + 'px rgba(8,10,13,' + (0.28 + 0.12 * rip).toFixed(2) + '))';
    }

    // Stage 2 — the tear has run edge to edge: two halves peel back and fall away.
    drawHalves(geo, W, H, sep) {
      var pts = function (side, withRim) {
        return geo.map(function (q) {
          var x = side === 'l' ? q.cx - q.g / 2 + (withRim ? q.fl : 0) : q.cx + q.g / 2 - (withRim ? q.fr : 0);
          return x.toFixed(1) + ' ' + q.y.toFixed(1);
        }).join('L');
      };
      var lp = 'path("M0 0L' + pts('l', false) + 'L0 ' + H + 'Z")';
      var rp = 'path("M' + W + ' 0L' + pts('r', false) + 'L' + W + ' ' + H + 'Z")';
      this.L.print.style.clipPath = this.L.shade.style.clipPath = lp;
      this.R.print.style.clipPath = this.R.shade.style.clipPath = rp;
      this.L.rim.style.clipPath = 'path("M0 0L' + pts('l', true) + 'L0 ' + H + 'Z")';
      this.R.rim.style.clipPath = 'path("M' + W + ' 0L' + pts('r', true) + 'L' + W + ' ' + H + 'Z")';

      var dx = sep * W * 0.66, dy = sep * sep * H * 0.07, rot = sep * 7, peel = sep * 30;
      this.L.el.style.transform = 'translate3d(' + (-dx).toFixed(1) + 'px,' + dy.toFixed(1) + 'px,0) rotate(' + (-rot).toFixed(2) + 'deg) rotateY(' + (-peel).toFixed(2) + 'deg)';
      this.R.el.style.transform = 'translate3d(' + dx.toFixed(1) + 'px,' + (dy * 1.15).toFixed(1) + 'px,0) rotate(' + (rot * 0.85).toFixed(2) + 'deg) rotateY(' + (peel * 0.9).toFixed(2) + 'deg)';

      var a = (0.2 + 0.28 * sep).toFixed(3);
      this.L.shade.style.background = 'linear-gradient(90deg,rgba(8,10,13,0) 28%,rgba(8,10,13,' + a + ') 52%)';
      this.R.shade.style.background = 'linear-gradient(270deg,rgba(8,10,13,0) 28%,rgba(8,10,13,' + a + ') 52%)';
      var sh = 'drop-shadow(0 ' + (6 + 22 * sep).toFixed(1) + 'px ' + (14 + 30 * sep).toFixed(1) + 'px rgba(8,10,13,' + (0.3 + 0.15 * sep).toFixed(2) + '))';
      this.L.el.style.filter = this.R.el.style.filter = sh;
    }

    finish() {
      this.raf = 0;
      this.cleanup();
    }

    cleanup() {
      if (this.raf) cancelAnimationFrame(this.raf);
      if (this.h) {
        window.removeEventListener('wheel', this.h.wheel, { passive: false });
        window.removeEventListener('touchstart', this.h.touchstart, { passive: true });
        window.removeEventListener('touchmove', this.h.touchmove, { passive: false });
        window.removeEventListener('keydown', this.h.keydown);
        this.h = null;
      }
      document.documentElement.style.overflow = '';
      if (this.wrap && this.wrap.parentNode) this.wrap.parentNode.removeChild(this.wrap);
      this.wrap = null;
    }

    disconnectedCallback() {
      this.cleanup();
    }
  }

  customElements.define('cs-paper', CSPaper);
})();
