import UseCaseWidgetPreview from "../UseCaseWidgetPreview";

export default function CrossSellWidget() {
  const suggestions = [
    { emoji: "📱", name: "غلاف حماية للهاتف", price: "٣٩", origPrice: "٥٩", badge: "الأكثر شراءً معه" },
    { emoji: "🛡️", name: "واقي شاشة زجاجي", price: "١٥", origPrice: null, badge: null },
    { emoji: "🔋", name: "شاحن لاسلكي سريع", price: "٦٥", origPrice: "٨٥", badge: null },
  ];

  return (
    <UseCaseWidgetPreview title="منتجات يشتريها الآخرون معه" subtitle="كملّ طلبك بهذه المنتجات">
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", marginBottom: 8 }}>عملاء اشتروا هذا اشتروا أيضاً:</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {suggestions.map((s, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "9px 10px",
              borderRadius: 10,
              background: i === 0 ? "rgba(124,58,237,.15)" : "rgba(255,255,255,.05)",
              border: i === 0 ? "1.5px solid rgba(168,85,247,.4)" : "1.5px solid rgba(255,255,255,.1)",
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
                <div style={{ fontSize: 10, fontWeight: 600, color: "#fff" }}>{s.name}</div>
                {s.badge && (
                  <div style={{ fontSize: 8, padding: "1px 6px", borderRadius: 20, background: "rgba(6,182,212,.2)", color: "#06b6d4", fontWeight: 700, display: "inline-block", marginTop: 2 }}>{s.badge}</div>
                )}
                <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 2 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#c084fc" }}>﷼{s.price}</span>
                  {s.origPrice && <span style={{ fontSize: 9, color: "rgba(255,255,255,.3)", textDecoration: "line-through" }}>﷼{s.origPrice}</span>}
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
              }} className="widget-btn-sm">أضف</button>
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
        أضف المختارة للسلة — وفّر ٢٠ ⃁
      </button>
    </UseCaseWidgetPreview>
  );
}
