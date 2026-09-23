import { useEffect, useState } from "react";
import {
  ShoppingBag, Bike, Puzzle, UtensilsCrossed, Sparkles, Stethoscope, HeartHandshake,
  ArrowRight, ArrowLeft, type LucideIcon,
} from "lucide-react";
import { Shell } from "@/components/mk";
import { HeroLede, Section as DsSection, CardsGrid, CtaSection } from "@/sections";
import PlatformModal from "@/components/PlatformModal";
import SEO from "@/components/SEO";
import { getPageKeywords } from "@/seo/page-keywords";
import { BreadcrumbSchema, WebPageSchema, SoftwareAppSchema } from "@/components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { navigateTo } from "@/components/PageTransition";
import { t as siteTranslations } from "@/i18n/translations";
import { retailSectors, topLevelSectors } from "@/data/sectorTaxonomy";

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
  /* ONE CARD PER WAY OF SELLING, not one per integration.
     This was three cards, and four of the businesses behind them - a
     restaurant, a beauty counter, a clinic, a charity - were filed two levels
     down inside "ecommerce stores". None of them is an online shop: a
     restaurant takes orders at a table, a clinic books visits, a charity
     collects donations. The retail index is still here and still the largest
     bucket; it just no longer has to stand in for every business that happens
     to run on Salla or Zid. */
  const bucketIcons: Record<string, LucideIcon> = {
    "restaurants-cafes": UtensilsCrossed,
    "beauty-care": Sparkles,
    clinics: Stethoscope,
    charities: HeartHandshake,
    "delivery-apps": Bike,
    "ecommerce-platforms": Puzzle,
  };
  const retailCount = retailSectors().length;
  const sectorBuckets = [
    {
      slug: "ecommerce-stores",
      Icon: ShoppingBag,
      titleAr: "المتاجر الإلكترونية",
      titleEn: "Ecommerce Stores",
      descAr: `${retailCount} قطاعاً للتجزئة، لكل منها دليل تطبيق كامل.`,
      descEn: `${retailCount} retail sectors, each with a full implementation playbook.`,
      href: "/sectors/ecommerce-stores",
    },
    ...topLevelSectors().map((sector) => ({
      slug: sector.slug,
      Icon: bucketIcons[sector.slug] ?? ShoppingBag,
      titleAr: sector.titleAr,
      titleEn: sector.titleEn,
      descAr: sector.taglineAr,
      descEn: sector.taglineEn,
      href: `/sectors/${sector.slug}`,
    })),
  ];

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
        descriptionAr="اختر نوع نشاطك: المطاعم والمقاهي، العناية والتجميل، العيادات، الجمعيات الخيرية، تطبيقات التوصيل، منصات التسوق، أو المتاجر الإلكترونية."
        descriptionEn="Choose your business type: restaurants and cafes, beauty and care, clinics, charities, delivery apps, ecommerce platforms, or online stores."
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
            ? "اختر نوع نشاطك: المطاعم والمقاهي، العناية والتجميل، العيادات، الجمعيات الخيرية، تطبيقات التوصيل، منصات التسوق، أو المتاجر الإلكترونية."
            : "Choose your business type: restaurants and cafes, beauty and care, clinics, charities, delivery apps, ecommerce platforms, or online stores."
        }
        url="/sectors"
      />
      <div className="page" dir={dir}>
        {/* Dark, then grey, then pale, as on its sibling index pages. */}
        <HeroLede
          compact
          family="violet"
          invert
          eyebrow={lang === "ar" ? "القطاعات الرئيسية" : "Industry Categories"}
          title={lang === "ar" ? "القطاعات الرئيسية" : "Industry Categories"}
          body={
            lang === "ar"
              ? "اختر القسم المناسب لنشاطك. لكل قطاع صفحة كاملة فيها حالات الاستخدام واللحظات التي تعمل فيها زيادة داخله، لا وصفاً عاماً يصلح للجميع."
              : "Choose the category that fits your business. Every sector has a full page covering the use cases and the moments Ziadah works inside it, rather than one generic description for everyone."
          }
        />

        <DsSection family="grey">
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
