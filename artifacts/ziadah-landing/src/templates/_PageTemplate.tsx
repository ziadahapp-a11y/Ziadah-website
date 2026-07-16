/**
 * _PageTemplate.tsx — نقطة بداية لأي صفحة جديدة
 *
 * كيفية الاستخدام:
 * 1. انسخ هذا الملف وأعد تسميته (مثال: MyPage.tsx)
 * 2. غيّر titleAr/titleEn/descriptionAr/descriptionEn بمحتوى الصفحة
 * 3. عدّل canonical ليطابق مسار الصفحة
 * 4. أضف مفاتيح الترجمة في translations.ts تحت كلا القسمين ar/en
 * 5. أضف الصفحة في App.tsx (أو router)
 */

import Nav from "../components/Nav";
import StandardPage from "../components/StandardPage";
import { useLanguage } from "../i18n/LanguageContext";
import { useTheme } from "../ThemeContext";

export default function MyPage() {
  const { lang, isAr } = useLanguage();
  const { theme } = useTheme();

  // TODO: أضف مفاتيح هذه الصفحة في translations.ts تحت t.ar.myPage و t.en.myPage
  // const tx = t[lang].myPage;

  return (
    <StandardPage
      titleAr="عنوان الصفحة بالعربي"
      titleEn="Page Title in English"
      descriptionAr="وصف الصفحة بالعربي لمحركات البحث — يظهر في نتائج جوجل."
      descriptionEn="Page description in English for search engines — shown in Google results."
      canonical="/my-page"
    >
      {/* الخلفية تُطبَّق تلقائياً عبر StandardPage (نفس الصفحة الرئيسية). */}

      {/* ── NAVIGATION ── */}
      <Nav />

      {/* ── HERO / محتوى رئيسي ── */}
      <section className="page-hero-viewport page-hero-viewport--center" style={{ position: "relative", zIndex: 2 }}>
        <div className="wrap">
          {/* TODO: أضف محتوى الصفحة هنا */}
          {/* استخدم CSS variables للألوان لضمان دعم الموود: var(--bg), var(--t), var(--tm), var(--s1) */}
          {/* theme === "dark" | "light" — يمكنك استخدامه للمنطق الشرطي */}
          <h1 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, color: "var(--t)" }}>
            {isAr ? "عنوان الصفحة" : "Page Title"}
          </h1>
          <p style={{ color: "var(--tm)", marginTop: 16 }}>
            {isAr ? "وصف الصفحة" : "Page description"}
          </p>
        </div>
      </section>
    </StandardPage>
  );
}
