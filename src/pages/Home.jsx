import { useEffect, useRef, useState } from 'react';
import { useDocumentHead } from '../lib/useDocumentHead';
import SectionLabel from '../components/SectionLabel';
import Button from '../components/Button';
import Annotation from '../components/Annotation';
import MarqueeStrip from '../components/MarqueeStrip';
import BubbleRain from '../components/BubbleRain';
import { PaperPlane, Sparkle, Squiggle, Cursor, NotifBubble, Scrap, Smiley, GrowBars, Dot } from '../components/Decor';
import { csAsset, csServiceAssets } from '../lib/assets';

const STRIP = ['CLARITY CREATES GROWTH', 'SCROLL. STOP. CONVERT.', 'TRACK. IMPROVE. GROW.', 'FROM IDEAS TO IMPACT'];

const icon = (name) => csAsset(csServiceAssets[name] || csServiceAssets.seo);

const H2 = { fontSize: 'var(--type-heading-xl)', lineHeight: 1.04, letterSpacing: 'var(--tracking-display)', textTransform: 'uppercase', fontWeight: 900 };

const STEPS = [
  { n: '01', title: 'Plan', asset: 'strategy', body: 'Understand your goals and find opportunities.' },
  { n: '02', title: 'Create', asset: 'content', body: 'Build strategy, content and campaigns.' },
  { n: '03', title: 'Optimise', asset: 'analytics', body: 'Track, test and improve what works.' },
  { n: '04', title: 'Grow', asset: 'growth', plane: true, body: 'Scale results and keep moving forward.' },
];

const METRICS = [
  { v: 2.4, dec: 1, suffix: '×', label: 'Higher ROI', spark: 'M0 22 C 12 20, 20 12, 32 13 S 52 4, 64 2' },
  { v: 37, dec: 0, prefix: '+', suffix: '%', label: 'Organic traffic', spark: 'M0 24 C 14 22, 22 16, 34 14 S 54 6, 64 4' },
  { v: 50, dec: 0, prefix: '−', suffix: '%', label: 'Cost per lead', spark: 'M0 3 C 14 6, 22 12, 34 14 S 52 21, 64 23' },
  { v: 3, dec: 0, suffix: '×', label: 'More enquiries', spark: 'M0 23 C 10 21, 22 18, 32 11 S 50 6, 64 3' },
];

const PROJECTS = [
  { name: 'Lumiere', kind: 'D2C brand', discipline: 'Identity + packaging', category: 'Skincare · Brand identity', cls: 'cs-work-a', w: 751, h: 488, image: '/assets/projects/lumiere-skincare-brand.jpg', alt: 'Lumiere skincare brand identity — logo, day cream jar and serum bottle in a cream still life' },
  { name: 'Nutrova', kind: 'D2C brand', discipline: 'Identity + range design', category: 'Nutrition · Brand identity', cls: 'cs-work-b', w: 759, h: 497, image: '/assets/projects/nutrova-nutrition-brand.jpg', alt: 'Nutrova nutrition brand identity — plant protein tub and daily wellness pouch on a dark botanical set' },
  { name: 'Velora', kind: 'Retail brand', discipline: 'Identity + art direction', category: 'Jewellery · Brand identity', cls: 'cs-work-c', w: 765, h: 506, image: '/assets/projects/velora-jewellery-brand.jpg', alt: 'Velora jewellery brand identity — bangle, earrings and pendant with a branded box on blush silk' },
];
const WORK_ENTRANCE = ['cs-from-left', 'cs-pop', 'cs-from-right'];

function CountUp({ value, decimals = 0, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
      setShown(value);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / 1400);
        setShown(value * (1 - Math.pow(1 - t, 3)));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  return <span ref={ref}>{prefix}{shown.toFixed(decimals)}{suffix}</span>;
}

