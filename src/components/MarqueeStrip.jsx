export default function MarqueeStrip({ items = [], tone = 'yellow', separator = '◆' }) {
  const run = [...items, ...items, ...items, ...items];
  return (
    <div className={`cs-marquee cs-marquee-${tone}`}>
      <div className="cs-marquee-track">
        {run.map((x, i) => (
          <span className="cs-marquee-item" key={i}>
            {x} <span className="cs-marquee-sep" aria-hidden="true">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
