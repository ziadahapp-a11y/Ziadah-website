# SHA-05 — Self-host fonts

Read GOVERNANCE.md, PROJECT_STATE.md, CONTEXT_PACK.md, and TASK_INDEX.md first.

## REPO AND BRANCH
Repo: `shaaa-website` (`ziadahapp-a11y/shaa-website-replit`)
Branch: work branch from `web`. **Never push to `web`.** Preview only.
Directory: `artifacts/ziadah-landing`

## DEPENDS ON
None. Independent of the token work.

## WHY THIS TASK EXISTS

The site loads `IBM Plex Sans Arabic` and `Inter` from Google Fonts via a CSS
`@import`. An `@import` inside a stylesheet is render-blocking and serialised: the
browser must fetch the stylesheet, parse it, discover the import, then make a second
round trip before any text paints.

On a Saudi mobile connection this is a direct hit to Largest Contentful Paint on
every page. Arabic sites pay more than Latin ones here, because Arabic subsets are
larger and there is no usable system fallback that matches metrics.

There is also a privacy dimension: a third-party font request exposes every visitor's
IP to Google. Under PDPL this is worth removing regardless of the performance gain.

## SCOPE

1. Inventory the current loading: where the `@import` lives, which families, which
   weights, which subsets, and whether any weight loaded is never used.

2. Download the exact families and weights currently in use. Do not add weights, do
   not substitute families, do not change any typeface. This task changes delivery,
   not typography.

3. Self-host as `woff2` under the public assets directory. Subset Arabic and Latin
   separately with `unicode-range` so a Latin-only page does not download the Arabic
   subset.

4. Replace the `@import` with `@font-face` declarations plus `<link rel="preload">`
   for the two faces used above the fold.

5. Set `font-display: swap` so text paints immediately in a fallback.

6. **Font stack ordering is a landmine.** If any `saudi_riyal` font is present or gets
   added, it must stay **last** in every stack. Its cmap also maps A–D, so placing it
   earlier blanks those Latin letters. Verify the ordering after your changes and
   paste the final stacks.

7. Measure and report: request count, transferred bytes, and LCP before and after, on
   the home page in Arabic.

## OUT OF SCOPE

Not SHA-09 (colour tokens). Not the type scale, sizes, weights, or line heights — the
typography stays identical. No new families. No variable-font migration. No changes to
any component.

## FACTS AVAILABLE

None required. This task states nothing to a visitor.

## CONSTRAINTS

**GOVERNANCE §6** — the `saudi_riyal` ordering rule is absolute. Verify it explicitly
even if you did not touch that font.

**GOVERNANCE §5** — the font stack is HOLDING-level. Document the final stacks in a
form the other three sites can adopt. Note that Ziadah self-hosts 61 `woff2` files
already; your approach should be compatible with consolidating that later.

**GOVERNANCE §11** — text must render identically. A different weight, a different
family, or a visible fallback flash means the substitution was wrong.

## EXIT CRITERIA

1. The `@import` is gone, demonstrated by grep.
2. Zero requests to `fonts.googleapis.com` or `fonts.gstatic.com` on any page,
   demonstrated from the network log.
3. Font files served from the site's own origin.
4. Final font stacks pasted, with `saudi_riyal` last wherever present.
5. Before and after: request count, bytes, LCP on the Arabic home page.
6. Rendered text visually identical — same family, same weights, both languages.
7. Build and typecheck pass, pasted. Preview link.

## VERIFICATION

1. File paths changed, including added font files.
2. Build, typecheck, and lint output pasted, or an explicit statement that the script
   does not exist in this repo.
3. Governance §5, §6, §11 confirmed.
4. `open-decisions.md` updated if any weight or subset had to be dropped.
   `claims-register.md` — state that no rows were needed.

## STOP

Update `PROJECT_STATE.md`, write the session log entry, stop.
