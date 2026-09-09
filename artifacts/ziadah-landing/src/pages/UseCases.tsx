import { useMemo, useState } from "react";
import SEO from "@/components/SEO";
import { BreadcrumbSchema, WebPageSchema } from "@/components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { t as siteTranslations } from "@/i18n/translations";
import { navigateTo } from "@/components/PageTransition";
import { Button } from "@/components/mk";
import { HeroLede, Section, SectionHead, CtaSection } from "@/sections";
import { solutionGroups } from "@/lib/nav-data";
import { landingUseCaseScenarios } from "@/data/useCasesScenarios.generated";
import { analytics } from "@/lib/analytics";

/**
 * `/use-cases` — the one hub over the five `by-*` indexes.
 *
 * Ziadah had twenty-one solution pages and five index pages over them, and no
 * single door. A merchant arriving without a vocabulary for "by presentation"
 * had to guess which index their problem lived under, which is the wrong
 * question: they know their situation, not our taxonomy.
 *
 * So this page opens with the situations. Each row is a real scenario from
 * `useCasesScenarios.generated` — the same worked examples the solution pages
 * themselves render — filtered by the grouping a merchant recognises, and
 * linking straight to the page that handles it. The five indexes are still
 * here, below, for anyone who does think in the taxonomy.
 */
/* The scenario lines are written "🌿 عناية: عميلة تشتري شامبو → …" - a
   category emoji before the sector name that repeats what the words say. It
   is dropped at render rather than edited out of 23 data files. */
function stripLeadIcon(text: string) {
  return text.replace(/^\s*\p{Extended_Pictographic}[\uFE0F\u200D]*\s*/u, "");
}

