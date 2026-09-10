import { useMemo } from "react";
import DraggableMarqueeRow from "@/components/DraggableMarqueeRow";
import UseCaseRow from "@/components/UseCaseRow";
import { buildWidgetShowcaseItems, type WidgetShowcaseKind } from "@/components/WidgetShowcaseCard";
import { navigateTo } from "@/components/PageTransition";
import { useLanguage } from "@/i18n/LanguageContext";
import { getSectorWidgetShowcaseDemos } from "@/data/sectorWidgetShowcaseDemos";
import { t as siteTranslations } from "@/i18n/translations";
import { Section as DsSection, SectionHead } from "@/sections";
import { Shell } from "@/components/mk";

/* READING ORDER, not data order. `widgetLabels` is indexed against
   `widgetElements()` and cannot be reordered; this is the order a merchant
   meets the seven in, which runs from the lightest ask to the heaviest:
   discover, then complete, then bundle, then buy more, then close a shipping
   gap, then upgrade - and the coupon last, because it is the only one that
   costs margin. */
const ROW_ORDER: WidgetShowcaseKind[] = [
  "related",
  "addons",
  "bundle",
  "volume",
  "shipping",
  "swap",
  "coupon",
];

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

  const wLabels = tr.landing.widgetLabels;
  const allWidgets = useMemo(
    () => buildWidgetShowcaseItems(wLabels, sectorDemos),
    [wLabels, sectorDemos],
  );
  const row1 = allWidgets.slice(0, 4);
  const row2 = [...allWidgets.slice(4), allWidgets[0], allWidgets[1], allWidgets[2]];

  /* The seven, once each, in reading order. The marquee showed twenty-four
     cards for these seven - three looped copies of each row, and the second
     row re-added the first three to fill its width - so the same offer slid
     past four times and no two use cases could be told apart. */
  const rows = useMemo(
    () =>
      ROW_ORDER.map((kind) => allWidgets.find((w) => w.kind === kind)).filter(
        (w): w is (typeof allWidgets)[number] => Boolean(w),
      ),
    [allWidgets],
  );

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
      /* Only the marquee needs the clip - it runs a track wider than the
         viewport on purpose. The rows fit their column, and clipping them
         would cut a focus ring at the section edge. */
      className={showSectorEmbed ? "overflow-x-clip" : undefined}
    >
      <SectionHead
        center
        kicker={showSectorEmbed ? sectorTr.sectorHubWidgetsEmbedTag : tr.landing.widgetsTag}
        title={showSectorEmbed ? sectorTr.sectorHubWidgetsEmbedTitle : tr.landing.widgetsTitle}
        lead={showSectorEmbed ? sectorTr.sectorHubWidgetsEmbedSub : tr.landing.widgetsSubtitle}
      />
      {/* The sector pages keep the marquee. It is compact, it is where the
          sector-themed demo products earn their place, and seven full-width
          rows on top of an already long sector page would bury the rest of
          it. The home page is where a merchant is deciding what this is, so
          the home page gets the rows. */}
      {showSectorEmbed ? (
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
      ) : (
        <Shell>
          <div className="ucrow-list">
            {rows.map((item, i) => (
              <UseCaseRow
                key={item.kind}
                title={item.label}
                description={item.desc}
                whenToUse={item.whenToUse}
                goal={item.goal}
                example={item.example}
                note={item.note}
                preview={item.widget}
                reverse={i % 2 === 1}
                href={KIND_TO_URL[item.kind]}
                hrefLabel={tr.landing.widgetRowLink}
                onNavigate={navigateTo}
                labels={{
                  whenToUse: tr.landing.widgetRowWhen,
                  goal: tr.landing.widgetRowGoal,
                  example: tr.landing.widgetRowExample,
                }}
              />
            ))}
          </div>
        </Shell>
      )}
    </DsSection>
  );
}
