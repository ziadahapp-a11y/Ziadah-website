# SHA-13 — Remove published misinformation

Read GOVERNANCE.md, PROJECT_STATE.md, CONTEXT_PACK.md, and `audits/shaaa-content.md`
first.

## REPO AND BRANCH
Repo: `shaaa-website` (`ziadahapp-a11y/shaa-website-replit`)
Branch: work branch from `web`. **Never push to `web`.** Preview only.
Directory: `artifacts/ziadah-landing`

## DEPENDS ON
`SHA-07` `VERIFIED`. This task executes the removals SHA-07 identified.

## WHY THIS TASK EXISTS

SHA-07 found four classes of published content that violate `GOVERNANCE §3` and `§11`
and are live on shaaa.app right now:

- **SHA7-02** — three misattributed academic citations, including a paper credited to
  the wrong journal and a "meta-analysis" claim made about a methodological paper that
  is not one. This attributes statements to real named researchers who did not make
  them.
- **SHA7-03** — a Salla integration presented as live when only the Zid app exists. A
  Salla merchant reads this, installs, and finds nothing.
- **SHA7-01** — roughly ten unsourced performance statistics presented as fact.
- **SHA7-05** — six video entries with `youtubeId: PLACEHOLDER`, Arabic-only.

**This task removes. It does not rewrite.** Rewriting needs an approved facts file
that does not exist. Removal needs nothing and stops the harm today.

Priority order within the task: citations, then Salla, then statistics, then
placeholders. If the session cannot finish, the earlier items must be done.

## SCOPE

### 1. Misattributed citations — remove
Delete the three citations and any sentence whose claim rests on them. Where removal
leaves a paragraph incoherent, cut the paragraph. A shorter article that is true beats
a complete one that is not.

Leave the twelve correct citations exactly as they are.

### 2. Salla claim — correct to the verified state
Only the Zid app is verified: `apps.zid.sa/application/5195`.

Remove every statement presenting Salla support as available. Do not replace it with
"coming soon" — that is an unverified forward claim and `§11` forbids it. State the
platform that is actually supported, or say nothing about platforms in that sentence.

If the Salla claim is structural rather than a sentence — a logo, a comparison row, a
navigation item — remove the element. Report each one.

### 3. Unsourced statistics — remove or mark
For each of the roughly ten figures, choose one:
- **Remove** — delete the figure and rephrase the sentence qualitatively without it.
  This is the default.
- **Mark illustrative** — only where the surrounding content is explicitly a worked
  example, matching how `analytics-roi` already handles it. Then label it in the same
  way, in the same wording, in both languages.

Never keep a bare figure. Report the choice per figure with its file and line.

### 4. Placeholder videos — remove
Delete the six `videoLibrary` entries with `youtubeId: PLACEHOLDER`.

First check whether they render to visitors. If they do, they are broken on the live
site and this is urgent. Report which.

Do not create a "videos coming soon" state. Remove the entries and, if the section is
then empty, remove the section.

## OUT OF SCOPE

Not SHA7-04 (the `Shaa` to `Shaaa` naming correction — mechanical, separate task).
Not the internal logic conflicts SHA-07 found: the cashback `≤`/`≥` operator, the
wallet cap unit, and the per-coupon versus per-order conflation. Those are product
questions requiring the owner, not removals.

Not SHA-12, SHA-02, SHA-06, SHA-09, SHA-05. No rewriting beyond what removal forces.
No new content. No design change.

## FACTS AVAILABLE

| Fact | Source |
|---|---|
| Shaaa is a customer loyalty, retention, and referral product | CONTEXT_PACK §6 |
| Shaaa's Zid app: `apps.zid.sa/application/5195` | CONTEXT_PACK §6 |
| Salla support is **not** verified | SHA-07, SHA7-03 |
| Canonical names: Shaaa / شاع, domain shaaa.app | GOVERNANCE §1 |

Any replacement text must stay inside this list. When in doubt, delete rather than
rephrase.

## CONSTRAINTS

**GOVERNANCE §3** — facts may not be invented, and a wrong fact may not be replaced
with a different unverified one. Removal is always the safe move here.

**GOVERNANCE §11** — no `PLACEHOLDER`, no "coming soon", no "proof pending" may
remain or be introduced.

**GOVERNANCE §9** — if removing something would leave a section unusable and the fix
needs an owner decision, log it as blocking and leave the section removed rather than
patched with invented content.

Removal changes visitor-facing content, which is normally a stop-and-wait exception.
It is authorised here **only** for the four classes named above, and only as removal.
Anything beyond them still stops.

## EXIT CRITERIA

1. A table of every removal: file, line, what was removed, and which SHA7 row it
   closes.
2. The three misattributed citations gone, demonstrated by grep. The twelve correct
   ones untouched, demonstrated by count.
3. No statement of Salla availability anywhere, demonstrated by grep in the built
   bundle.
4. Every unsourced figure either removed or marked illustrative, listed individually.
5. Zero `PLACEHOLDER` strings in the built bundle.
6. Whether the placeholder videos were visitor-visible, stated plainly.
7. Build and typecheck pass. Preview link **before** merging.

## VERIFICATION

1. File paths changed.
2. Build, typecheck, and lint output pasted, or an explicit statement that the script
   does not exist in this repo.
3. Governance §3, §9, §11 confirmed.
4. `claims-register.md` — mark every removed claim as `removed` with the date. Do not
   delete the rows; the register is the record that they were once published.
   `open-decisions.md` — update SHA7-01, 02, 03, 05 to resolved-by-removal, and log
   anything that needs a rewrite later.

## STOP

Update `PROJECT_STATE.md`, write the session log entry, stop.
Do not start SHA-12.
