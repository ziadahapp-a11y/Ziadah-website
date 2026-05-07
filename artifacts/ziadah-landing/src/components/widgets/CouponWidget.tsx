import { useMemo } from "react";
import UseCaseWidgetPreview from "../UseCaseWidgetPreview";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { Editable } from "@/cms/components/Editable";
import { cmsKey } from "@/cms/cmsKeys";
import type { CouponDemo } from "@/data/sectorWidgetShowcaseDemos";
import { mergeShowcaseDemo } from "@/data/sectorWidgetShowcaseDemos";

export default function CouponWidget({ demo }: { demo?: CouponDemo }) {
  const t = useSiteT();
  const { lang } = useLanguage();
  const tr = useMemo(
    () => mergeShowcaseDemo(t[lang].widgets.coupon, demo),
    [t, lang, demo],
  );

  return (
    <UseCaseWidgetPreview
      title={
        <Editable contentKey={cmsKey(lang, "widgets", "coupon", "title")} label="Coupon title" type="text">
          {tr.title}
        </Editable>
      }
      subtitle={
        <Editable contentKey={cmsKey(lang, "widgets", "coupon", "subtitle")} label="Coupon subtitle" type="text">
          {tr.subtitle}
        </Editable>
      }
    >
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: "var(--td)", marginBottom: 12 }}>{tr.descLabel}</div>
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
            <div style={{ fontSize: 28, fontWeight: 900, color: "#c084fc", lineHeight: 1 }}>{tr.discountAmount}</div>
            <div style={{ fontSize: 12, color: "var(--td)", marginTop: 2 }}>{tr.discountSub}</div>
          </div>
          <div style={{ width: 1, height: 40, background: "rgba(168,85,247,.3)" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "var(--t)", letterSpacing: "1px" }}>{tr.couponCode}</div>
            <div style={{ fontSize: 12, color: "var(--td)", marginTop: 2 }}>{tr.freeShipping}</div>
          </div>
        </div>
        <div style={{
          display: "flex",
          gap: 4,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 14,
          fontSize: 12,
          color: "#f87171",
          fontWeight: 600,
        }}>
          <span>⏱️</span>
          <span>{tr.expiresLabel}</span>
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
        {tr.btnCopy}
      </button>
    </UseCaseWidgetPreview>
  );
}
