import { csAsset } from '../lib/assets';

const CAST = {
  cat: 'character/claireshinaholic-cat.png',
  dog: 'character/claireshinaholic-dog.png',
};

export default function Claireshinaholic({ character = 'cat', size = 180, caption }) {
  return (
    <div className="cs-character">
      <img
        src={csAsset(CAST[character] || CAST.cat)}
        loading="lazy"
        decoding="async"
        alt={`Claireshinaholic ${character}${caption ? ': ' + caption : ' character'}`}
        style={{ width: size }}
      />
      {caption && (
        <span className="cs-character-caption" style={{ fontSize: Math.max(15, size * 0.13) }}>
          {caption}
        </span>
      )}
    </div>
  );
}
