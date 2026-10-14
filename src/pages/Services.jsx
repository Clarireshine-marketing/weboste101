import { useDocumentHead } from '../lib/useDocumentHead';
import PageTag from '../components/PageTag';
import SectionLabel from '../components/SectionLabel';
import MarketingAsset from '../components/MarketingAsset';
import MarqueeStrip from '../components/MarqueeStrip';
import ServiceWorld from '../components/ServiceWorld';
import Words from '../components/Words';
import { InnerHero, ServicesEcosystem } from '../components/InnerHeroes';
import { Sparkle, Squiggle } from '../components/Decor';

const STRIP = ['GET FOUND', 'GET CHOSEN', 'MAKE IT WORK HARDER', 'BUILD BETTER', 'THINK FIRST'];

const FLOW_FOUND = [
  { step: '01', src: '/assets/services/seo.png', title: 'Search', note: 'What people actually type when they need you.' },
  { step: '02', src: '/assets/marketing/local-seo.png', title: 'Local', note: 'Appearing on the map for the area you serve.' },
  { step: '03', src: '/assets/services/google-business-profile.png', title: 'Profile', note: 'A business profile that answers the obvious questions.' },
  { step: '04', src: '/assets/marketing/search-result-stack.png', title: 'Result', note: 'A listing worth clicking, not just ranking.' },
  { step: '05', src: '/assets/marketing/growth-bars.png', title: 'Visibility', note: 'Movement tracked in Search Console over time.' },
];
const FLOW_CHOSEN = [
  { step: '01', src: '/assets/services/social-media.png', title: 'Audience', note: 'Who we are talking to, and where they already are.' },
  { step: '02', src: '/assets/services/content.png', title: 'Message', note: 'The one idea worth saying first.' },
  { step: '03', src: '/assets/services/google-ads.png', title: 'Ad', note: 'Search and Meta placements built around that message.' },
  { step: '04', src: '/assets/services/meta-ads.png', title: 'Click', note: 'Creative tested against real response, not opinion.' },
  { step: '05', src: '/assets/marketing/megaphone.png', title: 'Action', note: 'An enquiry, a call, a sale — something countable.' },
];
const FLOW_PERFORM = [
  { step: '01', src: '/assets/marketing/performance-marketing.png', title: 'Campaign', note: 'Live spend doing a specific job.' },
  { step: '02', src: '/assets/services/analytics.png', title: 'Data', note: 'Clean tracking, so the numbers mean something.' },
  { step: '03', src: '/assets/marketing/reports-insights.png', title: 'Insight', note: 'What is working, what is noise.' },
  { step: '04', src: '/assets/editorial/checklist-repeat.png', title: 'Optimise', note: 'Change one thing at a time and watch it.' },
  { step: '05', src: '/assets/editorial/direction-sign.png', title: 'Direction', note: "Next month's plan, based on this month's evidence." },
];
const FLOW_BUILD = [
  { step: '01', src: '/assets/services/branding.png', title: 'Brand', note: 'How the business looks, sounds and is remembered.' },
  { step: '02', src: '/assets/services/website-development.png', title: 'Website', note: 'Built to be understood quickly on a phone.' },
  { step: '03', src: '/assets/marketing/laptop-mockup.png', title: 'Visitor', note: 'Someone arrives with a question in mind.' },
  { step: '04', src: '/assets/editorial/ideas-speech-bubble.png', title: 'Experience', note: 'They find the answer without hunting for it.' },
  { step: '05', src: '/assets/marketing/growth-bars.png', title: 'Action', note: 'The next step is obvious and easy to take.' },
];
const FLOW_THINK = [
  { step: '01', src: '/assets/editorial/ideas-speech-bubble.png', title: 'Problem', note: 'The thing that is actually in the way.' },
  { step: '02', src: '/assets/editorial/marker.png', title: 'Clarity', note: 'Fewer priorities, written down plainly.' },
  { step: '03', src: '/assets/services/strategy.png', title: 'Strategy', note: 'A route with reasons behind each channel.' },
  { step: '04', src: '/assets/editorial/checklist-repeat.png', title: 'Execution', note: 'The work, in an order that makes sense.' },
  { step: '05', src: '/assets/services/growth.png', title: 'Growth', note: 'Compounding results instead of restarts.' },
];

const FOUND = ['SEO', 'Local SEO', 'Google Business Profile', 'Google Search Console'];
const CHOSEN = ['Google Ads', 'Meta Ads', 'Social Media', 'Content'];
const PERFORM = ['Performance Marketing', 'Analytics & Reporting', 'Conversion-focused digital experiences'];
const BUILD = ['Website Development', 'Branding', 'Content', 'Digital Experiences'];

