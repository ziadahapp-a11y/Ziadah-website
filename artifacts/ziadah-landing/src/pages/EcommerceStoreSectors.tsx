import { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Shell } from "@/components/mk";
import { HeroLede, Section as DsSection, CardsGrid, CtaSection } from "@/sections";
import PlatformModal from "@/components/PlatformModal";
import PageClosingCta from "@/components/PageClosingCta";
import SEO from "@/components/SEO";
import { getPageKeywords } from "@/seo/page-keywords";
import { BreadcrumbSchema, WebPageSchema, SoftwareAppSchema } from "@/components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { sectors } from "@/data/sectors";
import { navigateTo } from "@/components/PageTransition";
import { Section, Eyebrow } from "@/components/trackflow";
import { t as siteTranslations } from "@/i18n/translations";

const EXCLUDED_SLUGS = new Set(["delivery-apps", "ecommerce-platforms"]);

export default function EcommerceStoreSectors() {
  const t = siteTranslations;
  const { lang, dir } = useLanguage();
  const isAr = lang === "ar";
  const ArrowCTA = isAr ? ArrowLeft : ArrowRight;
  const tr = t[lang].sectorsPage;
  const pc = t[lang].pageClosingCta;
  const ld = t[lang].landing;
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const pk = getPageKeywords("/sectors/ecommerce-stores");
  const ecommerceSectors = sectors.filter((sector) => !EXCLUDED_SLUGS.has(sector.slug));

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("on");
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -24px 0px" },
    );
    document.querySelectorAll(".rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const gridStyle = {
    backgroundImage:
      "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
  } as const;

  return (
    <>
      <SEO
        titleAr="المتاجر الإلكترونية — قطاعات زيادة"
        titleEn="Ecommerce Stores — Ziadah Industries"
        descriptionAr={t.ar.sectorsPage.seoDesc}
        descriptionEn={t.en.sectorsPage.seoDesc}
        canonical="/sectors/ecommerce-stores"
        keywordsAr={pk?.keywordsAr}
        keywordsEn={pk?.keywordsEn}
      />
      <SoftwareAppSchema />
      <BreadcrumbSchema
        items={[
          { name: tr.breadcrumbHome, url: "/" },
          { name: tr.breadcrumbSectors, url: "/sectors" },
          { name: lang === "ar" ? "المتاجر الإلكترونية" : "Ecommerce Stores", url: "/sectors/ecommerce-stores" },
        ]}
      />
      <WebPageSchema
        name={lang === "ar" ? "المتاجر الإلكترونية" : "Ecommerce Stores"}
        description={lang === "ar" ? t.ar.sectorsPage.seoDesc : t.en.sectorsPage.seoDesc}
        url="/sectors/ecommerce-stores"
      />
      <div className="page" dir={dir}>
        <HeroLede
          compact
          family="grey"
          eyebrow={lang === "ar" ? "المتاجر الإلكترونية" : "Ecommerce Stores"}
          title={lang === "ar" ? "المتاجر الإلكترونية" : "Ecommerce Stores"}
          body={
            lang === "ar"
              ? "اختر قطاع متجرك الإلكتروني واطّلع على طريقة تطبيق حلول زيادة بالأمثلة وأفضل الممارسات."
              : "Pick your ecommerce vertical and see how to apply Ziadah with practical examples and best practices."
          }
        />

        <DsSection family="violet">
          <Shell>
            <CardsGrid
              cards={ecommerceSectors.map((sector) => ({
                key: sector.slug,
                icon: <span aria-hidden="true">{sector.icon}</span>,
                title: lang === "ar" ? sector.titleAr : sector.titleEn,
                body: lang === "ar" ? sector.taglineAr : sector.taglineEn,
                foot: (
                  <span className="card-cta">
                    {tr.cardCta}
                    <ArrowCTA className="w-4 h-4" aria-hidden="true" />
                  </span>
                ),
                onClick: () => navigateTo(`/sectors/${sector.slug}`),
              }))}
            />
          </Shell>
        </DsSection>

        <CtaSection
          family="violet"
          title={pc.ecommerceSectorsTitle}
          body={pc.ecommerceSectorsDesc}
          primary={{ label: ld.ctaBtn, onClick: () => setPlatformModalOpen(true), testId: "ecommerce-sectors-cta" }}
        />
      </div>
      <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
