import UseCaseWidgetPreview from "../UseCaseWidgetPreview";

export default function CouponWidget() {
  return (
    <UseCaseWidgetPreview title="قسيمة خصم" subtitle="خصم خاص لك الآن">
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 12 }}>خصم خاص لك الآن</div>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "14px 24px",
          borderRadius: 14,
          border: "2px dashed #7c3aed",
          background: "rgba(124,58,237,.04)",
          marginBottom: 12,
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#7c3aed", lineHeight: 1 }}>٣٠ ر</div>
            <div style={{ fontSize: 9, color: "#6b7280", marginTop: 2 }}>خصم على طلبك الآن</div>
          </div>
          <div style={{ width: 1, height: 40, background: "rgba(124,58,237,.15)" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#111827", letterSpacing: "1px" }}>SAVE30</div>
            <div style={{ fontSize: 9, color: "#6b7280", marginTop: 2 }}>🚚 شحن مجاني</div>
          </div>
        </div>
        <div style={{
          display: "flex",
          gap: 4,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 14,
          fontSize: 10,
          color: "#ef4444",
          fontWeight: 600,
        }}>
          <span>⏱️</span>
          <span>ينتهي خلال: ١٤:٥٨</span>
        </div>
      </div>
      <button style={{
        width: "100%",
        padding: "11px",
        borderRadius: 12,
        background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)",
        color: "#fff",
        fontSize: 12,
        fontWeight: 800,
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
      }}>
        <span>📋</span> انسخ الكود
      </button>
    </UseCaseWidgetPreview>
  );
}
