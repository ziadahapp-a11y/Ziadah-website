import type { CSSProperties, ReactNode } from "react";
import BuyMoreSaveMoreWidget from "@/components/widgets/BuyMoreSaveMoreWidget";
import BuyTogetherWidget from "@/components/widgets/BuyTogetherWidget";
import AddonsWidget from "@/components/widgets/AddonsWidget";
import RelatedProductsWidget from "@/components/widgets/RelatedProductsWidget";
import CouponWidget from "@/components/widgets/CouponWidget";
import FreeShippingThresholdWidget from "@/components/widgets/FreeShippingThresholdWidget";
import ProductSwapWidget from "@/components/widgets/ProductSwapWidget";
import type { SectorShowcaseDemoBundle } from "@/data/sectorWidgetShowcaseDemos";

export type WidgetShowcaseKind =
  | "volume"
  | "bundle"
  | "addons"
  | "related"
  | "coupon"
  | "shipping"
  | "swap";

export type WidgetShowcaseItemData = {
  icon: string;
  label: string;
  desc: string;
  widget: ReactNode;
  rgb: string;
  /** يحدد شكل البطاقة (رأس + إيقاع) — يطابق ترتيب الويدجت في القالب */
  kind: WidgetShowcaseKind;
};

const WIDGET_ICONS = ["📦", "🤝", "➕", "🔎", "🏷️", "🚚", "⬆️"];
const WIDGET_RGBS = ["168,85,247", "6,182,212", "16,185,129", "245,158,11", "236,72,153", "124,58,237", "79,70,229"];

/** ترتيب ثابت يطابق `widgetElements` وقوائم الترجمة */
const WIDGET_KINDS: WidgetShowcaseKind[] = [
  "volume",
  "bundle",
  "addons",
  "related",
  "coupon",
  "shipping",
  "swap",
];

function widgetElements(demos?: SectorShowcaseDemoBundle) {
  return [
    <BuyMoreSaveMoreWidget key="bmsm" demo={demos?.buyMoreSaveMore} />,
    <BuyTogetherWidget key="bt" demo={demos?.buyTogether} />,
    <AddonsWidget key="ad" demo={demos?.addons} />,
    <RelatedProductsWidget key="rp" demo={demos?.relatedProducts} />,
    <CouponWidget key="cp" demo={demos?.coupon} />,
    <FreeShippingThresholdWidget key="fs" demo={demos?.freeShipping} />,
    <ProductSwapWidget key="ps" demo={demos?.productSwap} />,
  ];
}

/** نفس عناصر قسم #widgets-showcase — للصفحة الرئيسية أو صفحة القطاع (مع عيّنات القطاع). */
export function buildWidgetShowcaseItems(
  widgetLabels: { label: string; desc: string }[],
  sectorDemos?: SectorShowcaseDemoBundle,
): WidgetShowcaseItemData[] {
  const els = widgetElements(sectorDemos);
  return widgetLabels.map((wl, idx) => ({
    icon: WIDGET_ICONS[idx] ?? "📦",
    label: wl.label,
    desc: wl.desc,
    widget: els[idx],
    rgb: WIDGET_RGBS[idx] ?? WIDGET_RGBS[0]!,
    kind: WIDGET_KINDS[idx % WIDGET_KINDS.length]!,
  }));
}

type WidgetShowcaseCardProps = {
  item: WidgetShowcaseItemData;
  dir: "rtl" | "ltr";
  lang: "ar" | "en";
  /** عرض البطاقة بالبكسل؛ الافتراضي 280 كما في الصفحة الرئيسية */
  width?: number;
  /** للكاروسيل: عرض كامل العمود */
  fullWidth?: boolean;
};

