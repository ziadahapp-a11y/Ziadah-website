import { useLanguage } from "@/i18n/LanguageContext";
import {
  WidgetShell,
  ProductList,
  ProductRow,
  SummaryBar,
  AddAllBar,
  DismissRow,
  WidgetHint,
  type CampaignStyle,
} from "./kit";

/**
 * "اشترِ الكل": a fixed set the shopper takes in one click.
 *
 * What makes it a different widget from Buy Together is what is NOT there: no
 * checkboxes and no per-row actions. The set is locked, so the rows are plain
 * rows and the only control is the one bar that adds everything. The three
 * products and the prices are the sample set from the product's own design
 * file (257 for the three on their own, 199 for the set); nothing here is a
 * measured result.
 */
export default function BuyThemAllWidget({ style = "embedded" }: { style?: CampaignStyle }) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const currency = isAr ? "ر.س" : "SAR";

  const items = isAr
    ? [
        { name: "خلطة إسبريسو 1 كجم", price: "120" },
        { name: "ضاغط قهوة 58 مم", price: "85" },
        { name: "إبريق حليب 600 مل", price: "52" },
      ]
    : [
        { name: "Espresso Blend 1kg", price: "120" },
        { name: "Tamper 58mm", price: "85" },
        { name: "Milk Pitcher 600ml", price: "52" },
      ];

  return (
    <WidgetShell
      title={isAr ? "أكمل طقم الإسبريسو" : "Complete the espresso set"}
      subtitle={isAr ? "ثلاثة منتجات بسعر واحد." : "Three products, one price."}
      style={style}
      dismissible={style !== "embedded"}
      footer={
        <>
          <SummaryBar
            label={isAr ? "3 منتجات" : "3 items"}
            was={`257 ${currency}`}
            now={`199 ${currency}`}
          />
          <AddAllBar>{isAr ? "أضف الكل للسلة" : "Add all to cart"}</AddAllBar>
          <DismissRow
            optOut={isAr ? "لا تعرضها مرة أخرى" : "Do not show again"}
            skip={isAr ? "تخطي" : "Skip"}
          />
        </>
      }
    >
      <ProductList>
        {items.map((it) => (
          <ProductRow key={it.name} name={it.name} price={it.price} currency={currency} />
        ))}
      </ProductList>
      <WidgetHint>
        {isAr ? "المنتجات ثابتة داخل المجموعة ولا تُزال منها." : "The products are fixed in the set and cannot be removed."}
      </WidgetHint>
    </WidgetShell>
  );
}
