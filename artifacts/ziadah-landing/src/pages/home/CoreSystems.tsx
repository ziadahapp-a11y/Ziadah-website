import { useRef } from "react";
import { Link } from "wouter";
import { BadgeCheck, Headphones, ShieldCheck } from "lucide-react";
import { Button } from "@/components/mk";
import { useT } from "@/lib/i18n";
import { useLanguage } from "@/i18n/LanguageContext";
import { sectionTheme } from "@/sections";
import { goals } from "@/lib/features-data";
import { useMarqueeShiftSync } from "@/hooks/useMarqueeShiftSync";
import { BoardHead } from "./BentoBoard";

/* The merchants whose logos run under the proof band: the same claim as the
   count above them, with names on it. */
const storeLogos = [
  { name: "BestClean", src: "/logos/bestclean.png" },
  { name: "Reeq Alnahl", src: "/logos/reeq-alnahl.png" },
  { name: "Altamimi", src: "/logos/altamimi.png" },
  { name: "ZUM", src: "/logos/zum.png" },
  { name: "CB", src: "/logos/cb.png" },
  { name: "12 CUPS", src: "/logos/12cups.png" },
  { name: "RIBAL", src: "/logos/ribal.png" },
  { name: "SHFT", src: "/logos/shft.png" },
  { name: "FOR HER", src: "/logos/for-her.png" },
  { name: "Abaq Alghim", src: "/logos/abaq-alghim.png" },
  { name: "FABIAN", src: "/logos/fabian.png" },
  { name: "Natural Touch", src: "/logos/natural-touch.png" },
  { name: "image_223", src: "/logos/image-223.png" },
  { name: "Mazeed", src: "/logos/mazeed.png" },
  { name: "AlSalman Oud", src: "/logos/alsalman-oud.png" },
  { name: "PC Palace", src: "/logos/pc-palace.png" },
];

/**
 * WHAT THE APP DOES: THE GOALS, THE PROOF, WHAT YOU CAN COUNT ON.
 *
 * Every other band on this page already says something, and this one used to
 * say it again: its capability cards repeated the shapes list (a bundle, a cart
 * upgrade), its "where it appears" list repeated what each shape's open row
 * says, its "how it connects" list repeated step one of how-it-works, and its
 * guarantees repeated the pricing band (the trial, the VAT line).
 *
 * So it says only what no other band does:
 *
 *   1  THE GOALS   what a merchant is trying to move, with the measured change
 *                  each one produces. The shapes show HOW an offer looks and
 *                  how-it-works shows how it is set up; neither names the goal.
 *   2  PROOF       the cumulative numbers, then the stores behind them.
 *   3  TRUST       three things stated nowhere else on the page: what the app
 *                  reads, who owns it, and who answers.
 *
 * The goals and their figures are read from `features-data`, the same source
 * the features page uses, so the two cannot disagree.
 */
