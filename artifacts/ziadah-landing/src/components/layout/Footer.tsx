import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiTiktok } from "react-icons/si";
import { useLanguage } from "@/i18n/LanguageContext";
import { t as siteTranslations } from "@/i18n/translations";
import { navigateTo } from "@/components/PageTransition";
import { SUPPORT_EMAIL, WHATSAPP_SUPPORT_URL, sectorEntries } from "@/lib/nav-data";

/**
 * The site footer, on the design system's measured architecture:
 *
 *   brand      logo, one-line blurb, social row
 *   groups     4-column link grid, 2 at <=1024, 1 at <=767, 6.4rem bottom pad
 *   legal      flex bar, legal links start, copyright pushed to the end
 *
 * White ground, black ink, `padding-block: 8rem 4rem`. It sits outside the
 * page's own section rhythm, so it carries its own.
 *
 * Every destination here is one the previous footer already carried. The
 * reference's email-capture block is deliberately absent: this site has no
 * mailing list, and its conversion path is the platform picker in the header.
 */
export function Footer() {
  const { lang } = useLanguage();
  const tr = siteTranslations[lang];
  const isAr = lang === "ar";
  const t = (ar: string, en: string) => (isAr ? ar : en);

  const go = (to: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo(to);
  };
  const href = (to: string) => `/${lang}${to}`;

  const groups = [
    {
      title: tr.nav.useCases,
      links: [
        { to: "/use-cases/by-pages", label: tr.nav.useCaseByPage },
        { to: "/use-cases/by-activity", label: tr.nav.useCaseByActivity },
        { to: "/use-cases/by-presentation", label: tr.nav.useCaseByPresentation },
        { to: "/use-cases/by-goal", label: tr.nav.useCaseByGoal },
        { to: "/use-cases/by-experience", label: tr.nav.useCaseByExperience },
      ],
    },
    {
      title: tr.nav.sectors,
      links: [
        ...sectorEntries(lang).map((s) => ({ to: s.href, label: s.label })),
        { to: "/sectors", label: t("كل القطاعات", "All sectors") },
      ],
    },
    {
      title: t("المنتج", "Product"),
      links: [
        { to: "/pricing", label: tr.nav.pricing },
        { to: "/calculator", label: tr.nav.calculator },
        { to: "/zid-apps-comparison", label: tr.nav.comparisonNav },
        { to: "/success-stories", label: tr.nav.successStories },
      ],
    },
    {
      title: tr.nav.help,
      links: [
        { to: "/support", label: tr.footer.helpCenterLink },
        { to: "/blog", label: tr.nav.blog },
        { to: "/#faq", label: tr.nav.faq },
      ],
    },
  ];

  const socials = [
    { href: "https://x.com/ZiadahApp", label: "X", Icon: FaXTwitter },
    { href: "https://linkedin.com/company/ziadahapp", label: "LinkedIn", Icon: FaLinkedinIn },
    { href: "https://www.tiktok.com/@ziadahapp", label: "TikTok", Icon: SiTiktok },
    { href: "https://www.instagram.com/ziadahapp", label: "Instagram", Icon: FaInstagram },
  ];

  return (
    <footer className="site-footer" aria-label={t("تذييل موقع زيادة", "Ziadah site footer")}>
      <div className="container">
        <div className="footer-brand">
          <img src={isAr ? "/logo-ar.svg" : "/logo-en.svg"} alt={tr.seo.brandLogoAlt} />
          <p className="footer-blurb">{tr.footer.tagline}</p>
          <div className="flex items-center gap-4">
            {socials.map(({ href: to, label, Icon }) => (
              <a
                key={label}
                href={to}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-subtle transition-colors hover:text-ink"
              >
                <Icon size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-groups">
          {groups.map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <h2 className="footer-group-title">{g.title}</h2>
              <div className="footer-list">
                {g.links.map((l) => (
                  <a key={l.to + l.label} className="footer-link" href={href(l.to)} onClick={go(l.to)}>
                    {l.label}
                  </a>
                ))}
              </div>
            </nav>
          ))}
        </div>

        <div className="footer-legal-bar">
          <nav aria-label={t("روابط قانونية", "Legal")} className="footer-legal-links">
            <a href={href("/privacy")} onClick={go("/privacy")}>
              {tr.footer.privacy}
            </a>
            <a href={href("/terms")} onClick={go("/terms")}>
              {tr.footer.terms}
            </a>
            <a href={href("/data-deletion")} onClick={go("/data-deletion")}>
              {tr.footer.dataDeletion}
            </a>
            <a href={WHATSAPP_SUPPORT_URL} target="_blank" rel="noopener noreferrer">
              {t("واتساب", "WhatsApp")}
            </a>
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </nav>
          <span className="footer-copy">{tr.footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
