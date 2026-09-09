import { useLanguage } from "@/i18n/LanguageContext";
import { t as siteTranslations } from "@/i18n/translations";
import { WidgetShell, ProductList, ProductRow, WidgetButton, WidgetTag, Totals, Price } from "./kit";

/**
 * A bundle: what is in it, what the parts cost separately, and what the set
 * costs. The saving is the only coloured thing in the card, because the saving
 * is the whole argument.
 */
export default function BundleDealsWidget() {
  const t = siteTranslations;
  const { lang } = useLanguage();
  const tr = t[lang].widgets.bundleDeals;
  const currency = tr.currency.trim();

  return (
    <WidgetShell
      title={tr.title}
      subtitle={tr.subtitle}
      footer={<WidgetButton block>{tr.btnAdd}</WidgetButton>}
    >
      <ProductList>
        {tr.items.map((it, i) => (
          <ProductRow key={i} name={it.name} price={it.origPrice} currency={currency} />
        ))}
      </ProductList>
      <Totals
        rows={[
          { k: tr.origTotalLabel, v: <s className="wk-was">{tr.origTotal}</s> },
          {
            k: (
              <span className="wk-meta">
                {tr.bundlePriceLabel}
                <WidgetTag tone="save">{tr.saveBadge}</WidgetTag>
              </span>
            ),
            v: <Price value={tr.bundlePrice} currency="" size={17} />,
            total: true,
          },
        ]}
      />
    </WidgetShell>
  );
}
