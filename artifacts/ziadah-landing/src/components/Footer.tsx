import { navigateTo } from "@/components/PageTransition";
import { useLanguage } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";

export default function Footer() {
  const { lang } = useLanguage();
  const tr = t[lang];
  return (
    <footer>
      <div className="wrap">
        <div className="ft-top">
          <div className="ft-brand">
            <div className="ft-logo">
              <div className="ft-lm">
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L3 10h6l-2 6 8-10H9l2-6z" fill="#fff" />
                </svg>
              </div>
              <span className="ft-lt">Ziadah</span>
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
            <a href="https://apps.zid.sa/application/1826" target="_blank" rel="noreferrer">{tr.footer.zidPlatform}</a>
            <a href="https://apps.salla.sa/ar/app/1099604538" target="_blank" rel="noreferrer">{tr.footer.sallaPlatform}</a>
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
