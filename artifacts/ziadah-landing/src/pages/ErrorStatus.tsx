import { useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/i18n/LanguageContext";
import SEO from "@/components/SEO";
import PageShell from "@/components/PageShell";

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
    <PageShell style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
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
      <Card className="w-full max-w-md mx-4 border-[var(--b1)] bg-[var(--s1)] shadow-lg">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertTriangle className="h-8 w-8 text-amber-500" />
            <h1 className="text-2xl font-bold text-[var(--t)]">
              {isAr ? `حدث خطأ (${statusCode})` : `Error Occurred (${statusCode})`}
            </h1>
          </div>

          <p className="mt-4 text-sm text-[var(--tm)]">
            {isAr
              ? "واجهنا مشكلة أثناء فتح هذه الصفحة. سيتم تحويلك إلى الصفحة الرئيسية."
              : "We hit a problem while opening this page. You will be redirected to the home page."}
          </p>
          <p className="mt-2 text-xs text-[var(--td)]">
            {isAr
              ? "إذا استمرت المشكلة، حاول تحديث الصفحة أو تواصل مع الدعم."
              : "If the issue persists, try refreshing the page or contact support."}
          </p>
        </CardContent>
      </Card>
    </PageShell>
  );
}
