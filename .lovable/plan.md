## Goal
Make the hero banner video look flush and professional at every browser zoom level by matching the hero section to the video's native 16:9 aspect ratio. No more awkward cropping or shifting framing.

## Change (single file: `src/pages/Index.tsx`)

Update only the Hero `<section>` block:

1. **Give the hero section a 16:9 aspect ratio** instead of fixed vertical padding (`py-28 md:py-40`):
   - Outer section: `relative overflow-hidden w-full aspect-video` (Tailwind `aspect-video` = 16:9).
   - Add a `min-h-[480px] md:min-h-[560px]` floor so the hero never gets too short on narrow screens.
   - Add a `max-h-[80vh]` ceiling so on ultra-wide monitors it never dominates the whole screen.

2. **Video element** — keep `object-fit: cover` but recenter to `center center` (remove `30%` offset). With the container now matching the video's aspect ratio, `cover` and `contain` produce the same result: the full video shows with zero cropping at any zoom.

3. **Content overlay** — wrap the headline/form `.container` block so it stays vertically centered on top of the video:
   - Replace `container relative z-10 py-28 md:py-40` with an absolute-positioned inner layer:
     `absolute inset-0 z-10 flex items-center`, with the inner `container` keeping the existing text/form layout.
   - Keep the dark left-to-right gradient overlay as is (it already sits between the video and the content).

## Result
- At any browser zoom (50% \u2192 200%), the hero scales as one unit. The video always fills it exactly \u2014 nothing crops, nothing letterboxes, framing never shifts.
- Headline and lead form stay vertically centered over the video.
- Mobile keeps a comfortable minimum height; very wide monitors stay capped at 80vh.

## Out of scope
No changes to the video asset, the lead form, other sections, or any business logic.
