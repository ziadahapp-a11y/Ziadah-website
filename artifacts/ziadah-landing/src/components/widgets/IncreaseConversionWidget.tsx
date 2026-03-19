import UseCaseWidgetPreview from "../UseCaseWidgetPreview";

export default function IncreaseConversionWidget() {
  return (
    <UseCaseWidgetPreview title="عرض خاص للمشترين الجدد" subtitle="جرّب بثقة">
      <div style={{ marginBottom: 12 }}>
        <div style={{
          padding: "12px 14px",
          borderRadius: 12,
          background: "rgba(16,185,129,.1)",
          border: "1.5px solid rgba(16,185,129,.3)",
          marginBottom: 10,
          textAlign: "center",
        }}>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,.5)", marginBottom: 4 }}>🎉 هديتك كعميل جديد</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#34d399" }}>خصم ٥٠ ⃁</div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,.4)", marginTop: 2 }}>على أول طلب فوق ٢٠٠ ⃁</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", letterSpacing: 1, marginTop: 6 }}>WELCOME50</div>
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          marginBottom: 10,
        }}>
          {[
            { icon: "⭐", text: "4.9/5 — ٢٣,٠٠٠+ تقييم" },
            { icon: "🔄", text: "إرجاع مجاني خلال ١٤ يوم" },
            { icon: "🚚", text: "توصيل سريع خلال ٢-٣ أيام" },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              padding: "6px 10px",
              borderRadius: 8,
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.1)",
            }}>
              <span style={{ fontSize: 14 }}>{item.icon}</span>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,.75)", fontWeight: 600 }}>{item.text}</span>
            </div>
          ))}
        </div>

        <div style={{
          padding: "8px 12px",
          borderRadius: 10,
          background: "rgba(245,158,11,.08)",
          border: "1px solid rgba(245,158,11,.25)",
          marginBottom: 10,
          display: "flex",
          gap: 7,
          alignItems: "center",
        }}>
          <span style={{ fontSize: 14 }}>👥</span>
          <span style={{ fontSize: 14, color: "#fcd34d", fontWeight: 700 }}>٣ أشخاص اشتروا هذا المنتج في آخر ساعة</span>
        </div>
      </div>

      <button style={{
        width: "100%",
        padding: "10px",
        borderRadius: 12,
        background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        color: "#fff",
        fontSize: 14,
        fontWeight: 800,
        border: "none",
        cursor: "pointer",
      }} className="widget-btn">
        اشترِ الآن واحصل على الخصم
      </button>
    </UseCaseWidgetPreview>
  );
}
