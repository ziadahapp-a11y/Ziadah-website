import UseCaseWidgetPreview from "../UseCaseWidgetPreview";

export default function BundleDealsWidget() {
  const bundle = [
    { emoji: "💄", name: "غسول وجه", origPrice: "79", price: "—" },
    { emoji: "✨", name: "سيروم فيتامين C", origPrice: "99", price: "—" },
    { emoji: "🧴", name: "مرطب بشرة SPF", origPrice: "71", price: "—" },
  ];

  return (
    <UseCaseWidgetPreview title="حزمة روتين الصباح" subtitle="وفّر 50 ريال على المجموعة">
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)", marginBottom: 10 }}>محتويات الحزمة:</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {bundle.map((item, i) => (
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
                background: "rgba(168,85,247,.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                flexShrink: 0,
              }}>{item.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#fff" }}>{item.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,.35)", textDecoration: "line-through" }}>﷼{item.origPrice}</span>
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
                <span style={{ color: "#fff", fontSize: 9, fontWeight: 900 }}>✓</span>
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
          <div style={{ fontSize: 9, color: "rgba(255,255,255,.5)" }}>المجموع الأصلي</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", textDecoration: "line-through", fontWeight: 700 }}>﷼249</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontSize: 10,
            fontWeight: 800,
            padding: "3px 10px",
            borderRadius: 20,
            background: "rgba(124,58,237,0.3)",
            color: "#c084fc",
          }}>وفّر 50 ريال</div>
        </div>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,.5)" }}>سعر الحزمة</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: "#c084fc" }}>﷼199</div>
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
        🎁 أضف الحزمة للسلة
      </button>
    </UseCaseWidgetPreview>
  );
}
