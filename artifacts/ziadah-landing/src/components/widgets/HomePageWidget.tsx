import UseCaseWidgetPreview from "../UseCaseWidgetPreview";

export default function HomePageWidget() {
  return (
    <UseCaseWidgetPreview title="مرحباً بعودتك 👋" subtitle="متجر مخصص لك">
      <div style={{ marginBottom: 10 }}>
        <div style={{
          padding: "10px 12px",
          borderRadius: 12,
          background: "rgba(124,58,237,.12)",
          border: "1.5px solid rgba(124,58,237,.3)",
          marginBottom: 10,
        }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,.5)", marginBottom: 5 }}>تركتها في آخر زيارة:</div>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "rgba(168,85,247,.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              flexShrink: 0,
            }}>👟</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#fff" }}>حذاء جري Ultraboost</div>
              <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 2 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#c084fc" }}>﷼٤٩٩</span>
                <span style={{ fontSize: 9, color: "rgba(255,255,255,.3)", textDecoration: "line-through" }}>﷼٦٤٩</span>
              </div>
            </div>
            <button style={{
              padding: "5px 10px",
              borderRadius: 20,
              background: "#7c3aed",
              color: "#fff",
              fontSize: 9,
              fontWeight: 800,
              border: "none",
              cursor: "pointer",
              flexShrink: 0,
            }} className="widget-btn-sm">أضف</button>
          </div>
        </div>

        <div style={{
          display: "flex",
          gap: 4,
          alignItems: "center",
          padding: "6px 10px",
          borderRadius: 8,
          background: "rgba(239,68,68,.08)",
          border: "1px solid rgba(239,68,68,.2)",
          marginBottom: 10,
        }}>
          <span style={{ fontSize: 12 }}>⏱️</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9, color: "#f87171", fontWeight: 700 }}>هذا العرض ينتهي خلال</div>
            <div style={{ fontSize: 11, fontWeight: 900, color: "#fff" }}>٠٢:٤٧:١٣</div>
          </div>
        </div>

        <div style={{ fontSize: 9, color: "rgba(255,255,255,.4)", marginBottom: 7 }}>الأكثر مبيعاً في فئاتك:</div>
        <div style={{ display: "flex", gap: 7 }}>
          {[
            { emoji: "🧢", name: "كاب رياضي", price: "٨٩" },
            { emoji: "🎽", name: "تيشيرت رياضي", price: "١٢٩" },
          ].map((p, i) => (
            <div key={i} style={{
              flex: 1,
              padding: "8px",
              borderRadius: 10,
              background: "rgba(255,255,255,.06)",
              border: "1.5px solid rgba(255,255,255,.1)",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 20, marginBottom: 3 }}>{p.emoji}</div>
              <div style={{ fontSize: 9, color: "#fff", fontWeight: 600, marginBottom: 2 }}>{p.name}</div>
              <div style={{ fontSize: 10, fontWeight: 800, color: "#c084fc" }}>﷼{p.price}</div>
            </div>
          ))}
        </div>
      </div>
    </UseCaseWidgetPreview>
  );
}
