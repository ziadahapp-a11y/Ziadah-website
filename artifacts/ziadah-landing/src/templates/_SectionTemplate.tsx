/**
 * _SectionTemplate.tsx — نقطة بداية لأي قسم (section) جديد
 *
 * كيفية الاستخدام:
 * 1. انسخ هذا الملف وأعد تسميته (مثال: MySection.tsx)
 * 2. أضف مفاتيح الترجمة في translations.ts
 * 3. استخدم CSS variables الموجودة (var(--bg), var(--t), var(--tm)...) لدعم الموود تلقائياً
 * 4. استخدم className="rv" على العناصر التي تريد أن تظهر بتأثير reveal عند التمرير
 */

import { useLanguage } from "../i18n/LanguageContext";
import { useTheme } from "../ThemeContext";

interface MySectionProps {
  // TODO: أضف الخصائص التي يحتاجها القسم
}

export default function MySection(_props: MySectionProps) {
  const { lang, isAr } = useLanguage();
  const { theme } = useTheme();

  // TODO: أضف مفاتيح هذا القسم في translations.ts تحت t.ar.mySection و t.en.mySection
  // const tx = t[lang].mySection;

  return (
    <section
      id="my-section"
      style={{
        padding: "110px 5%",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div className="wrap tc">
        {/* ── TAG ── */}
        <div className="stag rv">
          <span className="stag-dot" />
          {/* tx.tag — مفتاح الترجمة */}
          {isAr ? "وسم القسم" : "SECTION TAG"}
        </div>

        {/* ── TITLE ── */}
        <h2 className="st rv d1">
          {/* tx.title */}
          {isAr ? "عنوان القسم" : "Section Title"}
        </h2>

        {/* ── SUBTITLE ── */}
        <p className="ssub rv d2">
          {/* tx.subtitle */}
          {isAr ? "وصف القسم" : "Section description"}
        </p>

        {/* ── CONTENT ── */}
        {/*
          استخدم CSS variables للألوان دائماً لضمان دعم الموود:
          - var(--bg)  : خلفية الصفحة
          - var(--t)   : النص الأساسي
          - var(--tm)  : النص الثانوي
          - var(--td)  : النص الخافت
          - var(--s1)  : خلفية كرت خفيفة
          - var(--b1)  : حدود خفيفة
          - var(--p)   : اللون الأساسي
          theme === "dark" | "light" — للمنطق الشرطي عند الحاجة
        */}
        <div
          className="rv d3"
          style={{
            marginTop: 48,
            padding: 32,
            background: "var(--s1)",
            border: "1px solid var(--b1)",
            borderRadius: "var(--r)",
            color: "var(--t)",
            transition: "var(--theme-transition)",
          }}
        >
          <p style={{ color: "var(--tm)" }}>
            {isAr ? "المحتوى هنا" : "Content here"}
          </p>
        </div>
      </div>
    </section>
  );
}
