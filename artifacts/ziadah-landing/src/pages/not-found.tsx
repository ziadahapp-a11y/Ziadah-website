import { useLanguage } from "@/i18n/LanguageContext";
import SEO from "@/components/SEO";
import PageShell from "@/components/PageShell";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { HeroLede } from "@/sections";
import { Button } from "@/components/mk";
import { navigateTo } from "@/components/PageTransition";

export default function NotFound() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const [, setLocation] = useLocation();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLocation("/");
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [setLocation]);

  return (
    <PageShell>
      <SEO
        titleAr="الصفحة غير موجودة — زيادة"
        titleEn="Page Not Found — Ziadah"
        descriptionAr="عذراً، الرابط غير صحيح أو الصفحة نُقلت. ارجع للصفحة الرئيسية لمواصلة استكشاف تطبيق زيادة للتجارة الذكية."
        descriptionEn="This URL may be wrong or the page moved. Return home to continue exploring Ziadah’s AI ecommerce app."
        canonical="/"
        noIndex
        keywordsAr="زيادة، 404، صفحة غير موجودة"
        keywordsEn="Ziadah, 404, page not found"
      />
      {/* The same shape as the error page, because it is the same situation:
          the code is the eyebrow, the sentence is the heading, and the way out
          is the action. */}
      <HeroLede
        family="grey"
        eyebrow={<span className="num-ltr">404</span>}
        title={isAr ? "الصفحة غير موجودة" : "Page Not Found"}
        body={
          isAr
            ? "الصفحة غير موجودة في تطبيق زيادة. تحقق من الرابط أو ارجع للصفحة الرئيسية."
            : "This page is not part of the Ziadah site. Check the URL or go back home."
        }
        actions={
          <Button
            as="a"
            href="/"
            size="lg"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              navigateTo("/");
            }}
          >
            {isAr ? "الرجوع للرئيسية" : "Back to home"}
          </Button>
        }
      >
        <p className="hero-caption">
          {isAr
            ? "سيتم تحويلك تلقائياً إلى الصفحة الرئيسية..."
            : "You will be redirected to the home page automatically..."}
        </p>
      </HeroLede>
    </PageShell>
  );
}
