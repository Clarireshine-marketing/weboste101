export default function PageTag({ children }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed', left: 'clamp(10px,1.6vw,24px)', bottom: 'clamp(10px,1.6vw,24px)', zIndex: 60,
        pointerEvents: 'none', animation: 'cs-page-tag 9s ease-in-out infinite',
      }}
    >
      <span
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px',
          background: 'var(--cs-yellow)', border: '2px solid var(--cs-black)', borderRadius: 'var(--radius-pill)',
          fontFamily: 'var(--font-sans)', fontSize: 'var(--type-label)', fontWeight: 900,
          letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--cs-black)',
          boxShadow: '0 1px 2px rgba(8,10,13,.2),0 12px 28px rgba(8,10,13,.16)',
        }}
      >
        {children}
      </span>
    </div>
  );
}
