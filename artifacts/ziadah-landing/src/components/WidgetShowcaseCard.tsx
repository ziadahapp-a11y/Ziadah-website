import type { ReactNode } from "react";
import BuyMoreSaveMoreWidget from "@/components/widgets/BuyMoreSaveMoreWidget";
import BuyTogetherWidget from "@/components/widgets/BuyTogetherWidget";
import AddonsWidget from "@/components/widgets/AddonsWidget";
import RelatedProductsWidget from "@/components/widgets/RelatedProductsWidget";
import CouponWidget from "@/components/widgets/CouponWidget";
import FreeShippingThresholdWidget from "@/components/widgets/FreeShippingThresholdWidget";
import ProductSwapWidget from "@/components/widgets/ProductSwapWidget";
import type { SectorShowcaseDemoBundle } from "@/data/sectorWidgetShowcaseDemos";

export type WidgetShowcaseItemData = {
  icon: string;
  label: string;
  desc: string;
  widget: ReactNode;
  rgb: string;
};

const WIDGET_ICONS = ["📦", "🤝", "➕", "🔎", "🏷️", "🚚", "⬆️"];
const WIDGET_RGBS = ["168,85,247", "6,182,212", "16,185,129", "245,158,11", "236,72,153", "124,58,237", "79,70,229"];

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
    icon: WIDGET_ICONS[idx],
    label: wl.label,
    desc: wl.desc,
    widget: els[idx],
    rgb: WIDGET_RGBS[idx],
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

export default function WidgetShowcaseCard({
  item,
  dir,
  lang,
  width = 280,
  fullWidth = false,
}: WidgetShowcaseCardProps) {
  return (
    <div
      style={{
        width: fullWidth ? "100%" : width,
        maxWidth: fullWidth ? 380 : undefined,
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
        boxSizing: "border-box",
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
        <div style={{ flex: 1, textAlign: lang === "ar" ? "right" : "left", minWidth: 0 }}>
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
}
