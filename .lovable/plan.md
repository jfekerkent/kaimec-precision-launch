# Typography Standardization Sweep

Apply consistent H2 and body text sizing across all pages and shared components, preserving H1s, dark-background text colors, layout, and content.

## Rules

- **H2 (section heading, light bg):** `text-2xl md:text-3xl font-bold text-gray-900 mb-4`
- **H2 (section heading, dark bg):** `text-2xl md:text-3xl font-bold mb-4` — keep existing white / light-gray color class
- **Lead paragraph (description right after H2):** `text-base md:text-lg text-gray-600 mb-8` (keep light color on dark bg)
- **Body paragraph:** `text-base text-gray-700 leading-relaxed` (keep light color on dark bg)
- Only swap typography utilities (size, weight, margin, neutral text color on light bg). Leave everything else untouched.

## Out of scope (do not touch)

- H1 hero headings, H3/H4 subheadings
- Layout, grid, padding, section spacing, backgrounds, images, buttons
- Copy/content
- Dark-bg text colors (preserve white/light gray for contrast)
- Form labels, badges, nav, breadcrumbs, footer link lists

## Files

Pages (21):
Index, About, Machines, MachineCategory, FiberLasers, OpenTypeFiberLaser, ClosedTypeFiberLaser, CoveredPipeProfileFiberLaser, TubeProfileLasers, PressBrakes, GunDrills, GunDrillingMachines, BtaDeepHoleDrilling, FlcP1530, Quotations, QuoteMachine, QuoteSummary, Quote, Consultation, Faq, Dealers.

Shared components (4):
OptionalAccessoriesSection, TalkToExpertBanner, TrustSignals, Footer (body text only).

## Execution

1. Read each file, identify every `<h2>` and following description/body `<p>`.
2. For each match, classify background (light vs dark) by inspecting the wrapping `section`/container classes.
3. Replace only the typography utility classes per the rules above.
4. Leave H1s, H3+, labels, badges, nav, breadcrumbs, and footer link lists unchanged.
5. After edits, run a TypeScript typecheck to confirm no regressions.
6. Spot-check the home page and one machine page in the preview to confirm visual consistency.
