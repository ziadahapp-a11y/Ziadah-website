import UseCaseWidgetPreview from "../UseCaseWidgetPreview";

export default function FreeShippingThresholdWidget() {
  const products = [
    { emoji: "💍", name: "سلسال ذهب بحجر ياقوت", price: "٤٥" },
    { emoji: "💎", name: "حلق ذهب بحجر ياقوت", price: "١٠٠" },
  ];

  const progress = 69;

  return (
    <UseCaseWidgetPreview title="الوصول للشحن المجاني" subtitle="أكمل للشحن المجاني">
      <div style={{ marginBottom: 12 }}>
        <div style={{
          padding: "10px 12px",
          borderRadius: 10,
          background: "linear-gradient(135deg, rgba(124,58,237,.08) 0%, rgba(124,58,237,.03) 100%)",
          border: "1.5px solid rgba(124,58,237,.2)",
          marginBottom: 12,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#111827" }}>🚚 خل الشحن مجاني</span>
            <span style={{ fontSize: 9, color: "#7c3aed", fontWeight: 700 }}>باقي ١٤٥ ꜁</span>
          </div>
          <div style={{
            height: 7,
            borderRadius: 10,
            background: "#e5e7eb",
            overflow: "hidden",
            marginBottom: 4,
          }}>
            <div style={{
              height: "100%",
              width: `${progress}%`,
              borderRadius: 10,
              background: "linear-gradient(90deg, #7c3aed, #a855f7)",
              transition: "width .5s ease",
            }} />
          </div>
          <div style={{ fontSize: 9, color: "#6b7280", textAlign: "center" }}>
            باقي ١٤٥ ꜁ للشحن، ضيف المنتجات
          </div>
        </div>
        <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 7 }}>منتجات مقترحة:</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {products.map((p, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "8px 10px",
              borderRadius: 10,
              background: "#f9fafb",
              border: "1.5px solid #e5e7eb",
            }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "rgba(245,158,11,.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                flexShrink: 0,
              }}>{p.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#111827" }}>{p.name}</div>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#7c3aed" }}>꜁{p.price}</div>
              </div>
              <div style={{
                width: 20,
                height: 20,
                borderRadius: 5,
                background: "#e5e7eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <span style={{ color: "#9ca3af", fontSize: 10, fontWeight: 900 }}>✓</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UseCaseWidgetPreview>
  );
}
