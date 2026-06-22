## Goal

Make the mobile hero image crisp on every phone (1x → 3x DPR) and lock its aspect ratio so it never appears stretched or "zoomed" when the hero box changes height.

## What I'll do

1. **Generate three resolutions of the mobile hero** from the source frame already extracted from the laser-cutting video, all at the same 3:4 portrait crop centered on the cutting head + sparks:
   - `hero-laser-cutting-mobile@1x.jpg` — 540 × 720
   - `hero-laser-cutting-mobile@2x.jpg` — 810 × 1080 (current asset, kept)
   - `hero-laser-cutting-mobile@3x.jpg` — 1080 × 1440
   - Encode JPEGs at quality ~85 with `mozjpeg`-style settings via ffmpeg/PIL. Upload each via `lovable-assets` and commit only the `.asset.json` pointers.

2. **Wire srcset + sizes on the `<img>`** in `src/pages/Index.tsx` (mobile-only hero image added in the previous turn):
   ```tsx
   <img
     src={hero2x.url}
     srcSet={`${hero1x.url} 540w, ${hero2x.url} 810w, ${hero3x.url} 1080w`}
     sizes="(max-width: 767px) 100vw, 0px"
     width={810}
     height={1080}
     decoding="async"
     fetchPriority="high"
     alt=""
     aria-hidden="true"
     className="md:hidden absolute inset-0 h-full w-full object-cover"
     style={{ objectPosition: "center 35%", aspectRatio: "3 / 4", zIndex: 0 }}
   />
   ```
   - `sizes` returns `0px` above the mobile breakpoint so desktop browsers don't preload the mobile image (the video covers ≥ md).
   - `width`/`height` + `aspect-ratio: 3 / 4` reserve space and prevent CLS; `object-cover` still fills the hero box without distorting the image.
   - `fetchPriority="high"` keeps it as the mobile LCP element.

3. **No layout changes** — hero section still has `min-h-[80vh] md:min-h-0`, overlays unchanged, video block unchanged.

## Technical notes

- Files touched: `src/pages/Index.tsx` (hero `<img>` only), plus three new `.asset.json` pointer files in `src/assets/`.
- The existing `hero-laser-cutting-mobile.jpg.asset.json` will be replaced by the 2x variant pointer (same image, renamed for clarity) or kept as-is and reused — whichever avoids deleting a live CDN ref. Decision at build time: keep the current pointer as the 2x slot, add only `@1x` and `@3x` new pointers.
- No new dependencies. ffmpeg + PIL already available in sandbox.

## Out of scope

- WebP/AVIF `<picture>` source switching (can add later if you want even smaller payloads).
- Desktop/tablet video changes.
- Any copy, CTA, or other section changes.