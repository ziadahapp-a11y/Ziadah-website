import { navigateTo } from "@/components/PageTransition";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { useTheme } from "@/ThemeContext";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiTiktok } from "react-icons/si";
import { Editable } from "@/cms/components/Editable";

export default function Footer() {
  const t = useSiteT();
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const tr = t[lang];
  const footerSectorLinks = [
    {
      href: "/sectors/ecommerce-stores",
      labelAr: "المتاجر الإلكترونية",
      labelEn: "Ecommerce Stores",
    },
    {
      href: "/sectors/delivery-apps",
      labelAr: "تطبيقات التوصيل",
      labelEn: "Delivery Apps",
    },
    {
      href: "/sectors/ecommerce-platforms",
      labelAr: "منصات التسوق الإلكترونية",
      labelEn: "Ecommerce Platforms",
    },
  ] as const;

  return (
    <footer>
      <div className="wrap">
        <div className="ft-top">
          <div className="ft-brand">
            <div className="ft-logo">
              <img
                src={
                  theme === "light"
                    ? lang === "ar"
                      ? "/logo-light-ar.png"
                      : "/logo-light.png"
                    : lang === "ar"
                      ? "/logo-ar.png"
                      : "/logo-en.png"
                }
                alt={tr.seo.brandLogoAlt}
                style={{ height: 40, width: "auto" }}
              />
            </div>
            <p className="ft-desc">
              <Editable contentKey={`footer.tagline.${lang}`} label="Footer Tagline">
                {tr.footer.tagline}
              </Editable>
            </p>
            <div className="ft-soc">
              <a href="https://x.com/ZiadahApp" target="_blank" rel="noreferrer" className="ftsi" aria-label="X">
                <FaXTwitter size={16} />
              </a>
              <a href="https://linkedin.com/company/ziadahapp" target="_blank" rel="noreferrer" className="ftsi" aria-label="LinkedIn">
                <FaLinkedinIn size={16} />
              </a>
              <a href="https://www.tiktok.com/@ziadahapp" target="_blank" rel="noreferrer" className="ftsi" aria-label="TikTok">
                <SiTiktok size={16} />
              </a>
              <a href="https://www.instagram.com/ziadahapp" target="_blank" rel="noreferrer" className="ftsi" aria-label="Instagram">
                <FaInstagram size={16} />
              </a>
            </div>
          </div>
          <div className="ft-col">
            <h4>
              <Editable contentKey={`footer.useCasesHeading.${lang}`} label="Footer Use Cases Heading">
                {tr.nav.useCases}
              </Editable>
            </h4>
            <a href="/use-cases/by-pages">{tr.nav.useCaseByPage}</a>
            <a href="/use-cases/by-activity">{tr.nav.useCaseByActivity}</a>
            <a href="/use-cases/by-presentation">{tr.nav.useCaseByPresentation}</a>
            <a href="/use-cases/by-goal">{tr.nav.useCaseByGoal}</a>
            <a href="/use-cases/by-experience">{tr.nav.useCaseByExperience}</a>
          </div>
          <div className="ft-col">
            <h4>
              <Editable contentKey={`footer.sectorsHeading.${lang}`} label="Footer Sectors Heading">
                {tr.nav.sectors}
              </Editable>
            </h4>
            {footerSectorLinks.map((sector) => (
              <a key={sector.href} href={sector.href}>
                {lang === "ar" ? sector.labelAr : sector.labelEn}
              </a>
            ))}
          </div>
          <div className="ft-col">
            <h4>
              <Editable contentKey={`footer.helpHeading.${lang}`} label="Footer Help Heading">
                {tr.nav.help}
              </Editable>
            </h4>
            <a href="/#faq">{tr.nav.faq}</a>
            <a href="/support">{lang === "ar" ? "مركز المساعدة" : "Help Center"}</a>
            <a href="/blog">{tr.nav.blog}</a>
          </div>
        </div>
        <div className="ft-bot">
          <div className="ft-copy">
            <Editable contentKey={`footer.copyright.${lang}`} label="Footer Copyright">
              {tr.footer.copyright}
            </Editable>
          </div>
          <div className="ft-links">
            <span onClick={() => navigateTo("/privacy")} style={{ cursor: "pointer" }}>
              <Editable contentKey={`footer.privacy.${lang}`} label="Footer Privacy">
                {tr.footer.privacy}
              </Editable>
            </span>
            <span onClick={() => navigateTo("/terms")} style={{ cursor: "pointer" }}>
              <Editable contentKey={`footer.terms.${lang}`} label="Footer Terms">
                {tr.footer.terms}
              </Editable>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
