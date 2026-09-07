import { useEffect, useState } from "react";
import { t } from "@/i18n/translations";
import PageShell from "../components/PageShell";
import PlatformModal from "../components/PlatformModal";
import PageClosingCta from "../components/PageClosingCta";
import SEO from "../components/SEO";
import { getPageKeywords } from "@/seo/page-keywords";
import { SoftwareAppSchema, BreadcrumbSchema, WebPageSchema } from "../components/JsonLd";
import { useLanguage } from "../i18n/LanguageContext";
import { Section } from "@/components/trackflow";
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
import { Section as DsSection, SectionHead, MediaSlot } from "@/sections";
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
  const { lang, isAr, dir } = useLanguage();
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

  const gridStyle = {
    backgroundImage:
      "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
  } as const;

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
      <section dir={dir} className="relative pt-20 pb-16 md:pt-28 md:pb-20 px-4 border-b border-zinc-200">
        <div className="absolute inset-0 bg-grid-fade opacity-60 -z-10" style={gridStyle} />
        <div className="container mx-auto relative max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 border border-violet-200 mb-6 rv">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-500" />
            </span>
            <span className="text-xs font-semibold text-violet-700">{ft.heroTag}</span>
          </div>
          <h1
            className="rv d1 text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 mb-6 leading-[1.08]"
            dangerouslySetInnerHTML={{ __html: ft.heroTitle }}
          />
          <p className="rv d2 text-lg text-zinc-600 max-w-2xl mx-auto mb-10 leading-relaxed">{ft.heroSub}</p>

          {/* Tabs */}
          <div className="rv d3 inline-flex flex-wrap justify-center gap-1.5 p-1.5 rounded-2xl bg-zinc-50 border border-zinc-200">
            {tabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  activeTab === tab.id
                    ? "bg-zinc-950 text-white"
                    : "text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

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
        <Section containerClassName="max-w-6xl flex flex-col gap-6">
            {goals.map((g, i) => {
              const boost = isAr ? g.boost : g.boostEn;
              return (
                <div
                  key={g.id}
                  className={`rv d${(i % 2) + 1} rounded-2xl border border-zinc-200 bg-white p-7 md:p-8 hover:border-zinc-300 hover:shadow-card transition-all`}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-zinc-950 flex items-center justify-center">
                      <g.Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5 mb-1">
                        <h3 className="text-xl font-bold text-zinc-950">
                          <button
                            type="button"
                            className="text-start hover:underline"
                            onClick={() => navigateTo(featureHref(g))}
                          >
                            {isAr ? g.title : g.titleEn}
                          </button>
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-violet-100 border border-violet-200 text-[11px] font-bold text-violet-700">
                          {ft.goalLabel} <span className="num-ltr">#{g.id}</span>
                        </span>
                      </div>
                      <div className="text-sm text-zinc-500">{isAr ? g.subtitle : g.subtitleEn}</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-5">
                    <div>
                      <div className="text-[11px] font-bold tracking-widest text-violet-600 uppercase mb-2">{ft.descLabel}</div>
                      <p className="text-sm text-zinc-600 leading-relaxed">{isAr ? g.desc : g.descEn}</p>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold tracking-widest text-violet-600 uppercase mb-2">{ft.whenLabel}</div>
                      <p className="text-sm text-zinc-600 leading-relaxed">{isAr ? g.when : g.whenEn}</p>
                      <div className="mt-3 rounded-lg bg-zinc-50 border border-zinc-200 p-3.5 text-sm text-zinc-700 leading-relaxed">
                        <span className="font-bold text-violet-600">{ft.exampleLabel}</span>{isAr ? g.example : g.exampleEn}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold tracking-widest text-violet-600 uppercase mb-2">{ft.expectedResult}</div>
                      <div className="rounded-xl border border-violet-200 bg-violet-50/60 p-5 text-center">
                        <div className="text-3xl font-extrabold text-violet-600 num-ltr">{boost.split(" ")[0]}</div>
                        <div className="text-xs text-zinc-500 mt-1.5">{boost.substring(boost.indexOf(" ") + 1)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </Section>
      )}

      {/* ══════════════════ PRESENTATIONS ══════════════════ */}
      {activeTab === "presentations" && (
        <Section containerClassName="max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {presentations.map((p, i) => (
              <div
                key={isAr ? p.title : p.titleEn}
                className={`rv d${(i % 3) + 1} rounded-2xl border border-zinc-200 bg-white p-7 hover:border-zinc-300 hover:shadow-card transition-all`}
              >
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-zinc-950 flex items-center justify-center">
                    <p.Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-zinc-950">
                      <button
                        type="button"
                        className="text-start hover:underline"
                        onClick={() => navigateTo(featureHref(p))}
                      >
                        {isAr ? p.title : p.titleEn}
                      </button>
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5">{ft.presentationLabel} <span className="num-ltr">#{i + 1}</span></div>
                  </div>
                </div>
                <p className="text-sm text-zinc-600 leading-relaxed mb-5">{isAr ? p.desc : p.descEn}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(isAr ? p.positions : p.positionsEn).map(pos => (
                    <span key={pos} className="px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-600">{pos}</span>
                  ))}
                </div>
                <div className="text-xs font-bold text-violet-600">{ft.bestFor}{isAr ? p.best : p.bestEn}</div>
              </div>
            ))}
        </Section>
      )}

      {/* ══════════════════ ACTIVITIES ══════════════════ */}
      {activeTab === "activities" && (
        <Section containerClassName="max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {activities.map((a, i) => (
                <div
                  key={a.num}
                  className={`rv d${(i % 3) + 1} rounded-2xl border border-zinc-200 bg-white p-7 hover:border-zinc-300 hover:shadow-card transition-all`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 shrink-0 rounded-lg bg-zinc-950 flex items-center justify-center">
                      <a.Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-zinc-950">
                        <button
                          type="button"
                          className="text-start hover:underline"
                          onClick={() => navigateTo(featureHref(a))}
                        >
                          {isAr ? a.title : a.titleEn}
                        </button>
                      </div>
                      <div className="text-[11px] font-bold text-violet-600">{ft.activityLabel} <span className="num-ltr">{a.num}</span></div>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-600 leading-relaxed mb-4">{isAr ? a.desc : a.descEn}</p>
                  <div className="mb-4">
                    <div className="text-[11px] font-bold text-zinc-500 mb-2">{ft.availableTactics}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {(isAr ? a.tactics : a.tacticsEn).map(tc => (
                        <span key={tc} className="px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-[11px] font-medium text-violet-700">{tc}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-zinc-500 mb-2">{ft.availablePlans}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {(isAr ? a.avail : a.availEn).map(pkg => (
                        <span key={pkg} className="px-2.5 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-[11px] font-medium text-zinc-600">{pkg}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Journey map */}
            <div className="rv mt-10 rounded-2xl border border-zinc-200 bg-white p-7 md:p-10 shadow-card">
              <div className="text-center mb-8">
                <div className="text-lg md:text-xl font-bold text-zinc-950">{ft.journeyMapTitle}</div>
                <div className="text-sm text-zinc-500 mt-1.5">{ft.journeyMapSub}</div>
              </div>
              <div className="flex items-center overflow-x-auto pb-2">
                {activities.map((a, i) => (
                  <div key={a.num} className="flex items-center shrink-0">
                    <div className="text-center px-2">
                      <div className="w-12 h-12 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center mx-auto mb-2">
                        <a.Icon className="w-5 h-5 text-violet-600" />
                      </div>
                      <div className="text-[11px] font-bold text-zinc-700 whitespace-nowrap max-w-[80px] text-center mx-auto truncate">{isAr ? a.title : a.titleEn}</div>
                    </div>
                    {i < activities.length - 1 && <div className="w-8 h-px bg-gradient-to-r from-violet-300 to-violet-100 shrink-0" />}
                  </div>
                ))}
              </div>
            </div>
        </Section>
      )}

      {/* ══════════════════ USE CASES ══════════════════ */}
      {activeTab === "usecases" && (
        <Section containerClassName="max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {usecases.map((u, i) => {
              const result = isAr ? u.result : u.resultEn;
              return (
                <div
                  key={isAr ? u.sector : u.sectorEn}
                  className={`rv d${(i % 3) + 1} rounded-2xl border border-zinc-200 bg-white p-7 hover:border-zinc-300 hover:shadow-card transition-all`}
                >
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 shrink-0 rounded-xl bg-zinc-950 flex items-center justify-center">
                        <u.Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-zinc-950">{isAr ? u.sector : u.sectorEn}</div>
                        <div className="text-xs text-zinc-500 mt-0.5">{isAr ? u.stores : u.storesEn}</div>
                      </div>
                    </div>
                    <div className="shrink-0 text-center rounded-xl border border-violet-200 bg-violet-50/60 px-3.5 py-2.5">
                      <div className="text-xl font-extrabold text-violet-600 num-ltr">{result.split(" ")[0]}</div>
                      <div className="text-[11px] text-zinc-500 mt-0.5 whitespace-nowrap">{result.substring(result.indexOf(" ") + 1)}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-zinc-500 mb-2.5">{ft.bestStrategies}</div>
                    <div className="flex flex-col gap-2">
                      {(isAr ? u.strategies : u.strategiesEn).map(s => (
                        <div key={s} className="flex items-center gap-2 text-sm text-zinc-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
        </Section>
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