// Each service's steps, laid out as one dashed journey instead of a row of boxes.
function Flow({ items, bg, label }) {
  return (
    <section aria-label={label} style={{ background: bg, paddingBlock: 'clamp(36px,5vw,64px)' }}>
      <div className="cs-container">
        <ol className="cs-journey">
          {items.map((f, i) => (
            <li key={f.step} data-reveal className="cs-pop" style={{ transitionDelay: `${i * 110}ms` }}>
              <span aria-hidden="true" className="cs-j-n">{f.step}</span>
              <img src={f.src} alt="" width="88" height="88" loading="lazy" decoding="async" />
              <span className="cs-j-t">{f.title}</span>
              <span className="cs-j-b">{f.note}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function Services() {
  useDocumentHead({
    title: 'Services | Claireshine',
    description: "Explore Claireshine's digital marketing services including SEO, Google Ads, Meta Ads, Google Business Profile, performance marketing, websites, content and growth strategy.",
    canonical: '/services',
    ogImage: 'https://claireshine.com/og-image.png',
  });

  return (
    <main id="main" className="cs-inner" style={{ display: 'block', background: 'var(--surface-page)', paddingTop: 'clamp(86px,7vw,104px)' }}>
      <PageTag>Services</PageTag>

      <InnerHero
        eyebrow="What we do"
        title={<><Words text="Marketing that makes sense." /> <Words text="Growth that moves." start={4} /></>}
        visual={<ServicesEcosystem />}
      />

      <section className="cs-lede" style={{ background: 'var(--cs-white)' }}>
        <span className="cs-deco cs-deco-lg" style={{ right: '6%', top: '16%' }}><Sparkle size={28} className="cs-twinkle" /></span>
        <span className="cs-deco cs-deco-lg" style={{ right: '10%', bottom: '14%' }}><Squiggle w={96} className="cs-wobble" /></span>
        <div className="cs-container">
          <p data-reveal className="cs-lede-big cs-from-left" style={{ maxWidth: '30ch' }}>From getting found in search to getting chosen, clicked, remembered and revisited, Claireshine connects strategy, creative and digital marketing around one goal: clearer paths to growth.</p>
        </div>
      </section>

      <MarqueeStrip items={STRIP} tone="black" />

      <ServiceWorld number="01" label="Get found" title="Visibility starts with being where people are looking." body="We help businesses improve their search visibility, strengthen their local presence and build digital foundations that make them easier to discover." capabilities={FOUND} asset="seo" accent="yellow" ground="page" split="7-5">
        <span id="seo" /><span id="local-seo" /><span id="google-business-profile" />
      </ServiceWorld>
      <Flow items={FLOW_FOUND} bg="var(--cs-yellow-soft)" label="How getting found works, step by step" />

      <ServiceWorld number="02" label="Get chosen" title="Attention is useful when it reaches the right people." body="We build campaigns and content designed to put the right message in front of the right audience — clearly, creatively and with purpose." capabilities={CHOSEN} asset="google-ads" accent="lilac" ground="cream" split="5-7" reverse>
        <span id="google-ads" /><span id="meta-ads" />
      </ServiceWorld>
      <Flow items={FLOW_CHOSEN} bg="#EFE9FF" label="How getting chosen works, step by step" />

      <ServiceWorld number="03" label="Make it work harder" title="Good marketing doesn't stop at attention." body="We look at what is happening, what is working and where there is room to improve — so decisions become clearer and marketing becomes more purposeful." capabilities={PERFORM} asset="performance-marketing" accent="mint" ground="page" split="7-5">
        <span id="performance-marketing" />
      </ServiceWorld>
      <Flow items={FLOW_PERFORM} bg="#E4F6EA" label="How performance work moves from data to decisions" />

      <ServiceWorld number="04" label="Build better" title="Your digital presence should make the brand easier to understand and easier to choose." body="We create brand and digital experiences that connect clarity with action." capabilities={BUILD} asset="website-development" accent="coral" ground="cream" split="5-7" reverse />
      <Flow items={FLOW_BUILD} bg="#FFEEE2" label="How a build turns a brand into action" />

      <section className="cs-dark" style={{ position: 'relative', overflow: 'hidden', background: 'var(--cs-black)', paddingBlock: 'var(--section-y)' }}>
        <span className="cs-outline-num" aria-hidden="true" style={{ fontSize: 'clamp(9rem,24vw,22rem)', top: '-4%', right: '-2%', WebkitTextStroke: '2px rgba(255,255,255,.1)' }}>05</span>
        <div className="cs-container" data-cs-split="7-5" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'minmax(0,7fr) minmax(0,5fr)', gap: 'var(--space-8)', alignItems: 'center' }}>
          <div data-reveal className="cs-from-left" style={{ display: 'grid', gap: 'var(--space-5)', justifyItems: 'start' }}>
            <SectionLabel number="05">Start with the right direction</SectionLabel>
            <h2 style={{ fontSize: 'var(--type-heading-xl)', lineHeight: 'var(--leading-display)', letterSpacing: 'var(--tracking-display)', color: 'var(--cs-white)', maxWidth: '20ch' }}><Words text="Before doing more, figure out what matters." /></h2>
            <p style={{ fontSize: 'var(--type-body-lg)', color: 'var(--cs-paper-70)', maxWidth: '50ch' }}>We bring strategy and growth thinking into the decisions behind the work — so every channel has a reason to exist.</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: '0 .5em', alignItems: 'baseline' }}>
              <li className="cs-mega" style={{ color: 'var(--cs-yellow)' }}>Strategy</li>
              <li className="cs-mega" style={{ color: 'transparent', WebkitTextStroke: '2px var(--cs-white)' }}>Growth</li>
            </ul>
          </div>
          <div data-reveal className="cs-from-right" style={{ display: 'grid', justifyItems: 'center' }}>
            <div data-parallax data-speed="0.05">
              <MarketingAsset name="strategy" size={260} ground="none" alt="Claireshine strategy object — a chess piece on a light ground" style={{ animation: 'cs-float 11s ease-in-out infinite' }} />
            </div>
          </div>
        </div>
      </section>
      <Flow items={FLOW_THINK} bg="var(--cs-cream)" label="How strategy turns a problem into growth" />
    </main>
  );
}
