import { useState } from "react";
import { Search } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { t as siteTranslations } from "@/i18n/translations";
import {
  WidgetShell, ProductRow, WidgetButton, WidgetTag, WidgetHint, Totals, Price,
} from "./kit";

/**
 * The save-the-cart moment: the shopper goes to remove an item, and the engine
 * answers with an offer before they do.
 *
 * Three steps, one layout. The item on the line stays put and what changes is
 * the ACTION under it - remove, then confirm, then the counter-offer - so the
 * widget reads as one screen responding rather than three unrelated cards.
 */
export default function RemoveFromCartWidget() {
  const t = siteTranslations;
  const { lang } = useLanguage();
  const tr = t[lang].widgets.removeFromCart;
  const [step, setStep] = useState<"cart" | "confirm" | "offer">("cart");

  return (
    <WidgetShell
      title={tr.title}
      subtitle={tr.subtitle}
      footer={
        step === "cart" ? (
          <WidgetButton block variant="ghost" onClick={() => setStep("confirm")}>
            {tr.btnRemove}
          </WidgetButton>
        ) : step === "confirm" ? (
          <WidgetButton block onClick={() => setStep("offer")}>
            {tr.confirmTitle}
          </WidgetButton>
        ) : (
          <WidgetButton block onClick={() => setStep("cart")}>
            {tr.btnAccept}
          </WidgetButton>
        )
      }
    >
      <WidgetHint>{tr.cartLabel}</WidgetHint>
      <ProductRow
        name={tr.productName}
        price={step === "offer" ? tr.newPrice : tr.productPrice}
        was={step === "offer" ? tr.originalPrice : undefined}
        currency=""
        selected={step === "offer"}
        badge={
          step === "offer" ? (
            <WidgetTag tone="save">{tr.saveLabel}</WidgetTag>
          ) : (
            <WidgetTag>{tr.productSize}</WidgetTag>
          )
        }
      />

      {step === "cart" ? <WidgetHint>{tr.clickRemoveNote}</WidgetHint> : null}

      {step === "confirm" ? (
        <>
          <WidgetHint>{tr.confirmSub}</WidgetHint>
          <p className="wk-status is-busy">
            <Search className="wk-status-ico" aria-hidden="true" />
            {tr.searchingLabel}
          </p>
        </>
      ) : null}

      {step === "offer" ? (
        <>
          <Totals rows={[{ k: tr.offerTitle, v: <Price value={tr.newPrice} currency="" size={16} />, total: true }]} />
          <WidgetHint>{tr.offerExpires}</WidgetHint>
          <button type="button" className="wk-link" onClick={() => setStep("cart")}>
            {tr.btnRemoveAnyway}
          </button>
        </>
      ) : null}
    </WidgetShell>
  );
}
