import { useMemo } from "react";
import UseCaseWidgetPreview from "../UseCaseWidgetPreview";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { Editable } from "@/cms/components/Editable";
import { cmsKey } from "@/cms/cmsKeys";
import type { FreeShippingDemo } from "@/data/sectorWidgetShowcaseDemos";
import { mergeShowcaseDemo } from "@/data/sectorWidgetShowcaseDemos";

export default function FreeShippingThresholdWidget({ demo }: { demo?: FreeShippingDemo }) {
  const t = useSiteT();
  const { lang } = useLanguage();
  const tr = useMemo(
    () => mergeShowcaseDemo(t[lang].widgets.freeShipping, demo),
    [t, lang, demo],
  );

  const progress = 69;

  return (
    <UseCaseWidgetPreview
      title={
        <Editable contentKey={cmsKey(lang, "widgets", "freeShipping", "title")} label="Free shipping title" type="text">
          {tr.title}
        </Editable>
      }
      subtitle={
        <Editable contentKey={cmsKey(lang, "widgets", "freeShipping", "subtitle")} label="Free shipping subtitle" type="text">
          {tr.subtitle}
        </Editable>
      }
    >
      <div style={{ marginBottom: 12 }}>
        <div style={{
          padding: "10px 12px",
          borderRadius: 10,
          background: "rgba(34, 197, 125,.12)",
          border: "1.5px solid rgba(34, 197, 125,.3)",
          marginBottom: 12,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--t)" }}>{tr.progressTitle}</span>
            <span style={{ fontSize: 12, color: "#6ee7b7", fontWeight: 700 }}>{tr.remainingLabel}</span>
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
              background: "linear-gradient(90deg, rgba(34, 197, 125,0.6), rgba(52, 211, 153,0.5))",
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
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "rgba(245,158,11,.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                flexShrink: 0,
              }}>{p.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--t)" }}>{p.name}</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#6ee7b7" }}>{tr.currency}{p.price}</div>
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
