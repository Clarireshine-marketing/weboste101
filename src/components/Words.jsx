// Words rise out of a mask one after another once their [data-reveal] ancestor shows.
export default function Words({ text, start = 0 }) {
  const parts = text.split(' ');
  return parts.map((w, i) => (
    <span key={i}>
      <span className="cs-w"><span className="cs-w-i" style={{ '--i': start + i }}>{w}</span></span>
      {i < parts.length - 1 ? ' ' : ''}
    </span>
  ));
}
