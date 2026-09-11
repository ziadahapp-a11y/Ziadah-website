import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { AddonsDemo } from "@/data/sectorWidgetShowcaseDemos";
import { mergeShowcaseDemo } from "@/data/sectorWidgetShowcaseDemos";
import { t as siteTranslations } from "@/i18n/translations";
import {
  WidgetShell,
  ProductCollection,
  ProductCard,
  WidgetButton,
  StatCard,
  SummaryBar,
  AddAllBar,
  CartCheckoutRow,
  DismissRow,
  arabicDigits,
  type ProductShape,
  type CampaignStyle,
} from "./kit";

/**
 * Add-ons: a checklist whose total moves as the shopper ticks items.
 *
 * The state used to be unreadable - a checked row was a violet box with a
 * violet border and a violet checkbox, so "selected" and "the widget's accent
 * colour" were the same thing. The checkbox carries the state now and the row
 * only tints behind it.
 */
export default function AddonsWidget({
  demo,
  shape = "list",
  style = "embedded",
}: {
  demo?: AddonsDemo;
  shape?: ProductShape;
  style?: CampaignStyle;
}) {
  const t = siteTranslations;
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const tr = useMemo(() => mergeShowcaseDemo(t[lang].widgets.addons, demo), [t, lang, demo]);
  const currency = tr.currency.trim();

  const [checked, setChecked] = useState<boolean[]>(() => tr.items.map((i) => i.checked));
  useEffect(() => setChecked(tr.items.map((i) => i.checked)), [tr.items]);
  const toggle = (idx: number) => setChecked((p) => p.map((c, i) => (i === idx ? !c : c)));

  const total = tr.items.reduce((s, p, i) => (checked[i] ? s + p.price : s), 0);
  const picked = checked.filter(Boolean).length;

  /* Add-ons are products in the file, not checklist lines: the same card the other types use, with the action carrying the chosen state. */
  return (
    <WidgetShell
      title={tr.title}
      subtitle={tr.descLabel}
      style={style}
      dismissible={style !== "embedded"}
      footer={
        <>
          <SummaryBar
            label={isAr ? `الإجمالي (${arabicDigits(picked)})` : `Total items (${picked})`}
            now={`${total} ${currency}`}
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
      <ProductCollection shape={shape}>
        {tr.items.map((p, i) => (
          <ProductCard
            key={i}
            name={p.name}
            price={String(p.price)}
            currency={currency}
            rating="4.95"
            reviews={isAr ? "٢١ تقييماً" : "21 reviews"}
            checked={checked[i]}
            selected={checked[i]}
            favourite={shape !== "list"}
            action={
              <WidgetButton
                block
                variant={checked[i] ? "muted" : "primary"}
                onClick={() => toggle(i)}
              >
                {checked[i] ? (isAr ? "مُضاف" : "Added") : isAr ? "أضف" : "Add"}
              </WidgetButton>
            }
          />
        ))}
      </ProductCollection>
    </WidgetShell>
  );
}
