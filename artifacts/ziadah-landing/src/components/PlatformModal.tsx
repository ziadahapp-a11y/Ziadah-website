import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { platformAsset } from "@/utils/platformAsset";
import FeatureRequestModal from "./FeatureRequestModal";

interface PlatformModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PlatformModal({ open, onClose }: PlatformModalProps) {
  const { isAr, dir } = useLanguage();
  const titleId = useId();
  const [featureModalOpen, setFeatureModalOpen] = useState(false);

  // Light DS panel → use the dark-ink logo variants made for light backgrounds.
  const zidLogoSrc = platformAsset("platform/zid-logo-light.png");
  const sallaLogoSrc = platformAsset("platform/salla-logo-light.png");

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

  const tileClass =
    "flex flex-col items-center justify-center gap-4 text-center rounded-2xl border border-zinc-200 bg-white p-6 hover:border-zinc-300 hover:shadow-card transition-all";

  return createPortal(
    <div
      className="fixed inset-0 z-[100100] flex items-center justify-center overflow-y-auto p-4 sm:p-5 bg-zinc-950/40 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-[min(920px,96vw)] max-h-[calc(100vh-40px)] overflow-auto rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 md:p-9 shadow-card-lg"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        style={{ direction: dir }}
      >
        <button
          type="button"
          className="absolute top-3.5 flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          style={{ insetInlineEnd: 14 }}
          onClick={onClose}
          aria-label={isAr ? "إغلاق" : "Close"}
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-7 text-center">
          <span
            id={titleId}
            className="inline-block text-xs font-bold uppercase tracking-widest text-violet-600"
          >
            {isAr ? "اختر منصتك" : "Choose your platform"}
          </span>
          <h3 className="mt-2.5 text-2xl font-bold leading-tight text-zinc-950 md:text-3xl">
            {isAr ? "متجرك على أي منصة؟" : "Which platform is your store on?"}
          </h3>
          <p className="mx-auto mt-2.5 max-w-xl text-sm leading-relaxed text-zinc-600 md:text-base">
            {isAr
              ? "فعّل زيادة في دقيقتين وابدأ رحلتك نحو مبيعات أعلى"
              : "Activate Ziadah in 2 minutes and start making more sales instantly"}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          <a
            className={tileClass}
            href="https://apps.zid.sa/application/1826"
            target="_blank"
            rel="noreferrer"
          >
            <div className="flex h-16 items-center justify-center">
              <img
                src={zidLogoSrc}
                alt={
                  isAr
                    ? "منصة زد — تفعيل تطبيق زيادة للتوصيات الذكية"
                    : "Zid platform — install Ziadah AI ecommerce app"
                }
                loading="lazy"
                decoding="async"
                className="h-9 w-auto max-w-full object-contain md:h-10"
              />
            </div>
            <span className="text-xs leading-relaxed text-zinc-500">
              {isAr ? "تثبيت من متجر تطبيقات زد" : "Install from Zid app store"}
            </span>
          </a>

          <a
            className={tileClass}
            href="https://apps.salla.sa/ar/app/1099604538"
            target="_blank"
            rel="noreferrer"
          >
            <div className="flex h-16 items-center justify-center">
              <img
                src={sallaLogoSrc}
                alt={
                  isAr
                    ? "منصة سلة — تفعيل تطبيق زيادة للتوصيات الذكية"
                    : "Salla platform — install Ziadah AI ecommerce app"
                }
                loading="lazy"
                decoding="async"
                className="h-11 w-auto max-w-full object-contain md:h-12"
              />
            </div>
            <span className="text-xs leading-relaxed text-zinc-500">
              {isAr ? "تثبيت من متجر تطبيقات سلة" : "Install from Salla app store"}
            </span>
          </a>

          <button type="button" className={tileClass} onClick={() => setFeatureModalOpen(true)}>
            <div className="flex h-16 items-center justify-center">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-violet-200 bg-violet-50 text-violet-600"
                aria-hidden="true"
              >
                <Plus className="h-6 w-6" />
              </span>
            </div>
            <div>
              <span className="block text-lg font-bold leading-tight text-zinc-950">
                {isAr ? "أخرى" : "Other"}
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-zinc-500">
                {isAr ? "اقترح منصتك وسنتواصل معك" : "Suggest your platform and we will reach out"}
              </span>
            </div>
          </button>
        </div>

        <p className="mt-7 text-center text-xs leading-relaxed text-zinc-500">
          {isAr
            ? "تجربة مجانية 7 أيام · بدون بطاقة ائتمانية"
            : "7-day free trial · No credit card required"}
        </p>
      </motion.div>
      {featureModalOpen && (
        <FeatureRequestModal
          onClose={() => {
            setFeatureModalOpen(false);
            onClose();
          }}
        />
      )}
    </div>,
    document.body
  );
}
