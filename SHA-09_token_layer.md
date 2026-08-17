# SHA-09 — Token layer consolidation

Read GOVERNANCE.md, PROJECT_STATE.md, CONTEXT_PACK.md, and TASK_INDEX.md first.

## REPO AND BRANCH
Repo: `shaaa-website` (`ziadahapp-a11y/shaa-website-replit`)
Branch: work branch from `web`. **Never push to `web`.** Preview only.
Directory: `artifacts/ziadah-landing`

## DEPENDS ON
`SHA-04` `VERIFIED`. The purge removed 65 files; auditing colour usage across
deleted components would waste the session.

## WHY THIS TASK EXISTS

The site has no token layer for its brand colour. It uses raw Tailwind utilities —
`blue-500`, `blue-600`, and whatever else drifted in — scattered across components.

The consequence is that the brand colour cannot be changed, audited, or checked for
contrast, because it does not exist as a single thing. Every later task that touches
colour, including accessibility, pays this cost.

**Owner decision: the existing visual appearance is kept.** This is organisation, not
redesign. Extract the blue that is actually most used and make it the token. Do not
introduce a new colour.

## SCOPE

1. Inventory every colour value in the codebase: Tailwind colour utilities, hex
   values, `rgb()`, `hsl()`, and CSS custom properties. Report each with file, line,
   and occurrence count.

2. Determine the dominant blue by weighted usage — count occurrences, but weight
   primary actions and brand surfaces above incidental use. Show the working. State
   the winning value as a hex.

3. Define a semantic token layer in the existing Tailwind v4 `@theme inline` block:
   - `--color-brand` — the extracted dominant blue
   - `--color-brand-hover`
   - `--color-brand-text` — a darkened variant meeting 4.5:1 on white, for text,
     links, and borders on light surfaces
   - `--color-brand-soft` — light tint for backgrounds
   - Plus semantic text, surface, border, success, warning, and error tokens for
     values already in use

4. Replace raw utilities with tokens throughout. Every replacement must be
   visually identical or as close as the token scale allows. Where a component uses a
   blue that is not the dominant one, replace it with the token and record the shift
   in the report — do not silently keep a second blue.

5. Report the contrast ratio of `--color-brand-text` on white and of white on
   `--color-brand`. If the extracted blue fails 4.5:1 as a button background with
   white text, do not change it — record it and log an accessibility decision for
   SHA-10.

## OUT OF SCOPE

Not SHA-05 (fonts). Not SHA-10 (accessibility fixes — this task only reports the
contrast numbers). Not layout, spacing, radius, or shadows. No new colour. No
component restructuring. No dark mode work.

Do not adopt `#0041CC` from Aakam's `products.ts`. The owner chose extraction over
alignment. Record the divergence in `open-decisions.md` so the portfolio conflict
stays visible.

## FACTS AVAILABLE

None required. This task states nothing to a visitor.

## CONSTRAINTS

**GOVERNANCE §5** — token *names* are HOLDING-level and must be reusable by the other
three sites unchanged. The *values* are BRAND-level. Name them semantically
(`--color-brand`), never by hue (`--color-blue`).

**GOVERNANCE §11** — nothing user-visible may change beyond imperceptible token
rounding. A page that looks different after this task means a colour was replaced
with the wrong token.

## EXIT CRITERIA

1. Full colour inventory before and after, pasted, with counts.
2. The dominant-blue calculation shown, and the winning hex stated.
3. Zero raw colour utilities and zero hardcoded hex remaining in components,
   demonstrated by grep.
4. Contrast ratios reported for the brand token on both surfaces.
5. Build and typecheck pass, pasted.
6. Preview link, with a statement that the visual appearance is unchanged and which
   components shifted, if any.

## VERIFICATION

1. File paths changed.
2. Build, typecheck, and lint output pasted, or an explicit statement that the script
   does not exist in this repo.
3. Governance §5 and §11 confirmed. State which token names are HOLDING-level.
4. `open-decisions.md` updated with the Aakam divergence and any contrast failure.
   `claims-register.md` — state that no rows were needed.

## STOP

Update `PROJECT_STATE.md`, write the session log entry, stop.
Do not start SHA-10.
