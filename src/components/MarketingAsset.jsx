import { csAsset, csServiceAssets } from '../lib/assets';

export default function MarketingAsset({ name = 'seo', src, alt, size = 200, ground = 'wash', style }) {
  const file = src || csAsset(csServiceAssets[name] || csServiceAssets.seo);
  return (
    <figure className={`cs-asset cs-asset-${ground}`} style={{ width: size, ...style }}>
      <span className="cs-asset-plate">
        <img src={file} alt={alt || name.replace(/-/g, ' ') + ' object'} loading="lazy" decoding="async" />
      </span>
    </figure>
  );
}
