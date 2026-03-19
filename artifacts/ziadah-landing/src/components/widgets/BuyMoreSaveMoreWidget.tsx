import { useState } from "react";
import UseCaseWidgetPreview from "../UseCaseWidgetPreview";
import { useLanguage } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";

export default function BuyMoreSaveMoreWidget() {
  const { lang } = useLanguage();
  const tr = t[lang].widgets.buyMoreSaveMore;

  const [selected, setSelected] = useState(1);

  return (
    <UseCaseWidgetPreview title={tr.title} subtitle={tr.subtitle}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: "var(--td)", marginBottom: 8 }}>{tr.descLabel}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {tr.options.map((opt, i) => {
            const isSelected = i === selected;
            return (
              <div key={i} onClick={() => setSelected(i)} style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 12px",
                borderRadius: 12,
                background: isSelected ? "rgba(124,58,237,.18)" : "var(--s1)",
                border: isSelected ? "1.5px solid rgba(168,85,247,.5)" : "1.5px solid var(--b1)",
                cursor: "pointer",
                transition: "all .2s ease",
              }}>
                <div style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  border: isSelected ? "none" : "1.5px solid var(--b2)",
                  background: isSelected ? "rgba(124,58,237,0.5)" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all .2s ease",
                }}>
                  {isSelected && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--t)" }}>{opt.qty}</div>
                  <div style={{ fontSize: 10, color: "var(--td)" }}>{opt.label}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
                  {opt.badge && (
                    <div style={{
                      fontSize: 9,
                      fontWeight: 800,
                      padding: "2px 7px",
                      borderRadius: 20,
                      background: "rgba(124,58,237,0.5)",
                      color: "var(--t)",
                    }}>{opt.badge}</div>
                  )}
                  {opt.origPrice && (
                    <div style={{ fontSize: 9, color: "var(--td)", textDecoration: "line-through" }}>{opt.origPrice}</div>
                  )}
                  <div style={{ fontSize: 13, fontWeight: 800, color: isSelected ? "#c084fc" : "var(--t)" }}>{opt.price}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{
        fontSize: 10,
        color: "#34d399",
        background: "rgba(16,185,129,.1)",
        border: "1px solid rgba(16,185,129,.25)",
        borderRadius: 8,
        padding: "6px 10px",
        textAlign: "center",
        fontWeight: 700,
      }}>
        {tr.freeShippingNote}
      </div>
    </UseCaseWidgetPreview>
  );
}
