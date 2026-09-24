import { useMemo, useState } from "react";
import { Section as DsSection, SectionHead } from "@/sections";
import { Shell } from "@/components/mk";
import { useLanguage } from "@/i18n/LanguageContext";
import { getSectorDeepDive, type SectorUseCase } from "@/data/sectorDeepDive";
import {
  WidgetShell, WidgetHint, WidgetButton, ProductRow, ProductList,
} from "@/components/widgets/kit";

/**
 * THE SECTOR'S OWN MOMENTS, one card each.
 *
 * The rest of a sector page argues that Ziadah is worth having. This is the
 * part that answers "where exactly does it fire in MY business", which is the
 * question that actually closes a merchant, and the one the site could only
 * answer generically before.
 *
 * Each card is the same four lines in the same order - the moment, what the
 * customer sees, why it works here, a worked example with this sector's own
 * prices - because a merchant scanning eight of them is comparing moments, and
 * comparison needs a fixed shape. The channel filter appears only for sectors
 * that sell on more than one surface; for a jewellery shop there is one
 * surface and a filter with one button is furniture.
 */
export default function SectorUseCases({ slug }: { slug: string }) {
  const { lang, dir } = useLanguage();
  const isAr = lang === "ar";
  const deep = getSectorDeepDive(slug);
  const [activeChannel, setActiveChannel] = useState<string>("all");

  const visible = useMemo(() => {
    if (!deep) return [];
    if (activeChannel === "all") return deep.useCases;
    return deep.useCases.filter((u) => u.channel === activeChannel);
  }, [deep, activeChannel]);

  if (!deep) return null;

  const labels = {
    kicker: isAr ? "حالات الاستخدام" : "Use cases",
    title: isAr ? "أين تعمل زيادة داخل هذا القطاع؟" : "Where Ziadah fires inside this sector",
    trigger: isAr ? "اللحظة" : "The moment",
    scenario: isAr ? "ما يراه العميل" : "What the customer sees",
    why: isAr ? "لماذا ينجح هنا" : "Why it works here",
    example: isAr ? "مثال حي" : "Live example",
    sees: isAr ? "ما يشاهده العميل" : "What the customer sees",
    suggests: isAr ? "يقترح زيادة" : "Ziadah suggests",
    currency: isAr ? "ر.س" : "SAR",
    all: isAr ? "كل القنوات" : "All channels",
    channelsTitle: isAr ? "القنوات" : "Channels",
    channelsLead: isAr
      ? "زيادة لا تعمل في مكان واحد. هذه الأسطح التي يُبنى عليها الطلب في هذا القطاع."
      : "Ziadah does not run in one place. These are the surfaces the order is built on in this sector.",
  };

  const channelName = (code?: string) => {
    if (!code) return null;
    const ch = deep.channels?.find((c) => c.code === code);
    return ch ? (isAr ? ch.nameAr : ch.nameEn) : null;
  };

  return (
    <>
      {deep.channels?.length ? (
        <DsSection id="section-channels" family="grey">
          {/* NOT centred. Every other content head on a sector page - "Why
              Ziadah here", "How to apply", "Sector engine", "Measurement" -
              starts at the reading edge above a start-aligned column. Two
              centred heads in the middle of that read as lifted from another
              page, and a centred head over start-aligned body copy leaves a
              ragged relationship between the two. */}
          <SectionHead
            kicker={labels.channelsTitle}
            title={labels.channelsTitle}
            lead={labels.channelsLead}
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
        <SectionHead
          kicker={labels.kicker}
          title={labels.title}
          lead={isAr ? deep.introAr : deep.introEn}
        />
        <Shell>
          {deep.channels?.length ? (
            /* A filter, not a tab strip: every card stays reachable and "all"
               is the default, because a merchant who does not yet run a kiosk
               still wants to see what a kiosk would do. */
            <div className="sdd-filter" dir={dir} role="group" aria-label={labels.channelsTitle}>
              <button
                type="button"
                className="chip is-small"
                aria-pressed={activeChannel === "all"}
                onClick={() => setActiveChannel("all")}
              >
                {labels.all}
              </button>
              {deep.channels.map((ch) => (
                <button
                  key={ch.code}
                  type="button"
                  className="chip is-small"
                  aria-pressed={activeChannel === ch.code}
                  onClick={() => setActiveChannel(ch.code)}
                >
                  {isAr ? ch.nameAr : ch.nameEn}
                </button>
              ))}
            </div>
          ) : null}

          <div className="sdd-list" dir={dir}>
            {visible.map((uc: SectorUseCase) => (
              <article key={uc.key} className="sdd-case">
                <header className="sdd-case-head">
                  <h3 className="sdd-case-title">{isAr ? uc.titleAr : uc.titleEn}</h3>
                  {channelName(uc.channel) ? (
                    <span className="sdd-case-channel">{channelName(uc.channel)}</span>
                  ) : null}
                </header>

                {/* A description list, because that is what this is: four
                    terms and their values, read in a fixed order. */}
                <dl className="sdd-facts">
                  <div className="sdd-fact">
                    <dt className="sdd-fact-k">{labels.trigger}</dt>
                    <dd className="sdd-fact-v">{isAr ? uc.triggerAr : uc.triggerEn}</dd>
                  </div>
                  <div className="sdd-fact">
                    <dt className="sdd-fact-k">{labels.scenario}</dt>
                    <dd className="sdd-fact-v">{isAr ? uc.scenarioAr : uc.scenarioEn}</dd>
                  </div>
                  <div className="sdd-fact">
                    <dt className="sdd-fact-k">{labels.why}</dt>
                    <dd className="sdd-fact-v">{isAr ? uc.whyAr : uc.whyEn}</dd>
                  </div>
                </dl>

                {uc.widget ? (
                  /* The real sheet, from the same kit the product ships. A
                     picture of a widget ages the moment it ships; this one
                     cannot, because it IS the components. */
                  <div className="sdd-widget">
                    <span className="sdd-preview-k">{labels.example}</span>
                    <div className="sdd-widget-stage">
                      <WidgetShell
                        title={isAr ? uc.widget.titleAr : uc.widget.titleEn}
                        footer={
                          <WidgetButton block>
                            {isAr ? uc.widget.ctaAr : uc.widget.ctaEn}
                          </WidgetButton>
                        }
                      >
                        <WidgetHint>{labels.sees}</WidgetHint>
                        <ProductRow
                          name={isAr ? uc.widget.mainAr : uc.widget.mainEn}
                          price={uc.widget.mainPrice}
                          currency={labels.currency}
                        />
                        <WidgetHint>
                          {isAr
                            ? uc.widget.hintAr ?? labels.suggests
                            : uc.widget.hintEn ?? labels.suggests}
                        </WidgetHint>
                        <ProductList>
                          {uc.widget.suggest.map((sg, i) => (
                            <ProductRow
                              key={i}
                              name={isAr ? sg.ar : sg.en}
                              price={sg.price}
                              was={sg.was}
                              currency={labels.currency}
                              selected={i === 0}
                            />
                          ))}
                        </ProductList>
                      </WidgetShell>
                    </div>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </Shell>
      </DsSection>
    </>
  );
}
