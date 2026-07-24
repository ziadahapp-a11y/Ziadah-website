import { navigateTo } from "@/components/PageTransition";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiTiktok } from "react-icons/si";
import { Editable } from "@/cms/components/Editable";
import { cmsKey } from "@/cms/cmsKeys";

export default function Footer() {
  const t = useSiteT();
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
              <Editable contentKey={cmsKey(lang, "footer", "tagline")} label="Footer Tagline">
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
              <Editable contentKey={cmsKey(lang, "nav", "useCases")} label="Footer Use Cases Heading">
                {tr.nav.useCases}
              </Editable>
            </h4>
            <a href="/use-cases/by-pages">
              <Editable contentKey={cmsKey(lang, "nav", "useCaseByPage")} label="Footer Nav Use Case By Page">
                {tr.nav.useCaseByPage}
              </Editable>
            </a>
            <a href="/use-cases/by-activity">
              <Editable contentKey={cmsKey(lang, "nav", "useCaseByActivity")} label="Footer Nav Use Case By Activity">
                {tr.nav.useCaseByActivity}
              </Editable>
            </a>
            <a href="/use-cases/by-presentation">
              <Editable contentKey={cmsKey(lang, "nav", "useCaseByPresentation")} label="Footer Nav Use Case By Presentation">
                {tr.nav.useCaseByPresentation}
              </Editable>
            </a>
            <a href="/use-cases/by-goal">
              <Editable contentKey={cmsKey(lang, "nav", "useCaseByGoal")} label="Footer Nav Use Case By Goal">
                {tr.nav.useCaseByGoal}
              </Editable>
            </a>
            <a href="/use-cases/by-experience">
              <Editable contentKey={cmsKey(lang, "nav", "useCaseByExperience")} label="Footer Nav Use Case By Experience">
                {tr.nav.useCaseByExperience}
              </Editable>
            </a>
          </div>
          <div className="ft-col">
            <h4>
              <Editable contentKey={cmsKey(lang, "nav", "sectors")} label="Footer Sectors Heading">
                {tr.nav.sectors}
              </Editable>
            </h4>
            {footerSectorLinks.map((sector) => (
              <a key={sector.href} href={sector.href}>
                <Editable
                  contentKey={cmsKey(lang, "footer", sector.labelKey)}
                  label={tr.footer[sector.labelKey]}
                >
                  {tr.footer[sector.labelKey]}
                </Editable>
              </a>
            ))}
          </div>
          <div className="ft-col">
            <h4>
              <Editable contentKey={cmsKey(lang, "nav", "help")} label="Footer Help Heading">
                {tr.nav.help}
              </Editable>
            </h4>
            <a href="/#faq">
              <Editable contentKey={cmsKey(lang, "nav", "faq")} label="Footer FAQ">
                {tr.nav.faq}
              </Editable>
            </a>
            <a href="/support">
              <Editable contentKey={cmsKey(lang, "footer", "helpCenterLink")} label="Footer Help Center">
                {tr.footer.helpCenterLink}
              </Editable>
            </a>
            <a href="/blog">
              <Editable contentKey={cmsKey(lang, "nav", "blog")} label="Footer Blog">
                {tr.nav.blog}
              </Editable>
            </a>
          </div>
        </div>
        <div className="ft-bot">
          <div className="ft-copy">
            <Editable contentKey={cmsKey(lang, "footer", "copyright")} label="Footer Copyright">
              {tr.footer.copyright}
            </Editable>
          </div>
          <div className="ft-legal">
            <a href="/privacy">
              <Editable contentKey={cmsKey(lang, "footer", "privacy")} label="Footer Privacy Link">
                {tr.footer.privacy}
              </Editable>
            </a>
            <a href="/terms">
              <Editable contentKey={cmsKey(lang, "footer", "terms")} label="Footer Terms Link">
                {tr.footer.terms}
              </Editable>
            </a>
            <a href="/data-deletion">
              <Editable contentKey={cmsKey(lang, "footer", "dataDeletion")} label="Footer Data Deletion Link">
                {tr.footer.dataDeletion}
              </Editable>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
