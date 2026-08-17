# SHA-02 — Waitlist form P0

Read GOVERNANCE.md, PROJECT_STATE.md, CONTEXT_PACK.md, and TASK_INDEX.md first.

## REPO AND BRANCH
Repo: `shaaa-website` (`ziadahapp-a11y/shaa-website-replit`)
Branch: work branch from `web`. **Never push to `web`.** Preview only.
Directory: `artifacts/ziadah-landing`

## DEPENDS ON
None.

## WHY THIS TASK EXISTS

The waitlist form displays a success message and sends nothing. Every submission since
launch has been discarded while the visitor was told it arrived.

This is a live lead loss on a production domain, and it is the exact fault
`GOVERNANCE §11.4` names as never-ship.

**Owner decision: submissions go to `info@shaaa.app`.**

## SCOPE

1. Locate the form and paste the current fault. Confirm it matches the pattern:
   a state flag set without any network call.

2. **Determine where the endpoint can live.** This repo is a Vite SPA with no
   `api-server` of its own. Report what you find before writing anything. The likely
   answer is a Vercel Serverless Function in this project. Do not add a third-party
   form host — every submission is personal data, and an external host makes that
   party a processor under PDPL for no benefit here.

3. Build one endpoint that:
   - validates server-side; never trusts the client
   - generates a submission id and writes a structured log line with a timestamp
   - sends to `info@shaaa.app` via a transactional provider, reading the API key from
     an environment variable
   - returns the id
   - **fails closed** — no key, no send, no success response
   - rate limits. A public unauthenticated endpoint that sends email becomes a spam
     relay otherwise. Note that in-memory limiting does not survive serverless cold
     starts; if durable limiting is unavailable, say so rather than shipping a limiter
     that does nothing.

4. Rewire the form:
   - three real states: submitting, success, failure
   - success renders **only** after the server returns the id
   - bilingual validation messages mirroring the server rules
   - every `<label>` associated to its input via `htmlFor` and `id`, plus
     `aria-invalid` and `aria-describedby`

5. **Verify the `vercel.json` allowlist covers the API path.** SHA-01 replaced the
   blanket rewrite with an enumerated list. An endpoint not in that list returns 404
   in production while working locally.

Do not change the form's layout, copy, or styling.

## OUT OF SCOPE

Not SHA-06 (analytics — a `form_submit` event belongs there, not here). Not SHA-09,
SHA-05, SHA-10, SHA-12. No visual change. No new form fields.

## FACTS AVAILABLE

| Fact | Source |
|---|---|
| Destination: `info@shaaa.app` | owner decision, SHA3-03 |
| Canonical names: Shaaa / شاع, domain shaaa.app | GOVERNANCE §1 |

`info@shaaa.app` is the only approved destination. Never invent another address.

## CONSTRAINTS

**GOVERNANCE §11.4** — a form that reports success without sending must never ship.
Fail closed in every error path.

**GOVERNANCE §9** — if the email provider is not decided, log it as blocking and stop
rather than choosing one silently. State clearly which provider you are proposing and
why before implementing.

**GOVERNANCE §12** — PDPL applies. Do not write privacy text and do not assert
compliance. Log what consent or retention language is needed as blocking.

**Email alone is a lossy destination.** A bounced or spam-filtered message is a lead
lost with no trace, which is the same failure class this task exists to fix. The
server-side log with a submission id is therefore mandatory, not optional.

## EXIT CRITERIA

1. The current fault pasted, with file and line.
2. Where the endpoint lives, with the reasoning.
3. A real submission arrives at `info@shaaa.app` — pasted evidence.
4. A forced failure surfaces an error, not a success — pasted evidence. This is the
   more important of the two.
5. Every label programmatically associated, demonstrated.
6. The API path confirmed present in the `vercel.json` allowlist.
7. Build and typecheck pass. Preview link.

## VERIFICATION

1. File paths changed.
2. Build, typecheck, and lint output pasted, or an explicit statement that the script
   does not exist in this repo.
3. Governance §9, §11, §12 confirmed.
4. `open-decisions.md` updated with the provider decision, the rate-limit durability
   question, and the PDPL text gap. `claims-register.md` — state whether any row was
   needed.

## STOP

Update `PROJECT_STATE.md`, write the session log entry, stop.
