import { useState, useEffect, useMemo } from "react";
import UseCaseWidgetPreview from "../UseCaseWidgetPreview";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { Editable } from "@/cms/components/Editable";
import { cmsKey } from "@/cms/cmsKeys";
import type { BuyTogetherDemo } from "@/data/sectorWidgetShowcaseDemos";
import { mergeShowcaseDemo } from "@/data/sectorWidgetShowcaseDemos";

export default function BuyTogetherWidget({ demo }: { demo?: BuyTogetherDemo }) {
  const t = useSiteT();
  const { lang } = useLanguage();
  const tr = useMemo(
    () => mergeShowcaseDemo(t[lang].widgets.buyTogether, demo),
    [t, lang, demo],
  );

  const [checked, setChecked] = useState<boolean[]>(() => tr.items.map(item => item.checked));

  useEffect(() => {
    setChecked(tr.items.map(item => item.checked));
  }, [tr.items]);

  const toggle = (idx: number) => {
    setChecked(prev => prev.map((c, i) => i === idx ? !c : c));
  };

  const total = tr.items.reduce((s, p, i) => checked[i] ? s + p.price : s, 0);

  return (
    <UseCaseWidgetPreview
      title={
        <Editable contentKey={cmsKey(lang, "widgets", "buyTogether", "title")} label="Buy together title" type="text">
          {tr.title}
        </Editable>
      }
      subtitle={
        <Editable contentKey={cmsKey(lang, "widgets", "buyTogether", "subtitle")} label="Buy together subtitle" type="text">
          {tr.subtitle}
        </Editable>
      }
    >
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 10, color: "var(--td)", marginBottom: 10 }}>{tr.descLabel}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {tr.items.map((p, i) => (
            <div key={i} onClick={() => toggle(i)} style={{
              display: "flex",
              gap: 10,
              padding: "10px",
              borderRadius: 12,
              background: checked[i] ? "linear-gradient(135deg, rgba(124,58,237,.2), rgba(124,58,237,.08))" : "rgba(255,255,255,0.04)",
              border: checked[i] ? "1.5px solid rgba(168,85,247,.48)" : "1.5px solid rgba(255,255,255,0.09)",
              alignItems: "center",
              cursor: "pointer",
              transition: "all .22s ease",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
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
                background: "linear-gradient(135deg, rgba(124,58,237,.24), rgba(124,58,237,.08))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                flexShrink: 0,
                border: "1px solid rgba(168,85,247,.26)",
              }}>{p.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--t)", lineHeight: 1.3 }}>{p.name}</div>
                <div style={{ fontSize: 9, color: "#f59e0b", marginTop: 1 }}>{p.reviews}</div>
                <div style={{ display: "flex", gap: 5, alignItems: "center", marginTop: 2 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "var(--t)" }}>{tr.currency}{p.price}</span>
                  {p.originalPrice && <span style={{ fontSize: 9, color: "var(--td)", textDecoration: "line-through" }}>{tr.currency}{p.originalPrice}</span>}
                </div>
              </div>
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
