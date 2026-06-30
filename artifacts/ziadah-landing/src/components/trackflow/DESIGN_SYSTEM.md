# TrackFlow Design System — the single design system

This is **the one and only** design system for the app. The home page
`src/pages/HomeTrackflow.tsx` is the reference; every public page must match its look.
Build on the shared primitives in `src/components/trackflow/index.tsx`.
Do **not** invent new section/card/button styles — reuse the primitives.

> The older "Vision UI / glass" CSS (`styles/dashboard-glass-system.css`,
> `vision-*.css`, and the legacy `.gc`/`.btn-p`/`landing-*` blocks in `index.css`)
> is a **legacy bridge only**. Its tokens have been re-pointed to the emerald brand
> color and must never reintroduce a second palette. New work uses the primitives
> above, not those classes.

## Theme
- Light SaaS theme, emerald accents. Page background stays white/`zinc-50`.
- Text: headings `text-zinc-950`, body `text-zinc-600`/`text-zinc-700`, muted `text-zinc-500`/`text-zinc-400`.
- **Canonical brand green = green-600 `#16a34a` (`--accent: 142 71% 36%`, glass `--brand: #16a34a`).**
  These three must always agree — there is exactly one brand color.
- Accent green: `text-green-600`, `bg-green-600`, `text-emerald-*` for highlights. **Never purple/violet.**
- Fonts: `saudi_riyal` (riyal glyph) → `IBM Plex Sans Arabic` → `Inter`. (Tajawal/Rubik are legacy fallbacks only.)
- Font weights: headings `font-bold`/`font-extrabold`, eyebrows/labels `font-bold` + `tracking-widest uppercase`.
- Numbers/prices/latin-in-RTL wrapped in `num-ltr` (e.g. `<span className="num-ltr">35%</span>`).

## Section rhythm
- Every band is a `<Section>` → `py-24 px-4`. Alternate `band="white"` and `band="muted"`
  (muted = `bg-zinc-50/60 border-y border-zinc-200`) down the page. `band="dark"` (`bg-black`) sparingly.
- Inner container default `max-w-6xl`; use `max-w-3xl` for prose/FAQ, `max-w-7xl` for hero, `max-w-4xl` for CTA.
- Give scroll-target sections an `id` (auto-adds `scroll-mt-20`).

## Primitives (import from `@/components/trackflow`)
- `useT()` → `{ t, lang, isAr, dir, ArrowCTA }`. Use `t({ ar: "…", en: "…" })` for bilingual strings,
  exactly like HomeTrackflow. ArrowCTA flips direction (ArrowLeft in AR, ArrowRight in EN).
- `<Section band id containerClassName>` — page band wrapper.
- `<SectionHeading eyebrow title subtitle align>` — centered green eyebrow + bold h2 + muted subtitle.
- `<Eyebrow>` / `<Pill icon>` — green uppercase label / green rounded chip.
- `<Card>` — `rounded-2xl border border-zinc-200 bg-white p-7 hover:shadow-card` with scroll-in motion.
- `<FeatureCard num icon title desc example>` — numbered/icon pillar card (icon sits in a `bg-zinc-950` tile).
- `<StatCard value label>` — big-number stat.
- `<PrimaryButton href|to|onClick>` — near-black CTA (`bg-zinc-950 text-white`). `href`=external new tab, `to`=internal.
- `<SecondaryButton>` — outline CTA.
- `<CtaSection title subtitle trust={[...]}>` … buttons … `</CtaSection>` — dark mockup-card closing CTA.
- `<Hero containerClassName>` — top hero with faint grid background.

## Icons
- Use `lucide-react` icons (import named), NOT emoji. Map existing emoji to the closest lucide icon
  (🛒→ShoppingCart, 📦→Package, 💰→banknote/TrendingUp, 🏷️→Tag, 🎁→Gift, 📊→BarChart3, ⬆️→TrendingUp, 🔗→Combine/Link, etc.).
- Icons inside dark tiles: `w-5 h-5 text-white`. Inline accent icons: `text-green-600`/`text-emerald-500`.

## Buttons (raw, if not using the primitives)
- Primary: `bg-zinc-950 hover:bg-zinc-800 text-white font-semibold`.
- Outline: `variant="outline"` + `border-zinc-300 text-zinc-950 hover:bg-zinc-100 font-semibold`.
- On dark backgrounds, invert: `bg-white text-zinc-950 hover:bg-zinc-100`.
- Heights for hero CTAs: `h-12 px-7`/`px-8 text-base`.

## Cards & panels
- Standard card: `rounded-2xl border border-zinc-200 bg-white p-7 hover:border-zinc-300 hover:shadow-card transition-all`.
- Dark panel / highlighted plan / preview mock: `rounded-3xl mockup-card overflow-hidden shadow-card-lg`
  often with `bg-grid-dark opacity-40` overlay + a green blur glow. Text on it is `text-white`/`text-zinc-300/400`.
- Small inset note: `rounded-lg bg-zinc-50 border border-zinc-200 p-3.5`.
- Pricing popular card uses `mockup-card shadow-card-lg` (dark) with white text; others white border cards.

## Motion (framer-motion)
- Section reveal: `initial={{opacity:0, y:14}} whileInView={{opacity:1, y:0}} viewport={{once:true}}`.
- Hero entrance uses `animate` (not whileInView) with small `delay` steps (0.05→0.25).

## Conversion rules
1. PRESERVE all existing copy/content, data arrays, links, CMS hooks (`useSiteT`), SEO/JsonLd, modals,
   IntersectionObserver logic, and route behavior. Only restructure presentation into the trackflow look.
2. Keep `SEO`, schema components, and `PageShell` usage if present (PageShell is fine — it just sets bg/dir).
   You may keep `<PageShell>` as the outer wrapper and place `<Section>`s inside it.
3. Replace ad-hoc section markup, emoji icons, old `.rv` reveal classes, and old card/button CSS with the primitives.
4. Bilingual: if the page already uses `useSiteT()`/`t.ar/t.en`, keep that source of copy — just render it through
   the new components. If copy is hardcoded bilingual, use `useT()`'s `t({ar,en})`.
5. RTL: rely on logical classes (`ms-`/`me-`/`ps-`/`pe-`/`text-start`/`text-end`) and `dir` from `useT()`.
6. Don't touch `src/cms/` (keeps its own violet admin theme).
7. End content pages with a `<CtaSection>` matching the home page's final CTA when appropriate.
