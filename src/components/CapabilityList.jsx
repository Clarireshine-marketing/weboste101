export default function CapabilityList({ items = [], columns = 2, marker = '→' }) {
  return (
    <ul className={`cs-cap-list cols-${columns}`}>
      {items.map((it, i) => (
        <li key={i}>
          <span className="cs-cap-marker" aria-hidden="true">{marker}</span>
          <span className="cs-cap-text">{it}</span>
        </li>
      ))}
    </ul>
  );
}
