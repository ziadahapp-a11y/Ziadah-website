import React from "react";

// Hand-built SVG approximations of the Zid and Salla brand marks, drawn with
// `currentColor` so the surrounding `style={{ color }}` controls the fill.
// These render as small (~20–24px) icon marks; the brand name is shown as
// separate text wherever they're used.

type LogoProps = { className?: string; style?: React.CSSProperties };

// Salla: rounded "bag" square with a smile — the platform's signature mark.
export function SallaLogo({ className = "", style }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={className}
      style={style}
      aria-label="Salla"
      role="img"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5.5" strokeWidth="2" />
      <path
        d="M8 11.8c0 0 1.5 3 4 3s4-3 4-3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Zid: the official looping knot mark — four teardrop petals in the cardinal
// directions whose strands weave (cross) around a small center diamond. Drawn
// as strokes with `currentColor` so the surrounding `style={{ color }}` controls
// the line color. One petal is defined once and rotated 4× for exact symmetry.
export function ZidLogo({ className = "", style }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-label="Zid"
      role="img"
    >
      {/* center diamond */}
      <path d="M12 9.5 L14.5 12 L12 14.5 L9.5 12 Z" />
      {/* top petal — strands cross just below the diamond's point */}
      <path
        id="zid-petal"
        d="M12.8 10.4 C10.5 9.2 9.2 4.8 11 3.3 C11.6 2.8 12.4 2.8 13 3.3 C14.8 4.8 13.5 9.2 11.2 10.4"
      />
      {/* right, bottom, left petals */}
      <use href="#zid-petal" transform="rotate(90 12 12)" />
      <use href="#zid-petal" transform="rotate(180 12 12)" />
      <use href="#zid-petal" transform="rotate(270 12 12)" />
    </svg>
  );
}
