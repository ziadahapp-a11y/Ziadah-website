import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { t as siteTranslations } from "@/i18n/translations";
import { WidgetShell, ProductRow, WidgetButton, WidgetHint } from "./kit";

/**
 * The add-to-cart moment, played as it happens in a store: the item goes in,
 * it confirms, and the complementary product appears under it.
 *
 * The three states used to be drawn as three different compositions - a 36px
 * 🛍️ emoji, then a green ✅, then a card - so the widget jumped layout twice
 * while a reader watched. The product row is now constant and only the STATUS
 * line under it changes, which is both what a store does and what makes the
 * suggestion the thing that moves.
 */
export default function AddToCartWidget() {
  const t = siteTranslations;
  const { lang } = useLanguage();
  const tr = t[lang].widgets.addToCart;

  const [step, setStep] = useState<"adding" | "added" | "recommend">("adding");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clearAll = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const run = useCallback(() => {
    clearAll();
    setStep("adding");
    timers.current.push(setTimeout(() => setStep("added"), 900));
    timers.current.push(setTimeout(() => setStep("recommend"), 1800));
  }, []);

  useEffect(() => {
    run();
    return clearAll;
  }, [run]);

  return (
    <WidgetShell
      title={tr.title}
      subtitle={tr.subtitle}
      footer={
        step === "recommend" ? (
          <WidgetButton block>{tr.btnAdd}</WidgetButton>
        ) : (
          <WidgetButton block variant="ghost" onClick={run}>
            {tr.btnReplay}
          </WidgetButton>
        )
      }
    >
      <ProductRow name={tr.productName} />
      <p className={`wk-status${step === "adding" ? " is-busy" : ""}`}>
        {step === "adding" ? (
          <>
            <Loader2 className="wk-status-ico wk-spin" aria-hidden="true" />
            {tr.adding}
          </>
        ) : (
          <>
            <Check className="wk-status-ico" aria-hidden="true" />
            {tr.added}
          </>
        )}
      </p>
      {step === "recommend" ? (
        <>
          <WidgetHint>{tr.alsoLabel}</WidgetHint>
          <ProductRow
            name={tr.suggestedName}
            price={tr.suggestedPrice}
            currency=""
            selected
          />
        </>
      ) : (
        <WidgetHint>{tr.qty}</WidgetHint>
      )}
    </WidgetShell>
  );
}
