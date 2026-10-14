import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// react-router does not scroll for you: jump to an in-page #anchor on navigation,
// otherwise reset to the top of the new page.
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
