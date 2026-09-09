import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { AddonsDemo } from "@/data/sectorWidgetShowcaseDemos";
import { mergeShowcaseDemo } from "@/data/sectorWidgetShowcaseDemos";
import { t as siteTranslations } from "@/i18n/translations";
import { WidgetShell, ProductList, CheckRow, WidgetButton, Totals, Price } from "./kit";

/**
 * Add-ons: a checklist whose total moves as the shopper ticks items.
 *
 * The state used to be unreadable - a checked row was a violet box with a
 * violet border and a violet checkbox, so "selected" and "the widget's accent
 * colour" were the same thing. The checkbox carries the state now and the row
 * only tints behind it.
 */
export default function AddonsWidget({ demo }: { demo?: AddonsDemo }) {
  const t = siteTranslations;
  const { lang } = useLanguage();
  const tr = useMemo(() => mergeShowcaseDemo(t[lang].widgets.addons, demo), [t, lang, demo]);
  const currency = tr.currency.trim();

  const [checked, setChecked] = useState<boolean[]>(() => tr.items.map((i) => i.checked));
  useEffect(() => setChecked(tr.items.map((i) => i.checked)), [tr.items]);
  const toggle = (idx: number) => setChecked((p) => p.map((c, i) => (i === idx ? !c : c)));

  const total = tr.items.reduce((s, a, i) => (checked[i] ? s + a.price : s), 0);

  return (
    <WidgetShell
      title={tr.title}
      subtitle={tr.descLabel}
      footer={<WidgetButton block>{tr.btnAdd}</WidgetButton>}
    >
      <ProductList>
        {tr.items.map((a, i) => (
          <CheckRow
            key={i}
            name={a.name}
            price={String(a.price)}
            currency={currency}
            checked={!!checked[i]}
            onToggle={() => toggle(i)}
          />
        ))}
      </ProductList>
      <Totals
        rows={[
          {
            k: tr.totalLabel,
            v: <Price value={String(total)} currency={currency} size={16} />,
            total: true,
          },
        ]}
      />
    </WidgetShell>
  );
}
