# Ziadah

## Overview

The Ziadah marketing site: an Arabic-first, RTL, bilingual (`/ar` | `/en`)
React + Vite site, with a small Express 5 API beside it for the one form the
site posts to. Built as a pnpm monorepo.

Two products used to live here and no longer do. **Analyze** connected a
merchant's store, synced its catalogue and ran an OpenAI pass over it; its
routes, its scraper and its analyser are gone. An in-house **CMS** served the
site's copy from Postgres; the copy lives in the repository now, and the CMS
routes, its auth and its tables are gone with it. If you are looking for
either, that is why it is missing.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **TypeScript version**: 5.9
- **Frontend**: React 19 + Vite 7 + Tailwind CSS v4 (CSS-first `@theme`) + wouter
- **Motion**: Lenis smooth scroll + GSAP ScrollTrigger, through `src/motion`
- **API framework**: Express 5
- **Validation**: Zod
- **API codegen**: Orval, from `lib/api-spec/openapi.yaml`
- **Build**: esbuild (API), Vite (site)

## Artifacts

- `artifacts/ziadah-landing` — the site
- `artifacts/api-server` — Express 5 API at `/api`

## The site's design system

`src/sections` is the section vocabulary — `HeroSplit`, `HeroLede`, `Section`,
`SectionHead`, `CardsGrid`, `CtaSection`, `LegalPage` and the rest — and
`src/components/mk` is the control library under it. A section stamps its own
colour triple (`--color` / `--color-primary` / `--color-secondary`) and the
six surface-relative roles derived from it, so a band's ground and its ink
come from the section rather than from each block painting its own.

The root font size is viewport-proportional in three tiers, so `rem` is the
unit throughout: 10px fixed below 768, `1.19904vw` from 768 to 1024, and
`0.694444vw` from 1025 up, capping at 13.3333px at 1920.

Stylesheets in `src/styles/` are ports and are kept byte-comparable with their
source so a future sync stays a diff. Ziadah's own additions to the vocabulary
go in `src/styles/ziadah-sections.css` instead.

## The API

Two routes, because two are all the site calls:

- `GET /api/healthz`
- `POST /api/feature-request` — the feature-request form, sent by SMTP

## Key commands

- `pnpm run dev` — the site
- `pnpm run dev:stack` — the site and the API together
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate the API client
  and Zod schemas from the OpenAPI spec

## Environment variables

- `SMTP_USER`, `SMTP_PASS` — credentials for the feature-request email
- `CORS_ALLOWED_ORIGINS` — comma-separated browser origins allowed to call the API
- `API_SERVER_PROXY_TARGET` — where Vite forwards `/api/*` in dev
- `PORT` — the API server's port

`lib/db` and the `db:up` / `db:down` Docker Postgres scripts are left in place
but have no consumers: the tables they describe belonged to Analyze and to the
CMS. Their migrations still describe tables that may exist in a real database,
so dropping them is a data decision rather than a code one.
