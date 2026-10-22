import { useMemo } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { StorefrontWidget, WIDGET_KINDS, widgetKindLabel } from "@/components/widgets/storefrontSets";
import CardDeck, { type DeckCard } from "@/components/widgets/CardDeck";

/**
 * The home hero's deck: all twelve storefront shapes.
 *
 * The hero used to show one device with one screen in it, which said "Ziadah
 * does a thing" without saying how many. The deck says the real thing: here
 * is every shape Ziadah can put on a storefront, and you can go through them.
 *
 * The cards are the SAME components the sector pages render, not pictures of
 * them. A screenshot in a hero is a promise that ages; this one cannot drift
 * from the product because it is the product.
 *
 * The fan itself - the damped spread, the drag, the dots, the keyboard - now
 * lives in `CardDeck`, because the sector and solution heroes want the same
 * object with their own cards in it.
 */
/** The seven shapes the hero leads with; the other four live on the shapes section. */
const HERO_KINDS = ["related", "quantity", "drawer", "kit", "replace", "bmsm", "cartvalue"] as const;

export default function FannedWidgets() {
  const { isAr } = useLanguage();

  const cards = useMemo<DeckCard[]>(
    () =>
      WIDGET_KINDS.filter((k) => (HERO_KINDS as readonly string[]).includes(k)).map((kind) => ({
        key: kind,
        label: widgetKindLabel(kind, isAr),
        node: <StorefrontWidget kind={kind} />,
      })),
    [isAr],
  );

  return <CardDeck cards={cards} label={isAr ? "أشكال الويدجت" : "Widget shapes"} />;
}
