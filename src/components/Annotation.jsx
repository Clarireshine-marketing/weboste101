const MARKS = { arrow: '↗', 'arrow-down': '↓', 'arrow-curve': '⤳', star: '✳', smile: '☺' };

export default function Annotation({ children, mark = 'arrow', rotate = -4 }) {
  const glyph = MARKS[mark];
  return (
    <div className="cs-annotation" style={{ transform: `rotate(${rotate}deg)` }}>
      <span className="cs-annotation-text">{children}</span>
      {glyph && <span className="cs-annotation-mark" aria-hidden="true">{glyph}</span>}
    </div>
  );
}
