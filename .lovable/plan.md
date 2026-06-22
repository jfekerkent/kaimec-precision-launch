## Goal
Replace the current up/down punching slate bar + sparks animation on the homepage "CNC Press Brakes" heading with a "sheet bend" animation that mimics what a press brake actually does: a flat metal sheet beneath the heading visibly folds at an angle on a gentle loop.

## Scope
- File: `src/pages/Index.tsx` — only the heading decoration block around lines 318–339 (the `relative inline-block` wrapper above `CNC Press Brakes`).
- File: `tailwind.config.ts` — add new keyframes/animation utilities for the sheet bend.
- No changes to: cards below, page copy, desktop/mobile breakpoints elsewhere, or any other section.

## Visual design
Underneath the "CNC Press Brakes" headline, render a stylized sheet of metal made of two halves joined at a center hinge:

```text
           CNC Press Brakes
      ┌──────────────┬──────────────┐   ← flat state
      │  left half   │  right half  │
      └──────────────┴──────────────┘

           CNC Press Brakes
      ┌──────────────┐                   ← bent state (right half folds up)
      │  left half   │\
      └──────────────┘ \____________
```

- Sheet: brushed-steel gradient (`from-slate-300 via-slate-100 to-slate-400`), thin (h-2), centered, ~110% of heading width, rounded edges.
- Center hinge: a 2px dark vertical mark (`bg-slate-600`) acting as the bend line.
- Animation loop (~3s, ease-in-out, infinite):
  1. 0–30%: flat
  2. 30–55%: right half rotates upward to ~35° around its left edge (the hinge); subtle shadow appears under it
  3. 55–70%: holds bent
  4. 70–100%: rotates back to flat
- Add one small amber spark (`shadow-[0_0_10px_3px_#fbbf24]`) that flashes at the hinge at the moment of bend (30%, 0.15s opacity pulse) — keeps the "metalworking" feel without the aggressive punch.
- Remove: the top slate punch bar, both existing corner sparks, the `animate-press-stamp` on the `h2`, and the bottom slate underline bar.
- Heading itself: plain `text-3xl md:text-4xl font-black text-foreground` (no stamp animation).
- Respect `prefers-reduced-motion`: pause the bend loop and render the sheet in its flat state.

## Implementation details

### `tailwind.config.ts`
Add keyframes:
- `sheet-bend`:
  - `0%, 30%`: `transform: rotate(0deg)`
  - `50%, 65%`: `transform: rotate(-35deg)` (applied to the right half, rotated around its left edge via `transform-origin: left center`)
  - `85%, 100%`: `transform: rotate(0deg)`
- `bend-spark`:
  - `0%, 28%`: `opacity: 0`
  - `32%`: `opacity: 1`
  - `45%, 100%`: `opacity: 0`

Add animations:
- `sheet-bend: sheet-bend 3s ease-in-out infinite`
- `bend-spark: bend-spark 3s ease-in-out infinite`

Add a `motion-reduce:animate-none` modifier usage in the JSX (no Tailwind config change needed for that).

### `src/pages/Index.tsx`
Replace the decoration wrapper block with:
- `inline-block` container holding the `h2` and, below it, a flex row of two halves:
  - Left half: `w-1/2 h-2 bg-gradient-to-r from-slate-300 to-slate-100 rounded-l-sm`
  - Right half: `w-1/2 h-2 bg-gradient-to-r from-slate-100 to-slate-400 rounded-r-sm origin-left animate-sheet-bend motion-reduce:animate-none`
  - Hinge: absolutely positioned 2px-wide `bg-slate-600` at the center
  - Spark: absolute, centered on hinge top, `animate-bend-spark motion-reduce:hidden`

## Verification
- Run dev preview, confirm the heading area shows a sheet that folds and returns smoothly on loop, no horizontal layout shift.
- Confirm no spark/punch artifacts remain.
- Confirm mobile rendering is intact (≤768px) and the rest of the section (cards, copy) is unchanged.
