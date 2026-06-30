import { useMemo } from "react";
import UseCaseWidgetPreview from "../UseCaseWidgetPreview";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { Editable } from "@/cms/components/Editable";
import { cmsKey } from "@/cms/cmsKeys";
import type { RelatedProductsDemo } from "@/data/sectorWidgetShowcaseDemos";
import { mergeShowcaseDemo } from "@/data/sectorWidgetShowcaseDemos";

export default function RelatedProductsWidget({ demo }: { demo?: RelatedProductsDemo }) {
  const t = useSiteT();
  const { lang } = useLanguage();
  const tr = useMemo(
    () => mergeShowcaseDemo(t[lang].widgets.relatedProducts, demo),
    [t, lang, demo],
  );

  return (
    <UseCaseWidgetPreview
      title={
        <Editable contentKey={cmsKey(lang, "widgets", "relatedProducts", "title")} label="Related products title" type="text">
          {tr.title}
        </Editable>
      }
      subtitle={
        <Editable contentKey={cmsKey(lang, "widgets", "relatedProducts", "subtitle")} label="Related products subtitle" type="text">
          {tr.subtitle}
        </Editable>
      }
    >
      <div style={{ marginBottom: 10 }}>
        <div
          style={{ fontSize: 12, color: "var(--td)", marginBottom: 8 }}
          className="mt-[5px] text-[12px]">{tr.descLabel}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {tr.products.map((p, i) => (
            <div key={i} style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              padding: "10px",
              borderRadius: 12,
              background: "var(--s1)",
              border: "1.5px solid var(--b1)",
            }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "rgba(22, 163, 74,.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  flexShrink: 0,
                }}>{p.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--t)", lineHeight: 1.3 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "#f59e0b", marginTop: 1 }}>{p.reviews}</div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "#c084fc", marginTop: 2 }}>{tr.currency}{p.price}</div>
                </div>
              </div>
              <button style={{
                width: "100%",
                padding: "7px 12px",
                borderRadius: 10,
                background: "rgba(22, 163, 74,0.12)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                color: "#c084fc",
                fontSize: 12,
                fontWeight: 800,
                border: "1px solid rgba(22, 163, 74,0.2)",
                cursor: "pointer",
              }} className="widget-btn-sm">
                {tr.btnAdd}
              </button>
            </div>
          ))}
        </div>
      </div>
    </UseCaseWidgetPreview>
  );
}
