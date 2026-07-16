# Static prerendering

`scripts/prerender.mjs` runs automatically as the last step of `pnpm build`. It
serves the freshly built `dist/public`, opens every route from the generated
`sitemap.xml` in headless Chromium, waits for React to mount, and writes the
rendered HTML back to `dist/public/<route>/index.html`. Crawlers, social
unfurlers, and no-JS clients then get real body content + JSON-LD instead of an
empty `<div id="root">`.

The step is **resilient**: if Puppeteer or Chromium is unavailable it logs a
warning and exits 0, so the build never fails because of prerendering.

## Enable it on a build host

```bash
# 1. Puppeteer is already a devDependency. pnpm skips its install script by
#    default, so approve it (or run the browser install directly):
pnpm approve-builds            # choose puppeteer
# 2. Download the browser:
npx puppeteer browsers install chrome
# 3. Ensure Chromium's system libraries are present (Debian/Ubuntu):
npx puppeteer browsers install chrome --install-deps
#    or: apt-get install -y libglib2.0-0 libnss3 libatk1.0-0 libatk-bridge2.0-0 \
#        libcups2 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxrandr2 \
#        libgbm1 libpango-1.0-0 libasound2
```

Replit, Vercel, Netlify, and most CI images can install these. The sandbox used
during development could not (missing `libglib-2.0.so.0`), so the output there
was not verified — verify on your build host.

## Verify

```bash
pnpm build
curl -s file://"$PWD"/dist/public/index.html | grep "ارفع متوسط قيمة الطلب"   # hero <h1> should appear
```

## Env knobs

- `PRERENDER=0` — skip entirely
- `PRERENDER_CONCURRENCY` — parallel tabs (default 4)
- `PRERENDER_LIMIT` — only prerender the first N routes (quick checks)
