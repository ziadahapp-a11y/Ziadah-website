import { useState, useEffect } from "react";
import UseCaseWidgetPreview from "../UseCaseWidgetPreview";
import { useLanguage } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";

export default function BuyTogetherWidget() {
  const { lang } = useLanguage();
  const tr = t[lang].widgets.buyTogether;

  const [checked, setChecked] = useState<boolean[]>(() => tr.items.map(item => item.checked));

  useEffect(() => {
    setChecked(tr.items.map(item => item.checked));
  }, [lang]);

  const toggle = (idx: number) => {
    setChecked(prev => prev.map((c, i) => i === idx ? !c : c));
  };

  const total = tr.items.reduce((s, p, i) => checked[i] ? s + p.price : s, 0);

  return (
    <UseCaseWidgetPreview title={tr.title} subtitle={tr.subtitle}>
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 10, color: "var(--td)", marginBottom: 10 }}>{tr.descLabel}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {tr.items.map((p, i) => (
            <div key={i} onClick={() => toggle(i)} style={{
              display: "flex",
              gap: 10,
              padding: "10px",
              borderRadius: 12,
              background: checked[i] ? "rgba(124,58,237,.12)" : "var(--s1)",
              border: checked[i] ? "1.5px solid rgba(168,85,247,.4)" : "1.5px solid var(--b2)",
              alignItems: "center",
              cursor: "pointer",
              transition: "all .2s ease",
            }}>
              <div style={{
                width: 18,
                height: 18,
                borderRadius: 5,
                background: checked[i] ? "rgba(124,58,237,0.5)" : "var(--b1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all .2s ease",
              }}>
                {checked[i] && <span style={{ color: "#fff", fontSize: 10, fontWeight: 900 }}>✓</span>}
              </div>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "rgba(124,58,237,.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                flexShrink: 0,
              }}>{p.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--t)", lineHeight: 1.3 }}>{p.name}</div>
                <div style={{ fontSize: 9, color: "#f59e0b", marginTop: 1 }}>{p.reviews}</div>
                <div style={{ display: "flex", gap: 5, alignItems: "center", marginTop: 2 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "var(--t)" }}>{tr.currency}{p.price}</span>
                  {p.originalPrice && <span style={{ fontSize: 9, color: "var(--td)", textDecoration: "line-through" }}>{tr.currency}{p.originalPrice}</span>}
                </div>
              </div>
              {p.tag && <div style={{ fontSize: 8, padding: "2px 7px", borderRadius: 20, background: "rgba(124,58,237,.2)", color: "#c084fc", fontWeight: 700, flexShrink: 0 }}>{p.tag}</div>}
            </div>
          ))}
        </div>
      </div>
      <button style={{
        width: "100%",
        padding: "10px",
        borderRadius: 12,
        background: "rgba(124,58,237,0.12)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        color: "#c084fc",
        fontSize: 14,
        fontWeight: 800,
        border: "1px solid rgba(124,58,237,0.2)",
        cursor: "pointer",
      }} className="widget-btn">
        {tr.btnBuy}{total}
      </button>
    </UseCaseWidgetPreview>
  );
}
