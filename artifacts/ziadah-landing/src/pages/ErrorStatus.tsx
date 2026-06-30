import { useEffect, type CSSProperties } from "react";
import { useLocation, useRoute } from "wouter";
import { useLanguage } from "@/i18n/LanguageContext";
import SEO from "@/components/SEO";
import PageShell from "@/components/PageShell";
import { PrimaryButton, SecondaryButton } from "@/components/trackflow";

type ErrorStatusProps = {
  code?: number;
};

function normalizeCode(rawCode: string | undefined, fallback: number) {
  const parsed = Number(rawCode);
  if (!Number.isInteger(parsed) || parsed < 400 || parsed > 599) return fallback;
  return parsed;
}

const gridStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
  backgroundSize: "48px 48px",
};

export default function ErrorStatus({ code = 500 }: ErrorStatusProps) {
  const { lang, dir } = useLanguage();
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
    <PageShell
      className="relative overflow-x-clip bg-white"
      style={{ background: "#fff", color: "#09090b", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
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
      <div className="absolute inset-0 bg-grid-fade opacity-60 -z-10" style={gridStyle} />
      <div dir={dir} className="relative w-full max-w-lg mx-auto px-4 py-24 text-center">
        <div className="text-7xl sm:text-8xl font-extrabold tracking-tight text-zinc-950 num-ltr mb-4">{statusCode}</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-950 mb-4 leading-tight">
          {isAr ? "حدث خطأ" : "Error Occurred"}
        </h1>
        <p className="text-base text-zinc-600 leading-relaxed mb-2">
          {isAr
            ? "واجهنا مشكلة أثناء فتح هذه الصفحة. سيتم تحويلك إلى الصفحة الرئيسية."
            : "We hit a problem while opening this page. You will be redirected to the home page."}
        </p>
        <p className="text-sm text-zinc-500 leading-relaxed mb-8">
          {isAr
            ? "إذا استمرت المشكلة، حاول تحديث الصفحة أو تواصل مع الدعم."
            : "If the issue persists, try refreshing the page or contact support."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <PrimaryButton to="/" className="w-full sm:w-auto h-12 px-7 text-base">
            {isAr ? "الرجوع للرئيسية" : "Back to home"}
          </PrimaryButton>
          <SecondaryButton
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto h-12 px-7 text-base"
          >
            {isAr ? "تحديث الصفحة" : "Refresh page"}
          </SecondaryButton>
        </div>
      </div>
    </PageShell>
  );
}
