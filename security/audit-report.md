# Security Audit Report

Date: 2026-03-27  
Scope: Replit-hosted React + Node/Express workspace  
Discovery baseline: `security/discovery-report.md`

## Executive summary

- Completed a full discovery pass, then implemented backend and auth hardening changes.
- Preserved UI/visible content; no intentional UI changes were made.
- Backend builds and typechecks successfully after hardening edits.
- Frontend production build succeeds when required env vars are provided (`PORT`, `BASE_PATH`).
- One high dependency finding remains in a dev/codegen toolchain path and could not be auto-fixed safely without broader tooling migration.

## Vulnerabilities found

## Critical

- None found.

## High

1. **Open CORS policy (allow-all) on backend**
   - **Location:** `artifacts/api-server/src/app.ts`
   - **Risk:** Cross-origin abuse and unauthorized cross-site API access.
   - **Fix:** Replaced `app.use(cors())` with strict configured origins and credential policy.

2. **Hardcoded secrets and admin credentials in runtime config**
   - **Location:** `.replit`, `scripts/replit-run.sh`
   - **Risk:** Secret leakage and credential reuse compromise.
   - **Fix:** Removed hardcoded secret values from `.replit`; removed fallback credential defaults in startup script and made required env checks fail fast.

3. **Auth token in `localStorage`**
   - **Location:** `artifacts/ziadah-landing/src/cms/api.ts`, `artifacts/ziadah-landing/src/cms/CmsAuthContext.tsx`
   - **Risk:** XSS token exfiltration.
   - **Fix:** Migrated CMS auth to httpOnly cookie session flow (`credentials: "include"`), removed localStorage token storage usage.

4. **Unresolved high in dependency graph (dev tooling)**
   - **Location:** `lib/api-spec > orval > @orval/core > globby > fast-glob > micromatch > picomatch`
   - **Issue:** `picomatch <2.3.2` advisory remains transitively.
   - **Status:** Not auto-fixable via `pnpm audit fix`/package upgrades available in this workspace; requires upstream/tooling path adjustment.

## Medium

1. **Missing standard HTTP hardening headers**
   - **Location:** backend app bootstrap
   - **Fix:** Added `helmet` with CSP/HSTS/referrer policy configuration.

2. **No rate limiting**
   - **Location:** backend app bootstrap
   - **Fix:** Added global limiter and stricter limiter on `/api/cms/auth`.

3. **Insufficient input validation on feature request endpoint**
   - **Location:** `artifacts/api-server/src/routes/feature-request.ts`
   - **Fix:** Added `express-validator` checks + sanitized handling and reduced sensitive error logging.

4. **Upload file-type validation missing**
   - **Location:** `artifacts/api-server/src/routes/cms/media.ts`
   - **Fix:** Added MIME allow-list and retained max file size constraints.

5. **JWT policy too weak for admin CMS**
   - **Location:** `artifacts/api-server/src/lib/cms-jwt.ts`
   - **Fix:** Strengthened secret length requirement to 32+, introduced access token (15m) and refresh token (7d).

## Low

1. **Potential sensitive logging exposure**
   - **Location:** feature request failure paths
   - **Fix:** Sanitized logging messages to avoid dumping request-linked sensitive content.

2. **Nodemailer vulnerable subversion**
   - **Location:** `artifacts/api-server`
   - **Fix:** Upgraded `nodemailer` to latest available in workspace constraints.

## Changes applied

1. **Backend security middleware**
   - Updated `artifacts/api-server/src/app.ts`
   - Added: `helmet`, strict CORS, `cookie-parser`, rate limiting, request sanitization middleware integration.

2. **JWT/auth hardening**
   - Updated `artifacts/api-server/src/lib/cms-jwt.ts`
   - Updated `artifacts/api-server/src/routes/cms/auth.ts`
   - Updated `artifacts/api-server/src/middleware/cms-auth.ts`
   - Implemented cookie-based auth (`ziadah_cms_access`, `ziadah_cms_refresh`) and refresh endpoint.

3. **Input validation/sanitization**
   - Added `artifacts/api-server/src/middleware/sanitize-input.ts`
   - Updated `artifacts/api-server/src/routes/feature-request.ts` with `express-validator`.

4. **Upload hardening**
   - Updated `artifacts/api-server/src/routes/cms/media.ts` with MIME allow-list.

5. **Secret management and env hygiene**
   - Updated `.replit` (removed hardcoded secrets)
   - Updated `scripts/replit-run.sh` (no secret fallbacks)
   - Updated `.gitignore` (`.env` ignored; `.env.example` allowed)
   - Added `.env.example` with required placeholders

6. **Frontend auth transport hardening**
   - Updated `artifacts/ziadah-landing/src/cms/api.ts`
   - Updated `artifacts/ziadah-landing/src/cms/CmsAuthContext.tsx`
   - Switched CMS auth requests to cookie credentials flow and removed local token persistence.

7. **Dependency updates**
   - Added backend security deps: `helmet`, `express-rate-limit`, `express-validator`
   - Upgraded `nodemailer`
   - Upgraded `orval` (residual transitive advisory remains)
   - Removed direct `fast-glob` usage from mockup plugin source and dependency

## What could not be fixed automatically

1. **Residual high advisory in `lib/api-spec` codegen toolchain**
   - `pnpm audit fix` did not resolve.
   - Current available `orval` update in this workspace still pulls vulnerable transitive `picomatch` path.
   - **Manual action needed:** move codegen away from affected chain (or pin alternate toolchain versions once upstream patch is available).

2. **Replit workspace privacy setting**
   - Cannot be enforced from code.
   - **Manual action needed:** verify app/project privacy in Replit UI settings.

## Environment variables required in Replit Secrets

- `PORT`
- `NODE_ENV`
- `BASE_PATH`
- `DATABASE_URL`
- `JWT_SECRET` (min 32 chars)
- `JWT_REFRESH_SECRET` (min 32 chars; distinct from access secret recommended)
- `CMS_ADMIN_EMAIL`
- `CMS_ADMIN_PASSWORD`
- `CMS_ADMIN_NAME`
- `SMTP_USER`
- `SMTP_PASS`
- `VITE_API_BASE_URL`
- `API_SERVER_PROXY_TARGET`
- `CORS_ALLOWED_ORIGINS`

Reference template: `.env.example`

## Verification performed

- `pnpm --filter @workspace/api-server run typecheck` ✅
- `pnpm --filter @workspace/api-server run build` ✅
- `PORT=4173 BASE_PATH=/ pnpm --filter @workspace/ziadah-landing run build` ✅
- `pnpm audit` ❗ (no critical; one high remains in dev/codegen path)

## Additional recommendations

1. Add CSRF protection for cookie-authenticated CMS write endpoints.
2. Consider storing uploaded files in object storage (signed URLs) instead of serving from local disk.
3. Add explicit file extension/MIME cross-check and virus scanning for uploads.
4. Add structured security logging with PII redaction policy.
5. Add CI policy to fail on critical/high production dependency advisories and track dev-tool exceptions explicitly.
