import { useLanguage } from "@/i18n/LanguageContext";
import SEO from "@/components/SEO";
import PageShell from "@/components/PageShell";
import { useLocation } from "wouter";
import { useEffect, type CSSProperties } from "react";
import { PrimaryButton } from "@/components/trackflow";

const gridStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
  backgroundSize: "48px 48px",
};

export default function NotFound() {
  const { lang, dir } = useLanguage();
  const isAr = lang === "ar";
  const [, setLocation] = useLocation();

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
        titleAr="الصفحة غير موجودة — زيادة"
        titleEn="Page Not Found — Ziadah"
        descriptionAr="عذراً، الرابط غير صحيح أو الصفحة نُقلت. ارجع للصفحة الرئيسية لمواصلة استكشاف تطبيق زيادة للتجارة الذكية."
        descriptionEn="This URL may be wrong or the page moved. Return home to continue exploring Ziadah’s AI ecommerce app."
        canonical="/"
        noIndex
        keywordsAr="زيادة، 404، صفحة غير موجودة"
        keywordsEn="Ziadah, 404, page not found"
      />
      <div className="absolute inset-0 bg-grid-fade opacity-60 -z-10" style={gridStyle} />
      <div dir={dir} className="relative w-full max-w-lg mx-auto px-4 py-24 text-center">
        <div className="text-7xl sm:text-8xl font-extrabold tracking-tight text-zinc-950 num-ltr mb-4">404</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-950 mb-4 leading-tight">
          {isAr ? "الصفحة غير موجودة" : "Page Not Found"}
        </h1>
        <p className="text-base text-zinc-600 leading-relaxed mb-2">
          {isAr
            ? "الصفحة غير موجودة في تطبيق زيادة. تحقق من الرابط أو ارجع للصفحة الرئيسية."
            : "This page is not part of the Ziadah site. Check the URL or go back home."}
        </p>
        <p className="text-sm text-zinc-500 leading-relaxed mb-8">
          {isAr
            ? "سيتم تحويلك تلقائياً إلى الصفحة الرئيسية..."
            : "You will be redirected to the home page automatically..."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <PrimaryButton to="/" className="w-full sm:w-auto h-12 px-7 text-base">
            {isAr ? "الرجوع للرئيسية" : "Back to home"}
          </PrimaryButton>
        </div>
      </div>
    </PageShell>
  );
}
