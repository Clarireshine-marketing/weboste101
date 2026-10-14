import { useEffect } from 'react';

function setMeta(attr, key, content) {
  if (content == null) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel, href) {
  if (href == null) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

// Minimal per-page <head> updates (title, description, robots, canonical, OG/Twitter).
// No react-helmet dependency: this is a plain client-rendered SPA, so these tags
// exist for the browser tab, social shares and JS-executing crawlers.
export function useDocumentHead({ title, description, robots = 'index,follow', canonical, ogTitle, ogDescription, ogImage }) {
  useEffect(() => {
    if (title) document.title = title;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', robots);
    if (canonical) setLink('canonical', canonical);
    setMeta('property', 'og:title', ogTitle || title);
    setMeta('property', 'og:description', ogDescription || description);
    setMeta('property', 'og:url', canonical);
    if (ogImage) setMeta('property', 'og:image', ogImage);
  }, [title, description, robots, canonical, ogTitle, ogDescription, ogImage]);
}
