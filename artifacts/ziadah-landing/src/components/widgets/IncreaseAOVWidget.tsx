import UseCaseWidgetPreview from "../UseCaseWidgetPreview";

export default function IncreaseAOVWidget() {
  const progress = 62;

  return (
    <UseCaseWidgetPreview title="رفع متوسط الطلب" subtitle="أضف منتجاً وزد توفيرك">
      <div style={{ marginBottom: 12 }}>
        <div style={{
          padding: "11px 14px",
          borderRadius: 12,
          background: "rgba(124,58,237,.12)",
          border: "1.5px solid rgba(124,58,237,.3)",
          marginBottom: 10,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#fff" }}>🚚 شحن مجاني عند ٣٠٠ ⃁</span>
            <span style={{ fontSize: 9, color: "#c084fc", fontWeight: 700 }}>باقي ١١٤ ⃁</span>
          </div>
          <div style={{ height: 6, borderRadius: 10, background: "rgba(255,255,255,.12)", overflow: "hidden", marginBottom: 3 }}>
            <div style={{ height: "100%", width: `${progress}%`, borderRadius: 10, background: "linear-gradient(90deg, #7c3aed, #a855f7)" }} />
          </div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,.4)", textAlign: "center" }}>
            ٦٢٪ من عتبة الشحن المجاني
          </div>
        </div>

        <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", marginBottom: 7 }}>منتجات مقترحة لإكمال الطلب:</div>
        {[
          { emoji: "🧴", name: "بلسم شعر مرطّب", price: "٦٥", origPrice: "٨٥" },
          { emoji: "🪥", name: "فرشاة تدليك الشعر", price: "٤٩", origPrice: "٦٩" },
        ].map((p, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            padding: "8px 10px",
            borderRadius: 10,
            background: "rgba(255,255,255,.06)",
            border: "1.5px solid rgba(255,255,255,.1)",
            marginBottom: 6,
          }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "rgba(168,85,247,.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              flexShrink: 0,
            }}>{p.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#fff" }}>{p.name}</div>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#c084fc" }}>﷼{p.price}</span>
                <span style={{ fontSize: 9, color: "rgba(255,255,255,.3)", textDecoration: "line-through" }}>﷼{p.origPrice}</span>
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
            }} className="widget-btn-sm">+ أضف</button>
          </div>
        ))}
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
        ✨ أضف منتجاً واحداً فقط للوصول للشحن المجاني!
      </div>
    </UseCaseWidgetPreview>
  );
}
