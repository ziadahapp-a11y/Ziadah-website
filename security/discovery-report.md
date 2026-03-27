# Security Discovery Report

Date: 2026-03-27  
Scope: Full workspace discovery pass before hardening changes.

## 1) Frontend structure (React)

Primary frontend app: `artifacts/ziadah-landing`

- Entry/router shell: `artifacts/ziadah-landing/src/App.tsx`
- Routing library: `wouter`
- Data fetching/state:
  - `@tanstack/react-query`
  - custom fetch wrappers in `artifacts/ziadah-landing/src/cms/api.ts`
- Route groups:
  - Public pages under `src/pages` (landing, blog, features, support, sectors, use-cases, legal pages)
  - CMS pages under `src/cms/pages` (`/cms/login`, `/cms/dashboard`, `/cms/content`, `/cms/pages`, `/cms/media`, `/cms/users`, `/cms/audit`, `/cms/settings`)
- CMS frontend auth and guards:
  - `CmsAuthProvider` in `src/cms/CmsAuthContext.tsx`
  - `CmsProtected` wrappers in `src/App.tsx`

Notable route map source: `artifacts/ziadah-landing/src/App.tsx`.

## 2) Backend structure (Node/Express)

Primary backend app: `artifacts/api-server`

- Server entry: `artifacts/api-server/src/index.ts`
- Express app composition: `artifacts/api-server/src/app.ts`
  - `express.json()`
  - `express.urlencoded()`
  - static `/uploads`
  - `/api` router mounting
  - SPA static serving (if built)
- API route registry: `artifacts/api-server/src/routes/index.ts`
  - `GET /healthz`
  - `POST /feature-request`
  - `GET /content`, `GET /content/:key`
  - ` /cms/*` route group

CMS route modules:
- `src/routes/cms/auth.ts`
- `src/routes/cms/content-admin.ts`
- `src/routes/cms/pages.ts`
- `src/routes/cms/media.ts`
- `src/routes/cms/users.ts`
- `src/routes/cms/audit.ts`

Key middleware:
- `requireCmsAuth`, role guards (`requireSuperAdmin`, `requireEditor`, `requireViewer`) in `src/middleware/cms-auth.ts`
- `blockViewerWrites` in `src/middleware/cms-viewer-readonly.ts`

## 3) Database in use and connection

Database stack:
- PostgreSQL (`pg`)
- Drizzle ORM (`drizzle-orm`)
- DB package: `lib/db`

Connection:
- `lib/db/src/index.ts` creates `Pool` from `process.env.DATABASE_URL`
- Drizzle configured in `lib/db/drizzle.config.ts` with `DATABASE_URL`
- Schema includes CMS users/content/pages/media/audit tables in `lib/db/src/schema/cms.ts`

No Supabase/Firebase/SQLite usage detected in code paths reviewed.

## 4) Authentication method

CMS auth method:
- JWT bearer token auth (Authorization header)
- JWT signing/verification in `artifacts/api-server/src/lib/cms-jwt.ts`
- User credential verification via bcrypt hash compare in `src/routes/cms/auth.ts`
- Token validation and user loading middleware in `src/middleware/cms-auth.ts`

Frontend token storage:
- Token persisted in `localStorage` key `ziadah_cms_jwt` in `artifacts/ziadah-landing/src/cms/api.ts`
- Requests include `Authorization: Bearer <token>`

No server session store/cookie-based auth currently used for CMS.

## 5) Environment variables referenced in code

Backend/runtime:
- `PORT`
- `JWT_SECRET`
- `DATABASE_URL`
- `SMTP_USER`
- `SMTP_PASS`
- `CMS_ADMIN_EMAIL`
- `CMS_ADMIN_PASSWORD`
- `CMS_ADMIN_NAME`

Frontend/build/runtime:
- `VITE_API_BASE_URL`
- `BASE_PATH`
- `API_SERVER_PROXY_TARGET`
- `NODE_ENV`
- `REPL_ID`

Also referenced in Vite apps:
- `import.meta.env.DEV`
- `import.meta.env.BASE_URL`

## 6) Third-party services and APIs connected

- SMTP via Gmail using `nodemailer` service `"gmail"` (`src/routes/feature-request.ts`)
- PostgreSQL database
- Replit tooling/plugins (`@replit/vite-plugin-*`) for development/runtime UX

No Stripe/Supabase/Firebase/Auth0/etc detected in reviewed source.

## 7) File upload handling

Upload handling exists:
- `artifacts/api-server/src/routes/cms/media.ts`
- Uses `multer.diskStorage`
- Upload dir: `artifacts/api-server/uploads` (resolved by `src/lib/uploads.ts`)
- File name strategy: timestamp + random bytes + original extension
- Size limit: 10 MB
- Uploaded files served statically at `/uploads` from app middleware

Current validation characteristics:
- No MIME allow-list / deny-list enforcement
- Keeps original extension suffix
- Stores metadata in `cms_media` table

## 8) Existing security measures already in place

Implemented:
- Role-based access controls on CMS routes (`viewer`/`editor`/`super_admin`)
- JWT signature + expiry enforced by `jsonwebtoken`
- Password hashing with `bcrypt`
- Input validation with `zod` on many CMS write routes
- UUID validation on several route params
- Viewer write-block middleware
- DB operations mainly via Drizzle query builder (parameterized)
- Audit logging for CMS mutations

Missing or weak (to address in hardening phase):
- CORS is currently open (`app.use(cors())` with no restrictions)
- No Helmet HTTP security headers configured
- No rate limiting middleware
- CMS token stored in `localStorage` (XSS exposure risk)
- JWT secret minimum currently 16 chars (can be strengthened)
- JWT lifetime currently 30d (long for access token)
- File upload lacks MIME type allow-list validation
- Some routes (e.g. `feature-request`) accept raw input without robust validation/sanitization
- Hardcoded sensitive defaults detected in project runtime config files:
  - `.replit` `[env]` includes `JWT_SECRET`, `CMS_ADMIN_EMAIL`, `CMS_ADMIN_PASSWORD`
  - `scripts/replit-run.sh` exports default secret/admin credentials when env vars are absent

## 9) Discovery conclusion

Discovery pass is complete and this report was created before applying hardening edits.  
Next phase: implement security fixes incrementally (one file at a time), keep functionality intact, and validate app still runs after each change.
