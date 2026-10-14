import { useDocumentHead } from '../lib/useDocumentHead';
import PageTag from '../components/PageTag';
import SectionLabel from '../components/SectionLabel';
import MarketingAsset from '../components/MarketingAsset';
import StickyNote from '../components/StickyNote';
import Words from '../components/Words';
import { InnerHero, BlogArchive } from '../components/InnerHeroes';
import { PaperPlane, Sparkle, Squiggle, Tape } from '../components/Decor';

const T = [
  ['SEO', 'var(--cs-yellow)'], ['Google Ads', 'var(--cs-white)'], ['Meta Ads', '#EFE9FF'],
  ['Content', 'var(--cs-white)'], ['Branding', '#FDECF2'], ['Websites', 'var(--cs-white)'],
  ['Growth', 'var(--cs-yellow)'], ['Marketing Strategy', 'var(--cs-white)'],
];
const TOPICS = T.map(([label, bg], i) => ({ label, bg, delay: -i * 1.3 + 's' }));

export default function Blog() {
  useDocumentHead({
    title: 'Blog | Claireshine',
    description: 'Practical insights from Claireshine on SEO, digital marketing, Google Ads, Meta Ads, content, branding, websites and business growth.',
    canonical: '/blog',
    ogImage: 'https://claireshine.com/og-image.png',
  });

  return (
    <main id="main" className="cs-inner" style={{ display: 'block', background: 'var(--cs-cream)', paddingTop: 'clamp(86px,7vw,104px)' }}>
      <PageTag>Blog</PageTag>

      <InnerHero
        eyebrow="The Claireshine blog"
        title={<Words text="Ideas worth thinking about." />}
        visual={<BlogArchive />}
      />

      <section className="cs-lede" style={{ background: 'var(--cs-white)' }}>
        <div className="cs-container cs-lede-grid">
          <p data-reveal className="cs-lede-big cs-from-left">Marketing changes quickly.</p>
          <div data-reveal className="cs-from-right" style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <p className="cs-lede-small">This is where we'll share useful thinking on SEO, digital marketing, content, paid media, branding, websites and growth — without the unnecessary jargon.</p>
            <Squiggle w={90} className="cs-wobble" />
          </div>
        </div>
      </section>

      <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--cs-cream)', paddingBlock: 'var(--section-y)' }}>
        <span className="cs-fly cs-deco-lg" style={{ top: '10%', animationDuration: '24s' }} aria-hidden="true"><PaperPlane size={42} /></span>
        <div className="cs-container">
          <div data-reveal className="cs-pop" style={{ maxWidth: 900, marginInline: 'auto' }}>
          <div className="cs-notebook">
            <span aria-hidden="true" style={{ position: 'absolute', left: '44%', top: -12 }}><Tape w={96} rotate={-4} /></span>
            <span className="cs-deco cs-deco-lg" style={{ right: '5%', top: '8%' }}><Sparkle size={26} className="cs-twinkle" /></span>
            <div style={{ position: 'relative', zIndex: 1, display: 'grid', gap: 'var(--space-5)', justifyItems: 'start', maxWidth: '56ch' }}>
              <SectionLabel number="01">Coming soon</SectionLabel>
              <h2 style={{ fontSize: 'var(--type-heading-xl)', lineHeight: 'var(--leading-heading)', letterSpacing: 'var(--tracking-heading)', color: 'var(--cs-black)', maxWidth: '20ch' }}><Words text="We're getting our thoughts together." /></h2>
              <p style={{ fontSize: 'var(--type-body-lg)', color: 'var(--cs-black)', maxWidth: '50ch' }}>No articles yet.</p>
              <p style={{ fontSize: 'var(--type-body-md)', color: 'var(--cs-black)', maxWidth: '54ch' }}>When we publish, you'll find practical ideas here about building better brands, making marketing clearer and creating growth that actually means something.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-5)', alignItems: 'center' }}>
                <MarketingAsset name="content" size={140} ground="none" alt="Claireshine content object — a stack of written pages" style={{ animation: 'cs-float 9s ease-in-out infinite' }} />
                <span className="cs-hand" style={{ fontSize: '1.7rem', color: 'var(--cs-black)' }}>Good ideas take time.</span>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--cs-white)', paddingBlock: 'var(--section-y)' }}>
        <div className="cs-container" data-cs-split="5-7" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,5fr) minmax(0,7fr)', gap: 'var(--space-8)', alignItems: 'start' }}>
          <div data-reveal className="cs-from-left" style={{ display: 'grid', gap: 'var(--space-5)', alignContent: 'start', justifyItems: 'start' }}>
            <SectionLabel number="02">On the list</SectionLabel>
            <h2 style={{ fontSize: 'var(--type-heading-xl)', lineHeight: 'var(--leading-display)', letterSpacing: 'var(--tracking-display)', maxWidth: '14ch' }}><Words text="What we'll talk about" /></h2>
            <span className="cs-shake" style={{ display: 'inline-block' }}><StickyNote rotate={3}>Topics, not fake articles.</StickyNote></span>
            <div data-float style={{ animation: 'cs-float 13s ease-in-out infinite' }}>
              <MarketingAsset name="social-media" size={180} ground="none" alt="Claireshine social media object — stacked feed cards" />
            </div>
          </div>
          <ul data-reveal className="cs-from-right cs-topic-cloud">
            {TOPICS.map((t) => (
              <li key={t.label} style={{ '--tb': t.bg === 'var(--cs-white)' ? 'var(--cs-yellow-soft)' : t.bg }}>{t.label}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
