import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";

interface UseCaseWidgetPreviewProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function UseCaseWidgetPreview({ title, subtitle, children }: UseCaseWidgetPreviewProps) {
  const { isAr } = useLanguage();
  const direction = isAr ? "rtl" : "ltr";
  const textAlign = isAr ? ("right" as const) : ("left" as const);

  return (
    <div
      style={{
        background: "var(--s1)",
        backgroundColor: "rgba(255, 255, 255, 0)",
        border: "1px solid rgba(124,58,237,0.15)",
        borderRadius: 16,
        boxShadow: "0 8px 32px rgba(124,58,237,.06), 0 2px 8px rgba(0,0,0,.1), inset 0 1px 0 rgba(255,255,255,0.04)",
        overflow: "hidden",
        direction,
        width: "100%",
        maxWidth: 320,
        margin: "0 auto",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
      className="widget-preview mt-[0px] mb-[0px]">
      <div style={{
        background: "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(91,33,182,0.05) 100%)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(124,58,237,0.1)",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}>
        <div style={{ display: "flex", gap: 5 }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--td)" }} />
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--td)" }} />
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--td)" }} />
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "var(--t)", letterSpacing: ".5px" }}>{title}</div>
          {subtitle && <div style={{ fontSize: 9, color: "var(--tm)", marginTop: 1 }}>{subtitle}</div>}
        </div>
        <div style={{ width: 30 }} />
      </div>
      <div
        style={{
          padding: "12px",
          fontFamily: "var(--font)",
          direction,
          textAlign,
          background: "transparent",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderTop: "none",
        }}
        className="ml-[10px] mr-[10px] border-t-[0px] mt-[9px] mb-[9px] pt-[16px] pb-[16px]">
        {children}
      </div>
    </div>
  );
}
