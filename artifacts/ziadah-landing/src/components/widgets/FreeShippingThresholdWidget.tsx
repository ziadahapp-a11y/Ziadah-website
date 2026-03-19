import UseCaseWidgetPreview from "../UseCaseWidgetPreview";

export default function FreeShippingThresholdWidget() {
  const products = [
    { emoji: "💍", name: "Gold Chain with Ruby Stone", price: "45" },
    { emoji: "💎", name: "Gold Earrings with Ruby Stone", price: "100" },
  ];

  const progress = 69;

  return (
    <UseCaseWidgetPreview title="Reach Free Shipping" subtitle="Complete your order for free shipping">
      <div style={{ marginBottom: 12 }}>
        <div style={{
          padding: "10px 12px",
          borderRadius: 10,
          background: "rgba(124,58,237,.12)",
          border: "1.5px solid rgba(124,58,237,.3)",
          marginBottom: 12,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#fff" }}>🚚 Get free shipping</span>
            <span style={{ fontSize: 9, color: "#c084fc", fontWeight: 700 }}>145 SAR remaining</span>
          </div>
          <div style={{
            height: 7,
            borderRadius: 10,
            background: "rgba(255,255,255,.12)",
            overflow: "hidden",
            marginBottom: 4,
          }}>
            <div style={{
              height: "100%",
              width: `${progress}%`,
              borderRadius: 10,
              background: "linear-gradient(90deg, rgba(124,58,237,0.6), rgba(168,85,247,0.5))",
              transition: "width .5s ease",
            }} />
          </div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,.45)", textAlign: "center" }}>
            Add 145 SAR more for free shipping
          </div>
        </div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", marginBottom: 7 }}>Suggested products:</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {products.map((p, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "8px 10px",
              borderRadius: 10,
              background: "rgba(255,255,255,.06)",
              border: "1.5px solid rgba(255,255,255,.1)",
            }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "rgba(245,158,11,.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                flexShrink: 0,
              }}>{p.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#fff" }}>{p.name}</div>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#c084fc" }}>SAR {p.price}</div>
              </div>
              <div style={{
                width: 20,
                height: 20,
                borderRadius: 5,
                background: "rgba(255,255,255,.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <span style={{ color: "rgba(255,255,255,.4)", fontSize: 10, fontWeight: 900 }}>✓</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UseCaseWidgetPreview>
  );
}
