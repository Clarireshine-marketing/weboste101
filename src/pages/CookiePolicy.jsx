import Legal from '../components/Legal';

export default function CookiePolicy() {
  return (
    <Legal
      canonical="/cookie-policy"
      eyebrow="Cookies"
      title="Cookie Policy"
      intro="A short, accurate account of what this website stores in your browser. It describes the site as built, so most of what a cookie policy usually lists does not apply here."
      updated="September 2026"
      sections={[
        { h: 'The short version', p: ['This site does not set analytics, advertising or tracking cookies, and it does not embed third-party players, maps or social widgets that would set them on our behalf.'] },
        { h: 'Essential cookies', p: ['We do not set any cookies ourselves for the pages to work. Our hosting provider may set a strictly necessary cookie for security, load balancing or fraud prevention; where it does, it is required for the site to be served and cannot be switched off from within the page.'] },
        { h: 'Analytics cookies', p: ['None in use. If we add an analytics tool, this page will name it, say what it measures and how long its cookies last, before it goes live.'] },
        { h: 'Advertising and tracking cookies', p: ['None in use. There is no advertising pixel, remarketing tag or cross-site tracking on this website.'] },
        { h: 'Third-party cookies', p: ['Links to Instagram, Facebook and LinkedIn open those platforms in a new tab. Nothing is loaded from them while you are on this site, so their cookies only apply once you are on their own pages.'] },
        { h: 'Consent', p: ['Because no non-essential cookies are used, there is no consent banner. If that changes, consent will be requested before any non-essential cookie is set, and you will be able to decline.'] },
        { h: 'Managing cookies', p: ['Every major browser lets you view, block and delete cookies in its privacy or site-data settings. Blocking strictly necessary cookies can stop parts of some websites working, though it should not affect reading this one.'] },
        { h: 'Contact', p: ['Questions about this page: claireshine.marketing@gmail.com.'] },
      ]}
    />
  );
}
