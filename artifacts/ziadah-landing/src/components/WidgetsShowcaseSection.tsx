import { useMemo } from "react";
import DraggableMarqueeRow from "@/components/DraggableMarqueeRow";
import WidgetShowcaseCard, { buildWidgetShowcaseItems } from "@/components/WidgetShowcaseCard";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { getSectorWidgetShowcaseDemos } from "@/data/sectorWidgetShowcaseDemos";

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

  const renderCard = (item: (typeof allWidgets)[0], key: number) => (
    <WidgetShowcaseCard key={key} item={item} dir={dir} lang={lang} />
  );

  return (
    <section
      id="widgets-showcase"
      style={{
        position: "relative",
        zIndex: 2,
        padding: showSectorEmbed ? "36px 0 28px" : "80px 0",
        background: "transparent",
        scrollMarginTop: 120,
      }}
    >
      <div style={{ maxWidth: 1300, margin: "0 auto", paddingInline: showSectorEmbed ? "24px" : "5%" }}>
        <div className="tc" style={{ marginBottom: showSectorEmbed ? 36 : 56 }}>
          <div className="stag rv">
            <span className="stag-dot" />
            {showSectorEmbed ? sectorTr.sectorHubWidgetsEmbedTag : tr.landing.widgetsTag}
          </div>
          <h2 className="st rv d1 font-semibold" style={{ marginTop: showSectorEmbed ? 10 : undefined }}>
            {showSectorEmbed ? sectorTr.sectorHubWidgetsEmbedTitle : tr.landing.widgetsTitle}
          </h2>
          <p className="ssub rv d2" style={{ marginTop: showSectorEmbed ? 8 : undefined }}>
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
