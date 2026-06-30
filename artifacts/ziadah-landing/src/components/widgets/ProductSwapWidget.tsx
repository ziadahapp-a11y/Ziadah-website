import { useMemo } from "react";
import UseCaseWidgetPreview from "../UseCaseWidgetPreview";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { Editable } from "@/cms/components/Editable";
import { cmsKey } from "@/cms/cmsKeys";
import type { ProductSwapDemo } from "@/data/sectorWidgetShowcaseDemos";
import { mergeShowcaseDemo } from "@/data/sectorWidgetShowcaseDemos";

export default function ProductSwapWidget({ demo }: { demo?: ProductSwapDemo }) {
  const t = useSiteT();
  const { lang } = useLanguage();
  const tr = useMemo(
    () => mergeShowcaseDemo(t[lang].widgets.productSwap, demo),
    [t, lang, demo],
  );
  const productEmoji = (tr as { productEmoji?: string }).productEmoji ?? "🎧";

  return (
    <UseCaseWidgetPreview
      title={
        <Editable contentKey={cmsKey(lang, "widgets", "productSwap", "title")} label="Product swap title" type="text">
          {tr.title}
        </Editable>
      }
      subtitle={
        <Editable contentKey={cmsKey(lang, "widgets", "productSwap", "subtitle")} label="Product swap subtitle" type="text">
          {tr.subtitle}
        </Editable>
      }
    >
      <div>
        <div style={{ fontSize: 12, color: "var(--td)", marginBottom: 10 }}>{tr.descLabel}</div>
        <div style={{
          padding: "12px",
          borderRadius: 14,
          background: "rgba(124, 58, 237,.1)",
          border: "1.5px solid rgba(124, 58, 237,.3)",
          marginBottom: 12,
        }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "2px 10px",
            borderRadius: 20,
            background: "rgba(16,185,129,.12)",
            border: "1px solid rgba(16,185,129,.3)",
            fontSize: 12,
            fontWeight: 700,
            color: "#a855f7",
            marginBottom: 10,
          }}>
            {tr.specialOfferBadge}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "rgba(124, 58, 237,.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              flexShrink: 0,
            }}>{productEmoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--t)", lineHeight: 1.3 }}>{tr.productName}</div>
              <div style={{ fontSize: 12, color: "#f59e0b", marginTop: 2 }}>{tr.reviews}</div>
              <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 4 }}>
                <span style={{ fontSize: 12, color: "var(--td)", textDecoration: "line-through" }}>{tr.origPrice}</span>
                <span style={{ fontSize: 14, fontWeight: 900, color: "var(--t)" }}>{tr.newPrice}</span>
                <span style={{
                  fontSize: 12,
                  padding: "2px 7px",
                  borderRadius: 20,
                  background: "rgba(16,185,129,.15)",
                  color: "#a855f7",
                  fontWeight: 700,
                }}>{tr.saveBadge}</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{
          display: "flex",
          gap: 6,
          alignItems: "center",
          marginBottom: 12,
          padding: "7px 10px",
          borderRadius: 10,
          background: "rgba(16,185,129,.08)",
          border: "1px solid rgba(16,185,129,.2)",
        }}>
          <span style={{ color: "#a855f7", fontSize: 12 }}>✓</span>
          <span style={{ fontSize: 12, color: "var(--tm)" }}>{tr.warrantyNote}</span>
        </div>
        <button style={{
          width: "100%",
          padding: "10px",
          borderRadius: 12,
          background: "rgba(124, 58, 237,0.12)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          color: "#c084fc",
          fontSize: 14,
          fontWeight: 800,
          border: "1px solid rgba(124, 58, 237,0.2)",
          cursor: "pointer",
        }} className="widget-btn">
          {tr.btnUpgrade}
        </button>
      </div>
    </UseCaseWidgetPreview>
  );
}
