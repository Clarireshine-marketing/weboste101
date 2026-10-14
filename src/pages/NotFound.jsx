import { useDocumentHead } from '../lib/useDocumentHead';
import SectionLabel from '../components/SectionLabel';
import Button from '../components/Button';
import Claireshinaholic from '../components/Claireshinaholic';
import { Link } from 'react-router-dom';

export default function NotFound() {
  useDocumentHead({
    title: 'Page not found | Claireshine',
    description: "That page isn't here. Head back to the Claireshine homepage or explore our marketing services.",
    robots: 'noindex,follow',
  });

  return (
    <main id="main" style={{ display: 'block', background: 'var(--cs-cream)', paddingTop: 'clamp(86px,7vw,104px)', minHeight: '70vh' }}>
      <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--cs-cream)', paddingBlock: 'clamp(44px,6vw,92px)' }}>
        <div aria-hidden="true" data-float style={{ position: 'absolute', top: -130, left: -70, width: 330, height: 330, borderRadius: 'var(--radius-pill)', background: 'var(--cs-yellow-soft)', animation: 'cs-drift 15s ease-in-out infinite' }} />
        <div aria-hidden="true" data-float style={{ position: 'absolute', bottom: -80, right: '6%', width: 180, height: 180, borderRadius: 'var(--radius-pill)', background: '#EFE9FF', animation: 'cs-drift 19s ease-in-out infinite', animationDelay: '-6s' }} />
        <div className="cs-container" data-cs-split="7-5" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'minmax(0,7fr) minmax(0,5fr)', gap: 'var(--space-8)', alignItems: 'center' }}>
          <div style={{ display: 'grid', gap: 'var(--space-5)', justifyItems: 'start' }}>
            <SectionLabel rule={false}>404</SectionLabel>
            <h1 style={{ fontSize: 'var(--type-display-lg)', lineHeight: 'var(--leading-display)', letterSpacing: 'var(--tracking-display)', textTransform: 'uppercase', fontWeight: 900, color: 'var(--cs-black)', maxWidth: '14ch' }}>Looks like this page lost the plot.</h1>
            <p style={{ fontSize: 'var(--type-body-lg)', color: 'var(--text-body)', maxWidth: '40ch' }}>Don't worry. We know where the important stuff is.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
              <Button href="/" variant="primary" size="lg">Back Home</Button>
              <Button href="/services" variant="secondary" size="lg">Explore Services</Button>
            </div>
            <nav aria-label="Other pages" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-hairline)', width: '100%' }}>
              <Link to="/about" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, fontSize: 'var(--type-body-sm)', fontWeight: 600, color: 'var(--cs-black)' }}>About</Link>
              <Link to="/work" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, fontSize: 'var(--type-body-sm)', fontWeight: 600, color: 'var(--cs-black)' }}>Work</Link>
              <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, fontSize: 'var(--type-body-sm)', fontWeight: 600, color: 'var(--cs-black)' }}>Blog</Link>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, fontSize: 'var(--type-body-sm)', fontWeight: 600, color: 'var(--cs-black)' }}>Contact</Link>
            </nav>
          </div>
          <div data-parallax data-speed="0.06" style={{ display: 'grid', justifyItems: 'center' }}>
            <Claireshinaholic character="cat" size={210} caption="Nothing to see here" />
          </div>
        </div>
      </section>
    </main>
  );
}
