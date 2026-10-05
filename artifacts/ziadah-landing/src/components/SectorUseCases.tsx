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
 * THE SECTOR'S MOMENTS, SHOWN RATHER THAN DESCRIBED.
 *
 * The previous version was five labelled paragraphs per card with a sheet
 * underneath, fifteen times: about 1,800 words in one band, and the thing a
 * merchant actually came to see - what the shopper is shown - was the last
 * item on each card and the smallest. The argument was in the prose and the
 * evidence was the footnote, which is backwards.
 *
 * The sheet is now the card's subject. It sits at the top at full width, in
 * the design system file's own tokens (see `data-ds="figma"` in
 * `widget-kit.css`), so fifteen of them read as one product rather than as
 * fifteen decorations of the band they happen to sit on. Under it: the
 * moment's name, one line for when it fires, and its two tags. The rest of
 * the five Ws - who, where, why here - is one disclosure away, because it is
 * what a merchant reads about the two or three moments they recognise, not
 * about all fifteen.
 *
 * THREE LAYOUTS, one switch. Which one a catalogue of fifteen sheets wants is
 * a judgement that needs to be seen rather than argued, so all three are
 * built and the page offers them: a three-up grid, a rail per goal, and the
 * two-up split. The switch is temporary scaffolding for that decision.
 */

type Dimension = "goal" | "presentation" | "placement";
type Layout = "grid" | "rail" | "split";

