import { useState } from 'react';
import { useDocumentHead } from '../lib/useDocumentHead';
import PageTag from '../components/PageTag';
import SectionLabel from '../components/SectionLabel';
import MarketingAsset from '../components/MarketingAsset';
import Claireshinaholic from '../components/Claireshinaholic';
import Button from '../components/Button';
import Words from '../components/Words';
import { InnerHero, ContactDoor } from '../components/InnerHeroes';
import { PaperPlane, Sparkle, Squiggle, Smiley, Tape } from '../components/Decor';

// Verified form-service endpoint for claireshine.marketing@gmail.com goes here
// (e.g. https://formspree.io/f/xxxxxxx, or Web3Forms with its public access_key).
// Public endpoint only — never an API secret.
const FORM_ENDPOINT = '';

const SERVICES = ['SEO', 'Google Ads', 'Meta Ads', 'Website', 'Branding', 'Content & Social', 'Performance Marketing', 'Strategy & Growth', 'Something else'];

const inputStyle = (hasError) => ({
  minHeight: 48, padding: '0 14px', background: 'var(--cs-white)',
  border: `1px solid ${hasError ? '#C42B1C' : 'var(--border-hairline)'}`,
  borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-sans)', fontSize: 'var(--type-body-md)',
  fontWeight: 500, color: 'var(--cs-black)',
});

function validate(s) {
  const err = {};
  if (!s.name.trim()) err.name = 'Please tell us your name.';
  if (!s.email.trim()) err.email = 'We need an email to reply.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.email.trim())) err.email = "That email doesn't look right.";
  if (!s.topic) err.topic = 'Pick the closest option.';
  if (s.message.trim().length < 10) err.message = 'A sentence or two is enough.';
  if (!s.consent) err.consent = 'Please confirm this before sending.';
  return err;
}

