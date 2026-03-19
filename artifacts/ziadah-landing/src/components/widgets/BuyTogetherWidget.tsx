import { useState } from "react";
import UseCaseWidgetPreview from "../UseCaseWidgetPreview";

const initialProducts = [
  {
    emoji: "👕",
    name: "Men's Flannel Shirt",
    reviews: "4.95 ⭐ · 4,681 reviews",
    price: 240,
    originalPrice: null as number | null,
    checked: true,
    tag: "This product",
  },
  {
    emoji: "👟",
    name: "Loewy On Running Cloud Shoe",
    reviews: "4.95 ⭐ · 4,984 reviews",
    price: 2451,
    originalPrice: 3154,
    checked: true,
    tag: null as string | null,
  },
];

export default function BuyTogetherWidget() {
  const [products, setProducts] = useState(initialProducts);

  const toggle = (idx: number) => {
    setProducts(prev => prev.map((p, i) => i === idx ? { ...p, checked: !p.checked } : p));
  };

  const total = products.filter(p => p.checked).reduce((s, p) => s + p.price, 0);

  return (
    <UseCaseWidgetPreview title="Frequently Bought Together" subtitle="Bought together">
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", marginBottom: 10 }}>Products customers love together</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {products.map((p, i) => (
            <div key={i} onClick={() => toggle(i)} style={{
              display: "flex",
              gap: 10,
              padding: "10px",
              borderRadius: 12,
              background: p.checked ? "rgba(124,58,237,.12)" : "rgba(255,255,255,.06)",
              border: p.checked ? "1.5px solid rgba(168,85,247,.4)" : "1.5px solid rgba(255,255,255,.12)",
              alignItems: "center",
              cursor: "pointer",
              transition: "all .2s ease",
            }}>
              <div style={{
                width: 18,
                height: 18,
                borderRadius: 5,
                background: p.checked ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all .2s ease",
              }}>
                {p.checked && <span style={{ color: "#fff", fontSize: 10, fontWeight: 900 }}>✓</span>}
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
                <div style={{ fontSize: 10, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{p.name}</div>
                <div style={{ fontSize: 9, color: "#f59e0b", marginTop: 1 }}>{p.reviews}</div>
                <div style={{ display: "flex", gap: 5, alignItems: "center", marginTop: 2 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>SAR {p.price}</span>
                  {p.originalPrice && <span style={{ fontSize: 9, color: "rgba(255,255,255,.35)", textDecoration: "line-through" }}>SAR {p.originalPrice}</span>}
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
        Buy the complete bundle — SAR {total}
      </button>
    </UseCaseWidgetPreview>
  );
}
