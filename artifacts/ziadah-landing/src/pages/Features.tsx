import { useEffect, useState } from "react";
import { t } from "@/i18n/translations";
import PageShell from "../components/PageShell";
import PlatformModal from "../components/PlatformModal";
import PageClosingCta from "../components/PageClosingCta";
import SEO from "../components/SEO";
import { getPageKeywords } from "@/seo/page-keywords";
import { SoftwareAppSchema, BreadcrumbSchema, WebPageSchema } from "../components/JsonLd";
import { useLanguage } from "../i18n/LanguageContext";
import {
  ShoppingCart,
  Package,
  TrendingUp,
  Banknote,
  Tag,
  Link2,
  Plus,
  Gift,
  BarChart3,
  FileText,
  FolderTree,
  CreditCard,
  PartyPopper,
  DoorOpen,
  Home,
  Search,
  Megaphone,
  Shirt,
  Sparkles,
  Apple,
  Laptop,
  Sofa,
  Dumbbell,
  BookOpen,
  HandHeart,
  type LucideIcon,
} from "lucide-react";

/* The data these render lives in `lib/features-data`, so a capability can
   also have a page of its own at `/features/:slug`. */
import { goals, presentations, placements as activities } from "@/lib/features-data";
import { featureHref } from "@/lib/features-data";
import { navigateTo } from "@/components/PageTransition";
import { Section as DsSection, SectionHead, MediaSlot, HeroLede } from "@/sections";
import { Shell } from "@/components/mk";
import { CapabilityStack } from "@/components/art/CapabilityStack";




const usecases: {
  sector: string; sectorEn: string;
  Icon: LucideIcon;
  color: string;
  strategies: string[]; strategiesEn: string[];
  result: string; resultEn: string;
  stores: string; storesEn: string;
}[] = [
  { sector: "الأزياء والموضة", sectorEn: "Fashion & Apparel", Icon: Shirt, color: "#8b5cf6", strategies: ["تجميع الإطقم الكاملة", "عرض الإكسسوارات المكملة", "Upsell للفئة الأعلى", "كوبون للشراء الأول"], strategiesEn: ["Bundle complete outfits", "Show complementary accessories", "Upsell to premium tier", "First-purchase coupon"], result: "+35% متوسط الطلب", resultEn: "+35% average order value", stores: "+230 متجر", storesEn: "+230 stores" },
  { sector: "الجمال والعناية", sectorEn: "Beauty & Skincare", Icon: Sparkles, color: "#ec4899", strategies: ["روتين العناية الكامل", "تجميع المنتجات المتكاملة", "Buy 3 وفر 20%", "عرض نسخة الحجم الكبير"], strategiesEn: ["Complete skincare routine", "Bundle complementary products", "Buy 3 save 20%", "Show larger size version"], result: "+32% متوسط الطلب", resultEn: "+32% average order value", stores: "+140 متجر", storesEn: "+140 stores" },
  { sector: "الغذاء والمشروبات", sectorEn: "Food & Beverages", Icon: Apple, color: "#f59e0b", strategies: ["حزم التوفير الشهرية", "اشتر أكثر ووفر أكثر", "منتجات مكملة للوجبة", "اشتراكات دورية"], strategiesEn: ["Monthly savings bundles", "Buy more save more", "Meal complementary products", "Recurring subscriptions"], result: "+28% متوسط الطلب", resultEn: "+28% average order value", stores: "+180 متجر", storesEn: "+180 stores" },
  { sector: "الإلكترونيات والتقنية", sectorEn: "Electronics & Technology", Icon: Laptop, color: "#06b6d4", strategies: ["ملحقات الجهاز (Add-ons)", "الحماية والضمان الممتد", "Upsell للموديل الأحدث", "حزمة الإعداد الكامل"], strategiesEn: ["Device accessories (Add-ons)", "Protection & extended warranty", "Upsell to newer model", "Complete setup bundle"], result: "+22% متوسط الطلب", resultEn: "+22% average order value", stores: "+90 متجر", storesEn: "+90 stores" },
  { sector: "المنزل والديكور", sectorEn: "Home & Decor", Icon: Sofa, color: "#8b5cf6", strategies: ["تجميع مستلزمات الغرفة", "منتجات ذات صلة بالديكور", "Combo للأثاث المتكامل", "خصم الكميات"], strategiesEn: ["Bundle room essentials", "Decor-related products", "Combo for matching furniture", "Volume discounts"], result: "+26% متوسط الطلب", resultEn: "+26% average order value", stores: "+70 متجر", storesEn: "+70 stores" },
  { sector: "الرياضة واللياقة", sectorEn: "Sports & Fitness", Icon: Dumbbell, color: "#6366f1", strategies: ["حزمة المستلزمات الرياضية", "منتجات التغذية + معدات", "روتين التمرين الكامل", "Upsell للإصدار المتميز"], strategiesEn: ["Sports essentials bundle", "Nutrition products + equipment", "Complete workout routine", "Upsell to premium edition"], result: "+30% متوسط الطلب", resultEn: "+30% average order value", stores: "+60 متجر", storesEn: "+60 stores" },
  { sector: "الكتب والتعليم", sectorEn: "Books & Education", Icon: BookOpen, color: "#8b5cf6", strategies: ["سلسلة الكتب المرتبطة", "المستلزمات الدراسية", "Bundle الكورس + الكتاب", "اشتر 3 واحصل على خصم"], strategiesEn: ["Related book series", "School supplies", "Course + book bundle", "Buy 3 get a discount"], result: "+18% متوسط الطلب", resultEn: "+18% average order value", stores: "+40 متجر", storesEn: "+40 stores" },
  { sector: "التبرعات والخيرية", sectorEn: "Donations & Charity", Icon: HandHeart, color: "#6d28d9", strategies: ["مشاريع تبرع مكملة", "زيادة مبلغ التبرع", "اشترك تبرعياً شهرياً", "عرض المشاريع ذات الأولوية"], strategiesEn: ["Complementary donation projects", "Increase donation amount", "Monthly donation subscription", "Show priority projects"], result: "+48% متوسط التبرع", resultEn: "+48% average donation", stores: "+40 منظمة", storesEn: "+40 organizations" },
];

