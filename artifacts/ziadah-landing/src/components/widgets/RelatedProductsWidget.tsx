import { useMemo } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { RelatedProductsDemo } from "@/data/sectorWidgetShowcaseDemos";
import { mergeShowcaseDemo } from "@/data/sectorWidgetShowcaseDemos";
import { t as siteTranslations } from "@/i18n/translations";
import { WidgetShell, ProductList, ProductRow, WidgetButton } from "./kit";

/**
 * "منتجات ذات صلة" as a storefront actually renders it: a heading, a short
 * list of products separated by hairlines, and ONE add-to-cart underneath.
 *
 * It used to be two lavender boxes with lavender borders, each holding a name,
 * an amber rating and a price all at 12px, over a full-width pale-violet ghost
 * button repeated per product. The rating is gone with the rest of them - it
 * was invented, and every product in the demo data carried a 4.6-plus score.
 */
export default function RelatedProductsWidget({ demo }: { demo?: RelatedProductsDemo }) {
  const t = siteTranslations;
  const { lang } = useLanguage();
  const tr = useMemo(
    () => mergeShowcaseDemo(t[lang].widgets.relatedProducts, demo),
    [t, lang, demo],
  );
  const currency = tr.currency.trim();

  return (
    /* `descLabel` is not rendered: it holds the same string as `subtitle`, and
       the old shell dropped the subtitle on the floor so nobody noticed. */
    <WidgetShell
      title={tr.title}
      subtitle={tr.subtitle}
      footer={<WidgetButton block>{tr.btnAdd}</WidgetButton>}
    >
      <ProductList>
        {tr.products.map((p, i) => (
          <ProductRow key={i} name={p.name} price={p.price} currency={currency} />
        ))}
      </ProductList>
    </WidgetShell>
  );
}
