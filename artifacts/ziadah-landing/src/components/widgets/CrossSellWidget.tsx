import UseCaseWidgetPreview from "../UseCaseWidgetPreview";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";

type ProductLayout = "column" | "row";

type CrossSellWidgetProps = {
  /** Row lays suggestions horizontally (e.g. beside copy on use-case pages) */
  productLayout?: ProductLayout;
  previewMaxWidth?: number;
};

export default function CrossSellWidget({
  productLayout = "column",
  previewMaxWidth,
}: CrossSellWidgetProps) {
  const t = useSiteT();
  const { lang } = useLanguage();
  const tr = t[lang].widgets.crossSell;
  const rowProducts = productLayout === "row";

  return (
    <UseCaseWidgetPreview title={tr.title} subtitle={tr.subtitle} maxWidth={previewMaxWidth}>
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 12, color: "var(--td)", marginBottom: 8 }}>{tr.descLabel}</div>
        <div
          style={{
            display: "flex",
            flexDirection: rowProducts ? "row" : "column",
            flexWrap: rowProducts ? "wrap" : "nowrap",
            gap: rowProducts ? 8 : 7,
            justifyContent: rowProducts ? "center" : undefined,
          }}
        >
          {tr.products.map((s, i) => (
            <div key={i} style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              padding: rowProducts ? "8px 8px" : "9px 10px",
              borderRadius: 10,
              background: i === 0 ? "rgba(34, 197, 125,.15)" : "var(--s1)",
              border: i === 0 ? "1.5px solid rgba(52, 211, 153,.4)" : "1.5px solid var(--b1)",
              ...(rowProducts
                ? {
                    flex: "1 1 124px",
                    minWidth: 112,
                    maxWidth: "calc((100% - 16px) / 3)",
                  }
                : { width: "100%" }),
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: rowProducts ? 6 : 9,
                flexDirection: rowProducts ? "column" : "row",
                textAlign: rowProducts ? "center" : undefined,
              }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "rgba(34, 197, 125,.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  flexShrink: 0,
                }}>{s.emoji}</div>
                <div style={{ flex: rowProducts ? undefined : 1, width: rowProducts ? "100%" : undefined, minWidth: 0 }}>
                  <div style={{ fontSize: rowProducts ? 11 : 12, fontWeight: 600, color: "var(--t)", lineHeight: 1.35 }}>{s.name}</div>
                  {s.badge && (
                    <div style={{ fontSize: 12, padding: "1px 6px", borderRadius: 20, background: "rgba(6,182,212,.2)", color: "#06b6d4", fontWeight: 700, display: "inline-block", marginTop: 2 }}>{s.badge}</div>
                  )}
                  <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 2 }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: "#6ee7b7" }}>{tr.currency}{s.price}</span>
                    {s.origPrice && <span style={{ fontSize: 12, color: "var(--td)", textDecoration: "line-through" }}>{tr.currency}{s.origPrice}</span>}
                  </div>
                </div>
              </div>
              <button style={{
                width: "100%",
                padding: "6px 10px",
                borderRadius: 10,
                background: "rgba(34, 197, 125,.25)",
                color: "#6ee7b7",
                fontSize: 12,
                fontWeight: 800,
                border: "1px solid rgba(52, 211, 153,.3)",
                cursor: "pointer",
              }} className="widget-btn-sm">{tr.btnAdd}</button>
            </div>
          ))}
        </div>
      </div>
      <button style={{
        width: "100%",
        padding: "9px",
        borderRadius: 12,
        background: "rgba(34, 197, 125,0.12)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        color: "#6ee7b7",
        fontSize: 14,
        fontWeight: 800,
        border: "1px solid rgba(34, 197, 125,0.2)",
        cursor: "pointer",
      }} className="widget-btn">
        {tr.btnCart}
      </button>
    </UseCaseWidgetPreview>
  );
}
