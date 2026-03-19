import React from "react";

interface UseCaseWidgetPreviewProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function UseCaseWidgetPreview({ title, subtitle, children }: UseCaseWidgetPreviewProps) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.08)",
        border: "2px solid #7c3aed",
        borderRadius: 20,
        boxShadow: "0 8px 40px rgba(124,58,237,.18), 0 2px 8px rgba(124,58,237,.08)",
        overflow: "hidden",
        direction: "rtl",
        minWidth: 280,
        maxWidth: 360,
        margin: "0 auto",
      }}
      className="text-right mt-[0px] mb-[0px] bg-[#06010d26]">
      <div style={{
        background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)",
        padding: "12px 18px",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}>
        <div style={{ display: "flex", gap: 5 }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "rgba(255,255,255,.3)" }} />
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "rgba(255,255,255,.3)" }} />
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "rgba(255,255,255,.3)" }} />
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#fff", letterSpacing: ".5px" }}>{title}</div>
          {subtitle && <div style={{ fontSize: 9, color: "rgba(255,255,255,.65)", marginTop: 1 }}>{subtitle}</div>}
        </div>
        <div style={{ width: 30 }} />
      </div>
      <div
        style={{
          padding: "16px",
          fontFamily: "var(--font, 'Tajawal', sans-serif)",
          direction: "rtl",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255,255,255,0.2)",
        }}
        className="ml-[10px] mr-[10px] bg-[#ffffff00] border-t-[0px] mt-[9px] mb-[9px]">
        {children}
      </div>
    </div>
  );
}
