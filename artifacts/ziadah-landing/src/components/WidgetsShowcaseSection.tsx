import { useMemo } from "react";
import DraggableMarqueeRow from "@/components/DraggableMarqueeRow";
import { buildWidgetShowcaseItems, type WidgetShowcaseKind } from "@/components/WidgetShowcaseCard";
import { navigateTo } from "@/components/PageTransition";
import { useLanguage } from "@/i18n/LanguageContext";
import { getSectorWidgetShowcaseDemos } from "@/data/sectorWidgetShowcaseDemos";
import { t as siteTranslations } from "@/i18n/translations";
import { Section as DsSection, SectionHead } from "@/sections";

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
  const t = siteTranslations;
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
          /* The card is the section's own: one tint of its ink, no border and
             no shadow. It was a white panel with a zinc border and an
             elevation shadow, on a section that had already stamped a
             family. */
          background: "color-mix(in srgb, var(--color-secondary, #0a0a0a) 8%, transparent)",
          borderRadius: "var(--radius-card, 1.6rem)",
          overflow: "hidden",
          textDecoration: "none",
          color: "inherit",
          cursor: "pointer",
          transition:
            "transform 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.25s cubic-bezier(.4,0,.2,1), border-color 0.25s cubic-bezier(.4,0,.2,1)",
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
            /* The stage is a STOREFRONT, so it is the flat near-white a real
               store page is - not a wash of the widget's own hue. Twelve cards
               each washed a different pastel was the loudest thing on the
               band and the surest sign the previews were decorated rather
               than screenshotted. */
            background: "var(--general-white)",
          }}
        >
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
        {/* The caption takes the section's ink, so it reads on either end of
            the family. It was zinc-950 over zinc-600 on a forced white. */}
        <div
          className="wshow-caption"
          style={{ textAlign: dir === "rtl" ? "right" : "left" }}
        >
          <div className="card-title !text-[2rem]">{item.label}</div>
          <div className="card-body-text">{item.desc}</div>
        </div>
      </a>
    );
  };

  /* On the design system rather than beside it. This used to paint its own
     ground, its own 80px padding and its own head out of the legacy `.tc /
     .stag / .st / .ssub` classes, which made it one of two bands on the home
     page that broke the colour rhythm around them.

     The marquees stay outside the `Shell` because they run edge to edge; only
     the head takes the section's measure. */
  return (
    <DsSection
      id="widgets-showcase"
      family="grey"
      tight={showSectorEmbed}
      className="overflow-x-clip"
    >
      <SectionHead
        center
        kicker={showSectorEmbed ? sectorTr.sectorHubWidgetsEmbedTag : tr.landing.widgetsTag}
        title={showSectorEmbed ? sectorTr.sectorHubWidgetsEmbedTitle : tr.landing.widgetsTitle}
        lead={showSectorEmbed ? sectorTr.sectorHubWidgetsEmbedSub : tr.landing.widgetsSubtitle}
      />
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
    </DsSection>
  );
}
