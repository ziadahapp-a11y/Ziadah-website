# معايير البناء — زيادة Landing

هذا الملف يوثّق القواعد الثلاث الذهبية التي يجب تطبيقها على **كل صفحة وقسم جديد** في المشروع:
SEO ثنائي اللغة + الترجمة الصحيحة + دعم الموود (داكن/فاتح).

---

## القاعدة 1: SEO ثنائي اللغة

### الهدف
كل صفحة يجب أن تمتلك:
- عنوان ووصف بالعربي والإنجليزي
- `hreflang` tags صحيحة لـ `ar-SA` و `en`
- `canonical` URL محدد

### الأدوات المتاحة

| المكوّن | الوصف | متى تستخدمه |
|---------|-------|-------------|
| `StandardPage` | wrapper شامل — يحقن SEO + direction + theme تلقائياً | **دائماً** في أي صفحة جديدة |
| `BilingualSEO` | SEO component مستقل ثنائي اللغة | عند الحاجة لـ SEO بدون wrapper |
| `SEO` (القديم) | single-language SEO | للصفحات القديمة فقط |

### كيف تستخدم StandardPage

```tsx
import StandardPage from "../components/StandardPage";

export default function MyPage() {
  return (
    <StandardPage
      titleAr="عنوان الصفحة بالعربي"
      titleEn="Page Title in English"
      descriptionAr="وصف الصفحة بالعربي لمحركات البحث."
      descriptionEn="Page description in English for search engines."
      canonical="/my-page"
    >
      {/* محتوى الصفحة */}
    </StandardPage>
  );
}
```

### ماذا يحدث تلقائياً عند استخدام StandardPage
- يُحقن العنوان والوصف المناسب حسب اللغة النشطة
- تُضاف `hreflang` tags: `ar-SA` و `en` و `x-default`
- يُطبَّق `direction: rtl/ltr` على محتوى الصفحة
- يُطبَّق `var(--bg)` و `var(--t)` و `transition` الموود

### قواعد SEO
- `canonical` يبدأ دائماً بـ `/` (مثل `/blog`, `/pricing`)
- الوصف: 120-160 حرف باللغتين
- العنوان: لا تضع اسم الموقع (يُضاف تلقائياً كـ `| Ziadah`)
- **hreflang**: الموقع يخدم اللغتين على نفس URL (اللغة تُبدَّل client-side)، لذا `ar-SA` و `en` و `x-default` تشير جميعها لنفس URL الصفحة. لا يوجد `/en/...` routes

---

## القاعدة 2: الترجمة (عربي/إنجليزي)

### كيف تعمل الترجمة

ملف `src/i18n/translations.ts` يحتوي على كائن `t` بقسمين متوازيين:
```
t.ar.pageName.key  ← العربي
t.en.pageName.key  ← الإنجليزي
```

### كيف تضيف مفاتيح لصفحة جديدة

**الخطوة 1:** في `translations.ts`، أضف المفاتيح في قسم `ar`:
```ts
export const t = {
  ar: {
    // ...
    myPage: {
      seoTitle: "عنوان الصفحة للـ SEO",
      seoDesc: "وصف الصفحة للـ SEO",
      tag: "وسم القسم",
      title: "العنوان الرئيسي",
      subtitle: "الوصف",
    },
```

**الخطوة 2:** أضف نفس المفاتيح في قسم `en`:
```ts
  en: {
    // ...
    myPage: {
      seoTitle: "Page SEO Title",
      seoDesc: "Page SEO description",
      tag: "SECTION TAG",
      title: "Main Title",
      subtitle: "Description",
    },
```

**الخطوة 3:** في المكوّن:
```tsx
const { lang, isAr } = useLanguage();
const tx = t[lang].myPage;

// استخدام:
<h1>{tx.title}</h1>
<p dir={isAr ? "rtl" : "ltr"}>{tx.subtitle}</p>
```

