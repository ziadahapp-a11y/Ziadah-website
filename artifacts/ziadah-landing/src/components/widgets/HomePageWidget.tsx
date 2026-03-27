import UseCaseWidgetPreview from "../UseCaseWidgetPreview";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";

export default function HomePageWidget() {
  const t = useSiteT();
  const { lang } = useLanguage();
  const tr = t[lang].widgets.homePage;

  return (
    <UseCaseWidgetPreview title={tr.title} subtitle={tr.subtitle}>
      <div style={{ marginBottom: 10 }}>
        <div style={{
          padding: "10px 12px",
          borderRadius: 12,
          background: "rgba(124,58,237,.12)",
          border: "1.5px solid rgba(124,58,237,.3)",
          marginBottom: 10,
        }}>
          <div style={{ fontSize: 9, color: "var(--tm)", marginBottom: 5 }}>{tr.leftLastVisit}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "rgba(168,85,247,.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                flexShrink: 0,
              }}>👟</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--t)" }}>{tr.productName}</div>
                <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 2 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#c084fc" }}>{tr.productPrice}</span>
                  <span style={{ fontSize: 9, color: "var(--td)", textDecoration: "line-through" }}>{tr.productOrigPrice}</span>
                </div>
              </div>
            </div>
            <button style={{
              width: "100%",
              padding: "7px 10px",
              borderRadius: 10,
              background: "rgba(124,58,237,0.12)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              color: "#c084fc",
              fontSize: 11,
              fontWeight: 800,
              border: "1px solid rgba(124,58,237,0.2)",
              cursor: "pointer",
            }} className="widget-btn-sm">{tr.btnAdd}</button>
          </div>
        </div>

        <div style={{
          display: "flex",
          gap: 4,
          alignItems: "center",
          padding: "6px 10px",
          borderRadius: 8,
          background: "rgba(239,68,68,.08)",
          border: "1px solid rgba(239,68,68,.2)",
          marginBottom: 10,
        }}>
          <span style={{ fontSize: 12 }}>⏱️</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9, color: "#f87171", fontWeight: 700 }}>{tr.offerExpires}</div>
            <div style={{ fontSize: 11, fontWeight: 900, color: "var(--t)" }}>02:47:13</div>
          </div>
        </div>

        <div style={{ fontSize: 9, color: "var(--td)", marginBottom: 7 }}>{tr.topSellersLabel}</div>
        <div style={{ display: "flex", gap: 7 }}>
          {tr.miniProducts.map((p, i) => (
            <div key={i} style={{
              flex: 1,
              padding: "8px",
              borderRadius: 10,
              background: "var(--s1)",
              border: "1.5px solid var(--b1)",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 20, marginBottom: 3 }}>{p.emoji}</div>
              <div style={{ fontSize: 9, color: "var(--t)", fontWeight: 600, marginBottom: 2 }}>{p.name}</div>
              <div style={{ fontSize: 10, fontWeight: 800, color: "#c084fc" }}>{tr.currency}{p.price}</div>
            </div>
          ))}
        </div>
      </div>
    </UseCaseWidgetPreview>
  );
}
