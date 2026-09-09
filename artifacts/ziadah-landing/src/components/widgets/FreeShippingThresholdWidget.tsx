import { useMemo } from "react";
import UseCaseWidgetPreview from "../UseCaseWidgetPreview";
import { useLanguage } from "@/i18n/LanguageContext";
import type { FreeShippingDemo } from "@/data/sectorWidgetShowcaseDemos";
import { mergeShowcaseDemo } from "@/data/sectorWidgetShowcaseDemos";
import { t as siteTranslations } from "@/i18n/translations";
import { ProductThumb } from "./ProductThumb";

export default function FreeShippingThresholdWidget({ demo }: { demo?: FreeShippingDemo }) {
  const t = siteTranslations;
  const { lang } = useLanguage();
  const tr = useMemo(
    () => mergeShowcaseDemo(t[lang].widgets.freeShipping, demo),
    [t, lang, demo],
  );

  const progress = 69;

  return (
    <UseCaseWidgetPreview
      title={tr.title}
      subtitle={tr.subtitle}
    >
      <div style={{ marginBottom: 12 }}>
        <div style={{
          padding: "10px 12px",
          borderRadius: 10,
          background: "rgba(124, 58, 237,.12)",
          border: "1.5px solid rgba(124, 58, 237,.3)",
          marginBottom: 12,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--t)" }}>{tr.progressTitle}</span>
            <span style={{ fontSize: 12, color: "currentColor", fontWeight: 700 }}>{tr.remainingLabel}</span>
          </div>
          <div style={{
            height: 7,
            borderRadius: 10,
            background: "var(--s3)",
            overflow: "hidden",
            marginBottom: 4,
          }}>
            <div style={{
              height: "100%",
              width: `${progress}%`,
              borderRadius: 10,
              background: "linear-gradient(90deg, rgba(124, 58, 237,0.6), rgba(139, 92, 246,0.5))",
              transition: "width .5s ease",
            }} />
          </div>
          <div style={{ fontSize: 12, color: "var(--td)", textAlign: "center" }}>
            {tr.progressNote}
          </div>
        </div>
        <div style={{ fontSize: 12, color: "var(--td)", marginBottom: 7 }}>{tr.suggestedLabel}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {tr.products.map((p, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "8px 10px",
              borderRadius: 10,
              background: "var(--s1)",
              border: "1.5px solid var(--b1)",
            }}>
              <ProductThumb emoji={p.emoji} size={32} radius={8} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--t)" }}>{p.name}</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: "currentColor" }}>{tr.currency}{p.price}</div>
              </div>
              <div style={{
                width: 20,
                height: 20,
                borderRadius: 5,
                background: "var(--s2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <span style={{ color: "var(--td)", fontSize: 12, fontWeight: 900 }}>✓</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UseCaseWidgetPreview>
  );
}
