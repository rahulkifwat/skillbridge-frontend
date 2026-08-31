/**
 * Simplified circular country flags, drawn inline.
 *
 * Emoji flags are not an option: Windows ships no regional-indicator glyphs, so
 * `🇲🇽` renders as the bare letters "MX" there. These SVGs look the same on
 * every platform. Crests and suns are omitted deliberately — at 44px they turn
 * to mud, and the stripe patterns already read.
 */
const FLAGS = {
  mexico: (
    <>
      <rect width="12" height="36" x="0" fill="#006847" />
      <rect width="12" height="36" x="12" fill="#ffffff" />
      <rect width="12" height="36" x="24" fill="#ce1126" />
    </>
  ),
  colombia: (
    <>
      <rect width="36" height="18" y="0" fill="#fcd116" />
      <rect width="36" height="9" y="18" fill="#003893" />
      <rect width="36" height="9" y="27" fill="#ce1126" />
    </>
  ),
  argentina: (
    <>
      <rect width="36" height="12" y="0" fill="#74acdf" />
      <rect width="36" height="12" y="12" fill="#ffffff" />
      <rect width="36" height="12" y="24" fill="#74acdf" />
    </>
  ),
  chile: (
    <>
      <rect width="36" height="18" y="0" fill="#ffffff" />
      <rect width="36" height="18" y="18" fill="#d52b1e" />
      <rect width="14" height="18" x="0" y="0" fill="#0039a6" />
      <path d="M7 4.6 8.2 8.1 11.8 8.1 8.9 10.3 10 13.8 7 11.7 4 13.8 5.1 10.3 2.2 8.1 5.8 8.1Z" fill="#ffffff" />
    </>
  ),
  peru: (
    <>
      <rect width="12" height="36" x="0" fill="#d91023" />
      <rect width="12" height="36" x="12" fill="#ffffff" />
      <rect width="12" height="36" x="24" fill="#d91023" />
    </>
  ),
  // Stand-in for "and more" — a globe rather than any one country.
  more: (
    <>
      <rect width="36" height="36" fill="#0d9488" />
      <g fill="none" stroke="#ffffff" strokeWidth="1.6">
        <circle cx="18" cy="18" r="10" />
        <ellipse cx="18" cy="18" rx="4.2" ry="10" />
        <path d="M8 18h20M10.2 12.2h15.6M10.2 23.8h15.6" />
      </g>
    </>
  ),
};

export default function CountryFlag({ country, className = "" }) {
  const shape = FLAGS[country];
  if (!shape) return null;

  return (
    <svg
      viewBox="0 0 36 36"
      className={`shrink-0 rounded-full ring-1 ring-black/10 ${className}`}
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={`flag-clip-${country}`}>
          <circle cx="18" cy="18" r="18" />
        </clipPath>
      </defs>
      <g clipPath={`url(#flag-clip-${country})`}>{shape}</g>
    </svg>
  );
}
