import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const PAGES = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Work', '/work'],
  ['Blog', '/blog'],
  ['Contact', '/contact'],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const navLink = (label, href) => {
    const current = pathname === href;
    return (
      <Link to={href} aria-current={current ? 'page' : undefined}>
        <span>{label}</span>
        {current && <span className="cs-nav-dot" aria-hidden="true" />}
      </Link>
    );
  };

  return (
    <header className="cs-site-header">
      <a href="#main" className="cs-skip-link">Skip to main content</a>
      <div className="cs-container cs-header-bar">
        <div className="cs-header-row">
          <Link to="/" aria-label="Claireshine — home" className="cs-logo">
            <img src="/assets/brand/claireshine-mark.png" alt="" width="42" height="40" />
            <span className="cs-logo-word">CLAIRESHINE</span>
          </Link>
          <nav aria-label="Primary" className="cs-nav-desktop">
            <ul>
              {PAGES.map(([label, href]) => (
                <li key={href}>{navLink(label, href)}</li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            className="cs-nav-toggle"
            aria-expanded={open}
            aria-controls="cs-mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="cs-nav-toggle-label">{open ? 'Close' : 'Menu'}</span>
            <span aria-hidden="true">≡</span>
          </button>
        </div>
        <nav id="cs-mobile-nav" aria-label="Primary" className="cs-nav-mobile" hidden={!open}>
          <ul>
            {PAGES.map(([label, href]) => (
              <li key={href}>
                <Link to={href} aria-current={pathname === href ? 'page' : undefined} onClick={() => setOpen(false)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
