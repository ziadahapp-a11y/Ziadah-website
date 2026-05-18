import { useMemo } from "react";
import DraggableMarqueeRow from "@/components/DraggableMarqueeRow";
import { buildWidgetShowcaseItems, type WidgetShowcaseKind } from "@/components/WidgetShowcaseCard";
import { navigateTo } from "@/components/PageTransition";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { getSectorWidgetShowcaseDemos } from "@/data/sectorWidgetShowcaseDemos";

const KIND_TO_URL: Record<WidgetShowcaseKind, string> = {
  volume: "/use-cases/buy-more-save-more",
  bundle: "/use-cases/buy-together",
  addons: "/use-cases/addons",
  related: "/use-cases/related-products",
  coupon: "/use-cases/discount-coupon",
  shipping: "/use-cases/free-shipping",
  swap: "/use-cases/upsell",
};

/**
 * نفس قسم الصفحة الرئيسية (#widgets-showcase) — معاينات الويدجت المتحركة.
 * `variant="sector"`: ترويسة أقصر ومسافات مناسبة داخل صفحة القطاع.
 */
export default function WidgetsShowcaseSection({
  variant = "landing",
  sectorSlug,
}: {
  variant?: "landing" | "sector";
  /** When set with `variant="sector"`, widget previews use sector-themed demo products. */
  sectorSlug?: string;
}) {
  const { lang, dir } = useLanguage();
  const t = useSiteT();
  const tr = t[lang];
  const sectorTr = tr.sectorsPage;
  const showSectorEmbed = variant === "sector";

  const sectorDemos = useMemo(
    () => (showSectorEmbed ? getSectorWidgetShowcaseDemos(sectorSlug, lang) : undefined),
    [showSectorEmbed, sectorSlug, lang],
  );

  const wLabels = tr.landing.widgetLabels as { label: string; desc: string }[];
  const allWidgets = useMemo(
    () => buildWidgetShowcaseItems(wLabels, sectorDemos),
    [wLabels, sectorDemos],
  );
  const row1 = allWidgets.slice(0, 4);
  const row2 = [...allWidgets.slice(4), allWidgets[0], allWidgets[1], allWidgets[2]];

  const renderCard = (item: (typeof allWidgets)[0], key: number) => {
    const rgb = item.rgb;
    const href = KIND_TO_URL[item.kind];
    return (
      <a
        key={key}
        href={href}
        className="widget-creatify-card"
        onClick={(e) => {
          e.preventDefault();
          navigateTo(href);
        }}
        style={{
          width: 320,
          height: 520,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          background: "#ffffff",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow:
            "0 18px 50px rgba(10, 5, 30, 0.35), 0 4px 14px rgba(0, 0, 0, 0.18), 0 1px 0 rgba(255, 255, 255, 0.08) inset",
          textDecoration: "none",
          color: "inherit",
          cursor: "pointer",
          transition: "transform 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.25s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <div
          className="widget-creatify-card__hero"
          style={{
            position: "relative",
            flex: "1 1 auto",
            overflow: "hidden",
            padding: "22px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `
              radial-gradient(130% 90% at 100% 0%, rgba(255,255,255,0.18) 0%, transparent 45%),
              radial-gradient(110% 80% at 0% 0%, rgba(${rgb},0.95) 0%, rgba(${rgb},0.55) 45%, rgba(${rgb},0.3) 100%),
              linear-gradient(160deg, rgba(${rgb},0.65) 0%, rgba(${rgb},0.92) 100%)
            `,
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -40px 60px -30px rgba(0,0,0,0.28)",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "-22%",
              insetInlineEnd: "-18%",
              width: "65%",
              height: "65%",
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.1) 45%, transparent 70%)",
              filter: "blur(22px)",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              bottom: "-30%",
              insetInlineStart: "-22%",
              width: "70%",
              height: "70%",
              background: `radial-gradient(circle at 50% 50%, rgba(${rgb},0.85) 0%, rgba(${rgb},0.25) 50%, transparent 75%)`,
              filter: "blur(28px)",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 14px)",
              mixBlendMode: "soft-light",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxHeight: "100%",
            }}
          >
            {item.widget}
          </div>
        </div>
        <div
          style={{
            padding: "18px 22px 22px",
            textAlign: dir === "rtl" ? "right" : "left",
            background: "#ffffff",
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#0b0b0f",
              letterSpacing: "-0.5px",
              lineHeight: 1.2,
            }}
          >
            {item.label}
          </div>
          <div
            style={{
              marginTop: 6,
              fontSize: 13,
              fontWeight: 400,
              color: "#6b6b76",
              lineHeight: 1.5,
            }}
          >
            {item.desc}
          </div>
        </div>
      </a>
    );
  };

  return (
    <section
      id="widgets-showcase"
      style={{
        position: "relative",
        zIndex: 2,
        padding: showSectorEmbed ? "36px 0 28px" : "80px 0",
        background: "rgba(9, 0, 25, 1)",
        scrollMarginTop: 120,
      }}
    >
      <div style={{ maxWidth: 1300, margin: "0 auto", paddingInline: showSectorEmbed ? "24px" : "5%" }}>
        <div className="tc" style={{ marginBottom: showSectorEmbed ? 36 : 56 }}>
          <div className="stag rv on">
            <span className="stag-dot" />
            {showSectorEmbed ? sectorTr.sectorHubWidgetsEmbedTag : tr.landing.widgetsTag}
          </div>
          <h2 className="st rv on d1 font-semibold" style={{ marginTop: showSectorEmbed ? 10 : undefined }}>
            {showSectorEmbed ? sectorTr.sectorHubWidgetsEmbedTitle : tr.landing.widgetsTitle}
          </h2>
          <p className="ssub rv on d2" style={{ marginTop: showSectorEmbed ? 8 : undefined }}>
            {showSectorEmbed ? sectorTr.sectorHubWidgetsEmbedSub : tr.landing.widgetsSubtitle}
          </p>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <DraggableMarqueeRow directionClass="marquee-rtl" duration="32s">
          {[0, 1, 2].map((seg) => (
            <div key={seg} className="marquee-segment">
              {row1.map((item, i) => renderCard(item, seg * 100 + i))}
            </div>
          ))}
        </DraggableMarqueeRow>
        <DraggableMarqueeRow directionClass="marquee-ltr" duration="30s">
          {[0, 1, 2].map((seg) => (
            <div key={seg} className="marquee-segment">
              {row2.map((item, i) => renderCard(item, seg * 100 + i))}
            </div>
          ))}
        </DraggableMarqueeRow>
      </div>
    </section>
  );
}
