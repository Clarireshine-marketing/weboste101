export default function StickyNote({ children, rotate = -3 }) {
  return (
    <div className="cs-sticky-note" style={{ transform: `rotate(${rotate}deg)` }}>
      {children}
    </div>
  );
}
