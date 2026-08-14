# Deploy behavior — ziadah.app

The live site (ziadah.app / www.ziadah.app) is served by the
**ziadah-website-api-server** Vercel project (root `artifacts/api-server`),
whose `build.mjs` also builds and serves `../ziadah-landing` same-origin.

## Known issue
A dashboard "Ignored Build Step" can cancel production deploys when only
`artifacts/ziadah-landing` changes, so landing-only updates never reach
production. Workaround: touch a file under `artifacts/api-server/` in the
same push (this note) to force a rebuild.

<!-- deploy trigger: unify navbar login label to "تسجيل الدخول" -->

<!-- deploy trigger: unify blog spelling to "المدوّنة" -->

<!-- deploy trigger: fix SupportArticle CATEGORY_ICON emoji keys -->

<!-- deploy trigger: unify navbar Help menu to canonical 6 items (Support center, Blog, FAQ, WhatsApp, Email, Book a call) on desktop + mobile; EN calculator label ROI->Calculator -->

<!-- deploy trigger: mobile navbar -> top hamburger (parity with Raasid/Shaa); remove bottom-nav bar; top bar logo+lang+menu; accordion panel -->
