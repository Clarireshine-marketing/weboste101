/* Claireshine decorative vector assets.
   Recreated as inline SVG so every piece is genuinely transparent and stays
   sharp at any size / DPI — the raster library has no clean cut-outs of these. */

const Y = 'var(--cs-yellow)';
const K = 'var(--cs-black)';

export function PaperPlane({ size = 64, tone = Y, style, className }) {
  return (
    <svg className={className} style={style} width={size} height={size * 0.74} viewBox="0 0 100 74" fill="none" aria-hidden="true">
      <path d="M97 3 6 35l30 9z" fill={tone} />
      <path d="M97 3 36 44l4 27z" fill={tone} opacity=".72" />
      <path d="M97 3 40 71l-4-27z" fill={K} opacity=".14" />
      <path d="M97 3 36 44" stroke={K} strokeWidth="1.6" opacity=".35" />
    </svg>
  );
}

export function Scribble({ w = 120, tone = K, style, className }) {
  return (
    <svg className={className} style={style} width={w} height={typeof w === 'number' ? w * 0.38 : undefined} viewBox="0 0 120 46" fill="none" aria-hidden="true">
      <path d="M4 26c14-16 26 6 40-6s22 12 34 2 16-14 16-14" stroke={tone} strokeWidth="3" strokeLinecap="round" />
      <path d="M8 38c16-12 28 4 42-8s24 10 36 0" stroke={tone} strokeWidth="2.2" strokeLinecap="round" opacity=".55" />
    </svg>
  );
}

export function Squiggle({ w = 90, tone = Y, style, className }) {
  return (
    <svg className={className} style={style} width={w} height={typeof w === 'number' ? w * 0.5 : undefined} viewBox="0 0 90 45" fill="none" aria-hidden="true">
      <path d="M5 30c8-22 18 16 26-2s16 14 24-2 14 8 20 2" stroke={tone} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function Sparkle({ size = 26, tone = Y, style, className }) {
  return (
    <svg className={className} style={style} width={size} height={typeof size === 'number' ? size : undefined} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 0c1.6 8.6 6.8 13.8 16 16-9.2 2.2-14.4 7.4-16 16-1.6-8.6-6.8-13.8-16-16C9.2 13.8 14.4 8.6 16 0z" fill={tone} />
    </svg>
  );
}

export function Cursor({ size = 30, style, className }) {
  return (
    <svg className={className} style={style} width={size} height={size * 1.22} viewBox="0 0 28 34" fill="none" aria-hidden="true">
      <path d="M3 2l21 13-9 2.2 5.2 10.6-4.4 2.2L10.6 19 3 25z" fill={K} stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowHook({ w = 120, tone = K, flip = false, style, className }) {
  return (
    <svg className={className} style={{ transform: flip ? 'scaleX(-1)' : undefined, ...style }} width={w} height={w * 0.55} viewBox="0 0 120 66" fill="none" aria-hidden="true">
      <path d="M6 8c30 2 52 14 62 38" stroke={tone} strokeWidth="2.6" strokeLinecap="round" strokeDasharray="0 0" />
      <path d="M58 36l12 12 2-17" stroke={tone} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Mini search field — the "Search…" chip from the library sheet */
export function SearchBar({ w = 190, label = 'Search…', style, className }) {
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, width: w, padding: '9px 12px', borderRadius: 999, background: 'var(--cs-white)', border: '1px solid var(--border-hairline)', boxShadow: '0 10px 24px rgba(8,10,13,.12)', ...style }}>
      <span style={{ flex: 1, fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-muted)' }}>{label}</span>
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="5" stroke={K} strokeWidth="1.8" />
        <path d="M10.8 10.8 14 14" stroke={K} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function NotifBubble({ count = 12, style, className }) {
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 11px', borderRadius: 999, background: '#1877F2', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 800, boxShadow: '0 10px 22px rgba(24,119,242,.35)', ...style }}>
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 1.6c3.6 0 6.4 2.5 6.4 5.6S11.6 12.8 8 12.8c-.7 0-1.4-.1-2-.3L2.6 14l.9-2.7C2.3 10.2 1.6 8.7 1.6 7.2 1.6 4.1 4.4 1.6 8 1.6z" fill="#fff" />
      </svg>
      {count}
    </span>
  );
}

/* Torn paper scrap with a handwritten line */
export function Scrap({ children, rotate = -4, tone = 'var(--cs-yellow-soft)', style, className }) {
  return (
    <span className={className} style={{ display: 'inline-block', position: 'relative', padding: '9px 14px', background: tone, transform: `rotate(${rotate}deg)`, boxShadow: '0 8px 18px rgba(8,10,13,.14)', fontFamily: 'var(--font-hand)', fontSize: '1.05rem', fontWeight: 700, color: K, clipPath: 'polygon(0 4%, 97% 0, 100% 94%, 3% 100%)', ...style }}>
      {children}
    </span>
  );
}

export function Tape({ w = 62, rotate = -18, style, className }) {
  return (
    <span className={className} style={{ display: 'inline-block', width: w, height: 22, background: 'rgba(255,212,0,.55)', transform: `rotate(${rotate}deg)`, clipPath: 'polygon(6% 0, 100% 6%, 94% 100%, 0 92%)', ...style }} aria-hidden="true" />
  );
}

export function BinderClip({ size = 26, style, className }) {
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="4" y="11" width="20" height="14" rx="2" fill={K} />
      <path d="M8 11V7.5A1.5 1.5 0 0 1 9.5 6h9A1.5 1.5 0 0 1 20 7.5V11" stroke="#9AA0A6" strokeWidth="2" />
    </svg>
  );
}

/* Small sparkline card used behind the metric numbers */
export function Spark({ d, w = 84, tone = Y, className, style }) {
  return (
    <svg className={className} style={style} width={w} height={w * 0.42} viewBox="0 0 84 35" fill="none" aria-hidden="true" preserveAspectRatio="none">
      <path d={d} pathLength="1" stroke={tone} strokeWidth="2.4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Dot({ size = 18, tone = Y, style, className }) {
  return <span className={className} style={{ display: 'inline-block', width: size, height: size, borderRadius: 999, background: tone, ...style }} aria-hidden="true" />;
}

export function Smiley({ size = 44, style, className }) {
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="var(--cs-yellow)" stroke={K} strokeWidth="2.4" />
      <circle cx="17" cy="19" r="2.8" fill={K} />
      <circle cx="31" cy="19" r="2.8" fill={K} />
      <path d="M14 28c3 6 17 6 20 0" stroke={K} strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

/* Three bars that grow when their [data-reveal] ancestor comes into view */
export function GrowBars({ w = 96, tone = Y, style, className }) {
  return (
    <svg className={`cs-growbars ${className || ''}`} style={style} width={w} height={w * 0.8} viewBox="0 0 60 48" fill="none" aria-hidden="true">
      <rect x="4" y="30" width="12" height="16" rx="2" fill={tone} opacity=".55" />
      <rect x="24" y="18" width="12" height="28" rx="2" fill={tone} opacity=".8" />
      <rect x="44" y="4" width="12" height="42" rx="2" fill={tone} />
    </svg>
  );
}
