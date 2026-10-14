import { useState } from 'react';

// Same service logos the cursor bubbles (vendor/cs-bubbles.js) use.
const LOGOS = [
  'google-ads', 'meta-ads', 'seo', 'google-search-console',
  'google-business-profile', 'social-media', 'analytics', 'growth',
].map((k) => `/assets/services/${k}.png`);

const rand = (a, b) => a + Math.random() * (b - a);

function makeDrops(count) {
  return Array.from({ length: count }, (_, i) => {
    const size = Math.round(rand(24, 92));
    // bigger = nearer: falls faster and reads a touch more solid
    const depth = (size - 24) / 68;
    const dur = rand(24, 30) - depth * 8;
    return {
      id: i,
      src: LOGOS[i % LOGOS.length],
      size,
      left: rand(2, 92),
      dur,
      delay: -rand(0, dur),
      opacity: +(0.5 + depth * 0.32 + rand(-0.04, 0.04)).toFixed(2),
      amp: Math.round(rand(8, 26)),
      sway: rand(4.5, 7.5),
      r0: Math.round(rand(-28, 0)),
      r1: Math.round(rand(0, 28)),
    };
  });
}

export default function BubbleRain({ count = 9 }) {
  const [drops] = useState(() => makeDrops(count));
  return (
    <div className="cs-rain" aria-hidden="true">
      {drops.map((d) => (
        <span
          key={d.id}
          className="cs-drop"
          style={{ left: `${d.left}%`, opacity: d.opacity, animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s` }}
        >
          <span
            className="cs-drop-plate"
            style={{ width: d.size, height: d.size, '--amp': `${d.amp}px`, '--r0': `${d.r0}deg`, '--r1': `${d.r1}deg`, animationDuration: `${d.sway}s`, animationDelay: `${d.delay}s` }}
          >
            <img src={d.src} alt="" decoding="async" />
          </span>
        </span>
      ))}
    </div>
  );
}
