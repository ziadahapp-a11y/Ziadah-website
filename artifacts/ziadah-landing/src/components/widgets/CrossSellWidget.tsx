import { useLanguage } from "@/i18n/LanguageContext";
import { t as siteTranslations } from "@/i18n/translations";
import { WidgetShell, ProductList, ProductRow, WidgetButton, WidgetTag } from "./kit";

/**
 * "الآخرون يشترون مع هذا" - the classic cross-sell list.
 *
 * The first product used to be marked by being a violet box among violet
 * boxes, and every row carried its own pale ghost "add". One accented row and
 * one solid cart button now, which is what a storefront does.
 */
export default function CrossSellWidget({
  previewMaxWidth,
}: {
  /** Kept for the side-by-side showcase layouts that widen the frame. */
  productLayout?: "column" | "row";
  previewMaxWidth?: number;
}) {
  const t = siteTranslations;
  const { lang } = useLanguage();
  const tr = t[lang].widgets.crossSell;
  const currency = tr.currency.trim();

  return (
    <WidgetShell
      title={tr.title}
      subtitle={tr.descLabel}
      maxWidth={previewMaxWidth}
      footer={<WidgetButton block>{tr.btnCart}</WidgetButton>}
    >
      <ProductList>
        {tr.products.map((s, i) => (
          <ProductRow
            key={i}
            name={s.name}
            price={s.price}
            was={s.origPrice ?? undefined}
            currency={currency}
            selected={i === 0}
            badge={s.badge ? <WidgetTag tone="brand">{s.badge}</WidgetTag> : undefined}
            action={<WidgetButton variant="ghost">{tr.btnAdd}</WidgetButton>}
          />
        ))}
      </ProductList>
    </WidgetShell>
  );
}
