import { SiShopify } from "react-icons/si";
import SEO from "@/components/SEO";
import { BreadcrumbSchema, WebPageSchema } from "@/components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { navigateTo } from "@/components/PageTransition";
import { Button, Shell } from "@/components/mk";
import { HeroLede, Section, SectionHead, CtaSection, FaqBlock, MediaSlot } from "@/sections";
import { EcosystemGraph } from "@/components/art/EcosystemGraph";
import { PLATFORMS, RESPONSIBILITIES } from "@/lib/platforms-data";
import { platformAsset } from "@/utils/platformAsset";
import { analytics } from "@/lib/analytics";

/**
 * `/platforms` — WHERE Ziadah runs.
 *
 * This page exists so that one sentence has a home that is not the product
 * surface. "An app on Zid and Salla" is a fact about a store platform, not a
 * Ziadah capability, and wherever it sits next to a feature a merchant reads
 * it as what Ziadah IS. It is not: Ziadah is a recommendation engine, and a
 * store platform is where it plugs in.
 *
 * Nothing here is a capability. The page states, per connector, what it does,
 * what it reads, and whether it exists yet — and links back out to the
 * solutions for the capabilities themselves.
 */

function PlatformMark({ slug }: { slug: string }) {
  if (slug === "shopify") return <SiShopify className="plat-logo-svg" />;
  const src =
    slug === "zid"
      ? platformAsset("platform/zid-logo-dark.png")
      : platformAsset("platform/salla-logo-dark.png");
  return <img src={src} alt="" className="plat-logo-svg" />;
}

