import { useState } from "react";
import UseCaseWidgetPreview from "../UseCaseWidgetPreview";

const initialAddons = [
  { emoji: "📱", name: "غلاف حماية للهاتف", price: 39, checked: true },
  { emoji: "🔋", name: "شاحن لاسلكي سريع", price: 65, checked: false },
  { emoji: "🎧", name: "سماعة لاسلكية", price: 89, checked: true },
  { emoji: "🛡️", name: "واقي شاشة زجاجي", price: 15, checked: false },
];

export default function AddonsWidget() {
  const [addons, setAddons] = useState(initialAddons);

  const toggle = (idx: number) => {
    setAddons(prev => prev.map((a, i) => i === idx ? { ...a, checked: !a.checked } : a));
  };

  const total = addons.filter(a => a.checked).reduce((s, a) => s + a.price, 0);

  return (
    <UseCaseWidgetPreview title="إضافات مكملة للمنتج" subtitle="لاتنسَ تضيف المجموعة كاملة">
      <div style={{ marginBottom: 10 }}>
        <div
          style={{ fontSize: 14, color: "rgba(255,255,255,.45)", marginBottom: 8 }}
          className="mt-[8px] text-[9px]">إضافات تكميلية للمنتج</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {addons.map((a, i) => (
            <div key={i} onClick={() => toggle(i)} style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "8px 10px",
              borderRadius: 10,
              background: a.checked ? "rgba(124,58,237,.15)" : "rgba(255,255,255,.05)",
              border: a.checked ? "1.5px solid rgba(124,58,237,.4)" : "1.5px solid rgba(255,255,255,.1)",
              cursor: "pointer",
              transition: "all .2s ease",
            }}>
              <div style={{
                width: 17,
                height: 17,
                borderRadius: 5,
                background: a.checked ? "#7c3aed" : "rgba(255,255,255,.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all .2s ease",
              }}>
                {a.checked && <span style={{ color: "#fff", fontSize: 14, fontWeight: 900 }}>✓</span>}
              </div>
              <span style={{ fontSize: 14 }}>{a.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: a.checked ? "#fff" : "rgba(255,255,255,.7)" }}>{a.name}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: a.checked ? "#c084fc" : "rgba(255,255,255,.35)" }}>+{a.price} ⃁</div>
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
        <span style={{ fontSize: 14, color: "rgba(255,255,255,.5)" }}>الإجمالي مع الإضافات</span>
        <span style={{ fontSize: 14, fontWeight: 800, color: "#c084fc" }}>+{total} ر</span>
      </div>
      <button style={{
        width: "100%",
        padding: "9px",
        borderRadius: 10,
        background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)",
        color: "#fff",
        fontSize: 14,
        fontWeight: 800,
        border: "none",
        cursor: "pointer",
      }} className="widget-btn">
        أضف الإضافات المختارة للسلة
      </button>
    </UseCaseWidgetPreview>
  );
}
