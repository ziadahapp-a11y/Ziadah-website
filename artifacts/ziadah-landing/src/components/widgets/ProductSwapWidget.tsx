import UseCaseWidgetPreview from "../UseCaseWidgetPreview";

export default function ProductSwapWidget() {
  return (
    <UseCaseWidgetPreview title="استبدال للمنتج" subtitle="هذا المنتج أفضل لك">
      <div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", marginBottom: 10 }}>هذا المنتج أفضل لك</div>
        <div style={{
          padding: "12px",
          borderRadius: 14,
          background: "rgba(124,58,237,.1)",
          border: "1.5px solid rgba(124,58,237,.3)",
          marginBottom: 12,
        }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "2px 10px",
            borderRadius: 20,
            background: "rgba(16,185,129,.12)",
            border: "1px solid rgba(16,185,129,.3)",
            fontSize: 9,
            fontWeight: 700,
            color: "#34d399",
            marginBottom: 10,
          }}>
            ⭐ خصم خاص
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "rgba(124,58,237,.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              flexShrink: 0,
            }}>🎧</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>رأس شاحن وكيبل آيفون</div>
              <div style={{ fontSize: 9, color: "#f59e0b", marginTop: 2 }}>4.95 ⭐ · 4681 مراجعة</div>
              <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 4 }}>
                <span style={{ fontSize: 9, color: "rgba(255,255,255,.35)", textDecoration: "line-through" }}>﷼٢٨٠</span>
                <span style={{ fontSize: 14, fontWeight: 900, color: "#fff" }}>﷼٢٤٠</span>
                <span style={{
                  fontSize: 9,
                  padding: "2px 7px",
                  borderRadius: 20,
                  background: "rgba(16,185,129,.15)",
                  color: "#34d399",
                  fontWeight: 700,
                }}>وفّر ٤٠ ⃁</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{
          display: "flex",
          gap: 6,
          alignItems: "center",
          marginBottom: 12,
          padding: "7px 10px",
          borderRadius: 10,
          background: "rgba(16,185,129,.08)",
          border: "1px solid rgba(16,185,129,.2)",
        }}>
          <span style={{ color: "#34d399", fontSize: 10 }}>✓</span>
          <span style={{ fontSize: 9, color: "rgba(255,255,255,.7)" }}>يشمل ضمان سنة كاملة + شحن مجاني</span>
        </div>
        <button style={{
          width: "100%",
          padding: "10px",
          borderRadius: 12,
          background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)",
          color: "#fff",
          fontSize: 12,
          fontWeight: 800,
          border: "none",
          cursor: "pointer",
        }} className="widget-btn">
          استبدال بهذا المنتج
        </button>
      </div>
    </UseCaseWidgetPreview>
  );
}
