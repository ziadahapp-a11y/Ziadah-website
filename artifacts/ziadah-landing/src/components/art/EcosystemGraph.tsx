import { SiShopify } from "react-icons/si";
import { useLanguage } from "@/i18n/LanguageContext";
import { PLATFORMS } from "@/lib/platforms-data";
import { platformAsset } from "@/utils/platformAsset";

/**
 * The platform ecosystem, drawn.
 *
 * A list of logos says "these exist". It does not say what the relationship
 * IS, which on this page is the whole argument: the store platform is where
 * Ziadah connects, not what Ziadah is. So the visual carries the direction of
 * flow — the catalogue and the buying behaviour come IN from whichever
 * platform a merchant already runs, and a suggestion goes OUT to the shopper.
 *
 * Read from `platforms-data`, so the drawing cannot name a connector the page
 * does not, or show one as connected when it has not shipped.
 *
 * Drawn in DOM and CSS from the section's own tokens. The connectors are one
 * SVG layer because a line is a line; everything else is a box. Decorative:
 * the page states all of this in text as well.
 */

/** Marks live here rather than in the data, which stays framework-free. */
function PlatformMark({ slug }: { slug: string }) {
  if (slug === "shopify") return <SiShopify className="eco-node-svg" />;
  const src =
    slug === "zid"
      ? platformAsset("platform/zid-logo-dark.png")
      : platformAsset("platform/salla-logo-dark.png");
  return <img src={src} alt="" className="eco-node-svg" />;
}

export function EcosystemGraph() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const n = PLATFORMS.length;

  const outbound = isAr
    ? ["منتج مقترَح في مكانه", "عرض حزمة أو كمية", "قياس أثره على الطلب"]
    : ["A suggestion in place", "A bundle or quantity offer", "Its impact, measured"];

  return (
    <div className="eco" data-art-slot="platform-ecosystem" aria-hidden="true">
      {/* Row 1 — the platforms a merchant already runs. */}
      <ul className="eco-row eco-row--platforms" style={{ "--eco-n": n } as React.CSSProperties}>
        {PLATFORMS.map((p) => (
          <li key={p.slug} className={`eco-node${p.status === "connected" ? " is-live" : ""}`}>
            <span className="eco-node-mark">
              <PlatformMark slug={p.slug} />
            </span>
            <span className="eco-node-name">{isAr ? p.name.ar : p.name.en}</span>
          </li>
        ))}
      </ul>

      {/* The inbound rail. */}
      <div className="eco-rail eco-rail--in">
        <svg className="eco-lines" viewBox="0 0 100 20" preserveAspectRatio="none" focusable="false">
          {PLATFORMS.map((p, i) => {
            const x = ((i + 0.5) / n) * 100;
            return (
              <path
                key={p.slug}
                d={`M ${x} 0 C ${x} 12, 50 8, 50 20`}
                className={`eco-line${p.status === "connected" ? " is-live" : ""}`}
              />
            );
          })}
        </svg>
        <span className="eco-rail-label">
          {isAr ? "الكتالوج وسلوك الشراء" : "The catalogue and buying behaviour"}
        </span>
      </div>

      {/* The hub. */}
      <div className="eco-hub">
        <span className="eco-hub-name">{isAr ? "زيادة" : "Ziadah"}</span>
        <span className="eco-hub-sub">
          {isAr ? "يقرأ، يرتّب، يقترح" : "Reads, ranks, suggests"}
        </span>
      </div>

      {/* The outbound rail. */}
      <div className="eco-rail eco-rail--out">
        <svg className="eco-lines" viewBox="0 0 100 20" preserveAspectRatio="none" focusable="false">
          {[0, 1, 2].map((i) => {
            const x = ((i + 0.5) / 3) * 100;
            return <path key={i} d={`M 50 0 C 50 12, ${x} 8, ${x} 20`} className="eco-line is-live" />;
          })}
        </svg>
        <span className="eco-rail-label">
          {isAr ? "ما يراه المشتري" : "What the shopper sees"}
        </span>
      </div>

      {/* Row 2 — what Ziadah sends back. */}
      <ul className="eco-row eco-row--out">
        {outbound.map((label) => (
          <li key={label} className="eco-out">
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
