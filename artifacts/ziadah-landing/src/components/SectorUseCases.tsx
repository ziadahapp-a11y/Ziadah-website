import { useMemo, useState } from "react";
import { Section as DsSection, SectionHead } from "@/sections";
import { Shell } from "@/components/mk";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  getSectorDeepDive,
  type GoalSlug,
  type PlacementSlug,
  type PresentationSlug,
  type SectorUseCase,
} from "@/data/sectorDeepDive";
import { goals, placements, presentations } from "@/lib/features-data";
import {
  WidgetShell, WidgetHint, WidgetButton, ProductRow, ProductList,
} from "@/components/widgets/kit";

/**
 * THE SECTOR'S OWN MOMENTS, one card each, answering the same five questions.
 *
 * The rest of a sector page argues that Ziadah is worth having. This is the
 * part that answers "where exactly does it fire in MY business", which is the
 * question that actually closes a merchant, and the one the site could only
 * answer generically before.
 *
 * TWO THINGS MAKE THIS DIFFERENT FROM A LIST OF FEATURES.
 *
 * The five Ws. Every card answers who, when, what, where and why, in that
 * order, in the same five slots. A merchant scanning fifteen of them is
 * comparing moments, and a comparison is only possible when the answers sit
 * in fixed places. "Why" is always why it works HERE - a line that could be
 * pasted into another sector has failed.
 *
 * The coverage is PROVEN, not claimed. Each moment is tagged with the goal it
 * moves and the shape it takes, using the same slugs `/features` publishes, so
 * the band can show that all five goals and all five presentations are
 * answered in this sector with this sector's products, and can group by
 * either. Fifteen cards in one column is a wall; fifteen cards a merchant can
 * slice by "what do I want to move" is a catalogue.
 *
 * A sector whose moments are not tagged yet keeps the older four-field card,
 * so the two shapes coexist while the rest of the sectors are rewritten.
 */

type Dimension = "goal" | "presentation" | "placement";

