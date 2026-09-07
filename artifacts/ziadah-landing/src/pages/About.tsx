import SEO from "@/components/SEO";
import { BreadcrumbSchema, WebPageSchema } from "@/components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { t as siteTranslations } from "@/i18n/translations";
import { navigateTo } from "@/components/PageTransition";
import { Button, Shell } from "@/components/mk";
import { HeroLede, Section, SectionHead, CtaSection, MediaSlot } from "@/sections";
import { EcosystemGraph } from "@/components/art/EcosystemGraph";
import { PLATFORMS } from "@/lib/platforms-data";
import { analytics } from "@/lib/analytics";

/**
 * `/about` — what Ziadah is, and what it is not.
 *
 * The site had no page that answered "what is this, exactly". Every other page
 * answers a narrower question: what it does (`/use-cases`), who for
 * (`/sectors`), where it runs (`/platforms`), what it costs (`/pricing`). A
 * merchant deciding whether to spend an afternoon on this needs the first
 * question answered plainly, in one place, including the parts that are easy
 * to misread.
 *
 * Every number on this page is one the site already states elsewhere. Nothing
 * is introduced here.
 */
export default function About() {
  const { lang } = useLanguage();
  const tr = siteTranslations[lang];
  const isAr = lang === "ar";
  const t = (ar: string, en: string) => (isAr ? ar : en);
  const ld = tr.landing;

  const go = (href: string) => {
    analytics.navInteraction(href, "route");
    navigateTo(href);
  };

  /* The misreadings, stated as denials. Each one is a thing merchants actually
     assume from the category, and each is answered by how the product works
     rather than by a promise. */
  const notList = [
    t(
      "ليس تعديلاً على قالب متجرك. زيادة يعمل فوق المتجر لا داخله — لا نلمس القالب ولا نحتاج مطوّراً، والتثبيت من لوحة المنصة بضغطة واحدة.",
      "It is not a theme edit. Ziadah runs on top of your store, not inside it — we do not touch the theme and you do not need a developer. Installation is one click from your platform's dashboard.",
    ),
    t(
      "ليس قائمة «منتجات ذات صلة» ثابتة. الاختيار يتغيّر لكل مشترٍ حسب ما يتصفّحه وما اشتراه غيره، ويتحسّن مع تراكم الطلبات بدون أن تعيد ضبطه.",
      "It is not a fixed “related products” list. The choice changes per shopper, from what they browse and what others bought, and improves as orders accumulate without you re-tuning it.",
    ),
    t(
      "ليس قناة تسويق. زيادة لا يرسل رسائل ولا إعلانات — يعمل داخل متجرك على المشتري الموجود فيه أصلاً، وهو ما يجعل أثره على متوسط الطلب قابلاً للقياس مباشرة.",
      "It is not a marketing channel. Ziadah sends no messages and buys no ads — it works inside your store on the shopper already in it, which is what makes its effect on order value directly measurable.",
    ),
  ];

  const principles = [
    {
      h: t("الرقم قبل الوعد", "The number before the promise"),
      b: t(
        "كل رقم على هذا الموقع مقيس من متاجر تشتغل، لا تقدير. وحين لا يوجد رقم، نقول ذلك بدل أن نضع واحداً.",
        "Every number on this site is measured from stores that run, not estimated. Where there is no number, we say so rather than supply one.",
      ),
    },
    {
      h: t("ما يعمل اليوم، وما لم يُطلق", "What runs today, and what has not shipped"),
      b: t(
        "الموصّل المنشور والموصّل قيد التطوير يُذكران بالاسم وبحالتهما. «قريباً» ليست ميزة، ولا نضع لها تاريخاً لا نضمنه.",
        "A published connector and one in development are each named, with their state. “Coming soon” is not a feature, and we do not attach a date we cannot keep.",
      ),
    },
    {
      h: t("المشتري قبل الاقتراح", "The shopper before the suggestion"),
      b: t(
        "الاقتراح الذي يقاطع التجربة يخسر الطلب كله. لذلك يظهر اقتراح واحد أو اثنان في نقطة واحدة، ويتوقّف عن الظهور إذا رُفض مراراً.",
        "A suggestion that interrupts costs you the whole order. So one or two appear at a single point, and they stop appearing when they are repeatedly dismissed.",
      ),
    },
  ];

  const connected = PLATFORMS.filter((p) => p.status === "connected");
  const connectedNames = connected.map((p) => (isAr ? p.name.ar : p.name.en)).join(t("، ", " and "));

  return (
    <>
      <SEO
        titleAr="عن زيادة — محرّك اقتراح المنتجات لمتاجر زد وسلة"
        titleEn="About Ziadah — the product recommendation engine for Zid and Salla stores"
        descriptionAr="ما هو زيادة وما ليس: محرّك يقترح المنتج المناسب لكل مشترٍ داخل متجرك، يعمل فوق زد وسلة بدون مطوّر وبدون تعديل على القالب."
        descriptionEn="What Ziadah is and what it is not: an engine that suggests the right product to each shopper inside your store, running on top of Zid and Salla with no developer and no theme edits."
        canonical="/about"
      />
      <BreadcrumbSchema
        items={[
          { name: t("الرئيسية", "Home"), url: "/" },
          { name: t("عن زيادة", "About Ziadah"), url: "/about" },
        ]}
      />
      <WebPageSchema
        name={t("عن زيادة", "About Ziadah")}
        description={t("ما هو زيادة، وما ليس", "What Ziadah is, and what it is not")}
        url="/about"
      />

      <div className="page">
        <HeroLede
          family="violet"
          invert
          eyebrow={t("عن زيادة", "About Ziadah")}
          title={t("محرّك يقترح المنتج التالي", "An engine for the next product")}
          body={t(
            "أغلب زوّار متجرك يشترون منتجاً واحداً ويخرجون. زيادة يقرأ الكتالوج وسلوك الشراء، ويعرض لكل مشترٍ المنتج الذي يكمّل ما بين يديه — في صفحة المنتج، والسلة، والدفع — فيرتفع متوسط الطلب بدون أي إنفاق إعلاني إضافي.",
            "Most of your visitors buy one product and leave. Ziadah reads your catalogue and your buying behaviour and shows each shopper the product that completes what they already have — on the product page, in the cart, at checkout — so order value rises with no extra ad spend.",
          )}
          actions={
            <Button variant="invert" size="lg" onClick={() => go("/use-cases")}>
              {t("شوف الحلول", "See the solutions")}
            </Button>
          }
        />

        <Section family="grey">
          <Shell width="narrow">
            <SectionHead
              size="md"
              kicker={t("الفكرة", "The idea")}
              title={t(
                "مشترٍ واحد، اقتراح في وقته، طلب أكبر",
                "One shopper, a suggestion in time, a larger order",
              )}
              lead={t(
                `اليوم يعمل زيادة في أكثر من ${ld.stat1Value} متجر، وقد عرض ما يزيد على ${ld.stat4Value} اقتراح انتهى بـ${ld.stat3Value} منتج مُشترى. هذه الأرقام من متاجر تشتغل، وهي كل ما نملك قوله عن الحجم.`,
                `Ziadah runs in more than ${ld.stat1Value} stores today, and has shown upwards of ${ld.stat4Value} suggestions that ended in ${ld.stat3Value} products bought. Those numbers come from stores that run, and they are all we have to say about scale.`,
              )}
            />
          </Shell>
        </Section>

        <Section family="grey" flushTop>
          <Shell width="narrow">
            <SectionHead
              size="sm"
              kicker={t("ما ليس", "What it is not")}
              title={t("ثلاثة أشياء يُساء فهمها كثيراً", "Three things that get misread")}
            />
            <ul className="about-not">
              {notList.map((x) => (
                <li key={x} className="about-not-item">
                  {x}
                </li>
              ))}
            </ul>
          </Shell>
        </Section>

        <Section family="violet">
          <SectionHead
            kicker={t("المبادئ", "Principles")}
            title={t("كيف نكتب ما تقرأه هنا", "How we write what you read here")}
          />
          {/* Three principles as a numbered editorial list rather than three
              equal cards. A principle is an argument in order; a card grid
              says these are three interchangeable items. */}
          <ol className="about-principles">
            {principles.map((p, i) => (
              <li key={p.h} className="about-principle">
                <span className="about-principle-n num-ltr" aria-hidden="true">{`0${i + 1}`}</span>
                <div className="about-principle-text">
                  <h3 className="about-principle-h">{p.h}</h3>
                  <p className="about-principle-b">{p.b}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section family="grey">
          <SectionHead
            size="md"
            kicker={t("أين نعمل", "Where we run")}
            title={t("الموصّلات، بصراحة", "The connectors, plainly")}
            lead={t(
              `${connectedNames} يعملان اليوم. زيادة منتج مستقل، وليس تطبيقاً تابعاً لأي منصة ولا معتمداً منها.`,
              `${connectedNames} work today. Ziadah is an independent product — not one platform's app, and not endorsed by any of them.`,
            )}
          />
          <MediaSlot className="media-slot--screen eco-slot">
            <EcosystemGraph />
          </MediaSlot>
          <p className="about-plain">
            <Button variant="tertiary" onClick={() => go("/platforms")}>
              {t("كل المنصات وما يقرأه كل موصّل", "Every platform, and what each connector reads")}
            </Button>
          </p>
        </Section>

        <CtaSection
          family="violet"
          title={t("جرّبه على متجرك", "Try it on your store")}
          body={t(
            "التفعيل بضغطة واحدة من لوحة متجرك، وتقدر توقفه في أي وقت.",
            "One click from your store dashboard, and you can stop it at any time.",
          )}
          primary={{
            label: tr.nav.startNow,
            onClick: () => go("/pricing"),
            testId: "about-cta",
          }}
          secondary={{
            label: tr.nav.help,
            onClick: () => go("/support"),
          }}
        />
      </div>
    </>
  );
}
