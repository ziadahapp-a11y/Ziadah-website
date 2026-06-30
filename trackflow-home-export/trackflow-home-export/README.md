# Trackflow — Main Page Export

This bundle contains the landing/home page (design + content) extracted from the
`trackflow` app, ready to drop into another **Vite + React + Tailwind v4** project.

## 1. Extract
Unzip into your project root. Files preserve the `src/` structure and assume the
path alias `@` → `src`.

## 2. Verify config
- **Vite alias** in `vite.config.ts`:
  ```ts
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "src") } }
  ```
- **Tailwind v4** via `@tailwindcss/vite`. The design lives in `src/index.css`
  (the `@theme inline {...}` block + `:root` color variables). If your project
  already has an `index.css`, MERGE these tokens in rather than overwriting blindly.

## 3. Install dependencies
```
pnpm add wouter framer-motion lucide-react react-icons tw-animate-css \
  class-variance-authority clsx tailwind-merge \
  @radix-ui/react-accordion @radix-ui/react-slider \
  @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-slot
```
(`@tailwindcss/typography` is also imported in index.css — add it if you keep that line.)

## 4. Wire it up
The page needs two context providers and uses `wouter` for the <Link> components:
```tsx
import { LanguageProvider } from "@/lib/i18n";
import { WaitlistProvider } from "@/components/waitlist";
import Home from "@/pages/home";

<LanguageProvider>
  <WaitlistProvider>
    {/* Navbar / Footer are optional — see src/components/layout */}
    <Home />
  </WaitlistProvider>
</LanguageProvider>
```

## Files included
- `src/pages/home.tsx` — the page
- `src/index.css` — theme tokens / fonts / dark mode (the actual design)
- `src/lib/` — i18n.tsx, pricing-data.ts, features-data.tsx, utils.ts (content + cn helper)
- `src/components/` — waitlist, brand-logos, layout/{Navbar,Footer,AnnouncementBar}
- `src/components/ui/` — button, slider, accordion, dialog, input, select

## Notes
- No backend/API calls — the page is fully presentational.
- The waitlist modal is UI-only (collects fields, no submit endpoint). Wire it to
  your own API if you want it functional.
- Content is bilingual (EN/AR) via `src/lib/i18n.tsx` — edit strings there.