export default function SectorUseCases({ slug }: { slug: string }) {
  const { lang, dir } = useLanguage();
  const isAr = lang === "ar";
  const deep = getSectorDeepDive(slug);
  const [activeChannel, setActiveChannel] = useState<string>("all");
  const [dimension, setDimension] = useState<Dimension>("goal");
  const [activeTag, setActiveTag] = useState<string>("all");

  /* The tagged shape is all-or-nothing per sector: a band that groups by goal
     while a third of its cards have no goal would hide those cards behind
     every chip but "all", which is worse than not grouping. */
  const tagged = Boolean(deep?.useCases.length) &&
    (deep?.useCases.every((u) => u.goal && u.presentation) ?? false);

  const visible = useMemo(() => {
    if (!deep) return [];
    let list = deep.useCases;
    if (activeChannel !== "all") list = list.filter((u) => u.channel === activeChannel);
    if (tagged && activeTag !== "all") {
      list = list.filter((u) =>
        dimension === "goal" ? u.goal === activeTag
          : dimension === "presentation" ? u.presentation === activeTag
            : u.placement === activeTag,
      );
    }
    return list;
  }, [deep, activeChannel, tagged, activeTag, dimension]);

  if (!deep) return null;

  const labels = {
    kicker: isAr ? "حالات الاستخدام" : "Use cases",
    title: isAr ? "أين تعمل زيادة داخل هذا القطاع؟" : "Where Ziadah fires inside this sector",
    who: isAr ? "مَن" : "Who",
    trigger: isAr ? "متى" : "When",
    scenario: isAr ? "ماذا يرى" : "What they see",
    where: isAr ? "أين" : "Where",
    why: isAr ? "لماذا هنا" : "Why here",
    example: isAr ? "مثال حي" : "Live example",
    sees: isAr ? "ما يشاهده العميل" : "What the customer sees",
    suggests: isAr ? "يقترح زيادة" : "Ziadah suggests",
    currency: isAr ? "ر.س" : "SAR",
    all: isAr ? "كل القنوات" : "All channels",
    allTags: isAr ? "الكل" : "All",
    channelsTitle: isAr ? "القنوات" : "Channels",
    channelsLead: isAr
      ? "زيادة لا تعمل في مكان واحد. هذه الأسطح التي يُبنى عليها الطلب في هذا القطاع."
      : "Ziadah does not run in one place. These are the surfaces the order is built on in this sector.",
    byGoal: isAr ? "حسب الهدف" : "By goal",
    byPresentation: isAr ? "حسب شكل العرض" : "By shape",
    byPlacement: isAr ? "حسب مكان العرض" : "By placement",
    groupLabel: isAr ? "طريقة التصفية" : "Group the moments by",
    coverKicker: isAr ? "التغطية" : "Coverage",
    coverTitle: isAr
      ? "كل أهداف زيادة وكل أشكال عرضها، هنا"
      : "Every Ziadah goal and every shape, here",
    coverLead: isAr
      ? "ليست قائمة مزايا. هذه كل أهداف زيادة الخمسة وكل أشكال عرضها الخمسة، لكل واحد منها لحظة حقيقية في هذا القطاع بمنتجاته وأسعاره."
      : "Not a feature list. These are all five of Ziadah's goals and all five of its shapes, each with a real moment in this sector, in its own products and at its own prices.",
    coverGoals: isAr ? "الأهداف" : "Goals",
    coverShapes: isAr ? "أشكال العرض" : "Shapes",
    moment1: isAr ? "لحظة واحدة" : "1 moment",
    moment2: isAr ? "لحظتان" : "2 moments",
    momentsFew: isAr ? "لحظات" : "moments",
    momentsMany: isAr ? "لحظة" : "moments",
    momentsNone: isAr ? "لا شيء هنا" : "none here",
    empty: isAr ? "لا توجد لحظة بهذا التصنيف في هذا القطاع." : "No moment under this filter in this sector.",
  };

  const channelName = (code?: string) => {
    if (!code) return null;
    const ch = deep.channels?.find((c) => c.code === code);
    return ch ? (isAr ? ch.nameAr : ch.nameEn) : null;
  };

  /* The product's own words for its own slugs. Reading them out of
     `features-data` rather than restating them here is what keeps one term
     meaning one thing across `/features`, the home page and this band. */
  const goalName = (s?: GoalSlug) => {
    const g = goals.find((x) => x.slug === s);
    return g ? (isAr ? g.title : g.titleEn) : null;
  };
  const presentationName = (s?: PresentationSlug) => {
    const p = presentations.find((x) => x.slug === s);
    return p ? (isAr ? p.title : p.titleEn) : null;
  };
  const placementName = (s?: PlacementSlug) => {
    const p = placements.find((x) => x.slug === s);
    return p ? (isAr ? p.title : p.titleEn) : null;
  };

  const countBy = (pick: (u: SectorUseCase) => string | undefined, value: string) =>
    deep.useCases.filter((u) => pick(u) === value).length;

  /* Arabic counts its noun by the number in front of it: one is singular, two
     is the dual, three to ten takes the plural, and eleven up goes back to the
     singular. "6 لحظة" is wrong in every register, and a coverage grid whose
     own labels are ungrammatical undermines the thing it is proving. */
  const momentCount = (n: number) => {
    if (n === 0) return labels.momentsNone;
    if (!isAr) return `${n} ${n === 1 ? "moment" : "moments"}`;
    if (n === 1) return labels.moment1;
    if (n === 2) return labels.moment2;
    if (n <= 10) return `${n} ${labels.momentsFew}`;
    return `${n} ${labels.momentsMany}`;
  };

  /* Only the tags this sector actually uses. A chip for a placement no moment
     here runs on is a dead end, and a sector is not obliged to use all nine. */
  const used = (pick: (u: SectorUseCase) => string | undefined) =>
    new Set(deep.useCases.map(pick).filter(Boolean) as string[]);

  const chipsFor = (d: Dimension) => {
    if (d === "goal") {
      const u = used((x) => x.goal);
      return goals.filter((g) => u.has(g.slug)).map((g) => ({ slug: g.slug, label: isAr ? g.title : g.titleEn }));
    }
    if (d === "presentation") {
      const u = used((x) => x.presentation);
      return presentations.filter((p) => u.has(p.slug)).map((p) => ({ slug: p.slug, label: isAr ? p.title : p.titleEn }));
    }
    const u = used((x) => x.placement);
    return placements.filter((p) => u.has(p.slug)).map((p) => ({ slug: p.slug, label: isAr ? p.title : p.titleEn }));
  };

  const switchDimension = (d: Dimension) => {
    setDimension(d);
    setActiveTag("all");
  };

  return (
    <>
      {deep.channels?.length ? (
        <DsSection id="section-channels" family="grey">
          {/* Centred. These two are full-width bands, not column sections:
              the channels grid and the use-case grid both run edge to edge
              under them, so the head belongs on the band's axis rather than
              at the reading edge of a column that is not there. */}
          <SectionHead
            center
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

      {/* THE PROOF, before the catalogue. A merchant who has been told "it
          does cross-selling" has heard a claim; a merchant who sees all five
          goals and all five shapes each attached to a moment in their own
          trade has seen the argument finished. */}
      {tagged ? (
        <DsSection id="section-coverage" family="grey">
          <SectionHead center kicker={labels.coverKicker} title={labels.coverTitle} lead={labels.coverLead} />
          <Shell>
            <div className="ucx-cover" dir={dir}>
              <div className="ucx-cover-col">
                <h3 className="ucx-cover-k">{labels.coverGoals}</h3>
                <ul className="ucx-cover-list">
                  {goals.map((g) => {
                    const n = countBy((u) => u.goal, g.slug);
                    return (
                      <li key={g.slug} className="ucx-cover-row" data-empty={n === 0 ? "" : undefined}>
                        <span className="ucx-cover-name">{isAr ? g.title : g.titleEn}</span>
                        <span className="ucx-cover-n">{momentCount(n)}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="ucx-cover-col">
                <h3 className="ucx-cover-k">{labels.coverShapes}</h3>
                <ul className="ucx-cover-list">
                  {presentations.map((p) => {
                    const n = countBy((u) => u.presentation, p.slug);
                    return (
                      <li key={p.slug} className="ucx-cover-row" data-empty={n === 0 ? "" : undefined}>
                        <span className="ucx-cover-name">{isAr ? p.title : p.titleEn}</span>
                        <span className="ucx-cover-n">{momentCount(n)}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Shell>
        </DsSection>
      ) : null}

      <DsSection id="section-use-cases" family="violet">
        <SectionHead
          center
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

          {tagged ? (
            /* Two levels, because fifteen cards need slicing twice: first the
               question the merchant is asking (what do I want to move, how
               should it look, where should it run), then the answer within
               it. One flat row of fifteen chips would be the same wall in a
               different shape. */
            <div className="ucx-controls" dir={dir}>
              <div className="ucx-dims" role="tablist" aria-label={labels.groupLabel}>
                {([
                  ["goal", labels.byGoal],
                  ["presentation", labels.byPresentation],
                  ["placement", labels.byPlacement],
                ] as [Dimension, string][]).map(([d, label]) => (
                  <button
                    key={d}
                    type="button"
                    role="tab"
                    className="ucx-dim"
                    aria-selected={dimension === d}
                    onClick={() => switchDimension(d)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="sdd-filter" role="group" aria-label={labels.groupLabel}>
                <button
                  type="button"
                  className="chip is-small"
                  aria-pressed={activeTag === "all"}
                  onClick={() => setActiveTag("all")}
                >
                  {labels.allTags} ({deep.useCases.length})
                </button>
                {chipsFor(dimension).map((c) => (
                  <button
                    key={c.slug}
                    type="button"
                    className="chip is-small"
                    aria-pressed={activeTag === c.slug}
                    onClick={() => setActiveTag(c.slug)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {visible.length === 0 ? <p className="ucx-empty">{labels.empty}</p> : null}

          <div className="sdd-list" dir={dir}>
            {visible.map((uc: SectorUseCase) => (
              <article key={uc.key} className="sdd-case">
                <header className="sdd-case-head">
                  <h3 className="sdd-case-title">{isAr ? uc.titleAr : uc.titleEn}</h3>
                  {channelName(uc.channel) ? (
                    <span className="sdd-case-channel">{channelName(uc.channel)}</span>
                  ) : null}
                </header>

                {uc.goal || uc.presentation ? (
                  /* The two tags the grid proved, repeated on the card, so a
                     merchant who filtered by goal can still see what shape
                     this one takes without going back. */
                  <p className="ucx-tags">
                    {goalName(uc.goal) ? <span className="ucx-tag">{goalName(uc.goal)}</span> : null}
                    {presentationName(uc.presentation) ? (
                      <span className="ucx-tag is-shape">{presentationName(uc.presentation)}</span>
                    ) : null}
                  </p>
                ) : null}

                {/* A description list, because that is what this is: the five
                    Ws as terms and their values, read in one fixed order. */}
                <dl className="sdd-facts">
                  {uc.whoAr || uc.whoEn ? (
                    <div className="sdd-fact">
                      <dt className="sdd-fact-k">{labels.who}</dt>
                      <dd className="sdd-fact-v">{isAr ? uc.whoAr : uc.whoEn}</dd>
                    </div>
                  ) : null}
                  <div className="sdd-fact">
                    <dt className="sdd-fact-k">{labels.trigger}</dt>
                    <dd className="sdd-fact-v">{isAr ? uc.triggerAr : uc.triggerEn}</dd>
                  </div>
                  <div className="sdd-fact">
                    <dt className="sdd-fact-k">{labels.scenario}</dt>
                    <dd className="sdd-fact-v">{isAr ? uc.scenarioAr : uc.scenarioEn}</dd>
                  </div>
                  {placementName(uc.placement) ? (
                    <div className="sdd-fact">
                      <dt className="sdd-fact-k">{labels.where}</dt>
                      <dd className="sdd-fact-v">{placementName(uc.placement)}</dd>
                    </div>
                  ) : null}
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
