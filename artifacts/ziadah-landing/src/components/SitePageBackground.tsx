import { useMemo, type CSSProperties } from "react";
import { useTheme } from "@/ThemeContext";

/** نفس طبقات الخلفية المستخدمة في الصفحة الرئيسية (فاتح: شبكة وأورب + ضوضاء؛ داكن: كواكب ونجوم). */
export default function SitePageBackground() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const landingStars = useMemo(
    () =>
      Array.from({ length: 160 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 0.5 + Math.random() * 2,
        opacity: 0.1 + Math.random() * 0.7,
      })),
    [],
  );

  if (isLight) {
    return (
      <>
        <div className="bg-wrap">
          <div className="orb o1" />
          <div className="orb o2" />
          <div className="orb o3" />
          <div className="orb o4" />
          <div className="bg-grid" />
        </div>
        <div className="noise" />
      </>
    );
  }

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
