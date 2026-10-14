export default function Pill({ children, tone = 'yellow' }) {
  return <span className={`cs-pill cs-pill-${tone}`}>{children}</span>;
}
