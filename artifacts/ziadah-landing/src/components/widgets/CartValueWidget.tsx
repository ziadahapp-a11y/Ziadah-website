import { useMemo } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { t as siteTranslations } from "@/i18n/translations";
import {
  WidgetShell,
  ProductCollection,
  ProductCard,
  WidgetButton,
  WidgetPanel,
  Milestones,
  StatCard,
  DismissRow,
  type ProductShape,
  type CampaignStyle,
} from "./kit";

/**
 * Cart Value — the file's last section, and the only one that had no
 * component on this side.
 *
 * WHAT MAKES IT DIFFERENT. Every other type asks the shopper to add a
 * product. This one asks them to cross a line, and the reward for crossing it
 * is a LADDER rather than a single prize: a discount, then a bigger one, then
 * free shipping, then a gift. So the argument is the tracker, not the
 * products; the products are just what is near enough to close the gap.
 *
 * It has no row on the home page yet, because the band there is the seven use
 * cases the site sells. The component exists so the file is fully covered and
 * so a row can be added without building it first.
 */
export default function CartValueWidget({
  shape = "list",
  style = "embedded",
}: {
  shape?: ProductShape;
  style?: CampaignStyle;
}) {
  const t = siteTranslations;
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const tr = t[lang].widgets;
  const currency = tr.relatedProducts.currency.trim();

  const products = useMemo(() => tr.relatedProducts.products.slice(0, 3), [tr]);

  /* MEASURED off the file: four rungs, the first reached. The reached one is
     the only one that carries ink, so the rail reads as progress rather than
     as four equal options. */
  const steps = [
    { label: isAr ? "٥٪" : "05%", done: true },
    { label: isAr ? "١٠٪" : "10%" },
    { label: isAr ? "شحن مجاني" : "Free shipping" },
    { label: isAr ? "هدية" : "Gift" },
  ];

  return (
    <WidgetShell
      title={isAr ? "أضف المزيد ووفّر أكثر" : "Add more products"}
      subtitle={
        isAr
          ? "اكتشف هذه المنتجات قبل إتمام طلبك."
          : "Explore these great items before you checkout."
      }
      style={style}
      dismissible={style !== "embedded"}
      footer={
        <DismissRow
          optOut={isAr ? "لا تعرضها مرة أخرى" : "Do not show again"}
          skip={isAr ? "تخطي" : "Skip"}
        />
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

      <ProductCollection shape={shape}>
        {products.map((p, i) => (
          <ProductCard
            key={i}
            name={p.name}
            price={p.price}
            currency={currency}
            rating="4.95"
            reviews={isAr ? "٢١ تقييماً" : "21 reviews"}
            discount={i === 0 ? (isAr ? "٥٠٪" : "50%") : undefined}
            checked={i === 0}
            selected={i === 0}
            favourite={shape !== "list"}
            action={
              <WidgetButton block variant={i === 0 ? "muted" : "primary"}>
                {i === 0 ? (isAr ? "مُضاف" : "Added") : isAr ? "أضف" : "Add"}
              </WidgetButton>
            }
          />
        ))}
      </ProductCollection>

      <WidgetPanel
        title={isAr ? "ارفع قيمة سلتك" : "Increase Cart Value"}
        sub={
          isAr
            ? "أكمل المراحل التالية للحصول على أفضل قيمة لسلتك."
            : "Complete the milestones below to get the best cart value."
        }
      >
        <Milestones
          note={
            isAr
              ? `أضف ١٥ ${currency} واحصل على خصم ٢٠٪`
              : `Add 15 ${currency} and get 20% off`
          }
          steps={steps}
        />
        <WidgetButton block>{isAr ? "إتمام الطلب" : "Checkout"}</WidgetButton>
      </WidgetPanel>
    </WidgetShell>
  );
}
