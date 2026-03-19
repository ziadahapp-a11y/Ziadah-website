import UseCaseWidgetPreview from "../UseCaseWidgetPreview";

export default function BundleDealsWidget() {
  const bundle = [
    { emoji: "💄", name: "Face Wash", origPrice: "79", price: "—" },
    { emoji: "✨", name: "Vitamin C Serum", origPrice: "99", price: "—" },
    { emoji: "🧴", name: "SPF Moisturizer", origPrice: "71", price: "—" },
  ];

  return (
    <UseCaseWidgetPreview title="Morning Routine Bundle" subtitle="Save 50 SAR on the complete set">
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: "var(--tm)", marginBottom: 10 }}>Bundle contents:</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {bundle.map((item, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "8px 10px",
              borderRadius: 10,
              background: "var(--s1)",
              border: "1.5px solid var(--b1)",
            }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "rgba(168,85,247,.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                flexShrink: 0,
              }}>{item.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "var(--t)" }}>{item.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ fontSize: 9, color: "var(--td)", textDecoration: "line-through" }}>SAR {item.origPrice}</span>
                </div>
              </div>
              <div style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "rgba(124,58,237,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <span style={{ color: "var(--t)", fontSize: 9, fontWeight: 900 }}>✓</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        padding: "10px 14px",
        borderRadius: 12,
        background: "rgba(124,58,237,.12)",
        border: "1.5px solid rgba(168,85,247,.4)",
        marginBottom: 10,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div>
          <div style={{ fontSize: 9, color: "var(--tm)" }}>Original total</div>
          <div style={{ fontSize: 11, color: "var(--td)", textDecoration: "line-through", fontWeight: 700 }}>SAR 249</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontSize: 10,
            fontWeight: 800,
            padding: "3px 10px",
            borderRadius: 20,
            background: "rgba(124,58,237,0.3)",
            color: "#c084fc",
          }}>Save 50 SAR</div>
        </div>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontSize: 9, color: "var(--tm)" }}>Bundle price</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: "#c084fc" }}>SAR 199</div>
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
        🎁 Add Bundle to Cart
      </button>
    </UseCaseWidgetPreview>
  );
}
