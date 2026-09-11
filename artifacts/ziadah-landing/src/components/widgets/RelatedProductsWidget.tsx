import { useMemo } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { RelatedProductsDemo } from "@/data/sectorWidgetShowcaseDemos";
import { mergeShowcaseDemo } from "@/data/sectorWidgetShowcaseDemos";
import { t as siteTranslations } from "@/i18n/translations";
import {
  WidgetShell,
  ProductCollection,
  ProductCard,
  WidgetButton,
  StatCard,
  CartCheckoutRow,
  DismissRow,
  type ProductShape,
  type CampaignStyle,
} from "./kit";

/**
 * "منتجات ذات صلة" as a storefront actually renders it: a heading, a short
 * list of products separated by hairlines, and ONE add-to-cart underneath.
 *
 * It used to be two lavender boxes with lavender borders, each holding a name,
 * an amber rating and a price all at 12px, over a full-width pale-violet ghost
 * button repeated per product. The rating is gone with the rest of them - it
 * was invented, and every product in the demo data carried a 4.6-plus score.
 */
export default function RelatedProductsWidget({
  demo,
  shape = "list",
  style = "embedded",
}: {
  demo?: RelatedProductsDemo;
  /** Which of the file's three product shapes to render in. */
  shape?: ProductShape;
  style?: CampaignStyle;
}) {
  const t = siteTranslations;
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const tr = useMemo(
    () => mergeShowcaseDemo(t[lang].widgets.relatedProducts, demo),
    [t, lang, demo],
  );
  const currency = tr.currency.trim();

  /* The file's sheet closes on three rows: what the cart stands at, the way
     out, and the opt-out. They are the same three on every product type, so
     they are built here once and passed as the shell's footer. */
  return (
    <WidgetShell
      title={tr.title}
      subtitle={tr.subtitle}
      style={style}
      dismissible={style !== "embedded"}
      footer={
        <>
          <WidgetButton block>{tr.btnAdd}</WidgetButton>
          <CartCheckoutRow
            cartLabel={isAr ? "السلة" : "Cart"}
            cartValue={`${"1,454"} ${currency}`}
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
        value={`250 ${currency}`}
        label={isAr ? "رصيد التوفير" : "Pricing balance"}
        benefits={[
          isAr ? "شحن مجاني" : "Free shipping",
          isAr ? "الدفع عند الاستلام" : "Cash on delivery",
        ]}
      />
      <ProductCollection shape={shape}>
        {tr.products.map((p, i) => (
          <ProductCard
            key={i}
            name={p.name}
            price={p.price}
            currency={currency}
            tag={tr.descLabel}
            rating="4.95"
            reviews={isAr ? "21 تقييماً" : "21 reviews"}
            discount={i === 0 ? ("50%") : undefined}
            favourite={shape !== "list"}
            action={<WidgetButton block>{isAr ? "أضف" : "Add"}</WidgetButton>}
          />
        ))}
      </ProductCollection>
    </WidgetShell>
  );
}
