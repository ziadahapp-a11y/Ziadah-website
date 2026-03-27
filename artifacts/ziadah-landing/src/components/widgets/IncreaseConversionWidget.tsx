import UseCaseWidgetPreview from "../UseCaseWidgetPreview";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";

export default function IncreaseConversionWidget() {
  const t = useSiteT();
  const { lang } = useLanguage();
  const tr = t[lang].widgets.increaseConversion;

  return (
    <UseCaseWidgetPreview title={tr.title} subtitle={tr.subtitle}>
      <div style={{ marginBottom: 12 }}>
        <div style={{
          padding: "12px 14px",
          borderRadius: 12,
          background: "rgba(16,185,129,.1)",
          border: "1.5px solid rgba(16,185,129,.3)",
          marginBottom: 10,
          textAlign: "center",
        }}>
          <div style={{ fontSize: 10, color: "var(--tm)", marginBottom: 4 }}>{tr.giftLabel}</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#34d399" }}>{tr.discountAmount}</div>
          <div style={{ fontSize: 9, color: "var(--td)", marginTop: 2 }}>{tr.discountNote}</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: "var(--t)", letterSpacing: 1, marginTop: 6 }}>{tr.couponCode}</div>
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          marginBottom: 10,
        }}>
          {tr.trustItems.map((item, i) => (
            <div key={i} style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              padding: "6px 10px",
              borderRadius: 8,
              background: "var(--s1)",
              border: "1px solid var(--b1)",
            }}>
              <span style={{ fontSize: 12 }}>{item.icon}</span>
              <span style={{ fontSize: 10, color: "var(--tm)", fontWeight: 600 }}>{item.text}</span>
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
          <span style={{ fontSize: 9, color: "#fcd34d", fontWeight: 700 }}>{tr.socialProof}</span>
        </div>
      </div>

      <button style={{
        width: "100%",
        padding: "10px",
        borderRadius: 12,
        background: "rgba(16,185,129,0.12)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        color: "#34d399",
        fontSize: 14,
        fontWeight: 800,
        border: "1px solid rgba(16,185,129,0.2)",
        cursor: "pointer",
      }} className="widget-btn">
        {tr.btnBuy}
      </button>
    </UseCaseWidgetPreview>
  );
}
