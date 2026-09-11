import { useMemo } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { ProductSwapDemo } from "@/data/sectorWidgetShowcaseDemos";
import { mergeShowcaseDemo } from "@/data/sectorWidgetShowcaseDemos";
import { t as siteTranslations } from "@/i18n/translations";
import {
  WidgetShell,
  ProductCollection,
  ProductCard,
  WidgetButton,
  StatCard,
  SummaryBar,
  CartCheckoutRow,
  DismissRow,
  type ProductShape,
  type CampaignStyle,
} from "./kit";

/**
 * The upsell: one product, the better version of what the shopper is looking
 * at. A single row, the old price struck through beside the new one, and the
 * saving as the only coloured thing on the card.
 */
export default function ProductSwapWidget({
  demo,
  shape = "list",
  style = "embedded",
}: {
  demo?: ProductSwapDemo;
  shape?: ProductShape;
  style?: CampaignStyle;
}) {
  const t = siteTranslations;
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const tr = useMemo(() => mergeShowcaseDemo(t[lang].widgets.productSwap, demo), [t, lang, demo]);
  const rel = t[lang].widgets.relatedProducts;
  const currency = rel.currency.trim();

  /* The file's "Replace Added Product": the item already in the cart is shown
     MUTED and labelled as added, and the alternatives beside it carry the
     action. The comparison is the point, so the cart item stays on screen
     rather than being replaced by its own upgrade. */
  const inCart = { name: tr.productName, price: tr.newPrice, was: tr.origPrice };
  const alternatives = rel.products.slice(0, 2);

  return (
    <WidgetShell
      title={tr.title}
      subtitle={tr.descLabel}
      style={style}
      dismissible={style !== "embedded"}
      footer={
        <>
          <SummaryBar
            label={isAr ? "الإجمالي (١)" : "Total items (1)"}
            was={tr.origPrice}
            now={tr.newPrice}
            save={tr.saveBadge}
          />
          <CartCheckoutRow
            cartLabel={isAr ? "السلة" : "Cart"}
            cartValue={`${isAr ? "١٬٤٥٤" : "1,454"} ${currency}`}
            checkoutLabel={isAr ? "إتمام الطلب" : "Checkout"}
          />
          <DismissRow
            optOut={isAr ? "لا تعرضها مرة أخرى" : "Do not show again"}
            skip={isAr ? "تخطي" : "Skip"}
          />
        </>
      }
    >
      <StatCard
        value={`${isAr ? "٢٥٠" : "250"} ${currency}`}
        label={isAr ? "رصيد التوفير" : "Pricing balance"}
        benefits={[isAr ? "ضمان سنة" : "1-year warranty", isAr ? "شحن مجاني" : "Free shipping"]}
      />
      <ProductCollection shape={shape}>
        <ProductCard
          name={inCart.name}
          price={inCart.price}
          was={inCart.was}
          currency=""
          rating="4.95"
          reviews={isAr ? "٢١ تقييماً" : "21 reviews"}
          discount={isAr ? "٥٠٪" : "50%"}
          selected
          action={
            <WidgetButton block variant="muted">
              {isAr ? "مُضاف" : "Added"}
            </WidgetButton>
          }
        />
        {alternatives.map((p, i) => (
          <ProductCard
            key={i}
            name={p.name}
            price={p.price}
            currency={currency}
            rating="4.95"
            reviews={isAr ? "٢١ تقييماً" : "21 reviews"}
            action={<WidgetButton block>{tr.btnUpgrade}</WidgetButton>}
          />
        ))}
      </ProductCollection>
    </WidgetShell>
  );
}
