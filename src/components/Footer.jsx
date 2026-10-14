import { Link } from 'react-router-dom';
import Button from './Button';
import MarqueeStrip from './MarqueeStrip';

const STRIP = ['CLARITY CREATES GROWTH', 'GOOD BRANDS. BRIGHTER BUSINESSES.', 'FROM IDEAS TO IMPACT', 'PLAN · CREATE · OPTIMISE · GROW'];

export default function Footer() {
  return (
    <>
      <cs-bubbles max="16"></cs-bubbles>
      <MarqueeStrip items={STRIP} tone="black" />
      <footer className="cs-dark cs-site-footer" data-bubble-zone>
        <div className="cs-container cs-footer-inner">
          <div className="cs-footer-top">
            <h2>Got an idea? Let's make it shine.</h2>
            <div className="cs-footer-contact">
              <Button href="/contact" variant="primary" size="md">Start a Project</Button>
              <a href="mailto:claireshine.marketing@gmail.com" className="cs-footer-email">claireshine.marketing@gmail.com</a>
              <a href="tel:+918882827091" className="cs-footer-phone">+91 88828 27091</a>
            </div>
          </div>

          <div className="cs-footer-rule" />

          <div className="cs-footer-cols">
            <div className="cs-footer-brand">
              <img src="/assets/brand/claireshine-logo-lockup-white.png" alt="Claireshine" width="130" height="140" />
              <p>A strategic creative, digital and marketing studio in New Delhi. Search, paid media, websites and brand — planned and improved in one place.</p>
              <span className="cs-hand">Clarity in progress…</span>
            </div>
            <nav aria-label="Pages">
              <span className="cs-footer-col-label">Pages</span>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/services">Services</Link>
              <Link to="/work">Work</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/contact">Contact</Link>
            </nav>
            <nav aria-label="Services">
              <span className="cs-footer-col-label">Services</span>
              <Link to="/services#seo">SEO</Link>
              <Link to="/services#local-seo">Local SEO</Link>
              <Link to="/services#google-ads">Google Ads</Link>
              <Link to="/services#meta-ads">Meta Ads</Link>
              <Link to="/services#google-business-profile">Google Business Profile</Link>
              <Link to="/services#performance-marketing">Performance Marketing</Link>
            </nav>
            <nav aria-label="Social">
              <span className="cs-footer-col-label">Follow</span>
              <a href="https://www.instagram.com/claireshine_marketing" target="_blank" rel="noopener me">Instagram ↗</a>
              <a href="https://www.facebook.com/share/1EWmop84ch/" target="_blank" rel="noopener me">Facebook ↗</a>
              <a href="https://www.linkedin.com/company/claireshine-marketing/" target="_blank" rel="noopener me">LinkedIn ↗</a>
              <span className="cs-footer-place">New Delhi, Delhi, India</span>
            </nav>
          </div>

          <div className="cs-footer-rule" />

          <div className="cs-footer-bottom">
            <span className="cs-footer-copyright">© 2026 Claireshine. All rights reserved.</span>
            <span className="cs-footer-legal">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
              <Link to="/cookie-policy">Cookie Policy</Link>
              <Link to="/refund-policy">Refund &amp; Cancellation</Link>
            </span>
          </div>
        </div>
        <div data-bubble-fall aria-hidden="true" className="cs-footer-fall" />
      </footer>
    </>
  );
}