function WidgetShowcaseCardHeader({
  item,
  dir,
  lang,
}: {
  item: WidgetShowcaseItemData;
  dir: "rtl" | "ltr";
  lang: "ar" | "en";
}) {
  const rgb = item.rgb;
  const textAlignSide = lang === "ar" ? ("right" as const) : ("left" as const);

  const iconBox = (size: number, radius = 14) => (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: `rgba(${rgb},.12)`,
        border: `1px solid rgba(${rgb},.28)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: Math.round(size * 0.52),
        flexShrink: 0,
        boxShadow: `0 0 12px rgba(${rgb},.15)`,
      }}
    >
      {item.icon}
    </div>
  );

  const titleStyle = (compactTitle: boolean): CSSProperties => ({
    fontSize: compactTitle ? 14 : 15,
    fontWeight: 900,
    color: `rgba(${rgb},1)`,
    letterSpacing: "-0.3px",
    lineHeight: 1.2,
    textShadow: `0 0 20px rgba(${rgb},.35)`,
  });

  const descStyle: CSSProperties = {
    fontSize: 12,
    color: "var(--tm)",
    lineHeight: 1.55,
    marginTop: 4,
  };

  const titleBlock = (textAlign: "start" | "center") => (
    <div
      style={{
        flex: textAlign === "center" ? undefined : 1,
        textAlign: textAlign === "center" ? "center" : textAlignSide,
        minWidth: 0,
        width: textAlign === "center" ? "100%" : undefined,
      }}
    >
      <div style={titleStyle(item.kind === "bundle")}>{item.label}</div>
      <div style={descStyle}>{item.desc}</div>
    </div>
  );

  switch (item.kind) {
    case "addons":
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 10,
            width: "100%",
            padding: "4px 0 10px",
          }}
        >
          {iconBox(46, 15)}
          {titleBlock("center")}
        </div>
      );

    case "shipping":
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 12,
            width: "100%",
            padding: "6px 0 10px",
          }}
        >
          {iconBox(48, 16)}
          {titleBlock("center")}
        </div>
      );

    case "related":
      return (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            direction: dir,
            flexDirection: "row",
            width: "100%",
            padding: "4px 0 10px",
            borderBottom: `1px solid rgba(${rgb},0.14)`,
          }}
        >
          {iconBox(44)}
          {titleBlock("start")}
        </div>
      );

    case "bundle":
      return (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            direction: dir,
            flexDirection: "row",
            width: "100%",
            padding: "4px 0",
          }}
        >
          {iconBox(44)}
          {titleBlock("start")}
        </div>
      );

    case "coupon":
      return (
        <div style={{ width: "100%" }}>
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
            {iconBox(44)}
            {titleBlock("start")}
          </div>
          <div
            aria-hidden
            style={{
              marginTop: 6,
              height: 2,
              borderRadius: 2,
              background: `linear-gradient(90deg, transparent 0%, rgba(${rgb},.5) 50%, transparent 100%)`,
              opacity: 0.9,
            }}
          />
        </div>
      );

    case "swap":
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            direction: dir,
            flexDirection: "row",
            width: "100%",
            padding: "4px 0",
          }}
        >
          {iconBox(44)}
          {titleBlock("start")}
        </div>
      );

    default:
      return (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: 12,
            direction: dir,
            flexDirection: "row",
            width: "100%",
            padding: "4px 0",
          }}
        >
          {iconBox(44)}
          {titleBlock("start")}
        </div>
      );
  }
}

export default function WidgetShowcaseCard({
  item,
  dir,
  lang,
  width = 280,
  fullWidth = false,
}: WidgetShowcaseCardProps) {
  const rgb = item.rgb;
  const base: CSSProperties = {
    width: fullWidth ? "100%" : width,
    maxWidth: fullWidth ? 380 : undefined,
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
    padding: "16px",
    borderRadius: 18,
    border: `1px solid rgba(${rgb},0.3)`,
    boxSizing: "border-box",
  };

  return (
    <div
      className={`widget-showcase-card widget-showcase-card--${item.kind}`}
      style={{
        ...base,
        background: `linear-gradient(160deg, rgba(${rgb},0.14) 0%, rgba(${rgb},0.03) 45%, rgba(12,10,30,0) 100%)`,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: `0px 18px 10px 0px rgba(0,0,0,0.1), inset 0px 1px 0px 0px rgba(255,255,255,0.12), 0px 0px 5px 0px rgba(${rgb},0.1)`,
      }}
    >
      <WidgetShowcaseCardHeader item={item} dir={dir} lang={lang} />
      <div style={{ width: "100%", alignSelf: "stretch", display: "flex", flexDirection: "column" }}>{item.widget}</div>
    </div>
  );
}