export function CoreSystems() {
  const t = useT();
  const { isAr } = useLanguage();
  const logosRef = useRef<HTMLDivElement>(null);
  useMarqueeShiftSync(logosRef);

  /* "+28% average products in cart" -> the number, and what it measures. */
  const split = (boost: string) => {
    const m = boost.match(/^([+\-\u2212]?\d+(?:\.\d+)?%)\s*(.*)$/);
    return m ? { v: m[1], k: m[2] } : { v: "", k: boost };
  };
  const strip = (title: string) => title.replace(/\s*\([^)]*\)\s*/g, " ").trim();

  const stats = [
    { v: "+1,500", k: t({ ar: "متجر يشغّل زيادة اليوم", en: "stores run Ziadah today" }) },
    { v: t({ ar: "+20M ر.س", en: "+SAR 20M" }), k: t({ ar: "مبيعات إضافية للتجار", en: "extra sales for merchants" }) },
    { v: "+200K", k: t({ ar: "طلب فيه منتج مقترح", en: "orders with a suggested item" }) },
    { v: "+40M", k: t({ ar: "مرة عُرض فيها اقتراح", en: "times a suggestion was shown" }) },
  ];

  const trust = [
    {
      Icon: ShieldCheck,
      title: t({ ar: "بياناتك تبقى بياناتك", en: "Your data stays yours" }),
      support: t({
        ar: "يقرأ التطبيق الكتالوج وسلوك الشراء فقط. لا يقرأ بيانات الدفع، ولا تُشارك بياناتك خارجاً.",
        en: "The app reads the catalogue and buying behaviour, nothing else. It does not read payment data, and your data is not shared out.",
      }),
    },
    {
      Icon: BadgeCheck,
      title: t({ ar: "منتج مستقل", en: "An independent product" }),
      support: t({ ar: "غير تابع لأي منصة ولا معتمد منها.", en: "Not owned or endorsed by any platform." }),
    },
    {
      Icon: Headphones,
      title: t({ ar: "دعم بالعربية", en: "Support in Arabic" }),
      support: t({ ar: "فريق مختص يرد عليك، لا رد آلي.", en: "A specialist team answers, not an auto-reply." }),
    },
  ];

  return (
    <section className="bsection" id="systems" {...sectionTheme("violet", false)}>
      <div className="container">
        <BoardHead
          eyebrow={t({ ar: "وش يسوّي تطبيق زيادة", en: "What the Ziadah app does" })}
          title={t({ ar: "يرفع سلّة عميلك، وبأرقام تقدر تراجعها", en: "It grows your customer's cart, with numbers you can check" })}
          lede={t({
            ar: "اختر الهدف الذي تريد تحريكه، ويختار التطبيق له الاقتراح المناسب. وهذه نتائج كل هدف في المتاجر.",
            en: "Pick the goal you want to move and the app chooses the suggestion for it. These are the results each goal produces in stores.",
          })}
        />

        {/* 1 - THE GOALS */}
        <div className="cs-goals">
          {goals.map((g) => {
            const b = split(isAr ? g.boost : g.boostEn);
            return (
              <article key={g.slug} className="cs-goal">
                <span className="cs-goal-ico" aria-hidden="true"><g.Icon /></span>
                <h3 className="cs-goal-t">{strip(isAr ? g.title : g.titleEn)}</h3>
                <p className="cs-goal-s">{isAr ? g.subtitle : g.subtitleEn}</p>
                <p className="cs-goal-b">
                  <span className="cs-goal-v num-ltr">{b.v}</span>
                  <span className="cs-goal-k">{b.k}</span>
                </p>
              </article>
            );
          })}
        </div>

        {/* 2 - PROOF */}
        <div className="cs-proof">
          <ul className="cs-stats">
            {stats.map((s, i) => (
              <li key={i} className="cs-stat">
                <span className="cs-stat-v">{s.v}</span>
                <span className="cs-stat-k">{s.k}</span>
              </li>
            ))}
          </ul>
          <p className="cs-proof-note">
            {t({
              ar: "الأرقام تراكمية منذ الإطلاق عبر كل المتاجر، لا نتيجة متجر واحد.",
              en: "The figures are cumulative since launch across every store, not one store's result.",
            })}
          </p>
        </div>

        <div className="logos-mask marquee-row bsection-layers">
          <div
            ref={logosRef}
            className="marquee-track marquee-rtl"
            style={{ animationDuration: `${storeLogos.length * 1.75}s` }}
          >
            {[0, 1, 2].map((seg) => (
              <div key={seg} className="marquee-segment">
                {storeLogos.map((l, i) => (
                  <div key={`${seg}-${i}`} className="lc">
                    <img
                      src={l.src}
                      alt={t({
                        ar: `شعار ${l.name} - متجر يستخدم تطبيق زيادة`,
                        en: `${l.name} logo - a store running Ziadah`,
                      })}
                      loading="lazy"
                      className="logo-img"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 3 - TRUST */}
        <div className="cs-trust">
          {trust.map((r) => (
            <div key={r.title} className="cs-trust-i">
              <span className="cs-row-ico" aria-hidden="true"><r.Icon /></span>
              <span className="cs-row-main">
                <span className="cs-row-t">{r.title}</span>
                <span className="cs-row-s">{r.support}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="bsection-foot">
          <Button as={Link} href="/features" variant="primary" size="lg" data-testid="systems-all-features">
            {t({ ar: "شوف كل حالات الاستخدام والمميزات", en: "See every use case and feature" })}
          </Button>
        </div>
      </div>
    </section>
  );
}
