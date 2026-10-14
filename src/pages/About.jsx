import { useDocumentHead } from '../lib/useDocumentHead';
import PageTag from '../components/PageTag';
import SectionLabel from '../components/SectionLabel';
import StickyNote from '../components/StickyNote';
import MarketingAsset from '../components/MarketingAsset';
import Button from '../components/Button';
import Claireshinaholic from '../components/Claireshinaholic';
import Words from '../components/Words';
import { InnerHero, AboutStudio } from '../components/InnerHeroes';
import { PaperPlane, Sparkle, Squiggle, Smiley } from '../components/Decor';

const NOISE = [
  { label: 'More channels.', delay: '0s' },
  { label: 'More content.', delay: '-2s' },
  { label: 'More campaigns.', delay: '-4s' },
  { label: 'More things to track.', delay: '-6s' },
];

const MOVES = [
  { title: 'Strategy', body: 'should create direction.' },
  { title: 'Creative', body: 'should create attention.' },
  { title: 'Digital', body: 'should create action.' },
  { title: 'Marketing', body: 'should create growth.' },
];

const H2 = { fontSize: 'var(--type-heading-xl)', lineHeight: 'var(--leading-display)', letterSpacing: 'var(--tracking-display)' };

export default function About() {
  useDocumentHead({
    title: 'About | Claireshine',
    description: 'Meet Claireshine — a marketing and growth agency focused on clarity, strategy, creativity and digital growth for better brands and brighter businesses.',
    canonical: '/about',
    ogImage: 'https://claireshine.com/og-image.png',
  });

  return (
    <main id="main" className="cs-inner" style={{ display: 'block', background: 'var(--cs-cream)', paddingTop: 'clamp(86px,7vw,104px)' }}>
      <PageTag>About</PageTag>

      <InnerHero
        eyebrow="About Claireshine"
        title={<><Words text="Good brands." /><br /><Words text="Brighter" start={2} />{' '}<span className="cs-highlight">businesses.</span></>}
        visual={<AboutStudio />}
      />

      <section className="cs-lede" style={{ background: 'var(--cs-white)' }}>
        <span className="cs-deco cs-deco-lg" style={{ right: '5%', top: '14%' }}><Sparkle size={26} className="cs-twinkle" /></span>
        <div className="cs-container cs-lede-grid">
          <p data-reveal className="cs-lede-big cs-from-left">Good marketing shouldn't make things more complicated. It should make the right things clearer.</p>
          <div data-reveal className="cs-from-right" style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <p className="cs-lede-small">Claireshine brings strategy, creativity and digital marketing together to help businesses build better brands and create meaningful growth.</p>
            <Squiggle w={90} className="cs-wobble" />
          </div>
        </div>
      </section>

      <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--cs-cream)', paddingBlock: 'var(--section-y)' }}>
        <div className="cs-container" data-cs-split="5-7" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,5fr) minmax(0,7fr)', gap: 'var(--space-8)', alignItems: 'start' }}>
          <div data-reveal className="cs-from-left" style={{ position: 'relative', display: 'grid', gap: 'var(--space-5)', alignContent: 'start', justifyItems: 'start' }}>
            <SectionLabel number="01">How we think</SectionLabel>
            <h2 style={{ ...H2, maxWidth: '14ch' }}><Words text="We make marketing make sense." /></h2>
            <span className="cs-shake" style={{ display: 'inline-block' }}><StickyNote rotate={-3}>More clarity please</StickyNote></span>
            <div data-float style={{ animation: 'cs-float 12s ease-in-out infinite' }}>
              <MarketingAsset name="direction-sign" size={200} ground="none" alt="Claireshine direction sign object — arrows pointing different ways" />
            </div>
          </div>
          <div style={{ display: 'grid', gap: 'var(--space-6)' }}>
            <p data-reveal className="cs-from-right" style={{ fontSize: 'var(--type-body-lg)', fontWeight: 700, color: 'var(--cs-black)', maxWidth: '48ch' }}>Too much marketing creates noise.</p>
            <ul data-reveal className="cs-noise">
              {NOISE.map((n, i) => (
                <li key={n.label} style={{ '--d': `${400 + i * 220}ms` }}>
                  {n.label}
                  <svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0 6 C 20 2, 40 9, 60 4 S 90 7, 100 3" pathLength="1" fill="none" stroke="var(--cs-yellow)" strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                  </svg>
                </li>
              ))}
            </ul>
            <div data-reveal className="cs-pop" style={{ display: 'grid', gap: 'var(--space-4)', paddingLeft: 'clamp(16px,2vw,28px)', borderLeft: '4px solid var(--cs-yellow)' }}>
              <p style={{ fontSize: 'var(--type-body-lg)', color: 'var(--cs-black)', maxWidth: '54ch' }}>We believe growth starts with clarity — knowing what matters, who you're speaking to and where your effort should go.</p>
              <p style={{ fontSize: 'var(--type-body-md)', color: 'var(--text-body)', maxWidth: '54ch' }}>Then we build the strategy, creative and digital experiences around it.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-dark" style={{ position: 'relative', overflow: 'hidden', background: 'var(--cs-black)', paddingBlock: 'var(--section-y)' }}>
        <span className="cs-fly cs-deco-lg" style={{ top: '9%', animationDuration: '26s' }} aria-hidden="true"><PaperPlane size={40} /></span>
        <div className="cs-container" style={{ position: 'relative', zIndex: 1, display: 'grid', gap: 'var(--space-8)' }}>
          <div data-reveal className="cs-from-left" style={{ display: 'grid', gap: 'var(--space-5)', maxWidth: 900 }}>
            <SectionLabel number="02">What we care about</SectionLabel>
            <h2 style={{ ...H2, color: 'var(--cs-white)', maxWidth: '20ch' }}><Words text="Ideas are only useful when they move something forward." /></h2>
            <p style={{ fontSize: 'var(--type-body-lg)', color: 'var(--cs-paper-70)', maxWidth: '46ch' }}>We care about ideas that do more than look good.</p>
          </div>
          <ul className="cs-rows">
            {MOVES.map((m, i) => (
              <li key={m.title} data-reveal className={i % 2 ? 'cs-from-right' : 'cs-from-left'}>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </li>
            ))}
          </ul>
          <div data-reveal className="cs-pop" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-5)', alignItems: 'center' }}>
            <MarketingAsset name="growth-bars" size={150} ground="none" alt="Claireshine growth object — rising bars" style={{ animation: 'cs-float 10s ease-in-out infinite' }} />
            <p className="cs-hand" style={{ fontSize: '1.9rem', color: 'var(--cs-yellow)' }}>That's the Claireshine approach.</p>
            <Sparkle size={24} className="cs-twinkle" />
          </div>
        </div>
      </section>

      <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--cs-yellow)', paddingBlock: 'var(--section-y)' }}>
        <div className="cs-container" data-cs-split="7-5" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,7fr) minmax(0,5fr)', gap: 'var(--space-8)', alignItems: 'center' }}>
          <div data-reveal className="cs-from-left" style={{ display: 'grid', gap: 'var(--space-5)', justifyItems: 'start' }}>
            <SectionLabel number="03">What it adds up to</SectionLabel>
            <h2 className="cs-mega" style={{ maxWidth: '12ch', color: 'var(--cs-black)' }}><Words text="Better brands. Brighter businesses." /></h2>
            <p style={{ fontSize: 'var(--type-body-lg)', color: 'var(--cs-black)', maxWidth: '52ch' }}>From brand and content to SEO, paid media, websites and performance marketing, we connect the pieces that help businesses get found, get chosen and keep growing.</p>
            <Button href="/services" variant="dark" size="md">See what we do</Button>
          </div>
          <div data-reveal className="cs-from-right" style={{ position: 'relative', display: 'grid', justifyItems: 'center', minHeight: 320 }}>
            <div data-parallax data-speed="0.05" style={{ position: 'absolute', left: '4%', top: '2%', transform: 'rotate(-6deg)' }}>
              <MarketingAsset name="reports-insights" size={180} ground="none" alt="Claireshine reporting object — a dashboard card with charts" />
            </div>
            <div style={{ position: 'relative', marginTop: 90, marginLeft: 90 }}>
              <Claireshinaholic character="cat" size={210} caption="Onwards & Upwards" />
            </div>
            <span style={{ position: 'absolute', right: '6%', top: '4%' }}><Smiley size={46} className="cs-wobble" /></span>
          </div>
        </div>
      </section>
    </main>
  );
}
