import { useDocumentHead } from '../lib/useDocumentHead';
import SectionLabel from './SectionLabel';
import Button from './Button';

export default function Legal({ canonical, eyebrow = 'Legal', title, intro, updated = 'September 2026', sections = [] }) {
  useDocumentHead({
    title: `${title} | Claireshine`,
    description: intro,
    canonical,
  });

  return (
    <main id="main" style={{ display: 'block', background: 'var(--surface-page)', paddingTop: 'clamp(86px,7vw,104px)' }}>
      <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--cs-cream)', paddingBlock: 'clamp(32px,4vw,60px) clamp(36px,5vw,68px)' }}>
        <div aria-hidden="true" data-float style={{ position: 'absolute', top: -140, right: -80, width: 320, height: 320, borderRadius: 'var(--radius-pill)', background: 'var(--cs-yellow-soft)', animation: 'cs-drift 16s ease-in-out infinite' }} />
        <div className="cs-container" style={{ position: 'relative', zIndex: 1, display: 'grid', gap: 'var(--space-5)', maxWidth: 820 }}>
          <SectionLabel rule={false}>{eyebrow}</SectionLabel>
          <h1 style={{ fontSize: 'var(--type-heading-xl)', lineHeight: 'var(--leading-display)', letterSpacing: 'var(--tracking-display)', textTransform: 'uppercase', fontWeight: 900, color: 'var(--cs-black)', maxWidth: '18ch' }}>{title}</h1>
          <p style={{ fontSize: 'var(--type-body-lg)', color: 'var(--text-body)', maxWidth: '58ch' }}>{intro}</p>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--type-micro)', fontWeight: 700, letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Last updated {updated}</span>
        </div>
      </section>

      <section style={{ background: 'var(--surface-page)', paddingBlock: 'var(--section-y)' }}>
        <div className="cs-container" style={{ display: 'grid', gap: 'var(--space-7)', maxWidth: 820 }}>
          {sections.map((s) => (
            <div key={s.h} style={{ display: 'grid', gap: 'var(--space-3)', paddingTop: 'var(--space-5)', borderTop: '1px solid var(--border-hairline)' }}>
              <h2 style={{ fontSize: 'var(--type-heading-md)', letterSpacing: 'var(--tracking-heading)' }}>{s.h}</h2>
              {s.p.map((para, i) => (
                <p key={i} style={{ fontSize: 'var(--type-body-md)', color: 'var(--text-body)', maxWidth: '62ch' }}>{para}</p>
              ))}
            </div>
          ))}


          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', alignItems: 'center', justifyContent: 'space-between', paddingTop: 'var(--space-5)', borderTop: '1px solid var(--border-hairline)' }}>
            <p style={{ fontSize: 'var(--type-body-md)', color: 'var(--text-body)', maxWidth: '40ch' }}>Questions about this page? Email <a href="mailto:claireshine.marketing@gmail.com">claireshine.marketing@gmail.com</a>.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
              <Button href="/contact" variant="primary" size="md">Let's Talk</Button>
              <Button href="/services" variant="ghost" size="md">Explore Services</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
