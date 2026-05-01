# Ziadah Product Intelligence Engine

## Overview

A full-stack SaaS application for Ziadah that lets store owners connect their e-commerce stores and get AI-powered product recommendations (main product, cross-sells, and upsells). Built as a pnpm monorepo with a React+Vite frontend, Express 5 backend, PostgreSQL + Drizzle ORM, and OpenAI GPT-5.2 for analysis.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite + TailwindCSS v4 + shadcn/ui
- **AI**: OpenAI GPT-5.2 via Replit AI Integrations
- **Routing**: Wouter (frontend)

## Features

- **Store Management**: Add, edit, delete e-commerce stores by URL
- **Product Sync**: Fetches products from Shopify stores via `/products.json` API (generic fallback too)
- **AI Analysis**: GPT-5.2 analyzes the product catalog to identify:
  - Main (hero) product — the flagship/bestseller
  - Cross-sell products — complementary items to buy together
  - Upsell products — premium alternatives
- **Dashboard**: View all stores with status, product counts, and quick actions
- **Store Detail**: Tabs for Overview, Products (grid with role badges), and AI Analysis
- **Mobile UX**: Landing and engine pages use native page scrolling, mobile-safe single-column grids, and responsive form/report spacing.

## Artifacts

- `artifacts/ziadah-engine` — React+Vite frontend at `/engine/`
- `artifacts/api-server` — Express 5 API server at `/api`
- `artifacts/ziadah-landing` — React+Vite Arabic RTL dark-theme marketing site at `/`
- `artifacts/ziadah-landing/src/components/WidgetTabs.tsx` — reusable tabbed widget wrapper (pill tabs, purple gradient active state, fade animation). Used in 8 use-case pages.

## Landing Site UI/UX Refactor Notes (ziadah-landing)

- **RTL-first**: All layout uses logical CSS properties (`paddingInlineStart/End`, `insetInline*`). `direction: ltr` only appears where intentional (Calculator slider, email input field).
- **WidgetTabs component**: Converts multi-widget sections into pill-tab UI. 1 tab = no UI, renders directly. Props: `isAr`, `tabs[]`, `fullWidthContent`.
- **Pages converted to WidgetTabs**: CartPage (3 tabs), CheckoutPage (2 tabs), Addons, BundleDeals, BuyMoreSaveMore, BuyTogether, CrossSell, RelatedProducts.
- **Audit fixes applied**:
  - `CheckoutPage.tsx`: 2×280px PhoneMockup `flexWrap:nowrap` overflow → converted to WidgetTabs 2 tabs
  - `ReduceAbandon.tsx`: hardcoded `→` in cause→solution grid → `isAr ? "←" : "→"`
  - `IncreaseConversion.tsx`: `gridTemplateColumns: "repeat(3,1fr)"` too narrow on mobile → `repeat(auto-fit,minmax(160px,1fr))`
  - `Upsell.tsx`: `gridTemplateColumns: "1fr 1fr"` too narrow on mobile → `repeat(auto-fit,minmax(220px,1fr))`

## Database Schema

- `stores` — registered stores with URL, platform, status, sync/analysis timestamps, and report share tokens
- `products` — synced products with role (main/cross_sell/upsell)
- `analyses` — AI analysis results with main product ID, cross-sell/upsell IDs and reasons

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Supported Platforms

- **Shopify** — via `/products.json` endpoint (no auth required for public stores)
- **Generic** — tries common API patterns

## Environment Variables

- `DATABASE_URL` — PostgreSQL connection string (auto-provisioned)
- `AI_INTEGRATIONS_OPENAI_BASE_URL` — Replit AI Integrations proxy URL
- `AI_INTEGRATIONS_OPENAI_API_KEY` — Replit AI Integrations key
- `SESSION_SECRET` — Express session secret
