import { useMemo } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { FreeShippingDemo } from "@/data/sectorWidgetShowcaseDemos";
import { mergeShowcaseDemo } from "@/data/sectorWidgetShowcaseDemos";
import { t as siteTranslations } from "@/i18n/translations";
import {
  WidgetShell,
  ProductCollection,
  ProductCard,
  PromoBanner,
  StatCard,
  SummaryBar,
  AddAllBar,
  CartCheckoutRow,
  DismissRow,
  WidgetButton,
  arabicDigits,
  type ProductShape,
  type CampaignStyle,
} from "./kit";

/**
 * The free-shipping meter, plus what would close the gap. The bar is the
 * widget's whole argument, so it leads; the products under it are the means.
 */
export default function FreeShippingThresholdWidget({
  demo,
  shape = "list",
  style = "embedded",
}: {
  demo?: FreeShippingDemo;
  shape?: ProductShape;
  style?: CampaignStyle;
}) {
  const t = siteTranslations;
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const tr = useMemo(() => mergeShowcaseDemo(t[lang].widgets.freeShipping, demo), [t, lang, demo]);
  const currency = tr.currency.trim();

  /* The file leads this one with an OFFER block rather than a meter: the
     gradient banner states the reward and hands the shopper a way to pick
     what closes the gap. The products follow, and the sheet closes on the
     same summary, add-all and cart rows every other type uses. */
  return (
    <WidgetShell
      title={isAr ? "أضف المزيد من المنتجات" : "Add more products"}
      subtitle={
        isAr
          ? "اكتشف هذه المنتجات قبل إتمام طلبك."
          : "Explore these great items before you checkout."
      }
      style={style}
      dismissible={style !== "embedded"}
      footer={
        <>
          <SummaryBar
            label={
              isAr
                ? `الإجمالي (${arabicDigits(tr.products.length)})`
                : `Total items (${tr.products.length})`
            }
            was={`${isAr ? "٥٦" : "56"} ${currency}`}
            now={`${isAr ? "٤٠" : "40"} ${currency}`}
            save={isAr ? "وفّر ٢٠٪" : "Save 20%"}
          />
          <AddAllBar>{isAr ? "أضف الكل" : "Add all"}</AddAllBar>
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
        benefits={[
          isAr ? "شحن مجاني" : "Free shipping",
          isAr ? "الدفع عند الاستلام" : "Cash on delivery",
        ]}
      />
      <PromoBanner
        title={tr.progressTitle}
        sub={tr.progressNote}
        action={
          <WidgetButton block>{isAr ? "اختر المنتجات" : "Choose products"}</WidgetButton>
        }
      />
      <ProductCollection shape={shape}>
        {tr.products.map((p, i) => (
          <ProductCard
            key={i}
            name={p.name}
            price={p.price}
            currency={currency}
            rating="4.95"
            reviews={isAr ? "٢١ تقييماً" : "21 reviews"}
            favourite={shape !== "list"}
            action={<WidgetButton block>{isAr ? "أضف" : "Add"}</WidgetButton>}
          />
        ))}
      </ProductCollection>
    </WidgetShell>
  );
}
