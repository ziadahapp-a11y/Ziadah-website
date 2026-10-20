import { useLanguage } from "@/i18n/LanguageContext";
import type { SectorUseCase } from "@/data/sectorDeepDive";
import {
  WidgetShell, WidgetHint, WidgetButton, ProductRow, ProductList,
} from "@/components/widgets/kit";

/**
 * ONE SECTOR MOMENT, AS THE SHEET A SHOPPER WOULD SEE.
 *
 * Every sector file carries, per use case, the widget the moment fires: its
 * title, the product in the cart, the reason line, what Ziadah suggests
 * against it and the call to action - all in that sector's own products and
 * prices. A beauty page says "Vitamin C serum, 185" because `beautyCare.ts`
 * says so, not because anything here knows what beauty is.
 *
 * This was written inline inside the use-case list. The sector HERO now shows
 * the same moments as a deck, and two copies of one renderer is how the deck
 * and the list end up disagreeing about what the product looks like. One
 * component, two callers.
 *
 * `ds="figma"` keeps it the design system's white card on any band, so the
 * sheet is the same object on a violet hero and on a grey list.
 */
export default function SectorSheet({ uc }: { uc: SectorUseCase }) {
  const { isAr } = useLanguage();
  const w = uc.widget;
  if (!w) return null;

  const currency = isAr ? "ر.س" : "SAR";

  return (
    <WidgetShell
      ds="figma"
      maxWidth={340}
      title={isAr ? w.titleAr : w.titleEn}
      footer={<WidgetButton block>{isAr ? w.ctaAr : w.ctaEn}</WidgetButton>}
    >
      <WidgetHint>{isAr ? "ما يشاهده العميل" : "What the customer sees"}</WidgetHint>
      <ProductRow
        name={isAr ? w.mainAr : w.mainEn}
        price={w.mainPrice}
        currency={currency}
      />
      <WidgetHint>
        {isAr ? w.hintAr ?? "يقترح زيادة" : w.hintEn ?? "Ziadah suggests"}
      </WidgetHint>
      <ProductList>
        {w.suggest.map((sg, i) => (
          <ProductRow
            key={i}
            name={isAr ? sg.ar : sg.en}
            price={sg.price}
            was={sg.was}
            currency={currency}
            selected={i === 0}
          />
        ))}
      </ProductList>
    </WidgetShell>
  );
}