export default function Contact() {
  useDocumentHead({
    title: 'Contact | Claireshine',
    description: 'Talk to Claireshine about digital marketing, SEO, paid media, websites, branding, content and growth. Based in New Delhi, India.',
    canonical: '/contact',
    ogImage: 'https://claireshine.com/og-image.png',
  });

  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: '', message: '', consent: false });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const el = e.target.querySelector('[aria-invalid="true"]');
      if (el) el.focus();
      return;
    }
    if (!FORM_ENDPOINT) return;

    const payload = {
      ...form,
      submitted_at: new Date().toISOString(),
      _subject: 'Claireshine enquiry — ' + (form.topic || 'General') + ' — ' + form.name.trim(),
    };
    setStatus('sending');
    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); setStatus('sent'); })
      .catch(() => setStatus('error'));
  };

  const reset = () => {
    setForm({ name: '', email: '', phone: '', topic: '', message: '', consent: false });
    setErrors({});
    setStatus('idle');
  };

  const notWired = !FORM_ENDPOINT;
  const blocked = status === 'sending' || notWired;
  const submitLabel = notWired ? 'Not connected yet' : status === 'sending' ? 'Sending…' : 'Send it over';

  return (
    <main id="main" className="cs-inner" style={{ display: 'block', background: 'var(--surface-page)', paddingTop: 'clamp(86px,7vw,104px)' }}>
      <PageTag>Contact</PageTag>

      <InnerHero
        eyebrow="Let's talk"
        title={<><Words text="Got a good idea?" /> <Words text="Let's make it useful." start={4} /></>}
        visual={<ContactDoor />}
      />

      <section className="cs-lede" style={{ background: 'var(--cs-yellow)' }}>
        <span className="cs-deco cs-deco-lg" style={{ right: '6%', top: '18%' }}><Sparkle size={28} tone="var(--cs-black)" className="cs-twinkle" /></span>
        <div className="cs-container cs-lede-grid">
          <p data-reveal className="cs-lede-big cs-from-left">Tell us what you're trying to solve, build or grow.</p>
          <div data-reveal className="cs-from-right" style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <p className="cs-lede-small" style={{ color: 'var(--cs-black)' }}>You don't need to have the whole plan figured out.</p>
            <Squiggle w={90} tone="var(--cs-black)" className="cs-wobble" />
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--surface-page)', paddingBlock: 'var(--section-y)' }}>
        <div className="cs-container" style={{ display: 'grid', gap: 'var(--space-7)' }}>
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 'var(--space-7)', alignItems: 'center' }} data-cs-split="7-5">
            <div data-reveal className="cs-from-left cs-reach">
              <div className="cs-reach-row">
                <span>Email</span>
                <a className="cs-reach-big" href="mailto:claireshine.marketing@gmail.com" style={{ fontSize: 'clamp(1.15rem,2.7vw,2.5rem)', wordBreak: 'normal', overflowWrap: 'anywhere' }}>claireshine.marketing@gmail.com</a>
              </div>
              <div className="cs-reach-row">
                <span>Phone</span>
                <a className="cs-reach-big" href="tel:+918882827091">+91 88828 27091</a>
              </div>
              <div className="cs-reach-row">
                <span>Location</span>
                <p className="cs-reach-big">New Delhi, Delhi, India</p>
              </div>
            </div>
            <div data-reveal className="cs-from-right" style={{ position: 'relative', display: 'grid', justifyItems: 'center' }}>
              <div data-float style={{ animation: 'cs-float 12s ease-in-out infinite' }}>
                <MarketingAsset name="email-marketing" size={220} ground="none" alt="Claireshine email object — an envelope with a send arrow" />
              </div>
              <span style={{ position: 'absolute', right: 0, top: 0 }}><Sparkle size={24} className="cs-twinkle" /></span>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', alignItems: 'center', justifyContent: 'space-between', paddingTop: 'var(--space-5)', borderTop: '1px solid var(--border-hairline)' }}>
            <nav aria-label="Social" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
              <a href="https://www.instagram.com/claireshine_marketing" target="_blank" rel="noopener me" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, fontSize: 'var(--type-body-md)', fontWeight: 600, color: 'var(--cs-black)' }}>Instagram ↗</a>
              <a href="https://www.facebook.com/share/1EWmop84ch/" target="_blank" rel="noopener me" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, fontSize: 'var(--type-body-md)', fontWeight: 600, color: 'var(--cs-black)' }}>Facebook ↗</a>
              <a href="https://www.linkedin.com/company/claireshine-marketing/" target="_blank" rel="noopener me" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, fontSize: 'var(--type-body-md)', fontWeight: 600, color: 'var(--cs-black)' }}>LinkedIn ↗</a>
            </nav>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
              <Button href="/services" variant="secondary" size="md">Explore Services</Button>
              <Button href="/work" variant="ghost" size="md">See Our Work</Button>
            </div>
          </div>
        </div>
      </section>

      <section id="form" style={{ background: 'var(--cs-cream)', paddingBlock: 'var(--section-y)' }}>
        <div className="cs-container" data-cs-split="5-7" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,5fr) minmax(0,7fr)', gap: 'var(--space-8)', alignItems: 'start' }}>
          <div data-reveal className="cs-from-left" style={{ position: 'relative', display: 'grid', gap: 'var(--space-5)', alignContent: 'start' }}>
            <SectionLabel number="01">Enquiry</SectionLabel>
            <h2 style={{ fontSize: 'var(--type-heading-xl)', lineHeight: 'var(--leading-display)', letterSpacing: 'var(--tracking-display)', maxWidth: '14ch' }}><Words text="Tell us what's on your mind." /></h2>
            <p style={{ fontSize: 'var(--type-body-md)', color: 'var(--text-body)', maxWidth: '40ch' }}>Five fields. We only ask for what we need to reply properly.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', alignItems: 'center' }}>
              <MarketingAsset name="ideas" size={150} ground="none" alt="Claireshine ideas object — a speech bubble with a lightbulb" style={{ animation: 'cs-float 9s ease-in-out infinite' }} />
              <Claireshinaholic character="dog" size={150} caption="Tell us about it" />
            </div>
          </div>

          <div data-reveal className="cs-from-right">
          <div className="cs-form-sheet">
            <span aria-hidden="true" style={{ position: 'absolute', left: '42%', top: -12, zIndex: 2 }}><Tape w={104} rotate={-3} /></span>
            {status === 'sent' ? (
              <div role="status" style={{ display: 'grid', gap: 'var(--space-4)', justifyItems: 'start' }}>
                <span aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 52, height: 52, borderRadius: 'var(--radius-pill)', background: 'var(--cs-yellow)', fontSize: '1.4rem', fontWeight: 900 }}>✓</span>
                <h3 style={{ fontSize: '1.75rem', letterSpacing: 'var(--tracking-heading)' }}>Sent. That's with us.</h3>
                <p style={{ fontSize: 'var(--type-body-md)', color: 'var(--text-body)', maxWidth: '44ch' }}>We'll read it properly and reply by email. If it's urgent, call +91 88828 27091.</p>
                <button type="button" onClick={reset} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: 48, padding: '0 22px', background: 'var(--cs-black)', color: 'var(--cs-white)', border: '2px solid var(--cs-black)', borderRadius: 'var(--radius-pill)', fontFamily: 'var(--font-sans)', fontSize: 'var(--type-body-sm)', fontWeight: 700, cursor: 'pointer' }}>Send another enquiry</button>
              </div>
            ) : (
              <>
                <form noValidate onSubmit={submit} style={{ display: 'grid', gap: 'var(--space-5)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: 'var(--space-5)' }}>
                    <label style={{ display: 'grid', gap: 8, fontFamily: 'var(--font-sans)', fontSize: 'var(--type-body-sm)', fontWeight: 700, color: 'var(--cs-black)' }}>
                      <span>Name</span>
                      <input type="text" name="name" autoComplete="name" value={form.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby="err-name" style={inputStyle(errors.name)} />
                      {errors.name && <span id="err-name" style={{ fontSize: 'var(--type-micro)', fontWeight: 600, color: '#C42B1C' }}>{errors.name}</span>}
                    </label>
                    <label style={{ display: 'grid', gap: 8, fontFamily: 'var(--font-sans)', fontSize: 'var(--type-body-sm)', fontWeight: 700, color: 'var(--cs-black)' }}>
                      <span>Email</span>
                      <input type="email" name="email" autoComplete="email" value={form.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby="err-email" style={inputStyle(errors.email)} />
                      {errors.email && <span id="err-email" style={{ fontSize: 'var(--type-micro)', fontWeight: 600, color: '#C42B1C' }}>{errors.email}</span>}
                    </label>
                    <label style={{ display: 'grid', gap: 8, fontFamily: 'var(--font-sans)', fontSize: 'var(--type-body-sm)', fontWeight: 700, color: 'var(--cs-black)' }}>
                      <span>Phone <span style={{ fontWeight: 500, color: 'var(--text-muted)' }}>(optional)</span></span>
                      <input type="tel" name="phone" autoComplete="tel" value={form.phone} onChange={set('phone')} style={inputStyle(false)} />
                    </label>
                    <label style={{ display: 'grid', gap: 8, fontFamily: 'var(--font-sans)', fontSize: 'var(--type-body-sm)', fontWeight: 700, color: 'var(--cs-black)' }}>
                      <span>What can we help with?</span>
                      <select name="topic" value={form.topic} onChange={set('topic')} aria-invalid={!!errors.topic} aria-describedby="err-topic" style={inputStyle(errors.topic)}>
                        <option value="">Select one</option>
                        {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.topic && <span id="err-topic" style={{ fontSize: 'var(--type-micro)', fontWeight: 600, color: '#C42B1C' }}>{errors.topic}</span>}
                    </label>
                  </div>
                  <label style={{ display: 'grid', gap: 8, fontFamily: 'var(--font-sans)', fontSize: 'var(--type-body-sm)', fontWeight: 700, color: 'var(--cs-black)' }}>
                    <span>Message</span>
                    <textarea name="message" rows={5} value={form.message} onChange={set('message')} aria-invalid={!!errors.message} aria-describedby="err-message" placeholder="What are you trying to solve, build or grow?" style={{ ...inputStyle(errors.message), padding: '12px 14px', minHeight: 'auto', resize: 'vertical' }} />
                    {errors.message && <span id="err-message" style={{ fontSize: 'var(--type-micro)', fontWeight: 600, color: '#C42B1C' }}>{errors.message}</span>}
                  </label>
                  <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontFamily: 'var(--font-sans)', fontSize: 'var(--type-body-sm)', color: 'var(--text-body)' }}>
                    <input type="checkbox" name="consent" checked={form.consent} onChange={set('consent')} aria-invalid={!!errors.consent} aria-describedby="err-consent" style={{ width: 22, height: 22, marginTop: 2, accentColor: 'var(--cs-black)', flex: 'none' }} />
                    <span style={{ maxWidth: '56ch' }}>I'm happy for Claireshine to store these details and use them to reply to my enquiry. See the <a href="/privacy-policy">Privacy Policy</a>.</span>
                  </label>
                  {errors.consent && <span id="err-consent" style={{ fontSize: 'var(--type-micro)', fontWeight: 600, color: '#C42B1C' }}>{errors.consent}</span>}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', alignItems: 'center' }}>
                    <button type="submit" disabled={blocked} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, minHeight: 56, padding: '0 28px', background: 'var(--cs-yellow)', color: 'var(--cs-black)', border: '2px solid var(--cs-black)', borderRadius: 'var(--radius-pill)', fontFamily: 'var(--font-sans)', fontSize: 'var(--type-body-md)', fontWeight: 700, cursor: blocked ? 'not-allowed' : 'pointer', opacity: blocked ? 0.7 : 1 }}>
                      {submitLabel} <span aria-hidden="true">→</span>
                    </button>
                    {status === 'error' && (
                      <span role="alert" style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--type-body-sm)', fontWeight: 600, color: '#C42B1C', maxWidth: '40ch' }}>That didn't send. Please try again, or email claireshine.marketing@gmail.com directly.</span>
                    )}
                  </div>
                  <p style={{ fontSize: 'var(--type-micro)', color: 'var(--text-muted)', maxWidth: '60ch' }}>No sensitive information, please. This form is for enquiries only — nothing is charged here.</p>
                </form>
              </>
            )}
          </div>
          </div>
        </div>
      </section>

      <section id="contact-cta" className="cs-dark" style={{ position: 'relative', overflow: 'hidden', background: 'var(--cs-black)', paddingBlock: 'var(--section-y-loose)' }}>
        <span className="cs-fly cs-deco-lg" style={{ top: '14%', animationDuration: '24s' }} aria-hidden="true"><PaperPlane size={40} /></span>
        <span className="cs-deco cs-deco-lg" style={{ right: '12%', top: '22%' }}><Smiley size={46} className="cs-wobble" /></span>
        <span className="cs-deco cs-deco-lg" style={{ right: '20%', bottom: '20%' }}><Sparkle size={26} className="cs-twinkle" /></span>
        <div data-reveal className="cs-container" style={{ position: 'relative', display: 'grid', gap: 'var(--space-6)', justifyItems: 'start', maxWidth: 1100 }}>
          <h2 style={{ fontSize: 'var(--type-display-lg)', lineHeight: 'var(--leading-display)', letterSpacing: 'var(--tracking-display)', textTransform: 'uppercase', fontWeight: 900, color: 'var(--cs-white)', maxWidth: '18ch' }}><Words text="Prefer to look around first?" /></h2>
          <p style={{ fontSize: 'var(--type-body-lg)', maxWidth: '46ch', color: 'var(--cs-paper-70)' }}>Have a read of what we do and who we've worked with, then come back when it's useful.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            <Button href="/services" variant="primary" size="lg">Explore Services</Button>
            <Button href="/work" variant="secondary" size="lg">See Our Work</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
