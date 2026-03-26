import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import SEO from "@/components/SEO";

export default function NotFound() {
  const { lang, dir } = useLanguage();
  const isAr = lang === "ar";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50" style={{ direction: dir }}>
      <SEO
        titleAr="الصفحة غير موجودة — زيادة"
        titleEn="Page Not Found — Ziadah"
        descriptionAr="عذراً، الرابط غير صحيح أو الصفحة نُقلت. ارجع للصفحة الرئيسية لمواصلة استكشاف منصة زيادة للتجارة الذكية."
        descriptionEn="This URL may be wrong or the page moved. Return home to continue exploring Ziadah’s AI ecommerce platform."
        canonical="/"
        noIndex
        keywordsAr="زيادة، 404، صفحة غير موجودة"
        keywordsEn="Ziadah, 404, page not found"
      />
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">
              {isAr ? "الصفحة غير موجودة (404)" : "Page Not Found (404)"}
            </h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            {isAr
              ? "الصفحة غير موجودة في منصة زيادة. تحقق من الرابط أو ارجع للصفحة الرئيسية."
              : "This page is not part of the Ziadah site. Check the URL or go back home."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
