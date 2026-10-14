import { useDocumentHead } from '../lib/useDocumentHead';
import PageTag from '../components/PageTag';
import MarketingAsset from '../components/MarketingAsset';
import Annotation from '../components/Annotation';
import Words from '../components/Words';
import { InnerHero, WorkGallery } from '../components/InnerHeroes';
import { Sparkle, Squiggle, Cursor } from '../components/Decor';

const PROJECTS = [
  { name: 'Lumiere', category: 'Skincare', order: 0, ratio: '4 / 3', wash: '#FDECF2', scope: 'Brand identity', image: '/assets/projects/lumiere-skincare-brand.jpg', alt: 'Lumiere skincare brand identity — logo, day cream jar and serum bottle in a cream still life', idea: '"Skin that feels like you." A soft, luxury-leaning identity carried through logo, packaging and product photography direction.' },
  { name: 'Nutrova', category: 'Nutrition', order: 2, ratio: '1 / 1', wash: '#E4F3E8', scope: 'Brand identity', image: '/assets/projects/nutrova-nutrition-brand.jpg', alt: 'Nutrova nutrition brand identity — black plant protein tub and daily wellness pouch on a dark botanical set', idea: '"Nutrition for a brighter you." A dark, clinical-but-warm system for supplement packs, built to survive a crowded shelf.' },
  { name: 'Velora', category: 'Jewellery', order: 0, ratio: '4 / 3', wash: '#FFE6DF', scope: 'Brand identity', image: '/assets/projects/velora-jewellery-brand.jpg', alt: 'Velora jewellery brand identity — bangle, earrings and pendant with a branded box on blush silk', idea: '"Modern jewellery for real you." Identity and product art direction pitched at everyday luxury rather than occasion-only.' },
  { name: 'Altura', category: 'Interiors', order: 2, ratio: '16 / 10', wash: '#FFE8CC', scope: 'Brand identity', image: '/assets/projects/altura-interiors-brand.jpg', alt: 'Altura interiors brand identity — a neutral living room set with the Altura mark', idea: '"Spaces for a brighter tomorrow." A calm, architectural mark and a room-led visual language for furniture and interiors.' },
];

export default function Work() {
  useDocumentHead({
    title: 'Work | Claireshine',
    description: 'Explore selected Claireshine projects across branding, digital marketing, websites, content, social media and growth strategy.',
    canonical: '/work',
    ogImage: '/assets/projects/lumiere-skincare-brand.jpg',
  });

  return (
    <main id="main" className="cs-inner" style={{ display: 'block', background: 'var(--surface-page)', paddingTop: 'clamp(86px,7vw,104px)' }}>
      <PageTag>Work</PageTag>

      <InnerHero
        eyebrow="Selected work"
        title={<><Words text="Different brands. Same" />{' '}<span className="cs-highlight">growth</span>{' '}<Words text="mindset." start={4} /></>}
        visual={<WorkGallery />}
        ground="var(--surface-page)"
      />

      <section className="cs-lede" style={{ background: 'var(--cs-cream)' }}>
        <span className="cs-deco cs-deco-lg" style={{ right: '6%', top: '18%' }}><Sparkle size={26} className="cs-twinkle" /></span>
        <div className="cs-container cs-lede-grid">
          <p data-reveal className="cs-lede-big cs-from-left">Every business has a different starting point.</p>
          <div data-reveal className="cs-from-right" style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <p className="cs-lede-small">Our job is to find the clarity, strategy and creative direction that moves it forward.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
              <Annotation mark="star" rotate={3}>Ideas that work</Annotation>
              <Squiggle w={90} className="cs-wobble" />
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--cs-cream)', paddingBlock: 'clamp(24px,4vw,56px) var(--section-y)' }}>
        <div className="cs-container" style={{ display: 'grid', gap: 'clamp(40px,6vw,88px)' }}>
          <div className="cs-projects">
            {PROJECTS.map((p, i) => (
              <article key={p.name} className={`cs-proj${p.order === 2 ? ' is-flip' : ''}`} style={{ '--wash': p.wash, '--i': i }}>
                <div data-reveal className={`cs-proj-img ${p.order === 2 ? 'cs-from-right' : 'cs-from-left'}`}>
                  <img src={p.image} alt={p.alt} loading="lazy" decoding="async" style={{ aspectRatio: p.ratio, maxHeight: 'min(60vh,540px)' }} />
                  {i === 0 && <span className="cs-deco cs-deco-lg cs-click" style={{ right: '14%', bottom: '18%' }}><Cursor size={26} /></span>}
                </div>
                <div data-reveal className={p.order === 2 ? 'cs-from-left' : 'cs-from-right'} style={{ display: 'grid', gap: 'var(--space-4)', alignContent: 'start', justifyItems: 'start' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--type-micro)', fontWeight: 700, letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{p.category}</span>
                  <h2 className="cs-proj-name"><Words text={p.name} /></h2>
                  <p className="cs-proj-quote">{p.idea}</p>
                  <span className="cs-stamp">{p.scope}</span>
                </div>
              </article>
            ))}
          </div>
          <div data-reveal className="cs-pop" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-5)', alignItems: 'center' }}>
            <MarketingAsset name="laptop-mockup" size={160} ground="none" alt="Claireshine brand application object — a laptop showing a site" style={{ animation: 'cs-float 10s ease-in-out infinite' }} />
            <p style={{ fontSize: 'var(--type-body-sm)', color: 'var(--text-muted)', maxWidth: '56ch' }}>Brand and product visual direction by Claireshine. Client marks stay as supplied. We publish performance figures only when they can be verified, so none are shown here.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
