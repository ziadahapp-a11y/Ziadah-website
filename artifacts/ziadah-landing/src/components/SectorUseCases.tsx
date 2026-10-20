import { useState } from "react";
import { Section as DsSection, SectionHead } from "@/sections";
import { Shell } from "@/components/mk";
import { useLanguage } from "@/i18n/LanguageContext";
import { getSectorDeepDive, type GoalSlug, type PresentationSlug, type SectorUseCase } from "@/data/sectorDeepDive";
import { goals, presentations } from "@/lib/features-data";
import {
  WidgetShell, WidgetHint, WidgetButton, ProductRow, ProductList,
} from "@/components/widgets/kit";
import { StorefrontWidget, WIDGET_KINDS, widgetKindLabel, type WidgetKind } from "@/components/widgets/storefrontSets";
import { productImage } from "@/lib/product-images";
import FitWidget from "@/components/widgets/FitWidget";

/**
 * PICK A MOMENT, SEE IT RUN.
 *
 * Two earlier shapes were wrong in the same direction: too much. First a wall
 * of five labelled paragraphs per card, then a whole playable storefront with
 * a shopping journey and a scorecard. Both asked the merchant to work before
 * they got anything.
 *
 * This asks for one click. The sector's moments are a list; the one you pick
 * plays beside it as the real sheet, from the same kit the product ships, in
 * the design system file's own tokens. Nothing to assemble, nothing to score,
 * no journey to complete.
 *
 * The sheet opens UNDER THE ROW that was clicked, at every width. A sticky
 * panel beside the list was the first attempt and it was wrong: with fifteen
 * rows the list is far taller than the panel, so by the time a merchant
 * clicked the tenth moment the sheet it changed was off the top of the
 * screen. Clicking a thing and having it answer somewhere else is not an
 * answer. One row is open at a time, so the list never becomes a wall again.
 */
