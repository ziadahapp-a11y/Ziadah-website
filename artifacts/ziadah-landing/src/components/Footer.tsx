import { navigateTo } from "@/components/PageTransition";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { useTheme } from "@/ThemeContext";
import { sectors } from "@/data/sectors";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiTiktok } from "react-icons/si";

export default function Footer() {
  const t = useSiteT();
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const tr = t[lang];

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
            <h4>{tr.nav.useCases}</h4>
            <a href="/use-cases/by-pages">{tr.nav.useCaseByPage}</a>
            <a href="/use-cases/by-activity">{tr.nav.useCaseByActivity}</a>
            <a href="/use-cases/by-presentation">{tr.nav.useCaseByPresentation}</a>
            <a href="/use-cases/by-goal">{tr.nav.useCaseByGoal}</a>
            <a href="/use-cases/by-experience">{tr.nav.useCaseByExperience}</a>
          </div>
          <div className="ft-col">
            <h4>{tr.nav.sectors}</h4>
            {sectors.slice(0, 5).map((sector) => (
              <a key={sector.slug} href={`/sectors/${sector.slug}`}>
                {lang === "ar" ? sector.titleAr : sector.titleEn}
              </a>
            ))}
            <a href="/sectors">{lang === "ar" ? "كل القطاعات" : "All Sectors"}</a>
          </div>
          <div className="ft-col">
            <h4>{tr.nav.help}</h4>
            <a href="/#faq">{tr.nav.faq}</a>
            <a href="/support">{lang === "ar" ? "مركز المساعدة" : "Help Center"}</a>
            <a href="/blog">{tr.nav.blog}</a>
          </div>
        </div>
        <div className="ft-bot">
          <div className="ft-copy">{tr.footer.copyright}</div>
          <div className="ft-links">
            <span onClick={() => navigateTo("/privacy")} style={{ cursor: "pointer" }}>{tr.footer.privacy}</span>
            <span onClick={() => navigateTo("/terms")} style={{ cursor: "pointer" }}>{tr.footer.terms}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
