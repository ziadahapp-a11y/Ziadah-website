import { useLanguage } from "@/i18n/LanguageContext";
import { t as siteTranslations } from "@/i18n/translations";
import {
  WidgetShell, ProductList, ProductRow, ProgressMeter, WidgetButton, WidgetHint,
} from "./kit";

/**
 * The cart-value widget: how far the shopper is from the shipping threshold,
 * and the two products that would carry them over it.
 */
export default function IncreaseAOVWidget() {
  const t = siteTranslations;
  const { lang } = useLanguage();
  const tr = t[lang].widgets.increaseAOV;
  const currency = tr.currency.trim();

  return (
    <WidgetShell
      title={tr.shippingLabel}
      subtitle={tr.remainingLabel}
      footer={<WidgetButton block>{tr.btnAdd}</WidgetButton>}
    >
      <ProgressMeter pct={62} note={tr.progressNote} />
      <WidgetHint>{tr.suggestedLabel}</WidgetHint>
      <ProductList>
        {tr.products.map((p, i) => (
          <ProductRow
            key={i}
            name={p.name}
            price={p.price}
            was={p.origPrice}
            currency={currency}
          />
        ))}
      </ProductList>
      <WidgetHint>{tr.noteLabel}</WidgetHint>
    </WidgetShell>
  );
}
