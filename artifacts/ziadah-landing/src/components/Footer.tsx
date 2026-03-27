import { navigateTo } from "@/components/PageTransition";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { useTheme } from "@/ThemeContext";
import { platformSallaLogoSrc, platformZidLogoSrc } from "@/utils/platformAsset";

export default function Footer() {
  const t = useSiteT();
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const tr = t[lang];

  const zidLogoSrc = platformZidLogoSrc(theme);
  const sallaLogoSrc = platformSallaLogoSrc(theme);

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
              <a href="https://twitter.com/ZiadahApp" target="_blank" rel="noreferrer" className="ftsi">𝕏</a>
              <a href="https://www.instagram.com/ziadahapp" target="_blank" rel="noreferrer" className="ftsi">ig</a>
              <a href="https://www.tiktok.com/@ziadahapp" target="_blank" rel="noreferrer" className="ftsi">tt</a>
              <a href="https://linkedin.com/company/ziadahapp" target="_blank" rel="noreferrer" className="ftsi">in</a>
            </div>
          </div>
          <div className="ft-col">
            <h4>{tr.footer.product}</h4>
            <a href="#hiw">{tr.footer.howItWorks}</a>
            <a href="#gp">{tr.footer.goalsDisplay}</a>
            <a href="#why">{tr.footer.whyZiadah}</a>
            <a href="#pricing">{tr.footer.pricing}</a>
          </div>
          <div className="ft-col">
            <h4>{tr.footer.platforms}</h4>
            <a href="https://apps.zid.sa/application/1826" target="_blank" rel="noreferrer" aria-label={tr.footer.zidPlatform}>
              <img src={zidLogoSrc} alt={tr.seo.platformLogoAltZid} style={{ height: 18, width: "auto", display: "block" }} />
            </a>
            <a href="https://apps.salla.sa/ar/app/1099604538" target="_blank" rel="noreferrer" aria-label={tr.footer.sallaPlatform}>
              <img src={sallaLogoSrc} alt={tr.seo.platformLogoAltSalla} style={{ height: 18, width: "auto", display: "block" }} />
            </a>
            <a href="https://web.ziadah.app/" target="_blank" rel="noreferrer">{tr.footer.dashboardZid}</a>
            <a href="https://dashboard.ziadah.app/" target="_blank" rel="noreferrer">{tr.footer.dashboardSalla}</a>
          </div>
          <div className="ft-col">
            <h4>{tr.footer.blog}</h4>
            <a href="/blog">{tr.footer.allArticles}</a>
            <a href="/blog?cat=Sales Strategies">{tr.footer.salesStrategies}</a>
            <a href="/blog?cat=Artificial Intelligence">{tr.footer.ai}</a>
            <a href="/blog?cat=Merchant Guide">{tr.footer.merchantGuide}</a>
            <a href="/blog?cat=Platform Tutorials">{tr.footer.platformGuides}</a>
          </div>
          <div className="ft-col">
            <h4>{tr.footer.contact}</h4>
            <a href="https://api.whatsapp.com/send/?phone=966510131856" target="_blank" rel="noreferrer">{tr.footer.whatsapp}</a>
            <a href="https://calendar.app.google/pjtPBzs9TUPipUEF6" target="_blank" rel="noreferrer">{tr.footer.bookMeeting}</a>
            <a href="#testimonials">{tr.footer.successStories}</a>
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
