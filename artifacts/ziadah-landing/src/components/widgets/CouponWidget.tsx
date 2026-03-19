import UseCaseWidgetPreview from "../UseCaseWidgetPreview";

export default function CouponWidget() {
  return (
    <UseCaseWidgetPreview title="Discount Coupon" subtitle="Special offer just for you">
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", marginBottom: 12 }}>Special offer just for you</div>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "14px 24px",
          borderRadius: 14,
          border: "2px dashed rgba(168,85,247,.6)",
          background: "rgba(124,58,237,.1)",
          marginBottom: 12,
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#c084fc", lineHeight: 1 }}>30 SAR</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,.45)", marginTop: 2 }}>Discount on your order now</div>
          </div>
          <div style={{ width: 1, height: 40, background: "rgba(168,85,247,.3)" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#fff", letterSpacing: "1px" }}>SAVE30</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,.45)", marginTop: 2 }}>🚚 Free Shipping</div>
          </div>
        </div>
        <div style={{
          display: "flex",
          gap: 4,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 14,
          fontSize: 10,
          color: "#f87171",
          fontWeight: 600,
        }}>
          <span>⏱️</span>
          <span>Expires in: 14:58</span>
        </div>
      </div>
      <button style={{
        width: "100%",
        padding: "11px",
        borderRadius: 12,
        background: "rgba(124,58,237,0.12)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        color: "#c084fc",
        fontSize: 14,
        fontWeight: 800,
        border: "1px solid rgba(124,58,237,0.2)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
      }} className="widget-btn">
        <span>📋</span> Copy Code
      </button>
    </UseCaseWidgetPreview>
  );
}
