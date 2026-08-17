# SHA-06 — Analytics event layer

Read GOVERNANCE.md, PROJECT_STATE.md, CONTEXT_PACK.md, and TASK_INDEX.md first.

## REPO AND BRANCH
Repo: `shaaa-website` (`ziadahapp-a11y/shaa-website-replit`)
Branch: work branch from `web`. **Never push to `web`.** Preview only.
Directory: `artifacts/ziadah-landing`

## DEPENDS ON
`SHA-02` `VERIFIED`, so the form events instrument a form that actually submits.

## WHY THIS TASK EXISTS

The site has **zero analytics**. Nobody knows how many people visit, where they come
from, or how many click the primary CTA.

That CTA pointed at a different product's dashboard until SHA-03 fixed it. Nobody can
say how many conversions were lost, because nothing was ever measured. The same blind
spot applies to every fix in this project: the work is unverifiable in business terms.

**Owner decision: no provider is chosen yet.** Build the event layer with a no-op
transport. Wiring a provider later must be a one-file change, not a re-instrumentation.

## SCOPE

1. **Event schema.** Define it once, typed, as the single source of truth. Every event
   carries: `brand`, `route`, `locale`. Plus its own fields.

   | Event | Additional fields |
   |---|---|
   | `page_view` | referrer |
   | `cta_click` | cta_id, destination |
   | `outbound_click` | destination |
   | `form_start` | form_id |
   | `form_submit` | form_id, outcome |
   | `language_switch` | from, to |
   | `nav_interaction` | item, level |
   | `content_engagement` | content_type, content_id |

   `brand` is `shaaa` here. The field exists because this schema is HOLDING-level and
   the other three sites will emit into the same shape.

2. **Transport abstraction.** A single module with one exported function. The
   transport is swappable and currently a no-op that logs to the console in
   development and does nothing in production. No provider SDK. No credentials.
   No network request.

3. **Instrument** every event above across the live routes. Read the route list from
   the router — do not assume it.

4. **Document** in `docs/analytics.md`: the schema, the events, where each fires, and
   the exact steps to wire a provider. Someone should be able to connect a provider in
   under an hour using only that file.

5. **Provider note for the owner.** Recommend one, with reasoning, in
   `open-decisions.md`. Do not install it. Weigh cookie-free options that need no
   consent banner under PDPL against ones that do — the site is hosted on Vercel,
   which is relevant to the recommendation.

## OUT OF SCOPE

Not SHA-09, SHA-05, SHA-10, SHA-12. Do not install any analytics package. Do not add
a consent banner or write privacy text — log what is needed. No visual change. No new
routes.

## FACTS AVAILABLE

None required. This task states nothing to a visitor.

## CONSTRAINTS

**GOVERNANCE §5** — the event schema is HOLDING-level. Design it so Ziadah, Raasid,
and Aakam adopt it unchanged. Ziadah in particular has a calculator and a store
analyzer that will need `tool_start` and `tool_complete` events later — leave room in
the schema rather than forcing them in now.

**GOVERNANCE §9** — the provider is an open decision. Recommend, never choose.

**GOVERNANCE §12** — PDPL applies. Collect no personal data in events. No email, no
name, no IP, no user identifier. Log the consent and retention questions as blocking.

**GOVERNANCE §11** — a no-op transport must be genuinely silent in production. No
console noise, no failed requests, no placeholder endpoint.

## EXIT CRITERIA

1. The typed schema exists in one file, pasted.
2. Every event fires where documented, demonstrated in the development console.
3. Zero network requests from the analytics layer in a production build, demonstrated.
4. Zero personal data in any event payload, demonstrated by reading the type.
5. `docs/analytics.md` exists and the wiring steps are concrete.
6. Build and typecheck pass. Preview link.

## VERIFICATION

1. File paths changed.
2. Build, typecheck, and lint output pasted, or an explicit statement that the script
   does not exist in this repo.
3. Governance §5, §9, §11, §12 confirmed. State which parts are HOLDING-level.
4. `open-decisions.md` updated with the provider recommendation and the PDPL consent
   and retention questions. `claims-register.md` — state that no rows were needed.

## STOP

Update `PROJECT_STATE.md`, write the session log entry, stop.
