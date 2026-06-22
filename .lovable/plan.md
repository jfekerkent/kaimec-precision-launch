## Recommended approach

The professional standard used by sites like Apple and Stripe: **serve a hero image on mobile and the video on tablet/desktop**, combined with a slightly shorter hero on small screens. This avoids the "over-zoomed" look (a 16:9 video forced into a tall portrait viewport must crop ~60% of its width), improves load time on cellular, and gives a perfectly framed, intentional composition on phones.

## What I'll change

1. **Mobile (< 768px): static hero image instead of the video**
   - Use a still frame from the current laser-cutting video (extracted at a strong moment with sparks visible) as the mobile hero background.
   - `object-fit: cover` with `object-position` tuned so the machine head + sparks stay in frame.
   - No autoplay video on mobile → faster LCP, no data hit, no playback quirks on iOS Low Power Mode.

2. **Tablet/Desktop (≥ 768px): keep the existing video**
   - Same `hero-background-video` element as today, just hidden on mobile via `hidden md:block`.
   - The mobile image gets `md:hidden`.

3. **Tighten hero height on mobile**
   - Current hero stretches to the full content height which exaggerates the zoom. Cap the mobile hero around `min-h-[80vh]` (vs. current behavior) and let it grow normally from `md:` up. Headline, sub-copy, and CTAs stay exactly where they are.

4. **Preserve all overlays**
   - The left-to-right dark gradient and bottom fade stay unchanged, applied over both the image and the video so the text remains readable in both modes.

## Technical notes

- File touched: `src/pages/Index.tsx` (hero section only) and one new asset import.
- New asset: `src/assets/hero-laser-cutting-mobile.jpg` — extracted from `src/assets/hero-laser-cutting.mp4` at a frame where the cutting head and sparks are centered, then cropped to a portrait-friendly framing (roughly 3:4) so `object-cover` on a phone shows the machine, not a zoomed slice of metal.
- No changes to Layout, Navbar, Footer, copy, CTAs, or any other section.
- No new dependencies.

## Out of scope

- Re-encoding a second mobile-tall MP4 (heavier, more bandwidth, marginal visual gain over a still).
- Changing hero copy, buttons, or any section below the hero.