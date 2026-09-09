import { useState } from "react";
import PageShell from "../components/PageShell";
import PlatformModal from "../components/PlatformModal";
import PageClosingCta from "../components/PageClosingCta";
import SEO from "../components/SEO";
import { getPageKeywords } from "@/seo/page-keywords";
import { BreadcrumbSchema, WebPageSchema } from "../components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { HeroLede } from "@/sections";
import { Calculator as CalculatorBand } from "@/pages/home/Calculator";
import { t as siteTranslations } from "@/i18n/translations";

/**
 * The standalone revenue calculator.
 *
 * This page used to carry its OWN copy of the calculator - 340 lines of it -
 * hand-painted for a dark ground: `bg-white/[0.04]`, `border-white/10`,
 * `text-zinc-400`, `text-violet-300`, two violet gradients. The home page's
 * band does the same arithmetic on the design system's card vocabulary, so
 * there is nothing here for a second implementation to do except drift away
 * from the first. It renders that band instead.
 *
 * The band runs PALE here and dark on the home page. On the home page it sits
 * between two pale bands; here it sits between a dark hero and the dark
 * closing CTA, and three dark bands in a row is one long dark block.
 */
export default function Calculator() {
  const t = siteTranslations;
  const { lang } = useLanguage();
  const tr = t[lang].calculator;
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const pk = getPageKeywords("/calculator");

  return (
    <>
      <SEO
        titleAr={t.ar.calculator.seoTitle}
        titleEn={t.en.calculator.seoTitle}
        descriptionAr={t.ar.calculator.seoDesc}
        descriptionEn={t.en.calculator.seoDesc}
        canonical="/calculator"
        keywordsAr={pk?.keywordsAr}
        keywordsEn={pk?.keywordsEn}
      />
      <BreadcrumbSchema items={[{ name: tr.breadcrumbHome, url: "/" }, { name: tr.breadcrumbCalc, url: "/calculator" }]} />
      <WebPageSchema
        name={lang === "ar" ? t.ar.calculator.seoTitle : t.en.calculator.seoTitle}
        description={lang === "ar" ? t.ar.calculator.seoDesc : t.en.calculator.seoDesc}
        url="/calculator"
      />
      <PageShell className="relative overflow-x-clip">
        <HeroLede compact family="violet" invert eyebrow={tr.tag} title={tr.title} body={tr.subtitle} />

        <CalculatorBand invert={false} onActivate={() => setPlatformModalOpen(true)} />

        <PageClosingCta
          title={tr.closingTitle}
          description={tr.closingDesc}
          buttonLabel={t[lang].landing.ctaBtn}
          onActivate={() => setPlatformModalOpen(true)}
        />
      </PageShell>
      <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
