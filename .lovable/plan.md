## Typography Standardization Plan

Standardize all section headings, descriptions, and body text across every page to the exact spec you provided.

### Target Specs

| Element | Classes |
|---|---|
| Section heading (h2) | `text-2xl md:text-3xl font-bold text-gray-900 mb-4` |
| Section description (lead p) | `text-base md:text-lg text-gray-600 mb-8` |
| Body paragraph | `text-base text-gray-700 leading-relaxed` |

### Pages to Update

1. `src/pages/Index.tsx` (Home)
2. `src/pages/About.tsx`
3. `src/pages/Machines.tsx`
4. `src/pages/MachineCategory.tsx`
5. `src/pages/FiberLasers.tsx`
6. `src/pages/OpenTypeFiberLaser.tsx`
7. `src/pages/ClosedTypeFiberLaser.tsx`
8. `src/pages/CoveredPipeProfileFiberLaser.tsx`
9. `src/pages/TubeProfileLasers.tsx`
10. `src/pages/PressBrakes.tsx`
11. `src/pages/GunDrills.tsx`
12. `src/pages/GunDrillingMachines.tsx`
13. `src/pages/BtaDeepHoleDrilling.tsx`
14. `src/pages/FlcP1530.tsx`
15. `src/pages/Quotations.tsx`
16. `src/pages/QuoteMachine.tsx`
17. `src/pages/QuoteSummary.tsx`
18. `src/pages/Quote.tsx` (Request Info)
19. `src/pages/Consultation.tsx`
20. `src/pages/Faq.tsx`
21. `src/pages/Dealers.tsx`
22. Shared components used across pages: `OptionalAccessoriesSection.tsx`, `TalkToExpertBanner.tsx`, `TrustSignals.tsx`, `Footer.tsx` (body text only)

### What I Will Change

- Every `<h2>` that functions as a section heading → replace existing size/weight/color/margin classes with the standardized set.
- Every lead `<p>` directly under a section `<h2>` → replace with the description spec.
- Every regular body `<p>` → ensure `text-base text-gray-700 leading-relaxed`.

### What I Will NOT Change

- H1 hero headings (these stay their current oversized display sizes — the spec is for section h2s).
- H3/H4 subheadings inside cards/spec lists.
- Layout, grid, padding, section spacing, backgrounds, images, buttons, or any content/copy.
- Dark-background sections: I will keep existing white/light text colors there instead of forcing `text-gray-900` / `text-gray-700`, since those would become invisible. The size/weight/margin rules still apply; only color is preserved for contrast.
- Form labels, badges, nav, breadcrumbs, footer link lists.

### Two Open Questions

1. **Dark sections** (hero blocks, CTA banners with `bg-gray-900` / `bg-[#1a1a1a]`) — confirm OK to keep white text on those rather than `text-gray-900` which would be unreadable.
2. **H1 hero titles** (e.g. giant "DEALERS", "Talk to a Real Expert") — your spec only lists h2. Confirm leaving h1s alone is correct.

Once you confirm those two, I'll execute the sweep in a single pass.
