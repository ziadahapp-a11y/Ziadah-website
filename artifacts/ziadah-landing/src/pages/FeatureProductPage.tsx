import SEO from "@/components/SEO";
import { BreadcrumbSchema, WebPageSchema } from "@/components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { t as siteTranslations } from "@/i18n/translations";
import { navigateTo } from "@/components/PageTransition";
import { Button, Shell } from "@/components/mk";
import {
  HeroLede,
  Section,
  SectionHead,
  CardsGrid,
  ScrollableList,
  FaqBlock,
  CtaSection,
  RelatedGrid,
  type ListRow,
} from "@/sections";
import { ALL_FEATURES, featureBySlug, featureHref, type Feature } from "@/lib/features-data";
import { featureVisual } from "@/lib/feature-visual";
import { analytics } from "@/lib/analytics";
import NotFound from "@/pages/not-found";

/**
 * `/features/:slug` — one capability, in depth.
 *
 * REBUILT ON THE REFERENCE'S PRODUCT COMPOSITION. The previous version of this
 * page ran a lede hero, then ONE `family="grey"` band, then a related grid on
 * the same grey, then the close: three bands, two of them the same colour, and
 * the capability's own surface shown nowhere. The reference's product template
 * runs seven or eight, and its own comment names the mechanism this page had
 * none of - "a sticky image column beside a scrolling text column, where the
 * row nearest the viewport centre becomes active".
 *
 * The sequence below is that composition on the data Ziadah actually has:
 *
 *   1  HeroLede       a dark header, like the other long-form pages
 *   2  ScrollableList the load-bearing mechanism: the capability's own
 *                     storefront preview pinned beside scrolling rows
 *   3  CardsGrid      the numbers, on the flipped end of the family
 *   4  FaqBlock       the two questions the kind actually answers
 *   5  RelatedGrid    the rest of this capability's own kind
 *   6  CtaSection     the close
 *
 * Nothing here invents copy. The three kinds carry different fields because
 * they answer different questions, so each one fills the sequence from its
 * own, and a kind with nothing to put in a band drops the band rather than
 * padding it.
 */

function isGoal(f: Feature): f is Extract<Feature, { kind: "goal" }> {
  return f.kind === "goal";
}
function isPresentation(f: Feature): f is Extract<Feature, { kind: "presentation" }> {
  return f.kind === "presentation";
}
function isPlacement(f: Feature): f is Extract<Feature, { kind: "placement" }> {
  return f.kind === "placement";
}