/* ─────────────────────────── component ─────────────────────────── */

export default function Features() {
  const [activeTab, setActiveTab] = useState<"goals" | "presentations" | "activities" | "usecases">("goals");
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const { lang, isAr } = useLanguage();
  const ft = t[lang].features;
  const ld = t[lang].landing;
  const pk = getPageKeywords("/features");

  useEffect(() => {
    const obs = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); });
    }, { threshold: 0.06, rootMargin: "0px 0px -24px 0px" });
    document.querySelectorAll(".rv").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [activeTab]);


  const tabs = [
    { id: "goals" as const, label: ft.tabGoals },
    { id: "presentations" as const, label: ft.tabPresentations },
    { id: "activities" as const, label: ft.tabActivities },
    { id: "usecases" as const, label: ft.tabUsecases },
  ];

  return (
    <>
    <SEO
      titleAr={t.ar.features.seoTitle}
      titleEn={t.en.features.seoTitle}
      descriptionAr={t.ar.features.seoDesc}
      descriptionEn={t.en.features.seoDesc}
      canonical="/features"
      keywordsAr={pk?.keywordsAr}
      keywordsEn={pk?.keywordsEn}
    />
    <SoftwareAppSchema />
    <BreadcrumbSchema items={[{ name: ft.breadcrumbHome, url: "/" }, { name: ft.breadcrumbFeatures, url: "/features" }]} />
    <WebPageSchema
      name={lang === "ar" ? t.ar.features.seoTitle : t.en.features.seoTitle}
      description={lang === "ar" ? t.ar.features.seoDesc : t.en.features.seoDesc}
      url="/features"
    />
    <PageShell className="relative overflow-x-clip bg-white" style={{ background: "#fff", color: "#09090b" }}>

      {/* ══════════════════ HERO ══════════════════ */}
      <HeroLede
        family="violet"
        eyebrow={ft.heroTag}
        title={<span dangerouslySetInnerHTML={{ __html: ft.heroTitle }} />}
        body={ft.heroSub}
      >
        {/* The four tabs are the registry's own divisions, so they belong in
            the hero: the page hands the reader its contents before it starts
            listing them. */}
        <div className="hero-tabs" role="tablist" aria-label={isAr ? "أقسام الخصائص" : "Capability groups"}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="hero-tab"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </HeroLede>

      {/* ══════════════════ THE SHAPE ══════════════════
          The whole registry at a glance, above the tabs — the three kinds
          compose in one direction, and a merchant who reads that once knows
          what the tabs below are dividing. */}
      <DsSection family="grey">
        <SectionHead
          center
          size="md"
          kicker={isAr ? "الشكل" : "The shape"}
          title={isAr ? "هدف، شكل عرض، ومكان يظهر فيه" : "A goal, a shape, and a place it appears"}
          lead={
            isAr
              ? "كل خاصية في زيادة تجيب على واحد من ثلاثة أسئلة: ما الرقم الذي ترفعه، وكيف تبدو للمشتري، وأين تظهر له."
              : "Every Ziadah capability answers one of three questions: which number it raises, how it looks to the shopper, and where it appears."
          }
        />
        <MediaSlot className="media-slot--screen media-slot--fit">
          <CapabilityStack />
        </MediaSlot>
      </DsSection>

      {/* ══════════════════ GOALS ══════════════════ */}
      {activeTab === "goals" && (
        <DsSection family="violet">
          <Shell width="wide">
          <div className="flex flex-col gap-[1.6rem]">
            {goals.map((g, i) => {
              const boost = isAr ? g.boost : g.boostEn;
              return (
                <div
                  key={g.id}
                  className={`rv d${(i % 2) + 1} card card--short`}
                >
                  <div className="card-head items-start">
                    <span className="card-ico">
                      <g.Icon className="w-6 h-6" aria-hidden="true" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="flex flex-wrap items-center gap-2.5">
                        <h3 className="card-title !w-auto">
                          <button
                            type="button"
                            className="text-start hover:underline"
                            onClick={() => navigateTo(featureHref(g))}
                          >
                            {isAr ? g.title : g.titleEn}
                          </button>
                        </h3>
                        <span className="pill pill--soon">
                          {ft.goalLabel} <span className="num-ltr">#{g.id}</span>
                        </span>
                      </span>
                      <span className="card-body-text">{isAr ? g.subtitle : g.subtitleEn}</span>
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-5">
                    <div>
                      <div className="card-eyebrow mb-2">{ft.descLabel}</div>
                      <p className="card-body-text">{isAr ? g.desc : g.descEn}</p>
                    </div>
                    <div>
                      <div className="card-eyebrow mb-2">{ft.whenLabel}</div>
                      <p className="card-body-text">{isAr ? g.when : g.whenEn}</p>
                      <p className="card-inset !mt-3">
                        <span className="font-bold">{ft.exampleLabel}</span>{isAr ? g.example : g.exampleEn}
                      </p>
                    </div>
                    <div>
                      <div className="card-eyebrow mb-2">{ft.expectedResult}</div>
                      <div className="card-inset !mt-0 text-center">
                        <div className="t-head-1 num-ltr" style={{ color: "var(--ziadah-violet)" }}>{boost.split(" ")[0]}</div>
                        <div className="card-eyebrow mt-1.5">{boost.substring(boost.indexOf(" ") + 1)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          </Shell>
        </DsSection>
      )}

      {/* ══════════════════ PRESENTATIONS ══════════════════ */}
      {activeTab === "presentations" && (
        <DsSection family="violet">
          <Shell width="wide">
          <div className="cards-grid">
            {presentations.map((p, i) => (
              <div
                key={isAr ? p.title : p.titleEn}
                className={`rv d${(i % 3) + 1} card`}
              >
                <div className="card-head">
                  <span className="card-ico">
                    <p.Icon className="w-6 h-6" aria-hidden="true" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block t-head-2">
                      <button
                        type="button"
                        className="text-start hover:underline"
                        onClick={() => navigateTo(featureHref(p))}
                      >
                        {isAr ? p.title : p.titleEn}
                      </button>
                    </span>
                    <span className="card-eyebrow">{ft.presentationLabel} <span className="num-ltr">#{i + 1}</span></span>
                  </span>
                </div>
                <p className="card-body-text">{isAr ? p.desc : p.descEn}</p>
                <div className="flex flex-wrap gap-2">
                  {(isAr ? p.positions : p.positionsEn).map(pos => (
                    <span key={pos} className="tag">{pos}</span>
                  ))}
                </div>
                <div className="card-eyebrow card-foot">{ft.bestFor}{isAr ? p.best : p.bestEn}</div>
              </div>
            ))}
          </div>
          </Shell>
        </DsSection>
      )}

      {/* ══════════════════ ACTIVITIES ══════════════════ */}
      {activeTab === "activities" && (
        <DsSection family="violet">
          <Shell width="wide">
            <div className="cards-grid">
              {activities.map((a, i) => (
                <div
                  key={a.num}
                  className={`rv d${(i % 3) + 1} card`}
                >
                  <div className="card-head">
                    <span className="card-ico">
                      <a.Icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block t-sm-med">
                        <button
                          type="button"
                          className="text-start hover:underline"
                          onClick={() => navigateTo(featureHref(a))}
                        >
                          {isAr ? a.title : a.titleEn}
                        </button>
                      </span>
                      <span className="card-eyebrow">{ft.activityLabel} <span className="num-ltr">{a.num}</span></span>
                    </span>
                  </div>
                  <p className="card-body-text">{isAr ? a.desc : a.descEn}</p>
                  <div>
                    <div className="card-eyebrow mb-2">{ft.availableTactics}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {(isAr ? a.tactics : a.tacticsEn).map(tc => (
                        <span key={tc} className="tag">{tc}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="card-eyebrow mb-2">{ft.availablePlans}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {(isAr ? a.avail : a.availEn).map(pkg => (
                        <span key={pkg} className="tag">{pkg}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Journey map */}
            <div className="rv card card--short mt-10">
              <div className="text-center">
                <div className="t-head-2">{ft.journeyMapTitle}</div>
                <div className="card-eyebrow mt-1.5">{ft.journeyMapSub}</div>
              </div>
              <div className="flex items-center overflow-x-auto pb-2">
                {activities.map((a, i) => (
                  <div key={a.num} className="flex items-center shrink-0">
                    <div className="text-center px-2">
                      <span className="card-ico mx-auto mb-2">
                        <a.Icon className="w-5 h-5" aria-hidden="true" />
                      </span>
                      <div className="card-eyebrow whitespace-nowrap max-w-[80px] mx-auto truncate">{isAr ? a.title : a.titleEn}</div>
                    </div>
                    {i < activities.length - 1 && (
                      <span
                        className="w-8 h-px shrink-0"
                        style={{ background: "color-mix(in srgb, var(--color-secondary) 20%, transparent)" }}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Shell>
        </DsSection>
      )}

      {/* ══════════════════ USE CASES ══════════════════ */}
      {activeTab === "usecases" && (
        <DsSection family="violet">
          <Shell width="wide">
          <div className="cards-grid">
            {usecases.map((u, i) => {
              const result = isAr ? u.result : u.resultEn;
              return (
                <div
                  key={isAr ? u.sector : u.sectorEn}
                  className={`rv d${(i % 3) + 1} card`}
                >
                  <div className="card-head items-start">
                    <span className="flex items-center gap-3 min-w-0">
                      <span className="card-ico">
                        <u.Icon className="w-6 h-6" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block t-head-2">{isAr ? u.sector : u.sectorEn}</span>
                        <span className="card-eyebrow">{isAr ? u.stores : u.storesEn}</span>
                      </span>
                    </span>
                    <span className="card-inset !mt-0 shrink-0 text-center !py-2.5 !px-3.5">
                      <span className="block t-head-2 num-ltr" style={{ color: "var(--ziadah-violet)" }}>{result.split(" ")[0]}</span>
                      <span className="card-eyebrow whitespace-nowrap">{result.substring(result.indexOf(" ") + 1)}</span>
                    </span>
                  </div>
                  <div className="card-foot flex-col items-stretch">
                    <div className="card-eyebrow mb-2.5">{ft.bestStrategies}</div>
                    <div className="flex flex-col gap-2">
                      {(isAr ? u.strategies : u.strategiesEn).map(s => (
                        <div key={s} className="card-body-text flex items-center gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: "var(--ziadah-violet)" }}
                            aria-hidden="true"
                          />
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          </Shell>
        </DsSection>
      )}

      <PageClosingCta
        title={ft.ctaTitle}
        description={ft.ctaSub}
        buttonLabel={ld.ctaBtn}
        onActivate={() => setPlatformModalOpen(true)}
      />
    </PageShell>
    <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
