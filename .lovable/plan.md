## Goal

Fix mobile rendering on the homepage and all laser pages. Keep Press Brakes, Gun Drills, and Quotations pages exactly as they are.

## 1. Homepage hero — replace static mobile image with a framed Vimeo card

In `src/pages/Index.tsx`:

- **Remove** the mobile `<img>` (and its three `@1x/@2x/@3x` srcset imports + `.asset.json` pointers).
- **Delete** the three asset pointer files: `hero-laser-cutting-mobile-1x/2x/3x.jpg.asset.json`.
- **Keep** the desktop autoplay `<video>` exactly as it is (≥ md only).
- **Mobile hero (below md)** becomes a clean two-part layout:
  1. **Background:** dark gradient using existing brand tokens — `bg-gradient-to-b from-[#0b0b0c] via-[#141416] to-[#1c1c1f]` (no media bleed, no cropped machine).
  2. **Framed Vimeo card** rendered below the headline + lead form, in a rounded container:
     ```
     ┌─────────────────────────────┐
     │  16:9 Vimeo player          │
     │  rounded-2xl, ring-1,        │
     │  ring-white/10, shadow-2xl  │
     └─────────────────────────────┘
     ```
- **Embed details:**
  - URL: `https://player.vimeo.com/video/1201845096?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0&dnt=1`
  - `<iframe>` with `allow="autoplay; fullscreen; picture-in-picture"`, `loading="lazy"`, `title="Kaimec laser cutting"`.
  - Wrapper: `relative w-full aspect-video rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl bg-black md:hidden` so the player only shows on mobile.
  - Subtle gold accent border via existing `--primary` token for brand consistency.
- Hero height: drop the `min-h-[80vh]` cap on mobile since we no longer need to fill the screen with a cropped still — let content + framed video define height naturally.

## 2. Homepage — fix the cropped "Laser Cutting Machines" headline

`src/pages/Index.tsx` line 246–248: the `<h2>` has `whitespace-nowrap`, which forces the text wider than a 390px viewport.

- Remove `whitespace-nowrap` so it wraps to two lines on mobile.
- Tighten size scale to `text-2xl sm:text-3xl md:text-4xl` so it still fits comfortably even when nowrap is gone.
- The two info bars below it (`Available Table sizes…` and `Laser Powers…`) currently jump from `text-sm` straight to `md:text-3xl` and have heavy `border-4` + `shadow-lg`. On mobile that looks bulky — change to `text-sm sm:text-base md:text-2xl`, `border-2 md:border-4`, and tighten padding.

## 3. Laser pages — mobile typography + crop fixes

Apply consistent mobile-first sizing. Scope (the exact pages the user confirmed):

- `src/pages/FiberLasers.tsx`
- `src/pages/ClosedTypeFiberLaser.tsx`
- `src/pages/OpenTypeFiberLaser.tsx`
- `src/pages/TubeProfileLasers.tsx`
- `src/pages/CoveredPipeProfileFiberLaser.tsx`
- `src/pages/FlcP1530.tsx`

Changes per page:

**a. Hero H1s that overflow on 390px wide:**
| File | Current | New |
|---|---|---|
| ClosedTypeFiberLaser | `text-5xl md:text-6xl … lg:text-5xl` | `text-3xl sm:text-4xl md:text-5xl lg:text-6xl` |
| OpenTypeFiberLaser | `text-5xl md:text-6xl lg:text-7xl` | `text-3xl sm:text-4xl md:text-6xl lg:text-7xl` |
| CoveredPipeProfileFiberLaser | `text-4xl md:text-5xl lg:text-6xl` | `text-3xl sm:text-4xl md:text-5xl lg:text-6xl` |
| FiberLasers | `text-4xl md:text-5xl` | `text-3xl sm:text-4xl md:text-5xl` |
| TubeProfileLasers | `text-4xl md:text-5xl` + `whitespace-pre-line` forced line break | drop the hard `\n`, use `text-3xl sm:text-4xl md:text-5xl` with natural wrapping |
| FlcP1530 | `text-4xl` (no responsive step) | `text-3xl sm:text-4xl md:text-5xl` |

Add `break-words leading-tight` to each so long product codes (FLC-P 1530, etc.) don't push the viewport wider.

**b. Section H2s (`text-3xl md:text-4xl`)** stay as-is — they already fit on 390px.

**c. Spec tables with `whitespace-nowrap`** (CoveredPipeProfileFiberLaser ~lines 531–533, plus similar tables on the other laser pages): wrap them in `<div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">` so they scroll inside their own container on mobile instead of pushing the page sideways. Keep `whitespace-nowrap` on the cells so values don't wrap — the wrapper handles overflow cleanly.

**d. Machine images using `aspect-[4/3]` with `object-cover`** that crop the machine on phones: switch the `img` class to `object-contain` inside the laser product cards (FiberLasers featured grid + the Standard Accessories grids on Closed/Open/CoveredPipe). The aspect ratio stays the same; the machine just isn't cropped anymore.

**e. Quick overflow sweep** on the six laser pages only — add `min-w-0` to flex children that contain long text/codes where needed, and verify no other element forces `> 100vw` at 390px.

## 4. Out of scope (do not touch)

- `PressBrakes.tsx`, `GunDrillingMachines.tsx`, `GunDrills.tsx`, `BtaDeepHoleDrilling.tsx`
- `Quotations.tsx`, `Quote.tsx`, `QuoteMachine.tsx`, `QuoteSummary.tsx`
- Desktop/tablet styling on the homepage and laser pages (changes are mobile-first additions that don't alter `md:` and up)
- Any copy, CTAs, routing, business logic, or backend

## 5. Verification

After the edits, drive Playwright at 390×844 to:
1. Load `/` — confirm Vimeo iframe is visible, headline wraps cleanly, no horizontal scroll.
2. Load `/fiber-lasers`, `/closed-type`, `/open-type`, `/tube-profile-lasers`, `/covered-pipe-profile-fiber-laser`, `/flc-p-1530` — screenshot each, confirm H1 fits, machine images aren't cropped, and `document.documentElement.scrollWidth === window.innerWidth`.
3. Re-load same routes at 1280×1800 to confirm desktop layouts are unchanged.

## Files touched

- `src/pages/Index.tsx` (hero rebuild + headline fix)
- `src/pages/FiberLasers.tsx`
- `src/pages/ClosedTypeFiberLaser.tsx`
- `src/pages/OpenTypeFiberLaser.tsx`
- `src/pages/TubeProfileLasers.tsx`
- `src/pages/CoveredPipeProfileFiberLaser.tsx`
- `src/pages/FlcP1530.tsx`
- Delete: `src/assets/hero-laser-cutting-mobile-{1x,2x,3x}.jpg.asset.json`