export default function FeatureProductPage({ slug }: { slug: string }) {
  const { lang } = useLanguage();
  const tr = siteTranslations[lang];
  const isAr = lang === "ar";
  const t = (ar: string, en: string) => (isAr ? ar : en);

  const feature = featureBySlug(slug);
  if (!feature) return <NotFound />;

  const title = isAr ? feature.title : feature.titleEn;
  const desc = isAr ? feature.desc : feature.descEn;
  const Icon = feature.Icon;
  const Visual = featureVisual(feature.slug);

  const kindLabel = isGoal(feature)
    ? t("الهدف", "Goal")
    : isPresentation(feature)
      ? t("طريقة العرض", "Presentation")
      : t("مكان الظهور", "Placement");

  const go = (href: string) => {
    analytics.navInteraction(href, "route");
    navigateTo(href);
  };

  /* TWO-WAY LOOKUP. A presentation names the placements it appears at and a
     placement names the presentations it can run, both as plain titles - so a
     row can carry the OTHER entry's own description instead of a sentence this
     page made up about it. Nineteen pages generating "this presentation runs
     at the X step" nineteen times is the template writing filler, which is the
     thing the previews were just cleaned of. */
  const byTitle = (name: string) => {
    const n = name.trim();
    const exact = ALL_FEATURES.find((f) => f.title === n || f.titleEn === n);
    if (exact) return exact;
    /* The data writes a tactic short - "BTAT" for "اشتروا مع بعض (BTAT)",
       "زيادة القيمة" for "زيادة قيمة السلة" - so an exact match alone left
       real entries unlinked. Containment either way catches those. Four
       characters is the floor: below it a fragment matches half the registry. */
    if (n.length < 4) return undefined;
    return ALL_FEATURES.find(
      (f) =>
        f.title.includes(n) ||
        f.titleEn.includes(n) ||
        n.includes(f.title) ||
        n.includes(f.titleEn),
    );
  };

  /* THE SCROLLING ROWS. One row per thing this kind genuinely has to say,
     straight off the registry. A goal narrates when to reach for it and what
     it did; a presentation and a placement each walk the other's entries. */
  const rows: ListRow[] = isGoal(feature)
    ? [
        {
          key: "when",
          title: t("متى تستخدمه", "When to use it"),
          body: isAr ? feature.when : feature.whenEn,
        },
        {
          key: "example",
          title: t("مثال من متجر", "An example from a store"),
          body: isAr ? feature.example : feature.exampleEn,
        },
        {
          key: "boost",
          title: t("الأثر المقيس", "The measured effect"),
          body: isAr ? feature.boost : feature.boostEn,
        },
      ]
    : ((isPresentation(feature)
        ? (isAr ? feature.positions : feature.positionsEn)
        : (isAr ? feature.tactics : feature.tacticsEn)
      ).map((name, i) => {
        const other = byTitle(name);
        return {
          key: `${name}-${i}`,
          title: name,
          /* No entry behind the name means no body - a row that says only its
             name is honest; a row padded with a generated sentence is not. */
          body: other ? (isAr ? other.desc : other.descEn) : undefined,
          onSelect: other ? () => go(featureHref(other)) : undefined,
        };
      }) as ListRow[]);

  /* THE NUMBERS BAND. Each kind has exactly one set of hard facts, and this is
     it. A card with no value is never rendered, so a kind that has nothing
     measurable loses the band instead of showing an empty grid. */
  const factCards = isGoal(feature)
    ? [
        {
          key: "boost",
          title: isAr ? feature.boost : feature.boostEn,
          body: t("الأثر المقيس على متاجر تستخدم زيادة", "The measured effect on stores running Ziadah"),
        },
      ]
    : isPresentation(feature)
      ? [
          {
            key: "best",
            title: isAr ? feature.best : feature.bestEn,
            body: t("القطاعات الأنسب لهذا العرض", "The sectors this presentation suits best"),
          },
          {
            key: "positions",
            title: String((isAr ? feature.positions : feature.positionsEn).length),
            body: t("أماكن ظهور داخل المتجر", "places it appears in the store"),
          },
        ]
      : (isAr ? feature.avail : feature.availEn).map((planName) => ({
          key: planName,
          title: planName,
          body: t("متاح في هذه الباقة", "Available on this plan"),
        }));

  /* THE TWO QUESTIONS. Built from fields the entry already carries, so a page
     never asks a question its data cannot answer. */
  const faqItems = isGoal(feature)
    ? [
        { q: t("كيف يشتغل؟", "How does it work?"), a: desc },
        {
          q: t("متى أستخدمه؟", "When should I use it?"),
          a: isAr ? feature.when : feature.whenEn,
        },
      ]
    : isPresentation(feature)
      ? [
          { q: t("كيف يشتغل؟", "How does it work?"), a: desc },
          {
            q: t("أي متجر يناسبه؟", "Which stores does it suit?"),
            a: isAr ? feature.best : feature.bestEn,
          },
        ]
      : [
          { q: t("ما الذي يظهر هنا؟", "What runs here?"), a: desc },
          {
            q: t("في أي باقة؟", "On which plan?"),
            a: (isAr ? feature.avail : feature.availEn).join(t("، ", ", ")),
          },
        ];

  /* Related: the rest of this capability's own kind. A goal sits beside the
     other goals, not beside a placement — those answer a different question
     and reading them as alternatives is what the index is for. */
  const related = ALL_FEATURES.filter((f) => f.kind === feature.kind && f.slug !== feature.slug)
    /* Three, because `.related-grid` is a three-column track — a fourth card
       wraps onto a row of its own and reads as an afterthought. */
    .slice(0, 3)
    .map((f) => ({
      key: f.slug,
      title: isAr ? f.title : f.titleEn,
      body: isAr ? f.desc : f.descEn,
      Icon: f.Icon,
      onClick: () => go(featureHref(f)),
    }));

  return (
    <>
      <SEO
        titleAr={`${feature.title} — زيادة`}
        titleEn={`${feature.titleEn} — Ziadah`}
        descriptionAr={feature.desc}
        descriptionEn={feature.descEn}
        canonical={featureHref(feature)}
      />
      <BreadcrumbSchema
        items={[
          { name: t("الرئيسية", "Home"), url: "/" },
          { name: t("الخصائص", "Features"), url: "/features" },
          { name: title, url: featureHref(feature) },
        ]}
      />
      <WebPageSchema name={title} description={desc} url={featureHref(feature)} />

      <div className="page">
        {/* ══════════════════ 1 · HERO ══════════════════
            A dark lede, like the support article and the blog post: all three
            are a header over a long column, so all three open the same way.

            The widget does NOT sit here. We have exactly one surface per
            capability, and a single asset is worth more in the pinned column
            below - persistent, interactive, and beside rows that explain it -
            than as a static picture in a hero that already says the same
            thing in words. */}
        <HeroLede
          compact
          center={false}
          family="violet"
          invert
          eyebrow={
            <span className="inline-flex items-center gap-2">
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              {kindLabel}
            </span>
          }
          title={title}
          body={desc}
          actions={
            <Button variant="secondary" size="lg" onClick={() => go("/pricing")}>
              {tr.nav.startNow}
            </Button>
          }
        />

        {/* ══════════════════ 2 · WHAT IT DOES ══════════════════
            The mechanism the page had none of. `pinned` puts ONE persistent
            panel in the sticky column beside the scrolling rows, which is the
            right branch here: this capability has a single surface and several
            things to say about it, and the per-row figure stack would have
            been the same picture repeated - the exact failure the component's
            own note documents. */}
        {rows.length ? (
          <ScrollableList
            family="grey"
            eyebrow={kindLabel}
            heading={
              isGoal(feature)
                ? t("كيف يشتغل", "How it works")
                : isPresentation(feature)
                  ? t("أين يظهر", "Where it appears")
                  : t("ما الذي يظهر هنا", "What runs here")
            }
            rows={rows}
            pinned={
              /* THE PRODUCT, where it earns its keep. The previews draw the
                 exact surface a merchant sees in their own store, and this is
                 the branch the component documents for one persistent
                 interactive panel beside scrolling rows. Nineteen pages about
                 storefront widgets used to show the widget on none of them. */
              Visual ? <Visual /> : undefined
            }
          />
        ) : null}

        {/* ══════════════════ 3 · THE NUMBERS ══════════════════
            Flipped, so the page steps rather than running three pale bands
            together the way it used to. */}
        {factCards.length ? (
          <Section family="violet" invert>
            <Shell>
              <SectionHead
                center
                size="md"
                kicker={t("الأرقام", "The numbers")}
                title={
                  isGoal(feature)
                    ? t("ما الذي يحرّكه", "What it moves")
                    : isPresentation(feature)
                      ? t("أين يعمل أفضل", "Where it works best")
                      : t("متاح في الباقات", "Available on plans")
                }
              />
              <CardsGrid
                compact
                cards={factCards}
                columns={factCards.length >= 4 ? 4 : factCards.length === 3 ? 3 : 2}
              />
            </Shell>
          </Section>
        ) : null}

        {/* ══════════════════ 4 · FAQ ══════════════════ */}
        <FaqBlock
          family="grey"
          heading={t("أسئلة متكررة", "Frequently asked questions")}
          items={faqItems}
        />

        {/* ══════════════════ 5 · RELATED ══════════════════ */}
        {related.length ? (
          <Section family="violet">
            <Shell>
              <RelatedGrid heading={t("من نفس النوع", "Of the same kind")} items={related} />
            </Shell>
          </Section>
        ) : null}

        {/* ══════════════════ 6 · CLOSE ══════════════════ */}
        <CtaSection
          family="violet"
          title={t("فعّله على متجرك", "Turn it on for your store")}
          body={t(
            "التفعيل بضغطة واحدة من لوحة متجرك، بدون مطوّر.",
            "One click from your store dashboard, no developer.",
          )}
          primary={{
            label: tr.nav.startNow,
            onClick: () => go("/pricing"),
            testId: "feature-cta",
          }}
          secondary={{
            label: t("كل الخصائص", "All features"),
            onClick: () => go("/features"),
          }}
        />
      </div>
    </>
  );
}
