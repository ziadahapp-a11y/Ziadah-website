import { useMemo, type CSSProperties } from "react";

/** طبقة خلفية داكنة: كواكب ونجوم. */
export default function SitePageBackground() {
  const landingStars = useMemo(
    () =>
      Array.from({ length: 350 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 0.5 + Math.random() * 2.5,
        opacity: 0.2 + Math.random() * 0.8,
      })),
    [],
  );

  return (
    <div className="landing-page-bg" aria-hidden>
      <div className="landing-page-bg-planets">
        <div className="planet-corner planet-corner--tl" />
        <div className="planet-corner planet-corner--tr" />
        <div className="planet-corner planet-corner--bl" />
        <div className="planet-corner planet-corner--br" />
      </div>
      <div className="landing-page-bg-edge-glow" aria-hidden />
      <div className="landing-page-bg-stars">
        {landingStars.map((s) => (
          <span
            key={s.id}
            className="landing-page-bg-star"
            style={
              {
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                animationDelay: `${(s.id * 137) % 9000}ms`,
                "--star-o": s.opacity,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
