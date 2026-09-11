import { useLanguage } from "@/i18n/LanguageContext";
import { t as siteTranslations } from "@/i18n/translations";
import { WidgetShell, CouponCode, WidgetButton, WidgetHint, WidgetTag } from "./kit";

/**
 * The cart-recovery offer. The discount leads, the code is a code, and the
 * two qualifying lines sit under it as captions rather than as further boxes.
 */
export default function ReduceAbandonWidget() {
  const t = siteTranslations;
  const { lang } = useLanguage();
  const tr = t[lang].widgets.reduceAbandon;

  return (
    <WidgetShell
      title={tr.noticeLabel}
      subtitle={tr.discountSub}
      footer={<WidgetButton block>{tr.btnComplete}</WidgetButton>}
    >
      <p className="wk-amount">{tr.discountTitle}</p>
      <CouponCode code={tr.couponCode} action={<WidgetTag>{tr.expiresLabel}</WidgetTag>} />
      <WidgetHint>{tr.shippingLabel}</WidgetHint>
      <WidgetHint>{tr.autoApplyNote}</WidgetHint>
    </WidgetShell>
  );
}
