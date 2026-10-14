import SectionLabel from './SectionLabel';
import Annotation from './Annotation';
import { Sparkle, Squiggle, Scribble } from './Decor';
import { csAsset } from '../lib/assets';

/* Inner-page hero: huge title + one staged world. Pinned, so the intro band slides over it. */
export function InnerHero({ eyebrow, title, visual, ground = 'var(--cs-cream)' }) {
  return (
    <section data-stack className="cs-ihero" style={{ background: ground }}>
      <div className="cs-container cs-ihero-grid cs-hero-out">
        <div data-reveal className="cs-ihero-copy">
          <SectionLabel rule={false}>{eyebrow}</SectionLabel>
          <h1 className="cs-ihero-title">{title}</h1>
        </div>
        <div className="cs-ihero-visual">{visual}</div>
      </div>
    </section>
  );
}

/* Places one object on a stage. x/y/w are percentages of the stage. */
function O({ x, y, w, d = 0, z, children, style }) {
  return (
    <span className="cs-o" style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, '--d': `${d}ms`, zIndex: z, ...style }}>
      {children}
    </span>
  );
}
const Img = ({ src, bob, delay = 0, cls = '' }) => (
  <span className={`${bob ? 'cs-bob' : ''} ${cls}`} style={{ display: 'block', animationDelay: `${delay}s` }}>
    <img src={csAsset(src)} alt="" decoding="async" />
  </span>
);

/* ── ABOUT: inside the mind of Claireshine — a cut-away studio room ── */
export function AboutStudio() {
  return (
    <div className="cs-stage" role="img" aria-label="A miniature Claireshine studio: a cut-away room with a laptop on a desk, a cat on a pink rug thinking up an idea, notes pinned to the walls, a chess piece, a signpost and a growing plant." style={{ aspectRatio: '1 / 1.02' }}>
      <svg className="cs-set" viewBox="0 0 400 408" aria-hidden="true">
        <polygon points="40,130 200,50 200,230 40,310" fill="#F1EBDD" stroke="#080A0D" strokeWidth="2.4" strokeLinejoin="round" />
        <polygon points="200,50 360,130 360,310 200,230" fill="#FBF7EE" stroke="#080A0D" strokeWidth="2.4" strokeLinejoin="round" />
        <polygon points="40,310 200,230 360,310 200,390" fill="#FFF3B0" stroke="#080A0D" strokeWidth="2.4" strokeLinejoin="round" />
        <polygon points="40,310 200,390 200,404 40,324" fill="#F2D23A" stroke="#080A0D" strokeWidth="2.4" strokeLinejoin="round" />
        <polygon points="200,390 360,310 360,324 200,404" fill="#E4BD00" stroke="#080A0D" strokeWidth="2.4" strokeLinejoin="round" />
        {/* window */}
        <polygon points="250,105 318,139 318,207 250,173" fill="#DDEBFF" stroke="#080A0D" strokeWidth="2.4" />
        <line x1="284" y1="122" x2="284" y2="190" stroke="#080A0D" strokeWidth="2" />
        <line x1="250" y1="139" x2="318" y2="173" stroke="#080A0D" strokeWidth="2" />
        {/* shelf */}
        <line x1="72" y1="214" x2="150" y2="175" stroke="#080A0D" strokeWidth="5" strokeLinecap="round" />
        {/* rug + desk */}
        <polygon points="138,318 200,287 262,318 200,349" fill="#F4A7C1" opacity=".85" />
        <polygon points="214,276 262,252 312,277 264,301" fill="#fff" stroke="#080A0D" strokeWidth="2.4" strokeLinejoin="round" />
        <polygon points="214,276 264,301 264,309 214,284" fill="#EDE6D5" stroke="#080A0D" strokeWidth="2" />
        <polygon points="264,301 312,277 312,285 264,309" fill="#E2D9C3" stroke="#080A0D" strokeWidth="2" />
        <line x1="220" y1="287" x2="220" y2="318" stroke="#080A0D" strokeWidth="3" />
        <line x1="262" y1="309" x2="262" y2="338" stroke="#080A0D" strokeWidth="3" />
        <line x1="306" y1="288" x2="306" y2="316" stroke="#080A0D" strokeWidth="3" />
        {/* plant */}
        <path d="M322 334 l22 0 l-4 22 l-14 0 z" fill="#FF6B6B" stroke="#080A0D" strokeWidth="2.2" strokeLinejoin="round" />
        <g className="cs-wobble" style={{ transformOrigin: '333px 334px' }}>
          <path d="M333 334 C 318 316, 312 300, 322 288 C 330 300, 334 316, 333 334 Z" fill="#65C98A" stroke="#080A0D" strokeWidth="2" />
          <path d="M333 334 C 346 318, 356 304, 350 290 C 340 302, 334 318, 333 334 Z" fill="#A9E6C1" stroke="#080A0D" strokeWidth="2" />
        </g>
      </svg>

      <O x={17} y={36} w={13} d={250}><span className="cs-wall-l"><Img src="editorial/checklist-repeat.png" /></span></O>
      <O x={24} y={40.5} w={9.5} d={330}><Img src="marketing/growth-bars.png" /></O>
      <O x={81} y={46} w={10} d={400}><span className="cs-wall-r"><span className="cs-shake" style={{ display: 'block' }}><Img src="editorial/sticky-note-yellow.png" /></span></span></O>
      <O x={45.5} y={38} w={10.5} d={460}><Img src="editorial/direction-sign.png" /></O>
      <O x={55} y={55.5} w={24} d={540} z={2}><Img src="marketing/laptop-mockup.png" /></O>
      <O x={37} y={62} w={23} d={620} z={3}><Img src="character/claireshinaholic-cat.png" bob /></O>
      <O x={20} y={43} w={18} d={900} z={4}><Img src="editorial/ideas-speech-bubble.png" bob delay={-2} /></O>
      <O x={17} y={70} w={9} d={700} z={3}><Img src="services/strategy.png" /></O>
      <O x={68} y={80} w={10} d={760} z={3}><Img src="editorial/marker.png" /></O>
      <O x={88} y={8} w={6} d={1100}><Sparkle size="100%" className="cs-twinkle" /></O>
      <O x={8} y={16} w={4} d={1200}><Sparkle size="100%" className="cs-twinkle" style={{ animationDelay: '-1.2s' }} /></O>
      <O x={2} y={88} w={30} d={1300}><Annotation mark="arrow" rotate={-6}>Clarity in progress…</Annotation></O>
    </div>
  );
}

