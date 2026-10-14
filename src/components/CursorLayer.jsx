import { useEffect, useRef } from 'react';

// Desktop-only trailing cursor with a contextual label.
// Any element with data-cursor="LABEL" sets the label while hovered.
export default function CursorLayer() {
  const ref = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    const calm = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if (!fine || calm) return;

    const el = ref.current;
    const pos = { x: 0, y: 0, tx: 0, ty: 0 };
    let seen = false;
    let raf = 0;
    let label = '';

    function setLabel(next) {
      if (next === label) return;
      label = next;
      const padded = !!label;
      el.style.background = padded ? 'var(--cs-black)' : 'var(--cs-yellow)';
      el.style.width = padded ? 'auto' : '14px';
      el.style.height = padded ? 'auto' : '14px';
      el.style.padding = padded ? '8px 14px' : '0';
      el.textContent = label;
    }

    function move(e) {
      if (!seen) {
        pos.x = e.clientX;
        pos.y = e.clientY;
        seen = true;
        el.style.display = 'flex';
      }
      pos.tx = e.clientX;
      pos.ty = e.clientY;
      const target = e.target instanceof Element ? e.target.closest('[data-cursor]') : null;
      setLabel(target ? target.getAttribute('data-cursor') : '');
    }

    function tick() {
      pos.x += (pos.tx - pos.x) * 0.18;
      pos.y += (pos.ty - pos.y) * 0.18;
      el.style.transform = `translate3d(${pos.x}px,${pos.y}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener('pointermove', move);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cs-cursor" aria-hidden="true" />;
}
