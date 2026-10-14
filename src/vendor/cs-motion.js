/* CLAIRESHINE — internal-page motion layer. <cs-motion></cs-motion>
 * Gentle parallax for [data-parallax] (data-speed, default .06) plus the
 * shared float/drift keyframes so pages don't repeat them.
 * Disabled under prefers-reduced-motion.
 */
(function () {
  if (window.customElements && customElements.get('cs-motion')) return;
  var CSS = '@keyframes cs-float{0%,100%{transform:translate3d(0,0,0) rotate(-0.5deg)}50%{transform:translate3d(0,-10px,0) rotate(0.6deg)}}' +
    '@keyframes cs-drift{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,-16px,0)}}' +
    '@keyframes cs-spin{to{transform:rotate(360deg)}}' +
    '@keyframes cs-page-tag{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(7px,-9px,0)}}' +
    '@media (prefers-reduced-motion:reduce){[data-page-tag]{animation:none!important}}' +
    '[data-reveal]{opacity:0;transform:translate3d(0,28px,0);transition:opacity 520ms cubic-bezier(.22,1,.36,1),transform 520ms cubic-bezier(.22,1,.36,1)}' +
    '[data-reveal].cs-in{opacity:1;transform:none}' +
    '@media (prefers-reduced-motion:reduce){[data-float],[data-spin]{animation:none!important}}' +
    '@media (prefers-reduced-motion:reduce){[data-reveal]{opacity:1!important;transform:none!important;transition:none!important}}';

  class CSMotion extends HTMLElement {
    connectedCallback() {
      if (this._i) return;
      this._i = true;
      this.style.cssText = 'display:block;width:0;height:0';
      if (!document.getElementById('cs-motion-css')) {
        var s = document.createElement('style');
        s.id = 'cs-motion-css';
        s.textContent = CSS;
        document.head.appendChild(s);
      }
      if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
      var self = this;
      this.stack();
      this.reveals();
      this.par = [];
      var scan = function () { self.par = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]')); };
      scan();
      this.mo = new MutationObserver(scan);
      this.mo.observe(document.body, { childList: true, subtree: true });
      var tick = function () {
        self.raf = 0;
        var vh = window.innerHeight;
        self.par.forEach(function (el) {
          var r = el.getBoundingClientRect();
          var d = (vh / 2 - (r.top + r.height / 2)) * (parseFloat(el.dataset.speed) || 0.06);
          el.style.transform = 'translate3d(0,' + d.toFixed(1) + 'px,0)';
        });
      };
      this._s = function () { if (!self.raf) self.raf = requestAnimationFrame(tick); };
      window.addEventListener('scroll', this._s, { passive: true });
      window.addEventListener('resize', this._s, { passive: true });
      this._s();
    }
    // Opt-in only: a section marked [data-stack] pins at the top while the
    // following sections slide over it. Never applied site-wide.
    stack() {
      var apply = function () {
        document.querySelectorAll('[data-stack]').forEach(function (s) {
          var fits = s.offsetHeight <= window.innerHeight + 8;
          s.style.position = fits ? 'sticky' : 'relative';
          s.style.top = fits ? '0' : 'auto';
          s.style.zIndex = '0';
          var n = s.nextElementSibling;
          while (n) {
            if (getComputedStyle(n).position === 'static') n.style.position = 'relative';
            n.style.zIndex = '1';
            n = n.nextElementSibling;
          }
        });
      };
      apply();
      var ro = (typeof ResizeObserver !== 'undefined') ? new ResizeObserver(apply) : null;
      this.ro = ro;
      var watch = function () {
        apply();
        if (!ro) return;
        document.querySelectorAll('[data-stack]').forEach(function (s) {
          if (s.dataset.csRo) return;
          s.dataset.csRo = '1';
          ro.observe(s);
        });
      };
      watch();
      this.smo = new MutationObserver(watch);
      this.smo.observe(document.body, { childList: true, subtree: true });
      this._sr = watch;
      window.addEventListener('resize', this._sr, { passive: true });
      window.addEventListener('load', this._sr);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(watch);
    }

    // Staged entrances. Sections that carry no [data-reveal] get their top-level
    // container rows marked, so every page reveals as you scroll.
    reveals() {
      var self = this;
      this.io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add('cs-in');
          self.io.unobserve(e.target);
        });
      }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

      var mark = function () {
        document.querySelectorAll('main > section, main > div > section').forEach(function (s) {
          if (s.dataset.revealScan) return;
          s.dataset.revealScan = '1';
          if (!s.querySelector('[data-reveal]')) {
            var box = s.querySelector('.cs-container');
            // Never hide a block taller than the viewport — a single missed
            // callback would blank out screens of content.
            if (box) Array.prototype.forEach.call(box.children, function (c) {
              if (c.tagName === 'SVG') return;
              if (c.offsetHeight > window.innerHeight * 0.9) return;
              c.setAttribute('data-reveal', '');
            });
          }
        });
        document.querySelectorAll('[data-reveal]:not(.cs-in)').forEach(function (el) {
          if (el.dataset.revealBound) return;
          el.dataset.revealBound = '1';
          self.io.observe(el);
        });
      };
      mark();
      this.rmo = new MutationObserver(mark);
      this.rmo.observe(document.body, { childList: true, subtree: true });
      // Safety net, scoped to what is already on screen, so everything further
      // down still has its entrance to play.
      var rescue = function () {
        document.querySelectorAll('[data-reveal]:not(.cs-in)').forEach(function (el) {
          if (el.getBoundingClientRect().top < window.innerHeight * 1.1) el.classList.add('cs-in');
        });
      };
      setTimeout(rescue, 1200);
      setTimeout(rescue, 3000);
      // Belt and braces: anything that has scrolled into view is revealed even if
      // its observer callback never arrives.
      this._rs = rescue;
      window.addEventListener('scroll', this._rs, { passive: true });
    }

    disconnectedCallback() {
      if (this._s) { window.removeEventListener('scroll', this._s); window.removeEventListener('resize', this._s); }
      if (this.mo) this.mo.disconnect();
      if (this.smo) this.smo.disconnect();
      if (this.ro) this.ro.disconnect();
      if (this._sr) window.removeEventListener('resize', this._sr);
      if (this.rmo) this.rmo.disconnect();
      if (this.io) this.io.disconnect();
      if (this._rs) window.removeEventListener('scroll', this._rs);
      if (this.raf) cancelAnimationFrame(this.raf);
    }
  }
  customElements.define('cs-motion', CSMotion);
})();
