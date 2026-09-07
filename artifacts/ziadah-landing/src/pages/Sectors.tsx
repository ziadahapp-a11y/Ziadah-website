import { useEffect, useState } from "react";
import { ShoppingBag, Bike, Puzzle, ArrowRight, ArrowLeft } from "lucide-react";
import { Shell } from "@/components/mk";
import { HeroLede, Section as DsSection, CardsGrid, CtaSection } from "@/sections";
import PlatformModal from "@/components/PlatformModal";
import PageClosingCta from "@/components/PageClosingCta";
import SEO from "@/components/SEO";
import { getPageKeywords } from "@/seo/page-keywords";
import { BreadcrumbSchema, WebPageSchema, SoftwareAppSchema } from "@/components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { navigateTo } from "@/components/PageTransition";
import { Section, Eyebrow } from "@/components/trackflow";
import { t as siteTranslations } from "@/i18n/translations";

export default function Sectors() {
  const t = siteTranslations;
  const { lang, dir } = useLanguage();
  const isAr = lang === "ar";
  const ArrowCTA = isAr ? ArrowLeft : ArrowRight;
  const tr = t[lang].sectorsPage;
  const pc = t[lang].pageClosingCta;
  const ld = t[lang].landing;
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const pk = getPageKeywords("/sectors");
  const sectorBuckets = [
    {
      slug: "ecommerce-stores",
      Icon: ShoppingBag,
      titleAr: "المتاجر الإلكترونية",
      titleEn: "Ecommerce Stores",
      descAr: "نفس القطاعات الحالية مع أدلة تطبيق زيادة لكل نوع متجر.",
      descEn: "The existing sector playbooks with detailed Ziadah implementation guides.",
      href: "/sectors/ecommerce-stores",
    },
    {
      slug: "delivery-apps",
      Icon: Bike,
      titleAr: "تطبيقات التوصيل",
      titleEn: "Delivery Apps",
      descAr: "صفحة مخصصة لكيفية رفع الطلبات والقيمة في تطبيقات التوصيل.",
      descEn: "A dedicated page for improving order value and conversion in delivery apps.",
      href: "/sectors/delivery-apps",
    },
    {
      slug: "ecommerce-platforms",
      Icon: Puzzle,
      titleAr: "منصات التسوق الإلكترونية",
      titleEn: "Ecommerce Platforms",
      descAr: "صفحة مخصصة لمنصات السوق المتعدد البائعين وتجارب الاكتشاف.",
      descEn: "A dedicated page for marketplace-style platforms and discovery journeys.",
      href: "/sectors/ecommerce-platforms",
    },
  ] as const;

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
        titleAr="القطاعات الرئيسية — زيادة"
        titleEn="Industry Categories — Ziadah"
        descriptionAr="اختر نوع نشاطك: المتاجر الإلكترونية، تطبيقات التوصيل، أو منصات التسوق الإلكترونية."
        descriptionEn="Choose your business type: ecommerce stores, delivery apps, or ecommerce platforms."
        canonical="/sectors"
        keywordsAr={pk?.keywordsAr}
        keywordsEn={pk?.keywordsEn}
      />
      <SoftwareAppSchema />
      <BreadcrumbSchema
        items={[
          { name: tr.breadcrumbHome, url: "/" },
          { name: tr.breadcrumbSectors, url: "/sectors" },
        ]}
      />
      <WebPageSchema
        name={lang === "ar" ? "القطاعات الرئيسية" : "Industry Categories"}
        description={
          lang === "ar"
            ? "اختر نوع نشاطك: المتاجر الإلكترونية، تطبيقات التوصيل، أو منصات التسوق الإلكترونية."
            : "Choose your business type: ecommerce stores, delivery apps, or ecommerce platforms."
        }
        url="/sectors"
      />
      <div className="page" dir={dir}>
        <HeroLede
          compact
          family="grey"
          eyebrow={lang === "ar" ? "القطاعات الرئيسية" : "Industry Categories"}
          title={lang === "ar" ? "القطاعات الرئيسية" : "Industry Categories"}
          body={
            lang === "ar"
              ? "اختر القسم المناسب لنشاطك. المتاجر الإلكترونية تحتوي على القطاعات الحالية كاملة، مع صفحات مستقلة لتطبيقات التوصيل ومنصات التسوق الإلكترونية."
              : "Choose the category that fits your business. Ecommerce Stores includes all existing sectors, with dedicated pages for Delivery Apps and Ecommerce Platforms."
          }
        />

        <DsSection family="violet">
          <Shell>
            <CardsGrid
              cards={sectorBuckets.map((bucket) => {
                const Icon = bucket.Icon;
                return {
                  key: bucket.slug,
                  icon: <Icon className="w-5 h-5" />,
                  title: lang === "ar" ? bucket.titleAr : bucket.titleEn,
                  body: lang === "ar" ? bucket.descAr : bucket.descEn,
                  foot: (
                    <span className="card-cta">
                      {tr.cardCta}
                      <ArrowCTA className="w-4 h-4" aria-hidden="true" />
                    </span>
                  ),
                  onClick: () => navigateTo(bucket.href),
                };
              })}
            />
          </Shell>
        </DsSection>

        <CtaSection
          family="violet"
          title={pc.sectorsHubTitle}
          body={pc.sectorsHubDesc}
          primary={{ label: ld.ctaBtn, onClick: () => setPlatformModalOpen(true), testId: "sectors-cta" }}
        />
      </div>
      <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
