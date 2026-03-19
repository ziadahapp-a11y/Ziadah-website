import { useEffect } from "react";

interface PlatformModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PlatformModal({ open, onClose }: PlatformModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(15,10,30,0.85)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(168,85,247,0.3)",
          borderRadius: 20,
          padding: "40px 32px 32px",
          maxWidth: 480,
          width: "100%",
          position: "relative",
          boxShadow: "0 24px 80px rgba(124,58,237,0.35), 0 0 0 1px rgba(168,85,247,0.1)",
          textAlign: "center",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="إغلاق"
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 8,
            color: "rgba(255,255,255,0.7)",
            cursor: "pointer",
            fontSize: 18,
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all .2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.15)";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            e.currentTarget.style.color = "rgba(255,255,255,0.7)";
          }}
        >
          ✕
        </button>

        {/* Title */}
        <p style={{ color: "rgba(168,85,247,0.9)", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>
          اختر منصتك
        </p>
        <h3 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 900, color: "#fff", marginBottom: 8, lineHeight: 1.2 }}>
          على أي منصة متجرك؟
        </h3>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, marginBottom: 32 }}>
          فعّل زيادة في دقيقتين وابدأ تحقيق مبيعات أكثر فوراً
        </p>

        {/* Platform buttons */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          {/* Zid */}
          <a
            href="https://apps.zid.sa/application/1826"
            target="_blank"
            rel="noreferrer"
            style={{
              flex: "1 1 180px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: "18px 24px",
              background: "linear-gradient(135deg, rgba(99,59,195,0.8), rgba(79,45,155,0.8))",
              border: "1px solid rgba(168,85,247,0.5)",
              borderRadius: 14,
              color: "#fff",
              fontSize: 16,
              fontWeight: 800,
              textDecoration: "none",
              transition: "all .25s",
              boxShadow: "0 4px 20px rgba(124,58,237,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(124,58,237,0.5)";
              e.currentTarget.style.borderColor = "rgba(168,85,247,0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(124,58,237,0.3)";
              e.currentTarget.style.borderColor = "rgba(168,85,247,0.5)";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L3 10h6l-2 6 8-10H9l2-6z" fill="#fff" />
            </svg>
            منصة زد
          </a>

          {/* Salla */}
          <a
            href="https://apps.salla.sa/ar/app/1099604538"
            target="_blank"
            rel="noreferrer"
            style={{
              flex: "1 1 180px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: "18px 24px",
              background: "linear-gradient(135deg, rgba(249,115,22,0.75), rgba(234,88,12,0.75))",
              border: "1px solid rgba(251,146,60,0.5)",
              borderRadius: 14,
              color: "#fff",
              fontSize: 16,
              fontWeight: 800,
              textDecoration: "none",
              transition: "all .25s",
              boxShadow: "0 4px 20px rgba(249,115,22,0.25)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(249,115,22,0.45)";
              e.currentTarget.style.borderColor = "rgba(251,146,60,0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(249,115,22,0.25)";
              e.currentTarget.style.borderColor = "rgba(251,146,60,0.5)";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
              <rect x="3" y="3" width="12" height="12" rx="3" fill="rgba(255,255,255,0.3)" />
              <path d="M6 9h6M9 6v6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            منصة سلة
          </a>
        </div>

        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginTop: 20 }}>تجربة مجانية 7 أيام · بدون بطاقة</p>
      </div>
    </div>
  );
}
