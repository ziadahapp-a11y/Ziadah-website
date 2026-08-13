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
