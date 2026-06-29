import UseCaseWidgetPreview from "../UseCaseWidgetPreview";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";

export default function CategoryPageWidget() {
  const t = useSiteT();
  const { lang } = useLanguage();
  const tr = t[lang].widgets.categoryPage;

  return (
    <UseCaseWidgetPreview title={tr.title} subtitle={tr.subtitle}>
      <div style={{ marginBottom: 8 }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 10,
          padding: "6px 10px",
          borderRadius: 8,
          background: "rgba(34, 197, 125,.1)",
          border: "1px solid rgba(34, 197, 125,.2)",
        }}>
          <span style={{ fontSize: 12 }}>🎯</span>
          <span style={{ fontSize: 12, color: "#6ee7b7", fontWeight: 700 }}>{tr.sortedLabel}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {tr.products.map((p, i) => (
            <div key={i} style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              padding: "9px 10px",
              borderRadius: 12,
              background: p.hot ? "rgba(34, 197, 125,.15)" : "var(--s1)",
              border: p.hot ? "1.5px solid rgba(52, 211, 153,.4)" : "1.5px solid var(--b1)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: p.hot ? "rgba(52, 211, 153,.2)" : "var(--s2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  flexShrink: 0,
                }}>{p.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--t)" }}>{p.name}</div>
                  {p.badge && (
                    <div style={{
                      fontSize: 12,
                      padding: "1px 6px",
                      borderRadius: 20,
                      background: p.hot ? "rgba(52, 211, 153,.25)" : "rgba(6,182,212,.2)",
                      color: p.hot ? "#6ee7b7" : "#06b6d4",
                      fontWeight: 700,
                      display: "inline-block",
                      marginTop: 2,
                    }}>{p.badge}</div>
                  )}
                  <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 2 }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: p.hot ? "#6ee7b7" : "var(--t)" }}>{tr.currency}{p.price}</span>
                    {p.origPrice && <span style={{ fontSize: 12, color: "var(--td)", textDecoration: "line-through" }}>{tr.currency}{p.origPrice}</span>}
                  </div>
                </div>
              </div>
              <button style={{
                width: "100%",
                padding: "7px 10px",
                borderRadius: 10,
                background: p.hot ? "rgba(34, 197, 125,0.2)" : "var(--s2)",
                color: p.hot ? "#6ee7b7" : "var(--t)",
                fontSize: 12,
                fontWeight: 800,
                border: p.hot ? "1px solid rgba(34, 197, 125,0.2)" : "1px solid var(--b1)",
                cursor: "pointer",
              }} className="widget-btn-sm">{tr.btnCart}</button>
            </div>
          ))}
        </div>
      </div>
    </UseCaseWidgetPreview>
  );
}
