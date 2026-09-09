import { useMemo, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { BuyMoreSaveMoreDemo } from "@/data/sectorWidgetShowcaseDemos";
import { mergeShowcaseDemo } from "@/data/sectorWidgetShowcaseDemos";
import { t as siteTranslations } from "@/i18n/translations";
import { WidgetShell, WidgetButton, WidgetTag, WidgetHint } from "./kit";

/**
 * The quantity ladder. It is a set of options the shopper picks between, so it
 * behaves like one: the tiers are selectable and exactly one is active. The
 * old version drew three static violet boxes and highlighted the last with a
 * fourth shade of the same violet.
 */
export default function BuyMoreSaveMoreWidget({ demo }: { demo?: BuyMoreSaveMoreDemo }) {
  const t = siteTranslations;
  const { lang } = useLanguage();
  const tr = useMemo(
    () => mergeShowcaseDemo(t[lang].widgets.buyMoreSaveMore, demo),
    [t, lang, demo],
  );
  const [picked, setPicked] = useState(tr.options.length - 1);

  return (
    <WidgetShell title={tr.title} subtitle={tr.descLabel}>
      <div className="wk-tiers">
        {tr.options.map((o, i) => (
          <button
            key={i}
            type="button"
            className={`wk-tier${i === picked ? " is-sel" : ""}`}
            aria-pressed={i === picked}
            onClick={() => setPicked(i)}
          >
            <span className="wk-meta">
              <strong>{o.qty}</strong>
              <span className="wk-kv-k">{o.label}</span>
            </span>
            <span className="wk-meta">
              {o.badge ? <WidgetTag tone="save">{o.badge}</WidgetTag> : null}
              <span className="wk-price" style={{ fontSize: 13 }}>
                <bdi>{o.price}</bdi>
                {o.origPrice ? <s className="wk-was">{o.origPrice}</s> : null}
              </span>
            </span>
          </button>
        ))}
      </div>
      <WidgetHint>{tr.freeShippingNote}</WidgetHint>
      <WidgetButton block>{t[lang].widgets.relatedProducts.btnAdd}</WidgetButton>
    </WidgetShell>
  );
}
