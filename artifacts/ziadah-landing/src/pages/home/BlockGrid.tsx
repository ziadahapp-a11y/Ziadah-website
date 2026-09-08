import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/mk";
import { useT } from "@/lib/i18n";
import { themeVars } from "@/sections";

const ZID_APP_URL = "https://apps.zid.sa/application/1826";

/**
 * The page's closing argument.
 *
 * WHAT THIS REPLACES. A `CtaSection` carrying one statement and two buttons.
 * That is a close for a page that has already answered every question; this
 * page's readers arrive at the bottom on one of three different tracks, and
 * the close should say which door is theirs rather than repeat the hero's
 * button.
 *
 * A statement, the three paths a reader can actually be on at this point, and
 * nothing else.
 */
export function BlockGrid() {
  const t = useT();

  const paths = [
    {
      key: "support",
      href: "/support",
      title: t({ ar: "أول مرة تسمع عن الاقتراحات؟", en: "New to product recommendations?" }),
      body: t({
        ar: "ابدأ من الدليل: من تثبيت الموصّل إلى أول اقتراح يظهر في متجرك.",
        en: "Start from the guide: from installing the connector to the first suggestion showing in your store.",
      }),
    },
    {
      key: "sectors",
      href: "/sectors",
      title: t({ ar: "تبي تشوفها في مجالك؟", en: "Want to see it in your sector?" }),
      body: t({
        ar: "شوف كيف تتشكّل زيادة في قطاعك: أزياء، عناية، إلكترونيات، أغذية، وغيرها.",
        en: "See how Ziadah takes shape in your sector: fashion, beauty, electronics, food and more.",
      }),
    },
    {
      key: "platforms",
      href: "/platforms",
      title: t({ ar: "متجرك على منصة مدعومة؟", en: "Is your store on a supported platform?" }),
      body: t({
        ar: "شوف الموصّلات وحالة كل واحد منها: ما يعمل اليوم، وما هو قيد التطوير.",
        en: "See the connectors and where each one stands: what runs today, and what is still in development.",
      }),
    },
  ];

  return (
    <section className="closing" aria-labelledby="get-started" style={themeVars("violet", false)}>
      <div className="container closing-inner">
        <div className="closing-lead">
          <h2 id="get-started" className="closing-title">
            {t({ ar: "ابدأ الآن", en: "Get started" })}
          </h2>
          <p className="closing-lede">
            {t({
              ar: "ثبّت زيادة على متجرك، اختر مكان عرض واحد، وشوف أول اقتراح يوصل لعميلك. التجربة ٧ أيام كاملة وتقدر تلغيها بأي وقت.",
              en: "Install Ziadah on your store, pick one placement, and watch the first suggestion reach a shopper. The trial runs a full 7 days and you can cancel any time.",
            })}
          </p>
          <Button
            as="a"
            href={ZID_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="lg"
            className="closing-cta"
            data-testid="closing-install"
          >
            {t({ ar: "ثبّت زيادة الآن", en: "Install Ziadah now" })}
          </Button>
        </div>

        <ul className="closing-paths">
          {paths.map((p) => (
            <li key={p.key}>
              <Link href={p.href} className="closing-path">
                <span className="closing-path-text">
                  <span className="closing-path-title">{p.title}</span>
                  <span className="closing-path-body">{p.body}</span>
                </span>
                <ArrowUpRight className="closing-path-ico" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The page's legal footnote. */
export function Disclaimer() {
  const t = useT();
  return (
    <div id="home-disclaimer" className="home-disclaimer">
      <div className="container">
        {t({
          ar: "الأسعار شاملة ضريبة القيمة المضافة\nالنتائج تقديرية وتختلف حسب القطاع وحجم الكتالوج وسلوك العملاء",
          en: "Prices are VAT-inclusive\nResults are estimates and vary by sector, catalogue size and shopper behaviour",
        })}
      </div>
    </div>
  );
}
