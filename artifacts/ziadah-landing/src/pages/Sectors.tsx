import { useEffect, useState } from "react";
import { ShoppingBag, Bike, Puzzle, ArrowRight, ArrowLeft } from "lucide-react";
import PageShell from "@/components/PageShell";
import PlatformModal from "@/components/PlatformModal";
import PageClosingCta from "@/components/PageClosingCta";
import SEO from "@/components/SEO";
import { getPageKeywords } from "@/seo/page-keywords";
import { BreadcrumbSchema, WebPageSchema, SoftwareAppSchema } from "@/components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { navigateTo } from "@/components/PageTransition";
import { Section, Eyebrow } from "@/components/trackflow";

export default function Sectors() {
  const t = useSiteT();
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

  const gridStyle = {
    backgroundImage:
      "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
  } as const;

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
      <PageShell className="relative overflow-x-clip bg-white" style={{ background: "#fff" }}>
        {/* ══════════════════ HERO ══════════════════ */}
        <section dir={dir} className="relative pt-20 pb-16 md:pt-28 md:pb-20 px-4 border-b border-zinc-200">
          <div className="absolute inset-0 bg-grid-fade opacity-60 -z-10" style={gridStyle} />
          <div className="container mx-auto relative max-w-3xl text-center pt-[120px] pb-[120px]">
            <div className="rv mb-4">
              <Eyebrow>{lang === "ar" ? "القطاعات الرئيسية" : "Industry Categories"}</Eyebrow>
            </div>
            <h1 className="rv d1 text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 mb-5 leading-[1.08]">
              {lang === "ar" ? "القطاعات الرئيسية" : "Industry Categories"}
            </h1>
            <p className="rv d2 text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
              {lang === "ar"
                ? "اختر القسم المناسب لنشاطك. المتاجر الإلكترونية تحتوي على القطاعات الحالية كاملة، مع صفحات مستقلة لتطبيقات التوصيل ومنصات التسوق الإلكترونية."
                : "Choose the category that fits your business. Ecommerce Stores includes all existing sectors, with dedicated pages for Delivery Apps and Ecommerce Platforms."}
            </p>
          </div>
        </section>

        {/* ══════════════════ BUCKETS ══════════════════ */}
        <Section containerClassName="max-w-6xl">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sectorBuckets.map((bucket, i) => {
                const title = lang === "ar" ? bucket.titleAr : bucket.titleEn;
                const tag = lang === "ar" ? bucket.descAr : bucket.descEn;
                const Icon = bucket.Icon;
                return (
                  <a
                    key={bucket.slug}
                    href={bucket.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(bucket.href);
                    }}
                    className={`rv d${(i % 3) + 1} group block rounded-2xl border border-zinc-200 bg-white p-7 text-start hover:border-zinc-300 hover:shadow-card transition-all`}
                  >
                    <div className="w-11 h-11 rounded-lg bg-zinc-950 flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-lg font-bold text-zinc-950 mb-2 leading-snug">{title}</div>
                    <p className="text-sm text-zinc-600 leading-relaxed mb-5">{tag}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-violet-600">
                      {tr.cardCta}
                      <ArrowCTA className="w-4 h-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                    </span>
                  </a>
                );
              })}
            </div>
        </Section>

        <PageClosingCta
          title={pc.sectorsHubTitle}
          description={pc.sectorsHubDesc}
          buttonLabel={ld.ctaBtn}
          onActivate={() => setPlatformModalOpen(true)}
        />
      </PageShell>
      <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
