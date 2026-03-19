import UseCaseWidgetPreview from "../UseCaseWidgetPreview";

export default function CrossSellWidget() {
  const suggestions = [
    { emoji: "📱", name: "Phone Protective Case", price: "39", origPrice: "59", badge: "Most bought with it" },
    { emoji: "🛡️", name: "Glass Screen Protector", price: "15", origPrice: null, badge: null },
    { emoji: "🔋", name: "Fast Wireless Charger", price: "65", origPrice: "85", badge: null },
  ];

  return (
    <UseCaseWidgetPreview title="Others also buy with this" subtitle="Complete your order with these products">
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 10, color: "var(--td)", marginBottom: 8 }}>Customers who bought this also bought:</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {suggestions.map((s, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "9px 10px",
              borderRadius: 10,
              background: i === 0 ? "rgba(124,58,237,.15)" : "var(--s1)",
              border: i === 0 ? "1.5px solid rgba(168,85,247,.4)" : "1.5px solid var(--b1)",
            }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "rgba(124,58,237,.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                flexShrink: 0,
              }}>{s.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "var(--t)" }}>{s.name}</div>
                {s.badge && (
                  <div style={{ fontSize: 8, padding: "1px 6px", borderRadius: 20, background: "rgba(6,182,212,.2)", color: "#06b6d4", fontWeight: 700, display: "inline-block", marginTop: 2 }}>{s.badge}</div>
                )}
                <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 2 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#c084fc" }}>SAR {s.price}</span>
                  {s.origPrice && <span style={{ fontSize: 9, color: "var(--td)", textDecoration: "line-through" }}>SAR {s.origPrice}</span>}
                </div>
              </div>
              <button style={{
                padding: "5px 10px",
                borderRadius: 20,
                background: "rgba(124,58,237,.25)",
                color: "#c084fc",
                fontSize: 9,
                fontWeight: 800,
                border: "1px solid rgba(168,85,247,.3)",
                cursor: "pointer",
                flexShrink: 0,
              }} className="widget-btn-sm">Add</button>
            </div>
          ))}
        </div>
      </div>
      <button style={{
        width: "100%",
        padding: "9px",
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
        Add selected to cart — Save 20 SAR
      </button>
    </UseCaseWidgetPreview>
  );
}
