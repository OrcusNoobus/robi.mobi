# tasks.md

**Authored by:** Agent generates from the plan. Human reviews. Agent marks tasks complete during implementation.

## Reads from
- `plan.md`

## Feeds into
- `implement.md`
- Progress tracking (checkboxes show where work stands)

---

> Each task = one commit + one focused session (15-30 min).
> If a task says only "implement feature", it is too large — split it.
> The checkboxes enable pause-and-resume: a new session reads this file and continues.

# Traceability

Each task exists because of something defined earlier:
- tasks about behavior come from `spec.md`
- tasks about structure come from `plan.md`

If a task cannot be traced to a requirement, it probably should not exist.

# Completed (v1)

<details>
<summary>T1–T15 — All complete ✅</summary>

- [x] **T1:** Fix CTA animation timing
- [x] **T2:** CTA above the fold on mobile
- [x] **T3:** Add focus-visible states
- [x] **T4:** Mobile-first CSS refactor
- [x] **T5:** Add glassmorphism to more elements
- [x] **T6:** Use all four neon accent colors
- [x] **T7:** Subtitle2 fade transition
- [x] **T8:** Language-aware SEO meta
- [x] **T9:** Add `defer` to script tags
- [x] **T10:** Move inline styles to CSS
- [x] **T11:** Add `og:image` meta tag
- [x] **T12:** Verify and fix contrast ratios
- [x] **T13:** Add 320px viewport handling
- [x] **T14:** Normalize line endings
- [x] **T15:** Add favicon

</details>

# Ordered Task List (v2)

## Phase 1 — Subtitle1 Rotation

- [x] **T16: Add subtitle1 arrays to i18n.js** — Convert `subtitle1` from a string to an array in all three languages. Messages: "No calls, No waiting" + "Fast and easy ordering directly on WhatsApp" (translated per language).
  - Trace: spec FR-6, AC Rotating subtitle1
  - File: `js/i18n.js`
  - Verify: `translations.ro.subtitle1` is an array of length 2

- [x] **T17: Add subtitle1 rotation logic to app.js** — Add `startSubtitle1Loop(lang)` mirroring subtitle2 loop. Call from `applyLanguage()`. Skip `subtitle1` key in generic i18n element loop (now an array).
  - Trace: spec FR-6, AC Rotating subtitle1
  - File: `js/app.js`
  - Verify: subtitle1 text changes automatically on a timer

- [x] **T18: Add `id="subtitle1"` to HTML** — Add id attribute to `<p class="subtitle1">` for JS targeting. Add CSS transition support (reuse fade-out pattern).
  - Trace: spec AC Rotating subtitle1
  - Files: `index.html`, `css/style.css`
  - Verify: subtitle1 element is queryable by id, transitions apply

## Phase 2 — Premium Text Transitions

- [ ] **T19: Upgrade subtitle transition CSS** — Replace simple opacity fade with combined `opacity` + `translateY(-8px)` + `filter: blur(2px)` effect. Apply to both `.subtitle1` and `.subtitle2`. Use `cubic-bezier(0.4, 0, 0.2, 1)` easing at 0.5s duration.
  - Trace: spec AC Text transition animations
  - File: `css/style.css`
  - Verify: visually confirm slide+fade+blur effect during rotation

- [ ] **T20: Update JS transition timing** — Change `setTimeout` delay from 400ms to 500ms in both subtitle loop functions to match new CSS duration.
  - Trace: spec AC Text transition animations
  - File: `js/app.js`
  - Verify: text swap happens at the exact end of fade-out, no flicker

## Phase 3 — Language Consistency

- [ ] **T21: Align title text across languages** — Update EN title to `"Robi 🤖 helps you order fast"` and HU title to `"Robi 🤖 segít gyorsan rendelni"` in i18n.js. Keep RO as-is.
  - Trace: spec FR-8, AC Language consistency
  - File: `js/i18n.js`
  - Verify: switch to EN — title shows Robi 🤖 style, not just "Royal Food Delivery"

- [ ] **T22: Verify all i18n strings for meaning parity** — Audit every key in translations object. Confirm all three languages convey equivalent meaning. Fix any discrepancies.
  - Trace: spec FR-8, AC Language consistency
  - File: `js/i18n.js`
  - Verify: side-by-side comparison of all strings shows consistent messaging

## Phase 4 — WhatsApp Button Polish

- [ ] **T23: Increase CTA animation delay** — Change `.cta-container` animation delay from `0.8s` to `1.2s` for a more polished entrance timing.
  - Trace: spec AC WhatsApp CTA "polished delay"
  - File: `css/style.css`
  - Verify: button appears noticeably later, feels more natural

- [ ] **T24: Use official WhatsApp green tone** — Change `.whatsapp-btn::before` background from `var(--neon-lime)` to `#25D366`. Reduce glow intensity (blur: 6px, opacity: 0.35). Soften box-shadow spread.
  - Trace: spec AC WhatsApp CTA "official WhatsApp green"
  - File: `css/style.css`
  - Verify: button glow looks clean and official, not neon-aggressive

- [ ] **T25: Verify neon-lime still visible** — After removing lime from CTA glow, confirm `--neon-lime` is still visibly used on the page (currently on `.whatsapp-btn:focus-visible`). If not sufficiently visible, add lime accent to another element.
  - Trace: spec AC Visual "all four colors must be visibly used"
  - File: `css/style.css`
  - Verify: all four neon colors (cyan, magenta, lime, gold) confirmed visible

## Post-implementation

- [ ] **T26: Full visual regression check** — Capture screenshots at 320px, 375px, 480px, 768px, 1280px. Verify all v2 acceptance criteria. Confirm no regressions from v1.
  - Trace: plan validation checklist
  - Verify: side-by-side comparison, all acceptance criteria met

# Review Heuristics

Before marking a task complete:
- Does this step still match the spec?
- Does this step keep the spec stable?
- Does this step add more scope than planned?
- Do tests pass?