export default function SectorUseCases({ slug }: { slug: string }) {
  const { lang, dir } = useLanguage();
  const isAr = lang === "ar";
  const deep = getSectorDeepDive(slug);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [kind, setKind] = useState<WidgetKind>("kit");

  if (!deep?.useCases.length) return null;

  const list = deep.useCases;
  /* The first moment is open on arrival so the band never reads as a plain
     list of links, and clicking the open row closes it again. */
  const activeId = activeKey ?? list[0].key;

  const L = {
    kicker: isAr ? "أمثلة حية" : "Live examples",
    title: isAr ? "اضغط أي حالة وشوف المثال الحي" : "Tap any moment and see the live example",
    lead: isAr
      ? "هذه اللحظات التي تشتغل فيها زيادة داخل هذا القطاع. اختر واحدة من القائمة وتظهر لك كما يراها عميلك تماماً، بمنتجات القطاع وأسعاره."
      : "These are the moments Ziadah fires in this sector. Pick one and it appears exactly as your customer sees it, in this sector's products and prices.",
    sees: isAr ? "ما يشاهده العميل" : "What the customer sees",
    suggests: isAr ? "يقترح زيادة" : "Ziadah suggests",
    currency: isAr ? "ر.س" : "SAR",
    when: isAr ? "متى" : "When",
    why: isAr ? "لماذا تنجح" : "Why it works",
    live: isAr ? "مثال حي" : "Live example",
    pick: isAr ? "اختر لحظة" : "Pick a moment",
  };

  const goalName = (s?: GoalSlug) => {
    const g = goals.find((x) => x.slug === s);
    return g ? (isAr ? g.title : g.titleEn) : null;
  };
  const presentationName = (s?: PresentationSlug) => {
    const p = presentations.find((x) => x.slug === s);
    return p ? (isAr ? p.title : p.titleEn) : null;
  };

  /* The sheet, exactly as it ships. `ds="figma"` keeps it the design system's
     white card on any band, so every moment's preview is the same product. */
  const Sheet = ({ uc }: { uc: SectorUseCase }) => {
    if (!uc.widget) return null;
    const w = uc.widget;
    return (
      <WidgetShell
        ds="figma"
        maxWidth={340}
        title={isAr ? w.titleAr : w.titleEn}
        footer={<WidgetButton block>{isAr ? w.ctaAr : w.ctaEn}</WidgetButton>}
      >
        <WidgetHint>{L.sees}</WidgetHint>
        <ProductRow
          name={isAr ? w.mainAr : w.mainEn}
          price={w.mainPrice}
          currency={L.currency}
        />
        <WidgetHint>{isAr ? w.hintAr ?? L.suggests : w.hintEn ?? L.suggests}</WidgetHint>
        <ProductList>
          {w.suggest.map((sg, i) => (
            <ProductRow
              key={i}
              name={isAr ? sg.ar : sg.en}
              price={sg.price}
              was={sg.was}
              currency={L.currency}
              selected={i === 0}
            />
          ))}
        </ProductList>
      </WidgetShell>
    );
  };

  const Detail = ({ uc }: { uc: SectorUseCase }) => (
    <div className="scq-stage-body">
      <span className="scq-stage-k">{L.live}</span>
      {/* Fitted, not cropped. The sheets are genuinely different heights, so
          a fixed stage either cuts the tall ones or wells the short ones. */}
      <FitWidget height={520}>
        <Sheet uc={uc} />
      </FitWidget>
      <p className="scq-stage-why">
        <span className="scq-stage-why-k">{L.why}</span>
        {isAr ? uc.whyAr : uc.whyEn}
      </p>
    </div>
  );

  /* A PRODUCT PAGE WITH THE OFFER INSIDE IT.
     The design file never draws a widget on its own: it draws a storefront
     screen with the widget sitting in it, because where it sits is half of
     what it is. A sheet floating on our violet band is a component; the same
     sheet under a product's own photo and price is the thing the merchant
     will actually ship. */
  const Phone = ({ k }: { k: WidgetKind }) => {
    const heroName = isAr ? "سماعات لاسلكية" : "Wireless Earbuds";
    const src = productImage(heroName);
    return (
      <div className="pz" dir={dir}>
        <div className="pz-bar"><i /><i /><i /></div>
        <div className="pz-screen">
          <div className="pz-hero">{src ? <img src={src} alt="" loading="lazy" decoding="async" /> : null}</div>
          <p className="pz-name">{heroName}</p>
          <p className="pz-price">{isAr ? "320 ر.س" : "SAR 320"} <s>{isAr ? "399 ر.س" : "SAR 399"}</s></p>
          <span className="pz-add">{isAr ? "أضف للسلة" : "Add to cart"}</span>
          <span className="pz-mark">{isAr ? "من زيادة" : "By Ziadah"}</span>
          <FitWidget height={470}><StorefrontWidget kind={k} /></FitWidget>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* THE SHAPES. Five real widget families from the design file, each in
          the storefront screen it belongs to. This is the band that answers
          "what does Ziadah put on my page", before the list answers "when". */}
      <DsSection id="section-shapes" family="grey">
        <SectionHead
          center
          kicker={isAr ? "أشكال العرض" : "The shapes"}
          title={isAr ? "ما الذي يظهر فعلاً في صفحة منتجك" : "What actually appears on your product page"}
          lead={isAr
            ? "خمسة أشكال، كل واحد شاشة متجر كاملة لا بطاقة معلّقة في الهواء. اضغط أي شكل وشوفه داخل الصفحة."
            : "Five shapes, each one a full storefront screen rather than a card floating in mid-air. Pick a shape and see it inside the page."}
        />
        <Shell>
          <div className="scq-shapes" dir={dir}>
            <div className="sdd-filter" role="group">
              {WIDGET_KINDS.map((k) => (
                <button
                  key={k} type="button" className="chip is-small"
                  aria-pressed={kind === k}
                  onClick={() => setKind(k)}
                >
                  {widgetKindLabel(k, isAr)}
                </button>
              ))}
            </div>
            <Phone k={kind} />
          </div>
        </Shell>
      </DsSection>

      {/* The channels band survives the simplification. Only sectors that
          sell on more than one surface declare channels, and for those it
          answers a question the moment list does not: WHERE the order is
          built. Dropping it with the rest of the furniture would have cost
          the restaurants page a band it actually needs. */}
      {deep.channels?.length ? (
        <DsSection id="section-channels" family="grey">
          <SectionHead
            center
            kicker={isAr ? "القنوات" : "Channels"}
            title={isAr ? "القنوات" : "Channels"}
            lead={isAr
              ? "زيادة لا تعمل في مكان واحد. هذه الأسطح التي يُبنى عليها الطلب في هذا القطاع."
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

    <DsSection id="section-use-cases" family="violet">
      <SectionHead center kicker={L.kicker} title={L.title} lead={L.lead} />
      <Shell>
        <div className="scq-pick" dir={dir}>
          {/* THE LIST. One row per moment: its name, when it fires, and the
              two tags. A row is a button, because that is what it does. */}
          <ul className="scq-rows">
            {list.map((uc) => {
              const on = uc.key === activeId;
              return (
                <li key={uc.key} className="scq-row-li">
                  <button
                    type="button"
                    className="scq-row"
                    aria-expanded={on}
                    onClick={() => setActiveKey(on ? "" : uc.key)}
                  >
                    <span className="scq-row-main">
                      <span className="scq-row-n">{isAr ? uc.titleAr : uc.titleEn}</span>
                      <span className="scq-row-w">
                        <span className="scq-row-w-k">{L.when}</span>
                        {isAr ? uc.triggerAr : uc.triggerEn}
                      </span>
                      <span className="scq-row-tags">
                        {goalName(uc.goal) ? <span className="scq-tag">{goalName(uc.goal)}</span> : null}
                        {presentationName(uc.presentation) ? (
                          <span className="scq-tag is-shape">{presentationName(uc.presentation)}</span>
                        ) : null}
                      </span>
                    </span>
                    <span className="scq-row-go" aria-hidden="true">{on ? "−" : "+"}</span>
                  </button>

                  {on ? <div className="scq-inline"><Detail uc={uc} /></div> : null}
                </li>
              );
            })}
          </ul>

        </div>
      </Shell>
    </DsSection>
    </>
  );
}