/* ── SERVICES: an ecosystem of islands joined by working pipes ── */
const ISLES = [
  { a: 'services/seo.png', t: 'SEO', deg: -90 },
  { a: 'services/google-ads.png', t: 'Google Ads', deg: -45 },
  { a: 'services/meta-ads.png', t: 'Meta Ads', deg: 0 },
  { a: 'services/analytics.png', t: 'Analytics', deg: 45 },
  { a: 'services/website-development.png', t: 'Websites', deg: 90 },
  { a: 'services/content.png', t: 'Content', deg: 135 },
  { a: 'services/google-business-profile.png', t: 'Business Profile', deg: 180 },
  { a: 'services/strategy.png', t: 'Strategy', deg: 225 },
].map((s) => {
  const r = (s.deg * Math.PI) / 180;
  return { ...s, x: 200 + 150 * Math.cos(r), y: 190 + 120 * Math.sin(r) };
});

export function ServicesEcosystem() {
  return (
    <div className="cs-stage" role="img" aria-label="The Claireshine services ecosystem: a yellow central platform carrying the Claireshine mark, joined by working pipes to eight islands — SEO, Google Ads, Meta Ads, Analytics, Websites, Content, Business Profile and Strategy." style={{ aspectRatio: '1 / .94' }}>
      <svg className="cs-set" viewBox="0 0 400 376" aria-hidden="true">
        {ISLES.map((s) => (
          <path key={s.t} className="cs-pipe" d={`M200 196 Q ${(200 + s.x) / 2 + (s.y - 190) * 0.25} ${(196 + s.y) / 2 - (s.x - 200) * 0.18} ${s.x} ${s.y + 6}`} fill="none" stroke="#080A0D" strokeWidth="1.8" strokeLinecap="round" />
        ))}
        {ISLES.map((s) => (
          <g key={`p-${s.t}`}>
            <path d={`M${s.x - 30} ${s.y + 6} v8 a30 13 0 0 0 60 0 v-8`} fill="#E9E1CD" stroke="#080A0D" strokeWidth="2" />
            <ellipse cx={s.x} cy={s.y + 6} rx="30" ry="13" fill="#fff" stroke="#080A0D" strokeWidth="2" />
          </g>
        ))}
        <path d="M128 196 v20 a72 33 0 0 0 144 0 v-20" fill="#E4BD00" stroke="#080A0D" strokeWidth="2.4" />
        <ellipse cx="200" cy="196" rx="72" ry="33" fill="#FFD400" stroke="#080A0D" strokeWidth="2.4" />
      </svg>
      <O x={38.5} y={27} w={23} d={200} z={3}><span className="cs-bob" style={{ display: 'block', animationDuration: '10s' }}><img src="/assets/brand/claireshine-mark.svg" alt="" /></span></O>
      {ISLES.map((s, i) => (
        <O key={s.t} x={(s.x / 400) * 100 - 7} y={(s.y / 376) * 100 - 15} w={14} d={400 + i * 90} z={2}>
          <Img src={s.a} bob delay={-i * 1.1} />
          <span className="cs-isle-label" style={{ top: '104%' }}>{s.t}</span>
        </O>
      ))}
    </div>
  );
}

