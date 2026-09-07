import { useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { useLanguage } from "@/i18n/LanguageContext";
import SEO from "@/components/SEO";
import PageShell from "@/components/PageShell";
import { HeroLede } from "@/sections";
import { Button } from "@/components/mk";
import { navigateTo } from "@/components/PageTransition";

type ErrorStatusProps = {
  code?: number;
};

function normalizeCode(rawCode: string | undefined, fallback: number) {
  const parsed = Number(rawCode);
  if (!Number.isInteger(parsed) || parsed < 400 || parsed > 599) return fallback;
  return parsed;
}

export default function ErrorStatus({ code = 500 }: ErrorStatusProps) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const [, setLocation] = useLocation();
  const [matchesErrorRoute, params] = useRoute("/error/:code");
  const statusCode = matchesErrorRoute ? normalizeCode(params?.code, code) : code;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLocation("/");
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [setLocation]);

  return (
    <PageShell>
      <SEO
        titleAr={`خطأ ${statusCode} — زيادة`}
        titleEn={`Error ${statusCode} — Ziadah`}
        descriptionAr={`حدث خطأ من نوع ${statusCode}. سيتم تحويلك للصفحة الرئيسية تلقائياً.`}
        descriptionEn={`An error ${statusCode} occurred. You will be redirected to the home page automatically.`}
        canonical="/"
        noIndex
        keywordsAr={`زيادة، خطأ ${statusCode}`}
        keywordsEn={`Ziadah, error ${statusCode}`}
      />
      {/* The status code is the eyebrow: it is what the page is about, and it
          reads as a label rather than competing with the sentence that
          explains it. */}
      <HeroLede
        family="grey"
        eyebrow={<span className="num-ltr">{statusCode}</span>}
        title={isAr ? "حدث خطأ" : "Error Occurred"}
        body={
          isAr
            ? "واجهنا مشكلة أثناء فتح هذه الصفحة. سيتم تحويلك إلى الصفحة الرئيسية."
            : "We hit a problem while opening this page. You will be redirected to the home page."
        }
        actions={
          <>
            {/* A real link, so it can be opened in a new tab and read as a
                destination, but navigated in-app so the transition runs. */}
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
            <Button variant="tertiary" size="lg" onClick={() => window.location.reload()}>
              {isAr ? "تحديث الصفحة" : "Refresh page"}
            </Button>
          </>
        }
      >
        <p className="hero-caption">
          {isAr
            ? "إذا استمرت المشكلة، حاول تحديث الصفحة أو تواصل مع الدعم."
            : "If the issue persists, try refreshing the page or contact support."}
        </p>
      </HeroLede>
    </PageShell>
  );
}
