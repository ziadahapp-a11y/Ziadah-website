import { useMemo } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { CouponDemo } from "@/data/sectorWidgetShowcaseDemos";
import { mergeShowcaseDemo } from "@/data/sectorWidgetShowcaseDemos";
import { t as siteTranslations } from "@/i18n/translations";
import { WidgetShell, CouponCode, WidgetButton, WidgetTag, WidgetHint } from "./kit";

/**
 * The coupon. The discount is the largest thing on the card and the code
 * reads as a code - monospaced inside a dashed frame, the way every store
 * renders one - instead of as another violet pill among violet pills.
 */
export default function CouponWidget({ demo }: { demo?: CouponDemo }) {
  const t = siteTranslations;
  const { lang } = useLanguage();
  const tr = useMemo(() => mergeShowcaseDemo(t[lang].widgets.coupon, demo), [t, lang, demo]);

  return (
    <WidgetShell
      title={tr.title}
      subtitle={tr.discountSub}
      footer={<WidgetButton block>{tr.btnCopy}</WidgetButton>}
    >
      <p className="wk-amount">{tr.discountAmount}</p>
      <CouponCode code={tr.couponCode} action={<WidgetTag tone="save">{tr.freeShipping}</WidgetTag>} />
      <WidgetHint>{tr.expiresLabel}</WidgetHint>
    </WidgetShell>
  );
}
