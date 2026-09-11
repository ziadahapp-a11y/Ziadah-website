import { useLanguage } from "@/i18n/LanguageContext";
import { t as siteTranslations } from "@/i18n/translations";
import {
  WidgetShell, ProductList, ProductRow, WidgetButton, WidgetHint, WidgetTag,
} from "./kit";

/**
 * The returning-shopper block: what they left behind, then what is selling in
 * the categories they browse. Two lists, one heading each, one solid action.
 */
export default function HomePageWidget() {
  const t = siteTranslations;
  const { lang } = useLanguage();
  const tr = t[lang].widgets.homePage;
  const currency = tr.currency.trim();

  return (
    <WidgetShell
      title={tr.title}
      subtitle={tr.subtitle}
      footer={<WidgetButton block>{tr.btnAdd}</WidgetButton>}
    >
      <WidgetHint>{tr.leftLastVisit}</WidgetHint>
      <ProductRow
        name={tr.productName}
        price={tr.productPrice}
        was={tr.productOrigPrice}
        currency=""
        selected
        badge={<WidgetTag tone="brand">{`${tr.offerExpires} ${tr.offerCountdown}`}</WidgetTag>}
      />
      <WidgetHint>{tr.topSellersLabel}</WidgetHint>
      <ProductList>
        {tr.miniProducts.map((p, i) => (
          <ProductRow key={i} name={p.name} price={p.price} currency={currency} />
        ))}
      </ProductList>
    </WidgetShell>
  );
}
