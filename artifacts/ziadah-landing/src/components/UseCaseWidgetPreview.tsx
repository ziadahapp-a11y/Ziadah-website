import React, { type ReactNode } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

interface UseCaseWidgetPreviewProps {
  title: ReactNode;
  subtitle?: ReactNode;
  children: React.ReactNode;
  /** Defaults to 320 — widen for side-by-side showcase layouts */
  maxWidth?: number;
}

export default function UseCaseWidgetPreview({ children, maxWidth = 320 }: UseCaseWidgetPreviewProps) {
  const { isAr } = useLanguage();
  const direction = isAr ? "rtl" : "ltr";
  const textAlign = isAr ? ("right" as const) : ("left" as const);

  return (
    <div
      style={{
        background: "var(--uc-preview-bg, var(--s1))",
        border: "var(--uc-preview-border, 1px solid rgba(124, 58, 237,0.15))",
        borderRadius: 16,
        boxShadow: "var(--uc-preview-shadow, 0 8px 32px rgba(124, 58, 237,.03), 0 2px 8px rgba(0,0,0,.05), inset 0 1px 0 rgba(255,255,255,0.02))",
        overflow: "hidden",
        direction,
        width: "100%",
        maxWidth,
        margin: "0 auto",
        backdropFilter: "var(--uc-preview-blur, blur(20px))",
        WebkitBackdropFilter: "var(--uc-preview-blur, blur(20px))",
      }}
      className="widget-preview mt-[0px] mb-[0px]">
      <div
        style={{
          padding: "12px",
          fontFamily: "var(--font)",
          direction,
          textAlign,
          background: "var(--uc-preview-body-bg, transparent)",
          backdropFilter: "var(--uc-preview-body-blur, blur(12px))",
          WebkitBackdropFilter: "var(--uc-preview-body-blur, blur(12px))",
          borderTop: "none",
        }}
        className="ml-[10px] mr-[10px] border-t-[0px] mt-[9px] mb-[9px] pt-[16px] pb-[16px]">
        {children}
      </div>
    </div>
  );
}