export default function UseCases() {
  const { lang } = useLanguage();
  const tr = siteTranslations[lang];
  const isAr = lang === "ar";
  const t = (ar: string, en: string) => (isAr ? ar : en);

  const groups = solutionGroups(tr);
  const [group, setGroup] = useState<string>("all");

  /* The scenarios carry their own group tag, which is the label the matrix
     uses — so the chips are derived from the data rather than declared twice. */
  const tags = useMemo(() => {
    const seen = new Map<string, string>();
    for (const s of landingUseCaseScenarios) {
      const key = s.tagEn;
      if (!seen.has(key)) seen.set(key, isAr ? s.tagAr : s.tagEn);
    }
    return [...seen.entries()].map(([key, label]) => ({ key, label }));
  }, [isAr]);

  const shown = useMemo(
    () =>
      group === "all"
        ? landingUseCaseScenarios
        : landingUseCaseScenarios.filter((s) => s.tagEn === group),
    [group],
  );

  const go = (href: string) => {
    analytics.navInteraction(href, "route");
    navigateTo(href);
  };

  return (
    <>
      <SEO
        titleAr="حالات الاستخدام — ابدأ من الموقف لا من الأداة"
        titleEn="Use cases — start from the situation, not the tool"
        descriptionAr="كل حالات استخدام زيادة في مكان واحد: مواقف حقيقية من متاجر سعودية، وأي حل يعالج كل موقف — مرتّبة حسب الصفحة والنشاط وطريقة العرض والهدف."
        descriptionEn="Every Ziadah use case in one place: real situations from Saudi stores and which solution handles each — grouped by page, activity, presentation and goal."
        canonical="/use-cases"
      />
      <BreadcrumbSchema
        items={[
          { name: t("الرئيسية", "Home"), url: "/" },
          { name: tr.nav.useCases, url: "/use-cases" },
        ]}
      />
      <WebPageSchema
        name={tr.nav.useCases}
        description={t(
          "كل حالات استخدام زيادة، مرتّبة حسب الموقف",
          "Every Ziadah use case, arranged by situation",
        )}
        url="/use-cases"
      />

      <div className="page">
        {/* Dark, like every other index on the site. It was grey over a grey
            band, so the opener and the situations grid read as one long pale
            block with a headline floating in it. */}
        <HeroLede
          compact
          family="violet"
          invert
          eyebrow={tr.nav.useCases}
          title={t("ابدأ من الموقف، لا من الأداة", "Start from the situation, not the tool")}
          body={t(
            "أنت تعرف ما يحدث في متجرك: السلة تُترك، متوسط الطلب ثابت، العميل يشتري منتجاً واحداً ويخرج. اختر الموقف الذي يشبه وضعك، وسترى أي حل يعالجه وكيف يظهر للمشتري.",
            "You know what happens in your store: carts get abandoned, order value sits still, a shopper buys one product and leaves. Pick the situation that matches yours and you'll see which solution handles it, and how it looks to the shopper.",
          )}
        />

        <Section family="grey">
          <SectionHead
            size="md"
            kicker={t("المواقف", "Situations")}
            title={t("اختر ما يشبه وضعك", "Pick the one that matches yours")}
          />

          <div className="ucx-filters">
            <div className="ucx-filter">
              <span className="ucx-filter-label" id="ucx-group">
                {t("التصنيف", "Grouping")}
              </span>
              <div className="ucx-chips" role="group" aria-labelledby="ucx-group">
                <button
                  type="button"
                  className={`ucx-chip${group === "all" ? " is-on" : ""}`}
                  onClick={() => setGroup("all")}
                  aria-pressed={group === "all"}
                >
                  {t("الكل", "All")}
                </button>
                {tags.map((g) => (
                  <button
                    key={g.key}
                    type="button"
                    className={`ucx-chip${group === g.key ? " is-on" : ""}`}
                    onClick={() => setGroup(g.key)}
                    aria-pressed={group === g.key}
                    data-testid={`ucx-group-${g.key.replace(/\s+/g, "-").toLowerCase()}`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="ucx-count" role="status">
            {t(
              `${shown.length} من ${landingUseCaseScenarios.length} حالة`,
              `${shown.length} of ${landingUseCaseScenarios.length} cases`,
            )}
          </p>

          <ul className="ucx-list">
            {shown.map((s) => {
              const scenario = isAr ? s.scenario : s.scenarioEn;
              return (
                <li key={s.id} className="ucx-item" data-testid={`ucx-${s.id}`}>
                  <span className="ucx-head">
                    <span className="ucx-sector">{isAr ? s.tagAr : s.tagEn}</span>
                  </span>
                  <h3 className="ucx-title">{isAr ? s.titleAr : s.titleEn}</h3>
                  {/* The scenario's own title is the situation, in one line. */}
                  <p className="ucx-problem">{scenario.title}</p>
                  {/* Its first step is what Ziadah does about it. */}
                  {scenario.steps[1] ? <p className="ucx-mech">{stripLeadIcon(scenario.steps[1])}</p> : null}
                  <p className="uc-outcome">
                    <button type="button" className="uc-tool" onClick={() => go(s.href)}>
                      {t("افتح الحل", "Open the solution")}
                    </button>
                  </p>
                </li>
              );
            })}
          </ul>
        </Section>

        {/* The taxonomy, for anyone who does think in it. */}
        <Section family="violet">
          <SectionHead
            size="md"
            kicker={t("الفهارس", "Indexes")}
            title={t("أو تصفّح حسب التصنيف", "Or browse by grouping")}
            lead={t(
              "نفس الحلول، مرتّبة بأربع طرق مختلفة: حسب الصفحة التي تظهر فيها، وحسب ما تفعله، وحسب شكل عرضها، وحسب الرقم الذي تحرّكه.",
              "The same solutions, arranged four different ways: by the page they appear on, by what they do, by how they are presented, and by the number they move.",
            )}
          />
          <div className="ucx-groups">
            {groups.map((g) => (
              <nav key={g.title} className="ucx-group" aria-label={g.title}>
                <h3 className="ucx-group-title">{g.title}</h3>
                <ul className="ucx-group-list">
                  {g.items.map((item) => (
                    <li key={item.href + item.label}>
                      <button type="button" className="ucx-group-link" onClick={() => go(item.href)}>
                        {item.label}
                        {item.desc ? <span className="ucx-group-desc">{item.desc}</span> : null}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </Section>

        <CtaSection
          family="violet"
          title={t("وجدت حالتك؟", "Found your case?")}
          body={t(
            "التفعيل بضغطة واحدة من لوحة متجرك، بدون مطوّر وبدون تعديل على القالب.",
            "Activation is one click from your store dashboard — no developer, no theme edits.",
          )}
          primary={{
            label: tr.nav.startNow,
            onClick: () => go("/pricing"),
            testId: "use-cases-cta",
          }}
          secondary={{
            label: tr.nav.calculator,
            onClick: () => go("/calculator"),
          }}
        />
      </div>
    </>
  );
}
