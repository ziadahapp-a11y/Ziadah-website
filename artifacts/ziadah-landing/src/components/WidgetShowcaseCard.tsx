import type { CSSProperties, ReactNode } from "react";
import BuyMoreSaveMoreWidget from "@/components/widgets/BuyMoreSaveMoreWidget";
import BuyTogetherWidget from "@/components/widgets/BuyTogetherWidget";
import AddonsWidget from "@/components/widgets/AddonsWidget";
import RelatedProductsWidget from "@/components/widgets/RelatedProductsWidget";
import CouponWidget from "@/components/widgets/CouponWidget";
import FreeShippingThresholdWidget from "@/components/widgets/FreeShippingThresholdWidget";
import ProductSwapWidget from "@/components/widgets/ProductSwapWidget";
import type { SectorShowcaseDemoBundle } from "@/data/sectorWidgetShowcaseDemos";
import type { ProductShape } from "@/components/widgets/kit";
import type { WidgetLabel } from "@/i18n/translations";

export type WidgetShowcaseKind =
  | "volume"
  | "bundle"
  | "addons"
  | "related"
  | "coupon"
  | "shipping"
  | "swap";

export type WidgetShowcaseItemData = WidgetLabel & {
  icon: string;
  widget: ReactNode;
  rgb: string;
  /** يحدد شكل البطاقة (رأس + إيقاع) — يطابق ترتيب الويدجت في القالب */
  kind: WidgetShowcaseKind;
};

const WIDGET_ICONS = ["📦", "🤝", "➕", "🔎", "🏷️", "🚚", "⬆️"];
const WIDGET_RGBS = ["139, 92, 246", "6,182,212", "139, 92, 246", "245,158,11", "236,72,153", "124, 58, 237", "79,70,229"];

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

/** The kinds that HAVE a product collection, and so can take a shape.
    Quantity is a ladder of tiers and the coupon is an amount and a code;
    neither has products to lay out, in the Figma file or here. */
export const SHAPED_KINDS: ReadonlySet<WidgetShowcaseKind> = new Set([
  "related",
  "addons",
  "bundle",
  "shipping",
  "swap",
]);

/** Resolves the shape for one kind. The caller decides; the default is the
    file's list. */
export type ShapeFor = (kind: WidgetShowcaseKind) => ProductShape;

function widgetElements(demos?: SectorShowcaseDemoBundle, shapeFor: ShapeFor = () => "list") {
  return [
    <BuyMoreSaveMoreWidget key="bmsm" demo={demos?.buyMoreSaveMore} />,
    <BuyTogetherWidget key="bt" demo={demos?.buyTogether} shape={shapeFor("bundle")} />,
    <AddonsWidget key="ad" demo={demos?.addons} shape={shapeFor("addons")} />,
    <RelatedProductsWidget key="rp" demo={demos?.relatedProducts} shape={shapeFor("related")} />,
    <CouponWidget key="cp" demo={demos?.coupon} />,
    <FreeShippingThresholdWidget key="fs" demo={demos?.freeShipping} shape={shapeFor("shipping")} />,
    <ProductSwapWidget key="ps" demo={demos?.productSwap} shape={shapeFor("swap")} />,
  ];
}

/** نفس عناصر قسم #widgets-showcase — للصفحة الرئيسية أو صفحة القطاع (مع عيّنات القطاع). */
export function buildWidgetShowcaseItems(
  widgetLabels: WidgetLabel[],
  sectorDemos?: SectorShowcaseDemoBundle,
  shapeFor?: ShapeFor,
): WidgetShowcaseItemData[] {
  const els = widgetElements(sectorDemos, shapeFor);
  /* The whole label is spread, not just `label` and `desc`: the home page's
     use-case rows read `whenToUse`, `goal`, `example` and `note` off the same
     item the marquee card reads its caption off, so the two never drift. */
  return widgetLabels.map((wl, idx) => ({
    ...wl,
    icon: WIDGET_ICONS[idx] ?? "📦",
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
        boxShadow: `0 0 12px rgba(${rgb},.075)`,
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
        boxShadow: `0px 18px 10px 0px rgba(0,0,0,0.05), inset 0px 1px 0px 0px rgba(255,255,255,0.06), 0px 0px 5px 0px rgba(${rgb},0.05)`,
      }}
    >
      <WidgetShowcaseCardHeader item={item} dir={dir} lang={lang} />
      <div style={{ width: "100%", alignSelf: "stretch", display: "flex", flexDirection: "column" }}>{item.widget}</div>
    </div>
  );
}
