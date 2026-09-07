import SEO from "@/components/SEO";
import { BreadcrumbSchema, WebPageSchema } from "@/components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { t as siteTranslations } from "@/i18n/translations";
import { navigateTo } from "@/components/PageTransition";
import { Button, Shell, Pill } from "@/components/mk";
import { HeroLede, Section, SectionHead, CtaSection, RelatedGrid } from "@/sections";
import { ALL_FEATURES, featureBySlug, featureHref, type Feature } from "@/lib/features-data";
import { analytics } from "@/lib/analytics";
import NotFound from "@/pages/not-found";

/**
 * `/features/:slug` — one capability, in depth.
 *
 * `/features` lists nineteen capabilities on one page, which is the right
 * shape for choosing between them and the wrong shape for reading about one:
 * a merchant sent a link to "the bundles feature" landed on a wall and had to
 * hunt. Each entry in the registry now has a page, an address someone can send.
 *
 * The three kinds carry different fields, because they answer different
 * questions — what a goal moves, where a placement appears, what a
 * presentation looks like — so the page renders what its kind actually has
 * rather than padding every capability into one template.
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

  const kindLabel = isGoal(feature)
    ? t("الهدف", "Goal")
    : isPresentation(feature)
      ? t("طريقة العرض", "Presentation")
      : t("مكان الظهور", "Placement");

  const go = (href: string) => {
    analytics.navInteraction(href, "route");
    navigateTo(href);
  };

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
        <HeroLede
          compact
          family="violet"
          eyebrow={kindLabel}
          title={title}
          body={desc}
          actions={
            <Button variant="primary" size="lg" onClick={() => go("/pricing")}>
              {tr.nav.startNow}
            </Button>
          }
        >
          <p className="hero-buttons justify-center" aria-hidden="true">
            <span className="plat-logo">
              <Icon className="plat-logo-svg" />
            </span>
          </p>
        </HeroLede>

        {isGoal(feature) ? (
          <Section family="grey">
            <Shell width="narrow">
              <SectionHead
                size="md"
                kicker={t("متى تستخدمه", "When to use it")}
                title={isAr ? feature.when : feature.whenEn}
              />
              <ul className="about-not">
                <li className="about-not-item">
                  <strong>{t("مثال", "Example")}</strong> — {isAr ? feature.example : feature.exampleEn}
                </li>
                <li className="about-not-item">
                  <strong>{t("الأثر المقيس", "Measured effect")}</strong> —{" "}
                  {isAr ? feature.boost : feature.boostEn}
                </li>
              </ul>
            </Shell>
          </Section>
        ) : null}

        {isPresentation(feature) ? (
          <Section family="grey">
            <Shell width="narrow">
              <SectionHead
                size="md"
                kicker={t("أين يظهر", "Where it appears")}
                title={t("الأماكن التي يعمل فيها هذا العرض", "The places this presentation runs")}
              />
              <ul className="uc-tools">
                {(isAr ? feature.positions : feature.positionsEn).map((x) => (
                  <li key={x}>
                    <span className="uc-tool">{x}</span>
                  </li>
                ))}
              </ul>
              <p className="about-plain">
                <strong>{t("الأنسب لـ", "Best for")}</strong> — {isAr ? feature.best : feature.bestEn}
              </p>
            </Shell>
          </Section>
        ) : null}

        {isPlacement(feature) ? (
          <Section family="grey">
            <Shell width="narrow">
              <SectionHead
                size="md"
                kicker={t("ما الذي يظهر هنا", "What runs here")}
                title={t("الأساليب المتاحة في هذا المكان", "The tactics available at this placement")}
              />
              <ul className="uc-tools">
                {(isAr ? feature.tactics : feature.tacticsEn).map((x) => (
                  <li key={x}>
                    <span className="uc-tool">{x}</span>
                  </li>
                ))}
              </ul>
              <p className="about-plain">
                <strong>{t("متاح في الباقات", "Available on plans")}</strong>{" "}
                {(isAr ? feature.avail : feature.availEn).map((x) => (
                  <Pill key={x} tone="live">
                    {x}
                  </Pill>
                ))}
              </p>
            </Shell>
          </Section>
        ) : null}

        {related.length ? (
          <Section family="grey">
            <Shell>
              <RelatedGrid heading={t("من نفس النوع", "Of the same kind")} items={related} />
            </Shell>
          </Section>
        ) : null}

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
