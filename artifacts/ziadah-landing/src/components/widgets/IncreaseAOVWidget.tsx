import UseCaseWidgetPreview from "../UseCaseWidgetPreview";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";

export default function IncreaseAOVWidget() {
  const t = useSiteT();
  const { lang } = useLanguage();
  const tr = t[lang].widgets.increaseAOV;

  const progress = 62;

  return (
    <UseCaseWidgetPreview title={tr.title} subtitle={tr.subtitle}>
      <div style={{ marginBottom: 12 }}>
        <div style={{
          padding: "11px 14px",
          borderRadius: 12,
          background: "rgba(124,58,237,.12)",
          border: "1.5px solid rgba(124,58,237,.3)",
          marginBottom: 10,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--t)" }}>{tr.shippingLabel}</span>
            <span style={{ fontSize: 12, color: "#c084fc", fontWeight: 700 }}>{tr.remainingLabel}</span>
          </div>
          <div style={{ height: 6, borderRadius: 10, background: "var(--s3)", overflow: "hidden", marginBottom: 3 }}>
            <div style={{ height: "100%", width: `${progress}%`, borderRadius: 10, background: "linear-gradient(90deg, rgba(124,58,237,0.6), rgba(168,85,247,0.5))" }} />
          </div>
          <div style={{ fontSize: 12, color: "var(--td)", textAlign: "center" }}>
            {tr.progressNote}
          </div>
        </div>

        <div style={{ fontSize: 12, color: "var(--td)", marginBottom: 7 }}>{tr.suggestedLabel}</div>
        {tr.products.map((p, i) => (
          <div key={i} style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "8px 10px",
            borderRadius: 10,
            background: "var(--s1)",
            border: "1.5px solid var(--b1)",
            marginBottom: 6,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "rgba(168,85,247,.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                flexShrink: 0,
              }}>{p.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--t)" }}>{p.name}</div>
                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#c084fc" }}>{tr.currency}{p.price}</span>
                  <span style={{ fontSize: 12, color: "var(--td)", textDecoration: "line-through" }}>{tr.currency}{p.origPrice}</span>
                </div>
              </div>
            </div>
            <button style={{
              width: "100%",
              padding: "6px 10px",
              borderRadius: 10,
              background: "rgba(124,58,237,.25)",
              color: "#c084fc",
              fontSize: 12,
              fontWeight: 800,
              border: "1px solid rgba(168,85,247,.3)",
              cursor: "pointer",
            }} className="widget-btn-sm">{tr.btnAdd}</button>
          </div>
        ))}
      </div>

      <div style={{
        fontSize: 12,
        color: "#34d399",
        background: "rgba(16,185,129,.1)",
        border: "1px solid rgba(16,185,129,.25)",
        borderRadius: 8,
        padding: "6px 10px",
        textAlign: "center",
        fontWeight: 700,
      }}>
        {tr.noteLabel}
      </div>
    </UseCaseWidgetPreview>
  );
}
