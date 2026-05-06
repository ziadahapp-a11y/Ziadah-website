import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import SEO from "@/components/SEO";
import PageShell from "@/components/PageShell";
import { useLocation } from "wouter";
import { useEffect } from "react";

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
    <PageShell style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
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
      <Card className="w-full max-w-md mx-4 border-[var(--b1)] bg-[var(--s1)] shadow-lg">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-[var(--t)]">
              {isAr ? "الصفحة غير موجودة (404)" : "Page Not Found (404)"}
            </h1>
          </div>

          <p className="mt-4 text-sm text-[var(--tm)]">
            {isAr
              ? "الصفحة غير موجودة في تطبيق زيادة. تحقق من الرابط أو ارجع للصفحة الرئيسية."
              : "This page is not part of the Ziadah site. Check the URL or go back home."}
          </p>
          <p className="mt-2 text-xs text-[var(--td)]">
            {isAr
              ? "سيتم تحويلك تلقائياً إلى الصفحة الرئيسية..."
              : "You will be redirected to the home page automatically..."}
          </p>
        </CardContent>
      </Card>
    </PageShell>
  );
}
