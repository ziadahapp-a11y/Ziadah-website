# SHA-12 — SEO baseline

Read GOVERNANCE.md, PROJECT_STATE.md, CONTEXT_PACK.md, and TASK_INDEX.md first.

## REPO AND BRANCH
Repo: `shaaa-website` (`ziadahapp-a11y/shaa-website-replit`)
Branch: work branch from `web`. **Never push to `web`.** Preview only.
Directory: `artifacts/ziadah-landing`

## DEPENDS ON
`SHA-01` and `SHA-04` `VERIFIED`. SHA-01 established which URLs resolve; SHA-04
removed the dead pages that would otherwise pollute the audit.

## WHY THIS TASK EXISTS

SHA-01 fixed the sitemap's false declarations. It did not fix its omissions.

The sitemap lists 8 blog posts. The site has 26. **Eighteen real articles are
invisible to search engines** — content that already exists, already costs nothing to
publish, and currently earns nothing. Twenty-eight support articles are in the same
position.

This is larger than the 23 broken URLs SHA-01 removed. Those declared things that did
not exist; these hide things that do.

## SCOPE

1. **Sitemap completeness.** Regenerate from the actual content sources — the blog
   data file and the support data file — rather than from a hand-maintained list.
   Every resolving URL gets an entry. Include both language variants where the route
   supports them.

   Verify the result against the `vercel.json` allowlist. Any URL in the sitemap that
   the allowlist does not cover returns 404 in production while working locally.

2. **Per-route metadata.** Audit every route for a unique `<title>`, a unique meta
   description, a canonical URL, Open Graph tags, and Twitter card tags, in both
   languages. List which routes are missing which.

   Fill the gaps. Titles and descriptions are messaging and may be written — but only
   from facts already in the content. No new claims.

3. **hreflang.** Confirm every bilingual route declares reciprocal `hreflang` for
   `ar` and `en` plus `x-default`. Broken reciprocity is worse than none.

4. **Structured data.** Verify the existing JSON-LD validates, and that `Article`
   schema on blog posts and `FAQPage` where FAQs exist are present and accurate.
   Do not add schema that misrepresents the page.

5. **`robots.txt`.** Confirm it exists, is correct, and points at the sitemap.

6. **Heading hierarchy.** One `h1` per page, no skipped levels. Report violations and
   fix them where the fix is structural rather than a redesign.

## OUT OF SCOPE

Not SHA-09 (tokens). Not SHA-05 (fonts). Not SHA-10 (accessibility — heading
hierarchy is included here because it is both, but stop at headings). No content
rewriting beyond titles and meta descriptions. No new pages. No changes to the
`vercel.json` route list beyond reporting a mismatch.

## FACTS AVAILABLE

| Fact | Source |
|---|---|
| Shaaa is a customer loyalty, retention, and referral product | CONTEXT_PACK §6 |
| Shaaa's Zid app is `apps.zid.sa/application/5195` | CONTEXT_PACK §6 |
| Canonical names: Shaaa / شاع, domain shaaa.app | GOVERNANCE §1 |
| Article titles and content | the repository's own content files |

Titles and descriptions must summarise what an article actually says. Nothing beyond
that list may be asserted.

## CONSTRAINTS

**GOVERNANCE §3** — titles and meta descriptions are messaging and may be written.
The claims inside them are facts and may not be extended.

**GOVERNANCE §8** — do not create a page to fill a sitemap slot.

**GOVERNANCE §11** — no placeholder titles, no `Untitled`, no duplicated boilerplate
description across routes.

Note: SHA-07 is auditing this same content and has found unsourced statistics. If a
title or description would repeat one of those figures, do not use it.

## EXIT CRITERIA

1. Sitemap URL count before and after, with the delta itemised.
2. Every URL in the new sitemap returns 200, demonstrated.
3. Every URL in the new sitemap is covered by the `vercel.json` allowlist, verified
   explicitly.
4. A per-route metadata table before and after: title, description, canonical, OG,
   Twitter, hreflang — both languages.
5. Zero duplicate titles and zero duplicate descriptions across routes.
6. JSON-LD validates on a representative page of each template.
7. Heading violations listed and resolved, or logged with a reason.
8. Build and typecheck pass. Preview link.

## VERIFICATION

1. File paths changed.
2. Build, typecheck, and lint output pasted, or an explicit statement that the script
   does not exist in this repo.
3. Governance §3, §8, §11 confirmed.
4. `open-decisions.md` updated with any allowlist mismatch and any route you could not
   give a unique description without inventing a claim. `claims-register.md` — add a
   row for any figure that appears in a title or description.

## STOP

Update `PROJECT_STATE.md`, write the session log entry, stop.