function useActiveStep(count) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const span = r.height + window.innerHeight * 0.5;
      const p = (window.innerHeight * 0.75 - r.top) / span;
      setActive(Math.max(0, Math.min(count - 1, Math.floor(p * count))));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [count]);
  return [ref, active];
}

// Words rise out of a mask one after another once their [data-reveal] ancestor shows.
function Words({ text, start = 0 }) {
  const parts = text.split(' ');
  return parts.map((w, i) => (
    <span key={i}>
      <span className="cs-w"><span className="cs-w-i" style={{ '--i': start + i }}>{w}</span></span>
      {i < parts.length - 1 ? ' ' : ''}
    </span>
  ));
}

export default function Home() {
  useDocumentHead({
    title: 'Claireshine — Marketing & Advertising Agency',
    description: 'Claireshine is a marketing and advertising agency turning your vision into impactful ideas, creative campaigns, and meaningful brand experiences.',
    canonical: '/',
    ogTitle: 'Claireshine — Marketing & Advertising Agency',
    ogDescription: 'Your vision, our expertise.',
    ogImage: 'https://claireshine.com/og-image.png',
  });

  const [stepsRef, activeStep] = useActiveStep(STEPS.length);

  return (
    <>
      <cs-paper></cs-paper>
      <main id="main" className="cs-home" data-bubble-zone style={{ display: 'block', background: 'var(--surface-page)', paddingTop: 'clamp(86px,7vw,104px)' }}>

        {/* ═══ HERO — pinned; the strip and problem section slide over it ═══ */}
        <section id="hero" data-stack style={{ position: 'relative', overflow: 'hidden', background: '#FEFEFA', paddingTop: 'clamp(24px,3.4vw,56px)' }}>
          <span className="cs-fly cs-deco-lg" style={{ top: '12%' }} aria-hidden="true"><PaperPlane size={46} /></span>
          <div className="cs-container cs-hero-out" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,330px),1fr))', gap: 'var(--space-6) var(--space-9)', alignItems: 'center' }}>
            <div data-reveal style={{ position: 'relative', display: 'grid', gap: 'var(--space-5)', justifyItems: 'start', paddingBottom: 'clamp(24px,4vw,72px)' }}>
              <span className="cs-deco cs-deco-lg" style={{ right: '4%', top: '9%' }}><Sparkle size={30} className="cs-twinkle" /></span>
              <span className="cs-deco cs-deco-lg" style={{ right: '14%', top: '20%' }}><Sparkle size={16} className="cs-twinkle" style={{ animationDelay: '-1.3s' }} /></span>
              <span className="cs-deco cs-deco-lg" style={{ right: '2%', bottom: '11%' }}><Squiggle w={84} className="cs-wobble" /></span>
              <span className="cs-deco" style={{ left: '-3%', bottom: '4%' }}><Dot size={14} tone="var(--cs-pink)" style={{ animation: 'cs-float 7s ease-in-out infinite' }} /></span>
              <SectionLabel rule={false}>Strategy · SEO · Paid media · Websites · Growth — New Delhi</SectionLabel>
              <h1 style={{ fontSize: 'min(var(--type-hero),12.5svh)', lineHeight: 'var(--leading-hero)', letterSpacing: 'var(--tracking-hero)', fontWeight: 900, textTransform: 'uppercase', maxWidth: '13ch', color: 'var(--cs-black)' }}>
                <Words text="Clarity" />{' '}
                <span className="cs-highlight" style={{ display: 'inline-block', fontFamily: 'var(--font-hand)', fontWeight: 700, textTransform: 'none', fontSize: '1.22em', letterSpacing: '-0.01em', paddingInline: '0.1em', willChange: 'transform', animation: 'cs-script-swim 9s ease-in-out infinite' }}>creates</span>{' '}
                <Words text="growth" start={2} />
              </h1>
              <div style={{ display: 'grid', gap: 'var(--space-3)', maxWidth: '48ch' }}>
                <p style={{ fontSize: 'var(--type-body-lg)', color: 'var(--text-body)' }}>Your marketing probably doesn't need more stuff.<br />It probably needs to stop doing random stuff.</p>
                <p style={{ fontSize: 'var(--type-body-lg)', color: 'var(--text-body)' }}>Claireshine brings SEO, Google Ads, Meta Ads, websites, content and strategy into one clearer system — so your marketing has somewhere to actually go.</p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                <Button href="/contact" variant="primary" size="md">Let's Talk</Button>
                <Button href="/work" variant="secondary" size="md">See Our Work</Button>
              </div>
            </div>

            <div className="cs-hero-cat">
              <img
                src="/assets/brand/curious-cat.webp"
                width="1080"
                height="1222"
                decoding="async"
                fetchPriority="high"
                alt="A wide-eyed tabby cat peeking up from the bottom of the frame, under a handwritten note: Curious brands grow faster."
              />
              <BubbleRain count={9} />
              <span className="cs-deco" style={{ left: '5%', top: '42%', zIndex: 3 }}><NotifBubble count={12} className="cs-shake" /></span>
            </div>
          </div>
        </section>

        <MarqueeStrip items={STRIP} tone="yellow" />

        {/* ═══ THE PROBLEM ═══ */}
        <section style={{ position: 'relative', overflow: 'hidden', background: '#FFFFFF', paddingBlock: 'var(--section-y)' }}>
          <div className="cs-container" data-cs-split="5-7" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,5fr) minmax(0,7fr)', gap: 'var(--space-8)', alignItems: 'center' }}>
            <div data-reveal className="cs-from-left" style={{ position: 'relative', display: 'grid', gap: 'var(--space-5)', alignContent: 'start' }}>
              <span className="cs-deco cs-deco-lg" style={{ right: '6%', top: '-2%' }}><Sparkle size={24} className="cs-twinkle" /></span>
              <SectionLabel number="01" rule={false}>The problem</SectionLabel>
              <h2 style={{ ...H2, lineHeight: 1.02, maxWidth: '12ch' }}>
                <Words text="Too much going on." /><br /><Words text="Not enough" start={4} />{' '}
                <span className="cs-highlight" style={{ display: 'inline-block', paddingInline: '.08em' }}>clarity.</span>
              </h2>
              <div style={{ position: 'relative', display: 'grid', gap: 'var(--space-4)', maxWidth: '44ch' }}>
                <p style={{ fontSize: 'var(--type-body-md)', color: 'var(--text-body)' }}>Different platforms. Different tactics. Different people. It's easy to end up with marketing that <strong style={{ color: 'var(--cs-black)' }}>looks busy</strong>, but doesn't really go anywhere.</p>
                <p style={{ fontSize: 'var(--type-body-md)', color: 'var(--text-body)' }}>Most marketing problems aren't actually marketing problems.<br /><strong style={{ color: 'var(--cs-black)' }}>They're clarity problems.</strong></p>
                <span className="cs-deco cs-deco-lg cs-click" style={{ right: '-4%', top: '10%' }}><Cursor size={22} /></span>
              </div>
              <Annotation mark="arrow-curve" rotate={-3}>We bring it all together.</Annotation>
              <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)', marginTop: 'var(--space-2)' }}>
                <img src={csAsset('editorial/ideas-speech-bubble.png')} alt="" className="cs-deco-lg" style={{ width: 92, animation: 'cs-float 8s ease-in-out infinite' }} />
                <span className="cs-shake" style={{ display: 'inline-block' }}><Scrap rotate={-5}>Make it matter.</Scrap></span>
              </div>
            </div>

            <img
              className="cs-chaos-art cs-view-io"
              src="/assets/brand/chaos-to-clarity.webp"
              width="1240"
              height="758"
              loading="lazy"
              fetchPriority="low"
              decoding="async"
              alt="Marketing chaos resolving into clarity: sticky notes and UI fragments for SEO, Content, Strategy, Google Ads, Website, Meta Ads, Analytics, Search, Budget, Leads and Sales are tangled in black cable and crumpled paper, with a torn black card reading CLARITY at the centre. Handwritten notes read: too much going on, more traffic?, less chaos more growth."
            />
          </div>
        </section>

        {/* ═══ WHAT WE DO — pinned; the process section slides over it ═══ */}
        <section id="services" data-stack className="cs-dark cs-services-art" style={{ background: '#0D0D0D' }}>
          <img
            src="/assets/brand/full-stack-marketing.webp"
            width="1600"
            height="533"
            loading="lazy"
            decoding="async"
            alt="What we do — a full stack marketing partner for ambitious brands. The Claireshine growth symbol sits at the centre of six connected capabilities: SEO (rank higher, get found), Local SEO / GMB (more visibility, more customers), Google Ads (more traffic, better results), Meta Ads (scroll, stop, convert), Content (ideas that make an impact) and Websites (fast, modern, built to grow). Different pieces. A bigger picture."
          />
        </section>

        {/* ═══ PROCESS ═══ */}
        <section ref={stepsRef} style={{ position: 'relative', overflow: 'hidden', background: 'var(--surface-page)', paddingBlock: 'var(--section-y)', boxShadow: '0 -24px 48px rgba(8,10,13,.18)' }}>
          <div className="cs-container" style={{ position: 'relative', display: 'grid', gap: 'var(--space-8)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div data-reveal className="cs-from-left" style={{ display: 'grid', gap: 'var(--space-4)' }}>
                <SectionLabel rule={false}>What we do</SectionLabel>
                <h2 style={{ ...H2, maxWidth: '13ch' }}>
                  <Words text="A clearer path" /><br /><Words text="to growth." start={3} />
                </h2>
                <svg className="cs-underline" width="210" height="12" viewBox="0 0 210 12" aria-hidden="true" style={{ marginTop: -6 }}>
                  <path d="M2 8 C 48 2, 150 2, 208 6" pathLength="1" fill="none" stroke="var(--cs-yellow)" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </div>
              <img src={csAsset('editorial/direction-sign.png')} alt="" aria-hidden="true" className="cs-deco-lg cs-wobble" style={{ width: 92, alignSelf: 'center' }} />
              <div data-reveal className="cs-from-right" aria-hidden="true" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <Annotation mark="arrow-curve" rotate={-8}>Strategy<br />to Scale</Annotation>
                <svg width="150" height="86" viewBox="0 0 150 86" style={{ overflow: 'visible' }}>
                  <path d="M4 74 C 40 66, 52 26, 96 26" fill="none" stroke="var(--cs-ink-35)" strokeWidth="2" strokeDasharray="4 6" strokeLinecap="round" />
                  <g data-float style={{ animation: 'cs-float 9s ease-in-out infinite' }}>
                    <path d="M104 6 L146 26 L118 32 L112 54 Z" fill="var(--cs-yellow)" stroke="var(--cs-black)" strokeWidth="1.6" strokeLinejoin="round" />
                    <path d="M104 6 L112 54" fill="none" stroke="var(--cs-black)" strokeWidth="1.2" opacity=".45" />
                  </g>
                </svg>
              </div>
            </div>

            <div data-reveal style={{ position: 'relative', paddingTop: 'var(--space-2)' }}>
              <div className="cs-step-rail" aria-hidden="true"><span /></div>
              <span className="cs-deco cs-deco-lg" style={{ right: '1%', top: '-58px' }}><Smiley size={42} className="cs-wobble" /></span>
              <span className="cs-deco cs-deco-lg" style={{ right: '8%', top: '-40px' }}><Sparkle size={18} className="cs-twinkle" /></span>
              <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,190px),1fr))', gap: 'var(--space-6)' }}>
                {STEPS.map((s, i) => (
                  <li key={s.n} className={`cs-step cs-hover-shake${i <= activeStep ? ' is-active' : ''}`} style={{ display: 'grid', gap: 'var(--space-3)', alignContent: 'start', justifyItems: 'start' }}>
                    <span className="cs-step-dot">{s.n}</span>
                    {s.plane ? (
                      <span className="cs-step-plane" style={{ display: 'grid', placeItems: 'center', width: 54, height: 54, opacity: i <= activeStep ? 1 : 0.5, transition: 'opacity var(--dur-4) var(--ease-out-expo)' }}>
                        <PaperPlane size={52} />
                      </span>
                    ) : (
                      <img src={icon(s.asset)} alt="" style={{ width: 54, height: 54, objectFit: 'contain', opacity: i <= activeStep ? 1 : 0.5, transition: 'opacity var(--dur-4) var(--ease-out-expo)' }} />
                    )}
                    <h3 className="cs-step-title" style={{ fontSize: 'var(--type-heading-md)', letterSpacing: 'var(--tracking-heading)', textTransform: 'uppercase', color: i <= activeStep ? 'var(--cs-black)' : 'var(--text-muted)' }}>{s.title}</h3>
                    <p style={{ fontSize: 'var(--type-body-sm)', color: 'var(--text-body)', maxWidth: '24ch' }}>{s.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ═══ THE BIGGER PICTURE — pinned; real impact slides over it ═══ */}
        <section data-stack style={{ position: 'relative', overflow: 'hidden', background: '#FEF9C2', paddingBlock: 'var(--section-y)' }}>
          <div className="cs-container" data-cs-split="5-7" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,5fr) minmax(0,7fr)', gap: 'var(--space-8)', alignItems: 'center' }}>
            <div data-reveal className="cs-from-left" style={{ position: 'relative', display: 'grid', gap: 'var(--space-5)', alignContent: 'start', justifyItems: 'start' }}>
              <SectionLabel rule={false}>The bigger picture</SectionLabel>
              <h2 style={{ ...H2, maxWidth: '12ch' }}>
                <Words text="A marketing machine that actually works." />
              </h2>
              <p style={{ fontSize: 'var(--type-body-md)', color: 'var(--text-body)', maxWidth: '42ch' }}>From attention to growth — we connect every step to make marketing simpler, smarter and more effective.</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
                <Button href="/services" variant="dark" size="md">See How It Works</Button>
                <Squiggle w={70} className="cs-wobble cs-deco-lg" />
              </div>
              <span className="cs-deco cs-deco-lg" style={{ right: '6%', top: '2%' }}><img src={csAsset('editorial/marker.png')} alt="" style={{ width: 74, animation: 'cs-float 9s ease-in-out infinite' }} /></span>
              <span className="cs-deco cs-deco-lg" style={{ right: '2%', bottom: '-6%' }}><Sparkle size={22} className="cs-twinkle" /></span>
            </div>

            <img
              className="cs-machine-art cs-view-io-r"
              src="/assets/brand/marketing-machine.webp"
              width="1280"
              height="511"
              loading="lazy"
              fetchPriority="low"
              decoding="async"
              alt="A marketing machine on a conveyor belt: labelled stages run Attention (Google Ads, Facebook and Instagram), Traffic (a search listing and rising bar chart), Conversion (a camera and a Buy button), Data (a target and database), and Optimisation (a gear), feeding a yellow GROWTH unit that prints a rising results chart. Handwritten note: turn strategy into results."
            />
          </div>
        </section>

        {/* ═══ REAL IMPACT (dark) ═══ */}
        <section className="cs-dark" style={{ position: 'relative', overflow: 'hidden', background: 'var(--cs-black)', paddingBlock: 'var(--section-y)', boxShadow: '0 -24px 48px rgba(8,10,13,.25)' }}>
          <span className="cs-fly cs-deco-lg" style={{ top: '8%', animationDuration: '28s', animationDelay: '-9s' }} aria-hidden="true"><PaperPlane size={38} /></span>
          <div className="cs-container" style={{ position: 'relative', display: 'grid', gap: 'var(--space-7)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div data-reveal className="cs-from-left" style={{ display: 'grid', gap: 'var(--space-4)' }}>
                <SectionLabel rule={false}>Real impact</SectionLabel>
                <h2 style={{ ...H2, color: 'var(--cs-white)', maxWidth: '11ch' }}>
                  <Words text="Marketing should make sense." />
                </h2>
                <svg className="cs-underline" width="190" height="12" viewBox="0 0 190 12" aria-hidden="true">
                  <path d="M2 8 C 44 2, 140 2, 188 6" pathLength="1" fill="none" stroke="var(--cs-yellow)" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </div>
              <div data-reveal className="cs-from-right" style={{ position: 'relative', display: 'grid', justifyItems: 'end', gap: 'var(--space-4)' }}>
                <GrowBars w={92} />
                <Annotation mark="arrow" rotate={-6}>Clarity compounds results.</Annotation>
                <span className="cs-deco" style={{ left: '-18%', top: '-6%' }}><Sparkle size={26} className="cs-twinkle" /></span>
                <span className="cs-deco" style={{ left: '-4%', top: '30%' }}><Sparkle size={14} className="cs-twinkle" style={{ animationDelay: '-1.6s' }} /></span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,180px),1fr))', gap: 'var(--space-6)' }}>
              {METRICS.map((m, i) => (
                <div key={m.label} data-reveal className="cs-pop" style={{ transitionDelay: `${i * 130}ms`, position: 'relative', display: 'grid', gap: 6, alignContent: 'start' }}>
                  <svg className="cs-metric-spark" width="100%" height="28" viewBox="0 0 64 28" preserveAspectRatio="none" aria-hidden="true" style={{ opacity: .5 }}>
                    <path d={m.spark} pathLength="1" fill="none" stroke="var(--cs-yellow)" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(2.4rem,5vw,3.4rem)', fontWeight: 900, letterSpacing: '-.02em', lineHeight: 1, color: 'var(--cs-white)' }}>
                    <CountUp value={m.v} decimals={m.dec} prefix={m.prefix} suffix={m.suffix} />
                  </span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--type-body-sm)', fontWeight: 600, color: 'var(--cs-paper-70)' }}>{m.label}</span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 'var(--type-micro)', letterSpacing: '.01em', color: 'var(--text-muted)', maxWidth: '62ch' }}>
              Illustrative examples of the kind of movement good work aims at — not published client results. We don't invent numbers: verified figures go in the case study, with the account they came from.
            </p>
          </div>
        </section>

        {/* ═══ FEATURED WORK ═══ */}
        <section id="work" style={{ position: 'relative', overflow: 'hidden', background: 'var(--surface-page)', paddingBlock: 'var(--section-y)' }}>
          <div className="cs-container" style={{ position: 'relative', display: 'grid', gap: 'var(--space-8)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div data-reveal className="cs-from-left" style={{ display: 'grid', gap: 'var(--space-4)', justifyItems: 'start' }}>
                <SectionLabel rule={false}>Featured work</SectionLabel>
                <h2 style={{ ...H2, maxWidth: '12ch' }}>
                  <Words text="Real brands." /><br /><Words text="Real growth." start={2} />
                </h2>
                <Button href="/work" variant="primary" size="md">See More Work</Button>
              </div>
              <div data-reveal className="cs-from-right" aria-hidden="true" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
                <img src={csAsset('marketing/megaphone.png')} alt="" className="cs-deco-lg cs-shake" style={{ width: 104 }} />
                <div style={{ maxWidth: 200 }}>
                  <Annotation mark="arrow" rotate={5}>Different businesses. Same direction. Growth.</Annotation>
                </div>
                <span className="cs-deco" style={{ right: '-2%', top: '-24%' }}><Sparkle size={22} className="cs-twinkle" /></span>
              </div>
            </div>

            <div className="cs-work-row">
              {PROJECTS.map((p, i) => (
                <a key={p.name} href="/work" data-reveal data-cursor="OPEN" className={`cs-work-link ${p.cls} ${WORK_ENTRANCE[i]}`} style={{ transitionDelay: `${i * 140}ms` }}>
                  <span className="cs-work-figure" style={{ display: 'block', position: 'relative' }}>
                    <img className="cs-work-img" src={p.image} alt={p.alt} width={p.w} height={p.h} loading="lazy" decoding="async" style={{ display: 'block', width: '100%', height: 'auto' }} />
                    <span className="cs-work-tag">
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 800, letterSpacing: '.02em', color: 'var(--cs-black)' }}>{p.kind}</span>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10.5px', fontWeight: 600, color: 'var(--text-muted)' }}>{p.discipline}</span>
                    </span>
                    {i === 1 && <span className="cs-deco cs-deco-lg cs-click" style={{ right: '18%', top: '22%', zIndex: 3 }}><Cursor size={26} /></span>}
                  </span>
                  <span className="cs-work-cap" style={{ display: 'grid', gap: 3 }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--type-micro)', fontWeight: 700, letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{p.category}</span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1.35rem', fontWeight: 800, letterSpacing: 'var(--tracking-heading)', color: 'var(--cs-black)' }}>{p.name}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-sans)', fontSize: 'var(--type-body-sm)', fontWeight: 600, color: 'var(--cs-black)' }}>See the project <span aria-hidden="true">→</span></span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FINAL CTA (dark) ═══ */}
        <section className="cs-dark cs-cta-dark" style={{ paddingBlock: 'clamp(80px,12vw,180px)' }}>
          <span className="cs-fly" style={{ top: '16%', animationDuration: '26s' }} aria-hidden="true"><PaperPlane size={42} /></span>
          <div aria-hidden="true" data-parallax data-speed="0.04" style={{ position: 'absolute', right: '-6%', bottom: '-34%', width: 'min(52vw,520px)', aspectRatio: '1', opacity: .07 }}>
            <img src="/assets/brand/claireshine-mark.svg" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <span className="cs-deco cs-deco-lg" style={{ left: '12%', top: '26%' }}><Sparkle size={28} className="cs-twinkle" /></span>
          <span className="cs-deco cs-deco-lg" style={{ left: '18%', top: '38%' }}><Sparkle size={14} className="cs-twinkle" style={{ animationDelay: '-1s' }} /></span>
          <span className="cs-deco cs-deco-lg" style={{ right: '14%', top: '22%' }}><Smiley size={46} className="cs-wobble" /></span>
          <span className="cs-deco cs-deco-lg" style={{ left: '10%', bottom: '18%' }}><Squiggle w={90} className="cs-wobble" /></span>
          <div data-reveal className="cs-container" style={{ position: 'relative', zIndex: 1, display: 'grid', gap: 'var(--space-6)', justifyItems: 'center', textAlign: 'center' }}>
            <SectionLabel rule={false}>Ready to get started?</SectionLabel>
            <h2 style={{ fontSize: 'var(--type-display-lg)', lineHeight: 'var(--leading-display)', letterSpacing: 'var(--tracking-display)', textTransform: 'uppercase', fontWeight: 900, color: 'var(--cs-white)', maxWidth: '16ch' }}>
              <Words text="Let's build something meaningful." />
            </h2>
            <p style={{ fontSize: 'var(--type-body-lg)', color: 'var(--cs-paper-70)' }}>Clear strategy. Focused execution. Real growth.</p>
            <div className="cs-attn"><Button href="/contact" variant="primary" size="lg">Let's Talk</Button></div>
          </div>
        </section>

      </main>
    </>
  );
}
