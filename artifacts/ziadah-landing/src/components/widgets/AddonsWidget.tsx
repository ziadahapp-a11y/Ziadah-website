import { useState, useEffect } from "react";
import UseCaseWidgetPreview from "../UseCaseWidgetPreview";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";

export default function AddonsWidget() {
  const t = useSiteT();
  const { lang } = useLanguage();
  const tr = t[lang].widgets.addons;

  const [checked, setChecked] = useState<boolean[]>(() => tr.items.map(item => item.checked));

  useEffect(() => {
    setChecked(tr.items.map(item => item.checked));
  }, [lang]);

  const toggle = (idx: number) => {
    setChecked(prev => prev.map((c, i) => i === idx ? !c : c));
  };

  const total = tr.items.reduce((s, a, i) => checked[i] ? s + a.price : s, 0);

  return (
    <UseCaseWidgetPreview title={tr.title} subtitle={tr.subtitle}>
      <div style={{ marginBottom: 10 }}>
        <div
          style={{ fontSize: 10, color: "var(--td)", marginBottom: 8 }}
          className="mt-[8px] text-[9px]">{tr.descLabel}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {tr.items.map((a, i) => (
            <div key={i} onClick={() => toggle(i)} style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "8px 10px",
              borderRadius: 10,
              background: checked[i] ? "rgba(124,58,237,.15)" : "var(--s1)",
              border: checked[i] ? "1.5px solid rgba(124,58,237,.4)" : "1.5px solid var(--b1)",
              cursor: "pointer",
              transition: "all .2s ease",
            }}>
              <div style={{
                width: 17,
                height: 17,
                borderRadius: 5,
                background: checked[i] ? "rgba(124,58,237,0.5)" : "var(--b1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all .2s ease",
              }}>
                {checked[i] && <span style={{ color: "#fff", fontSize: 9, fontWeight: 900 }}>✓</span>}
              </div>
              <span style={{ fontSize: 14 }}>{a.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: checked[i] ? "#c084fc" : "var(--tm)" }}>{a.name}</div>
              </div>
              <div style={{ fontSize: 11, fontWeight: 800, color: checked[i] ? "#c084fc" : "var(--td)" }}>+{a.price}{tr.currency}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{
        padding: "8px 12px",
        borderRadius: 10,
        background: "rgba(124,58,237,.1)",
        border: "1px solid rgba(124,58,237,.25)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
      }}>
        <span style={{ fontSize: 10, color: "var(--tm)" }}>{tr.totalLabel}</span>
        <span style={{ fontSize: 13, fontWeight: 800, color: "#c084fc" }}>+{total}{tr.currency}</span>
      </div>
      <button style={{
        width: "100%",
        padding: "9px",
        borderRadius: 10,
        background: "rgba(124,58,237,0.12)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        color: "#c084fc",
        fontSize: 14,
        fontWeight: 800,
        border: "1px solid rgba(124,58,237,0.2)",
        cursor: "pointer",
      }} className="widget-btn">
        {tr.btnAdd}
      </button>
    </UseCaseWidgetPreview>
  );
}
