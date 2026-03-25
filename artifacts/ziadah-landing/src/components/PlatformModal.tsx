import { useEffect } from "react";
import { useTheme } from "../ThemeContext";
import { useLanguage } from "../i18n/LanguageContext";

interface PlatformModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PlatformModal({ open, onClose }: PlatformModalProps) {
  const { theme } = useTheme();
  const { isAr, dir } = useLanguage();
  const lt = theme === "light";

  const zidLogoSrc =
    isAr
      ? lt
        ? "/zid-ar-light.png"
        : "/zid-ar-dark.png"
      : lt
        ? "/zid-en-light.png"
        : "/zid-en-dark.png";
  const sallaLogoSrc = lt ? "/salla-light.webp" : "/salla-dark.png";

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  /* ألوان أزرار المنصات من نظام التصميم — الوضع الفاتح أوضح وأقل إشعاعاً */
  const zidBtn = {
    background: "var(--btn-primary-grad)",
    border: lt ? "1px solid rgba(67, 24, 255, 0.35)" : "1px solid rgba(124, 58, 237, 0.45)",
    boxShadow: "var(--btn-primary-shadow)",
  } as const;
  const sallaBtn = {
    background: lt
      ? "linear-gradient(135deg, rgba(8, 145, 178, 0.88) 0%, rgba(6, 182, 212, 0.82) 100%)"
      : "linear-gradient(135deg, rgba(21, 249, 245, 0.75) 0%, rgba(0, 235, 231, 0.75) 100%)",
    border: lt ? "1px solid rgba(6, 182, 212, 0.45)" : "1px solid rgba(199, 248, 255, 0.5)",
    boxShadow: lt
      ? "0 4px 20px rgba(8, 145, 178, 0.22)"
      : "0px 4px 20px 0px rgba(21, 222, 249, 0.25)",
  } as const;

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
        background: lt ? "rgba(26, 31, 60, 0.45)" : "rgba(0,0,0,0.65)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          /* light: لوحة أوضح مثل باقي البطاقات في النظام؛ dark: زجاج من الرموز */
          background: lt ? "rgba(255, 255, 255, 0.92)" : "var(--glass-bg-2)",
          backdropFilter: "var(--glass-blur)",
          WebkitBackdropFilter: "var(--glass-blur)",
          border: "var(--glass-border)",
          borderRadius: 20,
          padding: "40px 32px 32px",
          maxWidth: 480,
          width: "100%",
          position: "relative",
          boxShadow: "var(--glass-shadow)",
          textAlign: "center",
          direction: dir,
          fontFamily: "var(--font)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 14,
            [isAr ? "right" : "left"]: 14,
            background: "var(--s2)",
            border: "1px solid var(--b2)",
            borderRadius: 8,
            color: "var(--tm)",
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
            e.currentTarget.style.background = lt ? "rgba(0,0,0,.08)" : "rgba(255,255,255,0.15)";
            e.currentTarget.style.color = "var(--t)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--s2)";
            e.currentTarget.style.color = "var(--tm)";
          }}
        >
          ✕
        </button>

        {/* Title */}
        <p style={{ color: "var(--p)", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>
          {isAr ? "اختر منصتك" : "Choose Your Platform"}
        </p>
        <h3 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 900, color: "var(--t)", marginBottom: 8, lineHeight: 1.2 }}>
          {isAr ? "متجرك على أي منصة؟" : "Which platform is your store on?"}
        </h3>
        <p style={{ color: "var(--td)", fontSize: 14, marginBottom: 32 }}>
          {isAr
            ? "فعّل زيادة في دقيقتين وابدأ رحلتك نحو مبيعات أعلى"
            : "Activate Ziadah in 2 minutes and start making more sales instantly"}
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
              borderRadius: 14,
              color: "#fff",
              fontSize: 16,
              fontWeight: 800,
              textDecoration: "none",
              transition: "var(--ds-t)",
              ...zidBtn,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = lt
                ? "0 8px 32px rgba(67, 24, 255, 0.38)"
                : "0 8px 32px rgba(124, 58, 237, 0.5)";
              e.currentTarget.style.borderColor = lt ? "rgba(67, 24, 255, 0.55)" : "rgba(124, 58, 237, 0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = zidBtn.boxShadow;
              e.currentTarget.style.border = zidBtn.border;
            }}
          >
            <img
              src={zidLogoSrc}
              alt={isAr ? "منصة زد" : "Zid Platform"}
              style={{ height: 22, width: "auto", display: "block" }}
            />
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
              borderRadius: 14,
              color: "#fff",
              fontSize: 16,
              fontWeight: 800,
              textDecoration: "none",
              transition: "var(--ds-t)",
              ...sallaBtn,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = lt
                ? "0 8px 32px rgba(8, 145, 178, 0.4)"
                : "0 8px 32px rgba(21, 222, 249, 0.45)";
              e.currentTarget.style.borderColor = lt ? "rgba(6, 182, 212, 0.75)" : "rgba(199, 248, 255, 0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = sallaBtn.boxShadow;
              e.currentTarget.style.border = sallaBtn.border;
            }}
          >
            <img
              src={sallaLogoSrc}
              alt={isAr ? "منصة سلة" : "Salla Platform"}
              style={{ height: 22, width: "auto", display: "block" }}
            />
          </a>
        </div>

        <p style={{ color: "var(--td)", fontSize: 12, marginTop: 20 }}>
          {isAr ? "تجربة مجانية 7 أيام · بدون بطاقة ائتمانية" : "7-day free trial · No credit card required"}
        </p>
      </div>
    </div>
  );
}
