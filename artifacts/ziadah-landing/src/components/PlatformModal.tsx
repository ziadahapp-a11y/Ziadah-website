import { useEffect, useId, useState } from "react";
import { useTheme } from "../ThemeContext";
import { useLanguage } from "../i18n/LanguageContext";
import { platformSallaLogoSrc, platformZidLogoSrc } from "@/utils/platformAsset";
import FeatureRequestModal from "./FeatureRequestModal";

interface PlatformModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PlatformModal({ open, onClose }: PlatformModalProps) {
  const { theme } = useTheme();
  const { isAr, dir } = useLanguage();
  const titleId = useId();
  const [featureModalOpen, setFeatureModalOpen] = useState(false);

  const zidLogoSrc = platformZidLogoSrc(theme);
  const sallaLogoSrc = platformSallaLogoSrc(theme);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) return;
    setFeatureModalOpen(false);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="vision-platform-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        className="vision-platform-panel"
        data-theme={theme}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        style={{ direction: dir }}
      >
        <button
          type="button"
          className="vision-platform-close"
          onClick={onClose}
          aria-label={isAr ? "إغلاق" : "Close"}
        >
          ✕
        </button>

        <div className="vision-platform-head">
          <p id={titleId} className="vision-platform-kicker">
            {isAr ? "اختر منصتك" : "Choose your platform"}
          </p>
          <h3 className="vision-platform-title">
            {isAr ? "متجرك على أي منصة؟" : "Which platform is your store on?"}
          </h3>
          <p className="vision-platform-lead">
            {isAr
              ? "فعّل زيادة في دقيقتين وابدأ رحلتك نحو مبيعات أعلى"
              : "Activate Ziadah in 2 minutes and start making more sales instantly"}
          </p>
        </div>

        <div className="vision-platform-grid">
          <a
            className="platform-tile platform-tile--zid bg-[rgba(255,255,255,0.04)]"
            href="https://apps.zid.sa/application/1826"
            target="_blank"
            rel="noreferrer"
          >
            <div className="platform-tile-logo-wrap platform-tile-logo-wrap--zid">
              <img
                src={zidLogoSrc}
                alt={
                  isAr
                    ? "منصة زد — تفعيل تطبيق زيادة للتوصيات الذكية"
                    : "Zid platform — install Ziadah AI ecommerce app"
                }
                loading="lazy"
                className="platform-tile-logo platform-tile-logo--zid"
                width={280}
                height={80}
                decoding="async"
              />
            </div>
            <span className="platform-tile-hint">
              {isAr ? "تثبيت من متجر تطبيقات زد" : "Install from Zid app store"}
            </span>
          </a>

          <a
            className="platform-tile platform-tile--salla"
            href="https://apps.salla.sa/ar/app/1099604538"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={sallaLogoSrc}
              alt={
                isAr
                  ? "منصة سلة — تفعيل تطبيق زيادة للتوصيات الذكية"
                  : "Salla platform — install Ziadah AI ecommerce app"
              }
              loading="lazy"
              className="platform-tile-logo platform-tile-logo--salla"
              width={200}
              height={48}
              decoding="async"
            />
            <span className="platform-tile-hint">
              {isAr ? "تثبيت من متجر تطبيقات سلة" : "Install from Salla app store"}
            </span>
          </a>

          <button
            type="button"
            className="platform-tile platform-tile--other"
            onClick={() => setFeatureModalOpen(true)}
          >
            <div className="platform-tile-other-icon" aria-hidden="true">
              +
            </div>
            <span className="platform-tile-other-title">
              {isAr ? "أخرى" : "Other"}
            </span>
            <span className="platform-tile-hint">
              {isAr ? "اقترح منصتك وسنتواصل معك" : "Suggest your platform and we will reach out"}
            </span>
          </button>
        </div>

        <p className="vision-platform-footnote">
          {isAr
            ? "تجربة مجانية 7 أيام · بدون بطاقة ائتمانية"
            : "7-day free trial · No credit card required"}
        </p>
      </div>
      {featureModalOpen && (
        <FeatureRequestModal
          onClose={() => {
            setFeatureModalOpen(false);
            onClose();
          }}
        />
      )}
    </div>
  );
}
