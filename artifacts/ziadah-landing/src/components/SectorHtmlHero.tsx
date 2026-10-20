import { useMemo, useState } from "react";
import { Rocket, ArrowDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SectorPageRich } from "@/data/sectorPageTypes";
import PlatformModal from "@/components/PlatformModal";
import { Button } from "@/components/mk";
import { HeroSplit } from "@/sections";
import {
  PhoneFrame, WidgetShell, ProductList, ProductRow, WidgetHint,
} from "@/components/widgets/kit";
import CardDeck, { type DeckCard } from "@/components/widgets/CardDeck";
import SectorSheet from "@/components/widgets/SectorSheet";
import { getSectorDeepDive } from "@/data/sectorDeepDive";

type Props = {
  rich: SectorPageRich;
  sectorTitle: string;
  sectorsBreadcrumb: string;
  onScrollTo: (id: string) => void;
  /** Which sector's moments fill the hero deck. */
  slug: string;
};


/**
 * Splits an order line into name and price.
 *
 * The data writes these two different ways and only one of them has a
 * separator: English is "🍝 Creamy pasta — 58 SAR", Arabic is
 * "🍝 باستا كريمية 58ر.س" with no dash at all. Matching only on the dash left
 * every Arabic row with its price inside the name and an empty price beside
 * it, which is what the first pass shipped.
 *
 * So: drop the leading emoji (the kit draws a tile from the name), then take
 * the trailing number as the price whether or not a dash announces it, and
 * strip the unit so the preview can state it in the reader's own language.
 */
function splitLine(text: string) {
  const noIcon = text.replace(/^\s*\p{Extended_Pictographic}[\uFE0F\u200D]*\s*/u, "").trim();
  const m = noIcon.match(/^(.*?)\s*(?:[—–-]\s*)?([\d][\d,.]*)\s*(?:SAR|ر\.?\s?س)?\s*$/iu);
  if (m && m[1].trim()) return { name: m[1].trim(), price: m[2] };
  return { name: noIcon, price: "" };
}

/**
 * Sector hero — a `HeroSplit` carrying the violet family, so it opens the same
 * way every other page on the site does. Content still comes from the sector's
 * own `rich` data, and the phone is unchanged: it is the one thing on the page
 * that shows rather than tells.
 */
export default function SectorHtmlHero({ rich, sectorTitle, sectorsBreadcrumb, onScrollTo, slug }: Props) {
  const { lang, dir } = useLanguage();
  const isAr = lang === "ar";
  const [platformModalOpen, setPlatformModalOpen] = useState(false);

  /* THE DECK IS THIS SECTOR'S OWN MOMENTS.
     The home hero fans the twelve storefront shapes, because the home page
     argues that there are twelve. A sector page argues something narrower -
     here is what Ziadah fires in YOUR shop - so the cards are the sector's
     own use cases, each rendering the widget its data already carries, in
     that sector's products and prices. A beauty page opens on a vitamin C
     serum because `beautyCare.ts` says so; nothing here knows what beauty is.

     Not every sector uses every shape, and that is the point: a deck of five
     moments on one sector and fifteen on another is the honest picture. */
  const deck = useMemo<DeckCard[]>(() => {
    const deep = getSectorDeepDive(slug);
    if (!deep) return [];
    return deep.useCases
      .filter((uc) => uc.widget)
      .map((uc) => ({
        key: uc.key,
        label: isAr ? uc.titleAr : uc.titleEn,
        node: <SectorSheet uc={uc} />,
      }));
  }, [slug, isAr]);

  const useSplit = Boolean(
    (rich.heroHeadlineLine1Ar && rich.heroHeadlineLine2Ar) || (rich.heroHeadlineLine1En && rich.heroHeadlineLine2En),
  );
  const badge = isAr ? rich.heroBadgeAr : rich.heroBadgeEn;
  const sub = isAr ? rich.heroSubAr : rich.heroSubEn;
  const ft1 = isAr ? rich.heroFloatTag1Ar : rich.heroFloatTag1En;
  const ft2 = isAr ? rich.heroFloatTag2Ar : rich.heroFloatTag2En;
  const phoneBar = isAr ? rich.heroPhoneBarAr ?? "تطبيق التوصيل" : rich.heroPhoneBarEn ?? "Delivery app";
  const primaryCta = rich.heroPrimaryCtaTargetId ?? "section-why";
  const cur = isAr ? "ر.س" : "SAR";

  return (
    <>
      <HeroSplit
        family="violet"
        eyebrow={badge || sectorsBreadcrumb}
        title={
          useSplit ? (
            <>
              {isAr ? rich.heroHeadlineLine1Ar : rich.heroHeadlineLine1En}{" "}
              {/* The second line is the sector's own promise, so it carries the
                  brand hue rather than the section ink. `text-brand` is not
                  that: the ramp resolves it to `--color-secondary`, which is
                  the ink the rest of the headline already uses. */}
              <span className="hero-accent">
                {isAr ? rich.heroHeadlineLine2Ar : rich.heroHeadlineLine2En}
              </span>
            </>
          ) : (
            <>{isAr ? rich.heroHeadlineAr : rich.heroHeadlineEn}</>
          )
        }
        body={sub}
        actions={
          <>
            <Button variant="primary" size="lg" onClick={() => setPlatformModalOpen(true)}>
              <Rocket className="w-4 h-4" aria-hidden="true" />
              {isAr ? "فعّل الآن" : "Activate Now"}
            </Button>
            <Button variant="tertiary" size="lg" onClick={() => onScrollTo(primaryCta)}>
              {isAr ? "شوف كيف تشتغل" : "See how it works"}
              <ArrowDown className="w-4 h-4" aria-hidden="true" />
            </Button>
          </>
        }
        note={
          <>
            <span className="font-medium">{isAr ? "القطاع" : "Sector"}: </span>
            {sectorTitle}
          </>
        }
        media={
          /* The sector's evidence: its real moments, as the sheets a shopper
             would meet, fanned so the whole set is visible before anything is
             clicked. This used to be ONE static phone holding one order and
             one suggestion list - a single frame standing in for a sector
             that fires five to fifteen different offers.

             The phone survives only as a fallback. A sector whose data has no
             widgets would otherwise render an empty hero, and an empty hero
             is worse than an old one. */
          deck.length ? (
            <div dir={dir} className="sector-hero-deck">
              <CardDeck cards={deck} label={sectorTitle} cardHeight={330} />
            </div>
          ) : (
          <div dir={dir} className="ucp-stage">
            {ft1 ? <p className="ucp-float ucp-float--1">{ft1}</p> : null}
            <PhoneFrame label={phoneBar} width={300}>
              <WidgetShell title={isAr ? "طلب العميل" : "The customer's order"}>
                <ProductList>
                  {rich.phoneOrders.map((line, i) => {
                    const o = splitLine(isAr ? line.ar : line.en);
                    return (
                      <ProductRow key={i} name={o.name} price={o.price} currency={cur} />
                    );
                  })}
                </ProductList>
                <WidgetHint>{isAr ? "زيادة يقترح" : "Ziadah suggests"}</WidgetHint>
                <ProductList>
                  {rich.phoneRecs.map((line, i) => {
                    const o = splitLine(isAr ? line.ar : line.en);
                    return (
                      <ProductRow
                        key={i}
                        name={o.name}
                        price={o.price}
                        currency={cur}
                        selected={i === 0}
                      />
                    );
                  })}
                </ProductList>
              </WidgetShell>
            </PhoneFrame>
            {ft2 ? <p className="ucp-float ucp-float--2">{ft2}</p> : null}
          </div>
          )
        }
      />
      <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
