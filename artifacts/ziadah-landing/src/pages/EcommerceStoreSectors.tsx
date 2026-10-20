import { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Shell } from "@/components/mk";
import { HeroLede, Section as DsSection, CardsGrid, CtaSection } from "@/sections";
import PlatformModal from "@/components/PlatformModal";
import SEO from "@/components/SEO";
import { getPageKeywords } from "@/seo/page-keywords";
import { BreadcrumbSchema, WebPageSchema, SoftwareAppSchema } from "@/components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { retailSectors } from "@/data/sectorTaxonomy";
import { navigateTo } from "@/components/PageTransition";
import { t as siteTranslations } from "@/i18n/translations";

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
  /* Read from the taxonomy rather than a local exclusion list: the four
     sectors promoted to `/sectors` (restaurants, beauty, clinics, charities)
     drop out of this index automatically, and cannot come back by someone
     editing one list and not the other. */
  const ecommerceSectors = retailSectors();

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
        {/* Dark, then grey, then pale - the same light/dark step every other
            page opens with. It used to run grey hero into a violet band into a
            violet CTA, so the last two read as one long pale block. */}
        <HeroLede
          compact
          family="violet"
          invert
          eyebrow={lang === "ar" ? "المتاجر الإلكترونية" : "Ecommerce Stores"}
          title={lang === "ar" ? "المتاجر الإلكترونية" : "Ecommerce Stores"}
          body={
            lang === "ar"
              ? "اختر قطاع متجرك الإلكتروني واطّلع على طريقة تطبيق حلول زيادة بالأمثلة وأفضل الممارسات."
              : "Pick your ecommerce vertical and see how to apply Ziadah with practical examples and best practices."
          }
        />

        <DsSection family="grey">
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
