// Resolves a Claireshine asset path relative to /assets.
export function csAsset(relPath) {
  return '/assets/' + String(relPath).replace(/^\//, '');
}

// Named service objects from the approved visual asset library.
export const csServiceAssets = {
  'google-ads': 'services/google-ads.png',
  'meta-ads': 'services/meta-ads.png',
  seo: 'services/seo.png',
  'google-business-profile': 'services/google-business-profile.png',
  'google-search-console': 'services/google-search-console.png',
  analytics: 'services/analytics.png',
  'website-development': 'services/website-development.png',
  content: 'services/content.png',
  'social-media': 'services/social-media.png',
  growth: 'services/growth.png',
  strategy: 'services/strategy.png',
  branding: 'services/branding.png',
  'local-seo': 'marketing/local-seo.png',
  'email-marketing': 'marketing/email-marketing.png',
  'performance-marketing': 'marketing/performance-marketing.png',
  'reports-insights': 'marketing/reports-insights.png',
  megaphone: 'marketing/megaphone.png',
  'growth-bars': 'marketing/growth-bars.png',
  'search-result-stack': 'marketing/search-result-stack.png',
  'laptop-mockup': 'marketing/laptop-mockup.png',
  ideas: 'editorial/ideas-speech-bubble.png',
  'sticky-note': 'editorial/sticky-note-yellow.png',
  'direction-sign': 'editorial/direction-sign.png',
  marker: 'editorial/marker.png',
  checklist: 'editorial/checklist-repeat.png',
};
