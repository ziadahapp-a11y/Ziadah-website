import UseCaseWidgetPreview from "../UseCaseWidgetPreview";
import { useLanguage } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";

export default function RelatedProductsWidget() {
  const { lang } = useLanguage();
  const tr = t[lang].widgets.relatedProducts;

  return (
    <UseCaseWidgetPreview title={tr.title} subtitle={tr.subtitle}>
      <div style={{ marginBottom: 10 }}>
        <div
          style={{ fontSize: 10, color: "var(--td)", marginBottom: 8 }}
          className="mt-[5px] text-[10px]">{tr.descLabel}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {tr.products.map((p, i) => (
            <div key={i} style={{
              display: "flex",
              gap: 10,
              padding: "10px",
              borderRadius: 12,
              background: "var(--s1)",
              border: "1.5px solid var(--b1)",
              alignItems: "center",
            }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "rgba(124,58,237,.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                flexShrink: 0,
              }}>{p.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--t)", lineHeight: 1.3 }}>{p.name}</div>
                <div style={{ fontSize: 9, color: "#f59e0b", marginTop: 1 }}>{p.reviews}</div>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#c084fc", marginTop: 2 }}>{tr.currency}{p.price}</div>
              </div>
              <button style={{
                padding: "6px 12px",
                borderRadius: 20,
                background: "rgba(124,58,237,0.12)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                color: "#c084fc",
                fontSize: 14,
                fontWeight: 800,
                border: "1px solid rgba(124,58,237,0.2)",
                cursor: "pointer",
                flexShrink: 0,
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
