import { useLanguage } from "@/i18n/LanguageContext";
import { t as siteTranslations } from "@/i18n/translations";
import { WidgetShell, ProductList, ProductRow, WidgetButton, WidgetTag, WidgetHint } from "./kit";

/**
 * A category listing re-ordered by the engine. The "sorted for you" line is a
 * caption now, not a bordered violet pill with a 🎯 in it - a store states
 * that in a line of small text above the list, if it states it at all.
 */
export default function CategoryPageWidget() {
  const t = siteTranslations;
  const { lang } = useLanguage();
  const tr = t[lang].widgets.categoryPage;
  const currency = tr.currency.trim();

  return (
    <WidgetShell
      title={tr.title}
      subtitle={tr.subtitle}
      footer={<WidgetButton block>{tr.btnCart}</WidgetButton>}
    >
      <WidgetHint>{tr.sortedLabel}</WidgetHint>
      <ProductList>
        {tr.products.map((p, i) => (
          <ProductRow
            key={i}
            name={p.name}
            price={p.price}
            was={p.origPrice ?? undefined}
            currency={currency}
            selected={p.hot}
            badge={p.badge ? <WidgetTag tone={p.hot ? "brand" : "neutral"}>{p.badge}</WidgetTag> : undefined}
          />
        ))}
      </ProductList>
    </WidgetShell>
  );
}
