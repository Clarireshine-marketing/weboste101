import { Link } from 'react-router-dom';

export default function Button({ children, variant = 'primary', size = 'md', href, arrow = true, ...rest }) {
  const className = `cs-btn cs-btn-${size} cs-btn-${variant}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <span className="cs-btn-arrow" aria-hidden="true">→</span>}
    </>
  );
  const isExternal = href && /^([a-z]+:)?\/\//i.test(href);
  if (href && !isExternal) {
    return (
      <Link to={href} className={className} {...rest}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={className} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={className} {...rest}>
      {inner}
    </button>
  );
}