### قواعد الترجمة
- **لا تكتب نصاً مباشراً في JSX** — كل نص يمر عبر `translations.ts`
- كل مفتاح في `ar` له مقابل بنفس الاسم في `en`
- استخدم `isAr` للتمييز المنطقي، و`dir` للاتجاه في الـ CSS

---

## القاعدة 3: الموود (داكن/فاتح)

### الهدف
أي لون أو خلفية في المكوّنات يجب أن يستخدم **CSS variables** المعرّفة في `index.css` — وليس ألواناً ثابتة hardcoded.

### متغيرات الألوان الأساسية

| المتغير | الداكن | الفاتح | الاستخدام |
|---------|--------|--------|-----------|
| `var(--bg)` | `#03030b` | `#f1f5f9` | خلفية الصفحة |
| `var(--t)` | `#fff` | `#0f0a23` | النص الأساسي |
| `var(--tm)` | `rgba(255,255,255,.55)` | `rgba(15,10,35,.6)` | النص الثانوي |
| `var(--td)` | `rgba(255,255,255,.28)` | `rgba(15,10,35,.38)` | النص الخافت |
| `var(--s1)` | `rgba(255,255,255,.04)` | `rgba(0,0,0,.04)` | خلفية كرت خفيفة |
| `var(--s2)` | `rgba(255,255,255,.07)` | `rgba(0,0,0,.06)` | خلفية كرت متوسطة |
| `var(--b1)` | `rgba(255,255,255,.07)` | `rgba(0,0,0,.08)` | حدود خفيفة |
| `var(--b2)` | `rgba(255,255,255,.13)` | `rgba(0,0,0,.14)` | حدود متوسطة |
| `var(--p)` | `#7c3aed` | `#7c3aed` | اللون الأساسي |
| `var(--p3)` | `#a855f7` | `#7c3aed` | اللون الأساسي المتوسط |
| `var(--p4)` | `#c084fc` | `#6d28d9` | اللون الأساسي الفاتح |

### كيف تكتب مكوّن يدعم الموود

```tsx
// صح ✓
<div style={{ background: "var(--bg)", color: "var(--t)" }}>
  <p style={{ color: "var(--tm)" }}>نص ثانوي</p>
  <div style={{ background: "var(--s1)", border: "1px solid var(--b1)" }}>كرت</div>
</div>

// خطأ ✗
<div style={{ background: "#03030b", color: "#ffffff" }}>
```

### انتقال الموود التلقائي
`StandardPage` يطبّق `transition: var(--theme-transition)` تلقائياً. لتطبيقه في عناصر CSS منفصلة:
```css
.my-element {
  transition: background .3s, color .3s, border-color .3s;
}
```

### كيف تحصل على حالة الموود في المكوّن
```tsx
import { useTheme } from "../ThemeContext";

const { theme } = useTheme();
// theme === "dark" | "light"
```

---

## إضافة صفحة جديدة — الخطوات الكاملة

1. **انسخ** `src/templates/_PageTemplate.tsx` وأعد تسميته
2. **أضف مفاتيح الترجمة** في `translations.ts` (قسمي `ar` و `en`)
3. **حدّث** `titleAr/titleEn/descriptionAr/descriptionEn/canonical` في `StandardPage`
4. **استخدم CSS variables** للألوان بدلاً من القيم الثابتة
5. **سجّل الصفحة** في `App.tsx` أو الـ router

## إضافة قسم جديد — الخطوات الكاملة

1. **انسخ** `src/templates/_SectionTemplate.tsx` وأعد تسميته
2. **أضف مفاتيح الترجمة** الخاصة بالقسم في `translations.ts`
3. **استخدم** `var(--bg)`, `var(--t)`, `var(--s1)`... للألوان
4. **أضف** `className="rv"` للعناصر التي تريد reveal animation عند التمرير
5. **استورد** القسم في الصفحة المناسبة

---

## مرجع: صفحة Blog.tsx

صفحة المدونة (`src/pages/Blog.tsx`) هي المرجع التطبيقي لهذه المعايير.
تحقق منها لترى كيف يعمل `StandardPage` مع الترجمة الثنائية وJSON-LD schemas.
