import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { BuyTogetherDemo } from "@/data/sectorWidgetShowcaseDemos";
import { mergeShowcaseDemo } from "@/data/sectorWidgetShowcaseDemos";
import { t as siteTranslations } from "@/i18n/translations";
import { WidgetShell, ProductList, CheckRow, WidgetButton, WidgetTag, Totals, Price } from "./kit";

/**
 * "اشتروا مع بعض": the product being viewed, plus what ships with it, as one
 * togglable set with a running total.
 *
 * The invented rating line is gone - every product in this demo carried the
 * same 4.9 - and the tag that marks the product the shopper is already on
 * reads as a tag rather than as a third violet box.
 */
export default function BuyTogetherWidget({ demo }: { demo?: BuyTogetherDemo }) {
  const t = siteTranslations;
  const { lang } = useLanguage();
  const tr = useMemo(() => mergeShowcaseDemo(t[lang].widgets.buyTogether, demo), [t, lang, demo]);
  const currency = tr.currency.trim();

  const [checked, setChecked] = useState<boolean[]>(() => tr.items.map((i) => i.checked));
  useEffect(() => setChecked(tr.items.map((i) => i.checked)), [tr.items]);
  const toggle = (idx: number) => setChecked((p) => p.map((c, i) => (i === idx ? !c : c)));

  const total = tr.items.reduce((s, p, i) => (checked[i] ? s + p.price : s), 0);
  const picked = checked.filter(Boolean).length;

  return (
    <WidgetShell
      title={tr.title}
      subtitle={tr.descLabel}
      footer={
        /* The label used to end in a dangling "—" with the total appended by
           the caller, so dropping the total left the button reading
           "اشترِ الطقم كاملاً — ر.س". The label is a whole sentence now and
           the total rides beside it, which is where a store puts it. */
        <WidgetButton block>
          {tr.btnBuy}
          <span className="wk-btn-num">
            <bdi>{total}</bdi> {currency}
          </span>
        </WidgetButton>
      }
    >
      <ProductList>
        {tr.items.map((p, i) => (
          <CheckRow
            key={i}
            name={p.name}
            price={String(p.price)}
            was={p.originalPrice ? String(p.originalPrice) : undefined}
            currency={currency}
            tag={p.tag ? <WidgetTag>{p.tag}</WidgetTag> : undefined}
            checked={!!checked[i]}
            onToggle={() => toggle(i)}
          />
        ))}
      </ProductList>
      <Totals
        rows={[
          {
            k: `${picked} / ${tr.items.length}`,
            v: <Price value={String(total)} currency={currency} size={16} />,
            total: true,
          },
        ]}
      />
    </WidgetShell>
  );
}
