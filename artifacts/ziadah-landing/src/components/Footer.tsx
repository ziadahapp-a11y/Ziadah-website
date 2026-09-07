import { navigateTo } from "@/components/PageTransition";
import { useLanguage } from "@/i18n/LanguageContext";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiTiktok } from "react-icons/si";
import { t as siteTranslations } from "@/i18n/translations";

export default function Footer() {
  const t = siteTranslations;
  const { lang } = useLanguage();
  const tr = t[lang];
  const footerSectorLinks = [
    { href: "/sectors/ecommerce-stores", labelKey: "sectorLinkEcommerceStores" as const },
    { href: "/sectors/delivery-apps", labelKey: "sectorLinkDeliveryApps" as const },
    { href: "/sectors/ecommerce-platforms", labelKey: "sectorLinkEcommercePlatforms" as const },
  ];

  return (
    <footer>
      <div className="wrap">
        <div className="ft-top">
          <div className="ft-brand">
            <div className="ft-logo">
              <img
                src={lang === "ar" ? "/logo-ar.svg" : "/logo-en.svg"}
                alt={tr.seo.brandLogoAlt}
                style={{ height: 40, width: "auto" }}
              />
            </div>
            <p className="ft-desc">
              {tr.footer.tagline}
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
              {tr.nav.useCases}
            </h4>
            <a href="/use-cases/by-pages">
              {tr.nav.useCaseByPage}
            </a>
            <a href="/use-cases/by-activity">
              {tr.nav.useCaseByActivity}
            </a>
            <a href="/use-cases/by-presentation">
              {tr.nav.useCaseByPresentation}
            </a>
            <a href="/use-cases/by-goal">
              {tr.nav.useCaseByGoal}
            </a>
            <a href="/use-cases/by-experience">
              {tr.nav.useCaseByExperience}
            </a>
          </div>
          <div className="ft-col">
            <h4>
              {tr.nav.sectors}
            </h4>
            {footerSectorLinks.map((sector) => (
              <a key={sector.href} href={sector.href}>
                {tr.footer[sector.labelKey]}
              </a>
            ))}
          </div>
          <div className="ft-col">
            <h4>
              {tr.nav.help}
            </h4>
            <a href="/#faq">
              {tr.nav.faq}
            </a>
            <a href="/support">
              {tr.footer.helpCenterLink}
            </a>
            <a href="/blog">
              {tr.nav.blog}
            </a>
          </div>
        </div>
        <div className="ft-bot">
          <div className="ft-copy">
            {tr.footer.copyright}
          </div>
          <div className="ft-legal">
            <a href="/privacy">
              {tr.footer.privacy}
            </a>
            <a href="/terms">
              {tr.footer.terms}
            </a>
            <a href="/data-deletion">
              {tr.footer.dataDeletion}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
