import DraggableMarqueeRow from "@/components/DraggableMarqueeRow";
import BuyMoreSaveMoreWidget from "@/components/widgets/BuyMoreSaveMoreWidget";
import BuyTogetherWidget from "@/components/widgets/BuyTogetherWidget";
import AddonsWidget from "@/components/widgets/AddonsWidget";
import RelatedProductsWidget from "@/components/widgets/RelatedProductsWidget";
import CouponWidget from "@/components/widgets/CouponWidget";
import FreeShippingThresholdWidget from "@/components/widgets/FreeShippingThresholdWidget";
import ProductSwapWidget from "@/components/widgets/ProductSwapWidget";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";

/**
 * نفس قسم الصفحة الرئيسية (#widgets-showcase) — معاينات الويدجت المتحركة.
 * `variant="sector"`: ترويسة أقصر ومسافات مناسبة داخل صفحة القطاع.
 */
export default function WidgetsShowcaseSection({ variant = "landing" }: { variant?: "landing" | "sector" }) {
  const { lang, dir } = useLanguage();
  const t = useSiteT();
  const tr = t[lang];
  const sectorTr = tr.sectorsPage;
  const showSectorEmbed = variant === "sector";

  const widgetIcons = ["📦", "🤝", "➕", "🔎", "🏷️", "🚚", "⬆️"];
  const widgetRgbs = ["168,85,247", "6,182,212", "16,185,129", "245,158,11", "236,72,153", "124,58,237", "79,70,229"];
  const widgetComponents = [
    <BuyMoreSaveMoreWidget />,
    <BuyTogetherWidget />,
    <AddonsWidget />,
    <RelatedProductsWidget />,
    <CouponWidget />,
    <FreeShippingThresholdWidget />,
    <ProductSwapWidget />,
  ];
  const wLabels = tr.landing.widgetLabels as { label: string; desc: string }[];
  const allWidgets = wLabels.map((wl, idx) => ({
    icon: widgetIcons[idx],
    label: wl.label,
    desc: wl.desc,
    widget: widgetComponents[idx],
    rgb: widgetRgbs[idx],
  }));
  const row1 = allWidgets.slice(0, 4);
  const row2 = [...allWidgets.slice(4), allWidgets[0], allWidgets[1], allWidgets[2]];

  const renderCard = (item: (typeof allWidgets)[0], key: number) => (
    <div
      key={key}
      style={{
        width: 280,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        padding: "16px",
        borderRadius: 18,
        background: `linear-gradient(160deg, rgba(${item.rgb},0.14) 0%, rgba(${item.rgb},0.03) 45%, rgba(12,10,30,0) 100%)`,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: `1px solid rgba(${item.rgb},0.3)`,
        boxShadow: `0px 18px 10px 0px rgba(0,0,0,0.1), inset 0px 1px 0px 0px rgba(255,255,255,0.12), 0px 0px 5px 0px rgba(${item.rgb},0.1)`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          direction: dir,
          flexDirection: "row",
          padding: "4px 0",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            background: `rgba(${item.rgb},.12)`,
            border: `1px solid rgba(${item.rgb},.28)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            flexShrink: 0,
            boxShadow: `0 0 12px rgba(${item.rgb},.15)`,
          }}
        >
          {item.icon}
        </div>
        <div style={{ flex: 1, textAlign: lang === "ar" ? "right" : "left" }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 900,
              color: `rgba(${item.rgb},1)`,
              letterSpacing: "-0.3px",
              lineHeight: 1.2,
              textShadow: `0 0 20px rgba(${item.rgb},.35)`,
            }}
          >
            {item.label}
          </div>
          <div style={{ fontSize: 12, color: "var(--tm)", lineHeight: 1.55, marginTop: 4 }}>{item.desc}</div>
        </div>
      </div>
      {item.widget}
    </div>
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
          {[...row1, ...row1, ...row1].map((item, i) => renderCard(item, i))}
        </DraggableMarqueeRow>
        <DraggableMarqueeRow directionClass="marquee-ltr" duration="30s">
          {[...row2, ...row2, ...row2].map((item, i) => renderCard(item, i))}
        </DraggableMarqueeRow>
      </div>
    </section>
  );
}
