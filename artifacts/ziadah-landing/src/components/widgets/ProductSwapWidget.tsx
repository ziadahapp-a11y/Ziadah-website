import { useMemo } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { ProductSwapDemo } from "@/data/sectorWidgetShowcaseDemos";
import { mergeShowcaseDemo } from "@/data/sectorWidgetShowcaseDemos";
import { t as siteTranslations } from "@/i18n/translations";
import { WidgetShell, ProductRow, WidgetButton, WidgetTag, WidgetHint } from "./kit";

/**
 * The upsell: one product, the better version of what the shopper is looking
 * at. A single row, the old price struck through beside the new one, and the
 * saving as the only coloured thing on the card.
 */
export default function ProductSwapWidget({ demo }: { demo?: ProductSwapDemo }) {
  const t = siteTranslations;
  const { lang } = useLanguage();
  const tr = useMemo(() => mergeShowcaseDemo(t[lang].widgets.productSwap, demo), [t, lang, demo]);

  return (
    <WidgetShell
      title={tr.title}
      subtitle={tr.descLabel}
      footer={<WidgetButton block>{tr.btnUpgrade}</WidgetButton>}
    >
      <ProductRow
        name={tr.productName}
        price={tr.newPrice}
        was={tr.origPrice}
        currency=""
        selected
        badge={<WidgetTag tone="save">{tr.saveBadge}</WidgetTag>}
      />
      <WidgetHint>{tr.warrantyNote}</WidgetHint>
    </WidgetShell>
  );
}