export default function SectorUseCases({ slug }: { slug: string }) {
  const { lang, dir } = useLanguage();
  const isAr = lang === "ar";
  const deep = getSectorDeepDive(slug);
  const [activeChannel, setActiveChannel] = useState<string>("all");
  const [dimension, setDimension] = useState<Dimension>("goal");
  const [activeTag, setActiveTag] = useState<string>("all");
  const [layout, setLayout] = useState<Layout>("grid");
  const [open, setOpen] = useState<string | null>(null);

  const tagged = Boolean(deep?.useCases.length) &&
    (deep?.useCases.every((u) => u.goal && u.presentation) ?? false);

  const visible = useMemo(() => {
    if (!deep) return [];
    let list = deep.useCases;
    if (activeChannel !== "all") list = list.filter((u) => u.channel === activeChannel);
    if (tagged && activeTag !== "all" && layout !== "rail") {
      list = list.filter((u) =>
        dimension === "goal" ? u.goal === activeTag
          : dimension === "presentation" ? u.presentation === activeTag
            : u.placement === activeTag,
      );
    }
    return list;
  }, [deep, activeChannel, tagged, activeTag, dimension, layout]);

  if (!deep) return null;

  const L = {
    kicker: isAr ? "حالات الاستخدام" : "Use cases",
    title: isAr ? "أين تعمل زيادة داخل متجرك؟" : "Where Ziadah fires inside your store",
    when: isAr ? "متى" : "When",
    who: isAr ? "مَن" : "Who",
    where: isAr ? "أين" : "Where",
    why: isAr ? "لماذا تنجح هنا" : "Why it works here",
    more: isAr ? "التفاصيل" : "Details",
    less: isAr ? "إخفاء" : "Hide",
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
    layoutLabel: isAr ? "شكل العرض (مؤقت للاختيار)" : "Layout (temporary, to choose from)",
    layoutGrid: isAr ? "شبكة ثلاثية" : "Three-up grid",
    layoutRail: isAr ? "صف لكل هدف" : "A rail per goal",
    layoutSplit: isAr ? "عمودان" : "Two columns",
    coverKicker: isAr ? "التغطية" : "Coverage",
    coverTitle: isAr ? "كل أهداف زيادة وكل أشكال عرضها، هنا" : "Every Ziadah goal and every shape, here",
    coverLead: isAr
      ? "ليست قائمة مزايا. هذه كل أهداف زيادة الخمسة وكل أشكال عرضها الخمسة، لكل واحد منها لحظة حقيقية في هذا القطاع بمنتجاته وأسعاره."
      : "Not a feature list. These are all five of Ziadah's goals and all five of its shapes, each with a real moment in this sector, in its own products and at its own prices.",
    coverGoals: isAr ? "الأهداف" : "Goals",
    coverShapes: isAr ? "أشكال العرض" : "Shapes",
    momentsNone: isAr ? "لا شيء هنا" : "none here",
    empty: isAr ? "لا توجد لحظة بهذا التصنيف." : "No moment under this filter.",
  };

  const channelName = (code?: string) => {
    const ch = deep.channels?.find((c) => c.code === code);
    return ch ? (isAr ? ch.nameAr : ch.nameEn) : null;
  };
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
     is the dual, three to ten takes the plural, eleven up is singular again.
     "6 لحظة" is wrong in every register, and a coverage grid whose own labels
     are ungrammatical undermines the thing it is proving. */
  const momentCount = (n: number) => {
    if (n === 0) return L.momentsNone;
    if (!isAr) return `${n} ${n === 1 ? "moment" : "moments"}`;
    if (n === 1) return "لحظة واحدة";
    if (n === 2) return "لحظتان";
    if (n <= 10) return `${n} لحظات`;
    return `${n} لحظة`;
  };

  const used = (pick: (u: SectorUseCase) => string | undefined) =>
    new Set(deep.useCases.map(pick).filter(Boolean) as string[]);

  const chipsFor = (d: Dimension) => {
    const src = d === "goal" ? goals : d === "presentation" ? presentations : placements;
    const u = used((x) => (d === "goal" ? x.goal : d === "presentation" ? x.presentation : x.placement));
    return src.filter((x) => u.has(x.slug)).map((x) => ({ slug: x.slug, label: isAr ? x.title : x.titleEn }));
  };

  /* THE CARD. One shape, three layouts: only the container changes, so a
     merchant comparing layouts is comparing layouts and not three different
     cards. */
  const Card = ({ uc, compact }: { uc: SectorUseCase; compact?: boolean }) => {
    const isOpen = open === uc.key;
    return (
      <article className="scq-card" data-compact={compact ? "" : undefined}>
        {uc.widget ? (
          <div className="scq-stage">
            <WidgetShell
              ds="figma"
              maxWidth={compact ? 300 : 340}
              title={isAr ? uc.widget.titleAr : uc.widget.titleEn}
              footer={<WidgetButton block>{isAr ? uc.widget.ctaAr : uc.widget.ctaEn}</WidgetButton>}
            >
              <WidgetHint>{L.sees}</WidgetHint>
              <ProductRow
                name={isAr ? uc.widget.mainAr : uc.widget.mainEn}
                price={uc.widget.mainPrice}
                currency={L.currency}
              />
              <WidgetHint>
                {isAr ? uc.widget.hintAr ?? L.suggests : uc.widget.hintEn ?? L.suggests}
              </WidgetHint>
              <ProductList>
                {uc.widget.suggest.map((sg, i) => (
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
          </div>
        ) : null}

        <div className="scq-body">
          <h3 className="scq-name">{isAr ? uc.titleAr : uc.titleEn}</h3>
          <p className="scq-when">
            <span className="scq-when-k">{L.when}</span>
            {isAr ? uc.triggerAr : uc.triggerEn}
          </p>
          <p className="scq-tags">
            {goalName(uc.goal) ? <span className="scq-tag">{goalName(uc.goal)}</span> : null}
            {presentationName(uc.presentation) ? (
              <span className="scq-tag is-shape">{presentationName(uc.presentation)}</span>
            ) : null}
            {channelName(uc.channel) ? (
              <span className="scq-tag is-shape">{channelName(uc.channel)}</span>
            ) : null}
          </p>

          {/* The remaining three Ws, one click away. A merchant reads these
              for the two or three moments they recognise, not for fifteen. */}
          <button
            type="button"
            className="scq-more"
            aria-expanded={isOpen}
            onClick={() => setOpen(isOpen ? null : uc.key)}
          >
            {isOpen ? L.less : L.more}
            <span aria-hidden="true" className="scq-more-i">{isOpen ? "−" : "+"}</span>
          </button>
          {isOpen ? (
            <dl className="scq-facts">
              {uc.whoAr || uc.whoEn ? (
                <div className="scq-fact">
                  <dt>{L.who}</dt><dd>{isAr ? uc.whoAr : uc.whoEn}</dd>
                </div>
              ) : null}
              {placementName(uc.placement) ? (
                <div className="scq-fact">
                  <dt>{L.where}</dt><dd>{placementName(uc.placement)}</dd>
                </div>
              ) : null}
              <div className="scq-fact">
                <dt>{L.why}</dt><dd>{isAr ? uc.whyAr : uc.whyEn}</dd>
              </div>
            </dl>
          ) : null}
        </div>
      </article>
    );
  };

  return (
    <>
      {deep.channels?.length ? (
        <DsSection id="section-channels" family="grey">
          <SectionHead center kicker={L.channelsTitle} title={L.channelsTitle} lead={L.channelsLead} />
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

      {tagged ? (
        <DsSection id="section-coverage" family="grey">
          <SectionHead center kicker={L.coverKicker} title={L.coverTitle} lead={L.coverLead} />
          <Shell>
            <div className="scq-cover" dir={dir}>
              {([[L.coverGoals, goals, (u: SectorUseCase) => u.goal],
                 [L.coverShapes, presentations, (u: SectorUseCase) => u.presentation]] as const).map(
                ([heading, list, pick]) => (
                  <div className="scq-cover-col" key={String(heading)}>
                    <h3 className="scq-cover-k">{heading}</h3>
                    <ul className="scq-cover-list">
                      {list.map((x) => {
                        const n = countBy(pick, x.slug);
                        return (
                          <li key={x.slug} className="scq-cover-row" data-empty={n === 0 ? "" : undefined}>
                            <span className="scq-cover-name">{isAr ? x.title : x.titleEn}</span>
                            <span className="scq-cover-n">{momentCount(n)}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ),
              )}
            </div>
          </Shell>
        </DsSection>
      ) : null}

      <DsSection id="section-use-cases" family="violet">
        <SectionHead center kicker={L.kicker} title={L.title} lead={isAr ? deep.introAr : deep.introEn} />
        <Shell>
          {/* TEMPORARY. Three layouts built side by side so the right one can
              be chosen by looking rather than by arguing. Delete this switch
              and the two layouts not chosen once the decision is made. */}
          {tagged ? (
            <div className="scq-controls" dir={dir}>
              <div className="scq-dims" role="tablist" aria-label={L.layoutLabel}>
                {([["grid", L.layoutGrid], ["rail", L.layoutRail], ["split", L.layoutSplit]] as [Layout, string][])
                  .map(([v, label]) => (
                    <button
                      key={v} type="button" role="tab" className="scq-dim"
                      aria-selected={layout === v}
                      onClick={() => { setLayout(v); setActiveTag("all"); setOpen(null); }}
                    >
                      {label}
                    </button>
                  ))}
              </div>

              {layout !== "rail" ? (
                <>
                  <div className="scq-dims is-sub" role="tablist" aria-label={L.groupLabel}>
                    {([["goal", L.byGoal], ["presentation", L.byPresentation], ["placement", L.byPlacement]] as [Dimension, string][])
                      .map(([d, label]) => (
                        <button
                          key={d} type="button" role="tab" className="scq-dim"
                          aria-selected={dimension === d}
                          onClick={() => { setDimension(d); setActiveTag("all"); }}
                        >
                          {label}
                        </button>
                      ))}
                  </div>
                  <div className="sdd-filter" role="group" aria-label={L.groupLabel}>
                    <button
                      type="button" className="chip is-small"
                      aria-pressed={activeTag === "all"}
                      onClick={() => setActiveTag("all")}
                    >
                      {L.allTags} ({deep.useCases.length})
                    </button>
                    {chipsFor(dimension).map((c) => (
                      <button
                        key={c.slug} type="button" className="chip is-small"
                        aria-pressed={activeTag === c.slug}
                        onClick={() => setActiveTag(c.slug)}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          ) : null}

          {deep.channels?.length ? (
            <div className="sdd-filter" dir={dir} role="group" aria-label={L.channelsTitle}>
              <button
                type="button" className="chip is-small"
                aria-pressed={activeChannel === "all"} onClick={() => setActiveChannel("all")}
              >
                {L.all}
              </button>
              {deep.channels.map((ch) => (
                <button
                  key={ch.code} type="button" className="chip is-small"
                  aria-pressed={activeChannel === ch.code} onClick={() => setActiveChannel(ch.code)}
                >
                  {isAr ? ch.nameAr : ch.nameEn}
                </button>
              ))}
            </div>
          ) : null}

          {layout === "rail" && tagged ? (
            /* One rail per goal. The heading carries the argument ("this is
               what raising cart value looks like in your trade") and the rail
               carries the evidence. */
            goals
              .filter((g) => deep.useCases.some((u) => u.goal === g.slug))
              .map((g) => (
                <section key={g.slug} className="scq-rail-sec" dir={dir}>
                  <h3 className="scq-rail-k">{isAr ? g.title : g.titleEn}</h3>
                  <div className="scq-rail">
                    {deep.useCases.filter((u) => u.goal === g.slug).map((uc) => (
                      <Card key={uc.key} uc={uc} compact />
                    ))}
                  </div>
                </section>
              ))
          ) : visible.length === 0 ? (
            <p className="scq-empty">{L.empty}</p>
          ) : (
            <div className={`scq-list is-${layout}`} dir={dir}>
              {visible.map((uc) => <Card key={uc.key} uc={uc} compact={layout === "grid"} />)}
            </div>
          )}
        </Shell>
      </DsSection>
    </>
  );
}
