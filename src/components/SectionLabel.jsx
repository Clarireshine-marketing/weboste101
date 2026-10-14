export default function SectionLabel({ children, number, rule = true }) {
  return (
    <div className="cs-section-label">
      {number && <span className="cs-section-label-number">{number}</span>}
      <span className="cs-section-label-text">{children}</span>
      {rule && <span className="cs-section-label-rule" aria-hidden="true" />}
    </div>
  );
}
