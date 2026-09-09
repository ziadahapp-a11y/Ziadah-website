import { useMemo } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { FreeShippingDemo } from "@/data/sectorWidgetShowcaseDemos";
import { mergeShowcaseDemo } from "@/data/sectorWidgetShowcaseDemos";
import { t as siteTranslations } from "@/i18n/translations";
import {
  WidgetShell, ProductList, ProductRow, ProgressMeter, WidgetButton, WidgetHint,
} from "./kit";

/**
 * The free-shipping meter, plus what would close the gap. The bar is the
 * widget's whole argument, so it leads; the products under it are the means.
 */
export default function FreeShippingThresholdWidget({ demo }: { demo?: FreeShippingDemo }) {
  const t = siteTranslations;
  const { lang } = useLanguage();
  const tr = useMemo(() => mergeShowcaseDemo(t[lang].widgets.freeShipping, demo), [t, lang, demo]);
  const currency = tr.currency.trim();

  return (
    <WidgetShell
      title={tr.progressTitle}
      subtitle={tr.remainingLabel}
      footer={<WidgetButton block>{t[lang].widgets.relatedProducts.btnAdd}</WidgetButton>}
    >
      <ProgressMeter pct={64} note={tr.progressNote} />
      <WidgetHint>{tr.suggestedLabel}</WidgetHint>
      <ProductList>
        {tr.products.map((p, i) => (
          <ProductRow key={i} name={p.name} price={p.price} currency={currency} />
        ))}
      </ProductList>
    </WidgetShell>
  );
}
