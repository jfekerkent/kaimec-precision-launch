# Wire up hero + Kaimec-in-action videos

Both videos referenced in `src/pages/Index.tsx` point to `/videos/*.mp4` paths that don't exist. You've now uploaded both, so I'll host them on the Lovable Assets CDN and update the code.

## Steps

1. **Upload both videos to the CDN** using `lovable-assets` from `/mnt/user-uploads/`:
   - `Laser cutting, no KENT Branding (2).mp4` → `src/assets/hero-laser-cutting.mp4.asset.json` (hero background)
   - `MEKOTEK FLC-P 1530 ... (1).mp4` → `src/assets/kaimec-in-action.mp4.asset.json` (Kaimec in Action section)

2. **Update `src/pages/Index.tsx`:**
   - Import both `.asset.json` pointers.
   - Replace `src="/videos/laser-cutting.mp4"` with the hero asset URL.
   - Replace the two `/videos/mekotek-flc-p-1530.mp4` references (main player + chapter previews) with the Kaimec asset URL.

3. **Fix hero video stretching** so it fills the section cleanly:
   - Remove the conflicting `width: 177.78vh` / `height: 56.25vw` sizing (which can leave gaps on extreme aspect ratios).
   - Use `width: 100%; height: 100%; inset: 0; object-fit: cover` so the video always covers the hero with no letterboxing, regardless of viewport ratio.

## Notes

- No changes to layout, copy, or other sections.
- Chapter thumbnails will keep using `#t=` time fragments against the new CDN URL (supported by the asset CDN).
