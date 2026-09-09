import { useLanguage } from "@/i18n/LanguageContext";
import { t as siteTranslations } from "@/i18n/translations";
import { WidgetShell, CouponCode, WidgetButton, WidgetHint } from "./kit";

/**
 * The first-order offer: the gift, the code, and the three reassurances a
 * store puts under a checkout button. The trust list is a list of facts, so
 * it is a list - not three more tinted pills.
 */
export default function IncreaseConversionWidget() {
  const t = siteTranslations;
  const { lang } = useLanguage();
  const tr = t[lang].widgets.increaseConversion;

  return (
    <WidgetShell
      title={tr.giftLabel}
      subtitle={tr.discountNote}
      footer={<WidgetButton block>{tr.btnBuy}</WidgetButton>}
    >
      <p className="wk-amount">{tr.discountAmount}</p>
      <CouponCode code={tr.couponCode} />
      <ul className="wk-facts">
        {tr.trustItems.map((it, i) => (
          <li key={i}>{it.text}</li>
        ))}
      </ul>
      <WidgetHint>{tr.socialProof}</WidgetHint>
    </WidgetShell>
  );
}
