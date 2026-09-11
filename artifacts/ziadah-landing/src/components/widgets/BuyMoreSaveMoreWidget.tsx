import { useMemo, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { BuyMoreSaveMoreDemo } from "@/data/sectorWidgetShowcaseDemos";
import { mergeShowcaseDemo } from "@/data/sectorWidgetShowcaseDemos";
import { t as siteTranslations } from "@/i18n/translations";
import {
  WidgetShell,
  WidgetButton,
  DealRow,
  CartCheckoutRow,
  DismissRow,
  type CampaignStyle,
} from "./kit";

/**
 * The quantity ladder. It is a set of options the shopper picks between, so it
 * behaves like one: the tiers are selectable and exactly one is active. The
 * old version drew three static violet boxes and highlighted the last with a
 * fourth shade of the same violet.
 */
export default function BuyMoreSaveMoreWidget({
  demo,
  style = "embedded",
}: {
  demo?: BuyMoreSaveMoreDemo;
  style?: CampaignStyle;
}) {
  const t = siteTranslations;
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const tr = useMemo(
    () => mergeShowcaseDemo(t[lang].widgets.buyMoreSaveMore, demo),
    [t, lang, demo],
  );
  const [picked, setPicked] = useState(tr.options.length - 1);
  const currency = t[lang].widgets.relatedProducts.currency.trim();

  /* The file draws the tiers as RADIO rows, not as buttons in a strip: each
     one carries its own saving and its own perk, and the chosen row opens to
     the per-item pickers and the commit. The old version was three static
     boxes with the last one shaded. */
  return (
    <WidgetShell
      title={tr.title}
      subtitle={tr.descLabel}
      style={style}
      dismissible={style !== "embedded"}
      footer={
        <>
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
      <div className="wk-deals">
        {tr.options.map((o, i) => (
          <DealRow
            key={i}
            name={o.qty}
            sub={o.label}
            price={o.price}
            was={o.origPrice ?? undefined}
            currency=""
            percent={o.badge ?? undefined}
            perk={i === tr.options.length - 1 ? tr.freeShippingNote : undefined}
            selected={i === picked}
            onClick={() => setPicked(i)}
            options={
              i === picked
                ? [
                    isAr ? "اختر خيارات المنتج الأول" : "Choose options for item 1",
                    isAr ? "اختر خيارات المنتج الثاني" : "Choose options for item 2",
                  ]
                : undefined
            }
            action={<WidgetButton block>{t[lang].widgets.relatedProducts.btnAdd}</WidgetButton>}
          />
        ))}
      </div>
    </WidgetShell>
  );
}