/* ── WORK: a small Claireshine gallery with the real projects hung ── */
export function WorkGallery() {
  const frame = (src, r) => (
    <span className="cs-frame" style={{ '--r': r }}><img src={src} alt="" decoding="async" /></span>
  );
  return (
    <div className="cs-stage" role="img" aria-label="A miniature Claireshine gallery: the Lumiere, Nutrova, Velora and Altura brand projects hung as framed works under spotlights, a laptop on a plinth, and a small dog admiring the show." style={{ aspectRatio: '1 / .92' }}>
      <svg className="cs-set" viewBox="0 0 400 368" aria-hidden="true">
        <defs>
          <linearGradient id="cs-cone-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFE680" stopOpacity=".75" />
            <stop offset="1" stopColor="#FFE680" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="400" height="270" fill="#F6F1E4" />
        <polygon points="0,270 400,270 400,368 0,368" fill="#E7DCC3" />
        {[300, 318, 340].map((y) => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#D8CBAE" strokeWidth="1.5" />)}
        <line x1="0" y1="270" x2="400" y2="270" stroke="#080A0D" strokeWidth="2.4" />
        <line x1="30" y1="12" x2="370" y2="12" stroke="#080A0D" strokeWidth="4" strokeLinecap="round" />
        {[{ x: 72, d: 200 }, { x: 204, d: 450 }, { x: 330, d: 700 }].map((l) => (
          <g key={l.x}>
            <polygon className="cs-cone" style={{ animationDelay: `${l.d}ms` }} points={`${l.x - 7},24 ${l.x + 7},24 ${l.x + 62},200 ${l.x - 62},200`} fill="url(#cs-cone-g)" />
            <rect x={l.x - 7} y="12" width="14" height="14" rx="3" fill="#080A0D" />
          </g>
        ))}
        {/* plinth */}
        <polygon points="36,286 104,286 104,352 36,352" fill="#fff" stroke="#080A0D" strokeWidth="2.4" />
        <polygon points="36,286 50,276 118,276 104,286" fill="#F4EEDF" stroke="#080A0D" strokeWidth="2.4" strokeLinejoin="round" />
        <polygon points="104,286 118,276 118,342 104,352" fill="#E9E1CD" stroke="#080A0D" strokeWidth="2.4" strokeLinejoin="round" />
        {/* monitor stand */}
        <line x1="322" y1="300" x2="322" y2="344" stroke="#080A0D" strokeWidth="5" />
        <line x1="300" y1="346" x2="344" y2="346" stroke="#080A0D" strokeWidth="5" strokeLinecap="round" />
      </svg>

      <O x={6} y={17} w={21} d={300}>{frame('/assets/projects/nutrova-nutrition-brand.jpg', '1/1')}<span className="cs-placard">Nutrova</span></O>
      <O x={35} y={13} w={31} d={500}>{frame('/assets/projects/lumiere-skincare-brand.jpg', '4/3')}<span className="cs-placard">Lumiere</span></O>
      <O x={71} y={17} w={23} d={700}>{frame('/assets/projects/velora-jewellery-brand.jpg', '4/3')}<span className="cs-placard">Velora</span></O>
      <O x={67} y={60} w={27} d={900} z={2}>
        <span className="cs-frame" style={{ '--r': '16/10', padding: 0, borderWidth: '1.2cqw' }}><img src="/assets/projects/altura-interiors-brand.jpg" alt="" decoding="async" /></span>
        <span className="cs-placard" style={{ top: 'auto', bottom: '100%', transform: 'translate(-50%,-1cqw)' }}>Altura</span>
      </O>
      <O x={5} y={57} w={27} d={800} z={2}><Img src="marketing/laptop-mockup.png" /></O>
      <O x={36} y={63} w={25} d={1000} z={3}><Img src="character/claireshinaholic-dog.png" bob /></O>
      <O x={30} y={4} w={5} d={1300}><Sparkle size="100%" className="cs-twinkle" /></O>
    </div>
  );
}

/* ── BLOG: the archive — a filing cabinet with the topics pulled out ── */
const TABS = [
  { t: 'SEO', bg: 'var(--cs-yellow)', x: 0 },
  { t: 'Google Ads', bg: '#fff', x: 14 },
  { t: 'Meta Ads', bg: '#EFE9FF', x: 43 },
  { t: 'Branding', bg: '#FDECF2', x: 71 },
];
export function BlogArchive() {
  return (
    <div className="cs-stage" role="img" aria-label="The Claireshine archive: a filing cabinet with a drawer pulled open and topic tabs for SEO, Google Ads, Meta Ads and Branding sticking out, beside a stack of lined notes, a highlighter, a checklist and a floating idea." style={{ aspectRatio: '1 / .96' }}>
      <svg className="cs-set" viewBox="0 0 400 384" aria-hidden="true">
        <ellipse cx="190" cy="358" rx="176" ry="16" fill="rgba(8,10,13,.1)" />
      </svg>
      <span className="cs-cab" style={{ left: '8%', top: '24%', width: '40%', height: '66%' }}>
        <span className="cs-drawer"><b>Content</b></span>
        <span className="cs-drawer" style={{ background: '#1d1d1d' }} />
        <span className="cs-drawer"><b>Growth</b></span>
      </span>
      <span className="cs-o" style={{ left: '12%', top: '45%', width: '48%', height: '22%', '--d': '0ms', zIndex: 3 }}>
        <span className="cs-pulled" style={{ position: 'absolute', inset: 0 }}>
          {TABS.map((t, i) => (
            <span key={t.t} className="cs-tab" style={{ left: `${t.x}%`, background: t.bg, '--d': `${1100 + i * 140}ms` }}>{t.t}</span>
          ))}
          <span className="cs-drawer" style={{ position: 'absolute', inset: 0, background: '#F6F0E1', boxShadow: '0 1.4cqw 2.6cqw rgba(8,10,13,.22)' }}><b>Websites</b></span>
        </span>
      </span>
      <span className="cs-sheet" style={{ left: '60%', top: '62%', width: '30%', height: '26%', transform: 'rotate(-7deg)' }} />
      <span className="cs-sheet" style={{ left: '62%', top: '60%', width: '30%', height: '26%', transform: 'rotate(4deg)' }} />
      <span className="cs-sheet" style={{ left: '59%', top: '58%', width: '30%', height: '26%', transform: 'rotate(-1.5deg)', backgroundColor: '#FFFDF4' }} />
      <O x={70} y={52} w={13} d={900} z={3}><Img src="editorial/marker.png" bob delay={-1} /></O>
      <O x={16} y={11} w={15} d={600} z={2}><span className="cs-shake" style={{ display: 'block' }}><Img src="editorial/sticky-note-yellow.png" /></span></O>
      <O x={63} y={6} w={22} d={1300} z={2}><Img src="editorial/ideas-speech-bubble.png" bob delay={-3} /></O>
      <O x={79} y={32} w={15} d={1000}><Img src="editorial/checklist-repeat.png" /></O>
      <O x={58} y={40} w={18} d={1400}><Scribble w="100%" /></O>
      <O x={88} y={6} w={5} d={1500}><Sparkle size="100%" className="cs-twinkle" /></O>
      <O x={2} y={90} w={3} d={1600}><span style={{ display: 'block', aspectRatio: '1', borderRadius: '50%', background: 'var(--cs-pink)' }} /></O>
    </div>
  );
}

/* ── CONTACT: one yellow door, left ajar, light spilling out ── */
export function ContactDoor() {
  return (
    <div className="cs-door-scene" role="img" aria-label="A single yellow door standing slightly open in a quiet room, warm light spilling out onto the floor.">
      <span className="cs-door-wall" />
      <span className="cs-door-floor" />
      <svg className="cs-door-spill" viewBox="0 0 100 102" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="cs-spill-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFE680" stopOpacity=".85" />
            <stop offset="1" stopColor="#FFE680" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points="32.6,78 67.4,78 94,102 10,102" fill="url(#cs-spill-g)" />
      </svg>
      <span className="cs-door-frame">
        <span className="cs-door-light" />
        <span className="cs-door-panel"><span className="cs-door-knob" /></span>
      </span>
      <span style={{ position: 'absolute', right: '4%', top: '8%', width: '7%' }}><Sparkle size="100%" className="cs-twinkle" /></span>
      <span style={{ position: 'absolute', left: '6%', top: '16%', width: '4%' }}><Sparkle size="100%" className="cs-twinkle" style={{ animationDelay: '-1.4s' }} /></span>
      <span style={{ position: 'absolute', left: '4%', bottom: '8%', width: '24%' }}><Squiggle w="100%" className="cs-wobble" /></span>
      <span style={{ position: 'absolute', right: '2%', bottom: '28%' }}><Annotation mark="arrow" rotate={-8}>Tell us about it</Annotation></span>
    </div>
  );
}
