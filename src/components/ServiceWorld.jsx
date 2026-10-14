import SectionLabel from './SectionLabel';
import Pill from './Pill';
import Button from './Button';
import Words from './Words';
import { csAsset, csServiceAssets } from '../lib/assets';

const SPLITS = { '7-5': '7fr 5fr', '5-7': '5fr 7fr' };

export default function ServiceWorld({
  number = '01',
  label = 'Service',
  title,
  body,
  capabilities = [],
  tags = [],
  asset = 'seo',
  accent = 'yellow',
  split = '7-5',
  reverse = false,
  ground = 'page',
  cta,
  ctaHref = '#',
  children,
}) {
  const bg = ground === 'cream' ? 'var(--cs-cream)' : ground === 'wash' ? 'var(--accent-wash)' : 'var(--surface-page)';
  return (
    <section className={`cs-accent-${accent}${ground === 'dark' ? ' cs-dark' : ''}`} style={{ position: 'relative', overflow: 'hidden', background: ground === 'dark' ? undefined : bg, paddingBlock: 'var(--section-y)' }}>
      <span aria-hidden="true" className="cs-outline-num" style={{ fontSize: 'clamp(9rem,24vw,22rem)', top: '-4%', [reverse ? 'right' : 'left']: '-2%' }}>{number}</span>
      <div className="cs-container" data-cs-split={split} style={{ position: 'relative', display: 'grid', gap: 'var(--space-8)', gridTemplateColumns: SPLITS[split] || SPLITS['7-5'], alignItems: 'center' }}>
        <div data-reveal className={reverse ? 'cs-from-right' : 'cs-from-left'} style={{ order: reverse ? 2 : 1, display: 'grid', gap: 'var(--space-5)', minWidth: 0 }}>
          <SectionLabel number={number}>{label}</SectionLabel>
          <h2 style={{ fontSize: 'var(--type-display-md)', letterSpacing: 'var(--tracking-display)', lineHeight: 'var(--leading-display)', maxWidth: '18ch' }}><Words text={title} /></h2>
          {body && <p style={{ fontSize: 'var(--type-body-lg)', color: 'var(--text-body)', maxWidth: '46ch' }}>{body}</p>}
          {tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {tags.map((t, i) => <Pill key={i} tone={i === 0 ? 'accent' : 'outline'}>{t}</Pill>)}
            </div>
          )}
          {capabilities.length > 0 && (
            <ul className="cs-caps">
              {capabilities.map((c) => <li key={c}>{c}</li>)}
            </ul>
          )}
          {cta && (
            <div style={{ marginTop: 'var(--space-2)' }}>
              <Button href={ctaHref} variant="primary">{cta}</Button>
            </div>
          )}
        </div>
        <div data-reveal className={reverse ? 'cs-from-left' : 'cs-from-right'} style={{ order: reverse ? 1 : 2, position: 'relative', display: 'grid', justifyItems: 'center', minWidth: 0 }}>
          <span aria-hidden="true" style={{ position: 'absolute', left: '50%', top: '50%', width: 'min(86%,340px)', aspectRatio: '1', transform: 'translate(-50%,-50%)', borderRadius: '46% 54% 58% 42% / 44% 40% 60% 56%', background: 'var(--accent-wash)', border: '2px solid var(--cs-black)' }} />
          <img src={csAsset(csServiceAssets[asset] || csServiceAssets.seo)} alt={`${label} — Claireshine ${asset.replace(/-/g, ' ')} object`} loading="lazy" decoding="async" data-float style={{ position: 'relative', width: 'min(100%,340px)', height: 'auto', animation: 'cs-float 9s ease-in-out infinite', filter: 'drop-shadow(0 20px 26px rgba(8,10,13,.18))' }} />
          {children}
        </div>
      </div>
    </section>
  );
}