export default function Platforms() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const t = (ar: string, en: string) => (isAr ? ar : en);

  const connected = PLATFORMS.filter((p) => p.status === "connected");
  const planned = PLATFORMS.length - connected.length;
  const connectedNames = connected.map((p) => (isAr ? p.name.ar : p.name.en)).join(t("، ", ", "));

  return (
    <>
      <SEO
        titleAr="المنصات — أين يعمل زيادة"
        titleEn="Platforms — where Ziadah runs"
        descriptionAr="موصّلات زيادة لمنصات المتاجر: زد وسلة يعملان اليوم، وشوبيفاي قيد التطوير. ما الذي يقرأه كل موصّل، وكيف يتم الربط بدون مطوّر."
        descriptionEn="Ziadah's store-platform connectors: Zid and Salla work today, Shopify is in development. What each connector reads, and how connecting works without a developer."
        canonical="/platforms"
      />
      <BreadcrumbSchema
        items={[
          { name: t("الرئيسية", "Home"), url: "/" },
          { name: t("المنصات", "Platforms"), url: "/platforms" },
        ]}
      />
      <WebPageSchema
        name={t("المنصات", "Platforms")}
        description={t(
          "موصّلات زيادة لمنصات المتاجر وحالة كل واحد منها",
          "Ziadah's store-platform connectors and the status of each",
        )}
        url="/platforms"
      />

      <div className="page">
        <HeroLede
          family="violet"
          invert
          eyebrow={t("المنصات", "Platforms")}
          title={t("أين يعمل زيادة", "Where Ziadah runs")}
          body={t(
            "زيادة محرّك توصيات قائم بذاته — ليس إضافة لمنصة متجر. المنصة التي يعمل عليها متجرك هي مكان الاتصال فقط: الموصّل يقرأ الكتالوج وسلوك الشراء، وكل ما بعد ذلك يحدث داخل زيادة ويظهر لعميلك في متجرك.",
            "Ziadah is a recommendation engine in its own right — not an add-on to a store platform. Whichever platform your store runs on is only the point of connection: the connector reads your catalogue and your buying behaviour, and everything after that happens inside Ziadah and surfaces to your shopper in your own storefront.",
          )}
          actions={
            <Button
              variant="invert"
              size="lg"
              onClick={() => {
                analytics.navInteraction("/use-cases", "route");
                navigateTo("/use-cases");
              }}
            >
              {t("شوف الحلول", "See the solutions")}
            </Button>
          }
        />

        {/* The ecosystem, drawn. A list of logos says these exist; it does not
            say what the relationship is, which on this page is the entire
            argument. */}
        <Section family="violet">
          <SectionHead
            center
            kicker={t("كيف يتصل", "How it connects")}
            title={t("متجرك في الأعلى، وزيادة في المنتصف", "Your store above, Ziadah in the middle")}
            lead={t(
              "الموصّل يقرأ الكتالوج وسلوك الشراء من المنصة التي تستخدمها أصلاً. كل ما بعد ذلك — الترتيب، الاختيار، العرض، القياس — يحدث داخل زيادة ويظهر لعميلك.",
              "The connector reads the catalogue and the buying behaviour from the platform you already run. Everything after that — the ranking, the choice, the offer, the measurement — happens inside Ziadah and surfaces to your shopper.",
            )}
          />
          <MediaSlot className="media-slot--screen eco-slot">
            <EcosystemGraph />
          </MediaSlot>
        </Section>

        <Section family="grey">
          <SectionHead center
            size="md"
            kicker={t("الموصّلات", "Connectors")}
            title={t(
              `موصّلان يعملان اليوم، و${planned === 1 ? "واحد" : planned} قيد التطوير`,
              `Two connectors work today, ${planned === 1 ? "one is" : `${planned} are`} in development`,
            )}
            lead={t(
              "زيادة منتج مستقل، وليس تطبيقاً تابعاً لأي منصة ولا معتمداً منها. «يعمل اليوم» يعني أن الموصّل منشور ويشتغل. «قيد التطوير» يعني أنه لم يُطلق بعد — ولا نعده بتاريخ.",
              "Ziadah is an independent product — not one platform's app, and not endorsed by any of them. “Works today” means the connector is published and running. “In development” means it has not shipped, and we do not promise a date.",
            )}
          />
          <ul className="plat-list">
            {PLATFORMS.map((p) => {
              const isLive = p.status === "connected";
              const body = (
                <>
                  <span className="plat-head">
                    <span className="plat-logo" aria-hidden="true">
                      <PlatformMark slug={p.slug} />
                    </span>
                    <span className="plat-name">{isAr ? p.name.ar : p.name.en}</span>
                    <span className={`plat-status plat-status--${p.status}`}>
                      {isLive ? t("يعمل اليوم", "Works today") : t("قيد التطوير", "In development")}
                    </span>
                  </span>
                  <span className="plat-what">{isAr ? p.what.ar : p.what.en}</span>
                  <span className="plat-reads">
                    <span className="plat-reads-label">{t("يقرأ", "Reads")}</span>
                    {isAr ? p.reads.ar : p.reads.en}
                  </span>
                </>
              );
              return (
                <li key={p.slug} className="plat-item">
                  {isLive && p.href ? (
                    <a
                      className="plat-item-link"
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`platform-${p.slug}`}
                      onClick={() => analytics.outboundClick(p.href!)}
                    >
                      {body}
                    </a>
                  ) : (
                    <span
                      className="plat-item-link plat-item-link--static"
                      data-testid={`platform-${p.slug}`}
                    >
                      {body}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </Section>

        <Section family="violet">
          <Shell width="narrow">
            <SectionHead center
              size="sm"
              kicker={t("الحدود", "The boundary")}
              title={t(
                "ما الذي تفعله المنصة، وما الذي يفعله زيادة",
                "What the platform does, and what Ziadah does",
              )}
            />
            <div className="plat-split">
              <div className="plat-side">
                <p className="plat-side-title">{t("منصة المتجر", "The store platform")}</p>
                <ul className="plat-side-list">
                  {RESPONSIBILITIES.platform.map((x) => (
                    <li key={x.en}>{isAr ? x.ar : x.en}</li>
                  ))}
                </ul>
              </div>
              <div className="plat-side plat-side--ours">
                <p className="plat-side-title">{t("زيادة", "Ziadah")}</p>
                <ul className="plat-side-list">
                  {RESPONSIBILITIES.ziadah.map((x) => (
                    <li key={x.en}>{isAr ? x.ar : x.en}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Shell>
        </Section>

        <FaqBlock
          family="grey"
          heading={t("أسئلة عن الربط", "Questions about connecting")}
          items={[
            {
              q: t("هل زيادة تطبيق تابع لزد أو سلة؟", "Is Ziadah a Zid or Salla product?"),
              a: t(
                "لا. زيادة منتج مستقل وغير تابع لأي منصة. زد وسلة منصتان يتصل بهما زيادة عبر موصّل منشور في متجر تطبيقات كل منهما.",
                "No. Ziadah is an independent product, not owned by or endorsed by any platform. Zid and Salla are two platforms Ziadah connects to, through a connector published in each one's app market.",
              ),
            },
            {
              q: t(
                "متجري ليس على أي من هذه المنصات — هل أستطيع استخدام زيادة؟",
                "My store isn't on any of these platforms — can I still use Ziadah?",
              ),
              a: t(
                `الموصّلات التي تعمل اليوم هي ${connectedNames}. إن كان متجرك على منصة أخرى، راسلنا ونوضّح لك الوضع الحالي بصراحة بدلاً من وعد بتاريخ.`,
                `The connectors that work today are ${connectedNames}. If your store is elsewhere, get in touch and we'll tell you where things actually stand rather than promise a date.`,
              ),
            },
            {
              q: t("ما البيانات التي يقرأها الموصّل؟", "What data does the connector read?"),
              a: t(
                "أسماء المنتجات وأوصافها، فئاتها، وسلوك الشراء — وهو الحد الأدنى اللازم لاختيار المنتج المقترَح. لا يقرأ الموصّل بيانات الدفع.",
                "Product names and descriptions, their categories, and buying behaviour — the minimum needed to choose a suggested product. The connector does not read payment data.",
              ),
            },
            {
              q: t("هل أحتاج مطوّراً أو تعديل القالب؟", "Do I need a developer or theme edits?"),
              a: t(
                "لا. التثبيت من لوحة المنصة نفسها بضغطة واحدة، والإعداد كله من لوحة زيادة.",
                "No. Installation is one click from the platform's own dashboard, and every setting after that is in the Ziadah dashboard.",
              ),
            },
          ]}
        />

        <CtaSection
          family="violet"
          title={t("متجرك على منصة مدعومة؟", "Is your store on a supported platform?")}
          body={t(
            "ثبّت الموصّل وابدأ، أو راسلنا إن كانت منصتك غير مدعومة بعد.",
            "Install the connector and start, or get in touch if your platform isn't supported yet.",
          )}
          primary={{
            label: t("ثبّت الآن", "Install now"),
            onClick: () => {
              const target = connected[0];
              if (!target?.href) return;
              analytics.ctaClick("platforms_install", target.href);
              window.open(target.href, "_blank", "noopener,noreferrer");
            },
            testId: "platforms-install",
          }}
          secondary={{
            label: t("مركز المساعدة", "Support centre"),
            onClick: () => {
              analytics.navInteraction("/support", "route");
              navigateTo("/support");
            },
          }}
        />
      </div>
    </>
  );
}
