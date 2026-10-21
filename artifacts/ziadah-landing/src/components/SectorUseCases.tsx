import { useMemo } from "react";
import { Section as DsSection, SectionHead } from "@/sections";
import { Shell } from "@/components/mk";
import { useLanguage } from "@/i18n/LanguageContext";
import { getSectorDeepDive } from "@/data/sectorDeepDive";
import {
  StorefrontWidget, WIDGET_KINDS, widgetKindLabel, widgetKindWhen, type WidgetKind,
} from "@/components/widgets/storefrontSets";
import ShapeAccordion, { type AccordionItem } from "@/components/widgets/ShapeAccordion";
import { productImage } from "@/lib/product-images";
import FitWidget from "@/components/widgets/FitWidget";
import { ProductIcon } from "@/lib/product-icons";
import { packForSector } from "@/data/sectorProductPacks";

/**
 * THE SECTOR PAGE'S LIVE EXAMPLES.
 *
 * One band: the twelve shapes as a collapsible list, each one shown inside a
 * product page the way a shopper would meet it. It used to be followed by a
 * second band listing the sector's own moments one by one. That band repeated
 * what this one already shows and the home page's live examples, at the cost of
 * a page of scrolling, so it is gone. The sector's moments are not lost: they
 * are the cards in the hero deck at the top of the page, each with the sector's
 * own products and prices.
 *
 * The channels band survives. Only sectors that sell on more than one surface
 * declare channels, and for those it answers a question nothing else does:
 * WHERE the order is built.
 */
export default function SectorUseCases({ slug }: { slug: string }) {
  const { lang, dir } = useLanguage();
  const isAr = lang === "ar";
  const deep = getSectorDeepDive(slug);
  /* The sector's own five products, in every sheet and in the phone's header. */
  const pack = packForSector(slug);

  const shapeItems = useMemo<AccordionItem[]>(
    () =>
      WIDGET_KINDS.map((k) => ({
        key: k,
        title: widgetKindLabel(k, isAr),
        note: widgetKindWhen(k, isAr),
      })),
    [isAr],
  );

  if (!deep?.useCases.length) return null;

  /* A PRODUCT PAGE WITH THE OFFER INSIDE IT.
     The design file never draws a widget on its own: it draws a storefront
     screen with the widget sitting in it, because where it sits is half of
     what it is.

     A render FUNCTION, not a component. Declared as `const Phone = () => ...`
     inside this component it is a new type on every render, so React remounts
     the whole phone whenever anything above it changes state. */
  const phone = (k: WidgetKind) => {
    const heroName = isAr ? pack.main.ar : pack.main.en;
    const src = productImage(heroName);
    const price = pack.main.price;
    const was = Math.round(price * 1.25);
    return (
      <div className="pz" dir={dir}>
        <div className="pz-bar"><i /><i /><i /></div>
        <div className="pz-screen">
          {/* A compact product strip, not a whole product page: the sheet is
              the point, and a 150px photo plus name, price and button took
              half the phone and left the sheet at a third of its size. */}
          <div className="pz-strip">
            <div className="pz-hero">{src ? <img src={src} alt="" loading="lazy" decoding="async" /> : <span className="sf-tile-ic"><ProductIcon name={heroName} size={64} /></span>}</div>
            <div className="pz-info">
              <p className="pz-name">{heroName}</p>
              <p className="pz-price">{isAr ? `${price} ر.س` : `SAR ${price}`} <s>{isAr ? `${was} ر.س` : `SAR ${was}`}</s></p>
            </div>
            <span className="pz-add">{isAr ? "أضف" : "Add"}</span>
          </div>
          <span className="pz-mark">{isAr ? "من زيادة" : "By Ziadah"}</span>
          <FitWidget className="pz-fit"><StorefrontWidget kind={k} pack={pack} /></FitWidget>
        </div>
      </div>
    );
  };

  return (
    <>
      <DsSection id="section-shapes" family="grey">
        <SectionHead
          center
          kicker={isAr ? "أمثلة حية" : "Live examples"}
          title={isAr ? "ما الذي يظهر فعلاً في صفحة منتجك" : "What actually appears on your product page"}
          lead={isAr
            ? `${WIDGET_KINDS.length} شكلاً، كل واحد شاشة متجر كاملة لا بطاقة معلّقة في الهواء. يتنقل بينها التمرير، ويمكن الضغط على أي منها.`
            : `${WIDGET_KINDS.length} shapes, each one a full storefront screen rather than a card floating in mid-air. Scrolling moves through them, and any of them can be clicked.`}
        />
        <Shell>
          <div dir={dir}>
            <ShapeAccordion
              fill
              items={shapeItems}
              label={isAr ? "أشكال العرض" : "The shapes"}
              stage={(key) => phone(key as WidgetKind)}
            />
          </div>
        </Shell>
      </DsSection>

      {deep.channels?.length ? (
        <DsSection id="section-channels" family="grey">
          <SectionHead
            center
            kicker={isAr ? "القنوات" : "Channels"}
            title={isAr ? "القنوات" : "Channels"}
            lead={isAr
              ? "تطبيق زيادة لا يعمل في مكان واحد. هذه الأسطح التي يُبنى عليها الطلب في هذا القطاع."
              : "Ziadah does not run in one place. These are the surfaces the order is built on in this sector."}
          />
          <Shell>
            <div className="sdd-channels" dir={dir}>
              {deep.channels.map((ch) => (
                <article key={ch.code} className="sdd-channel">
                  <h3 className="sdd-channel-name">{isAr ? ch.nameAr : ch.nameEn}</h3>
                  <p className="sdd-channel-desc">{isAr ? ch.descAr : ch.descEn}</p>
                </article>
              ))}
            </div>
          </Shell>
        </DsSection>
      ) : null}
    </>
  );
}
