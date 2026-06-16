## Plan

Remove both video elements from `src/pages/Index.tsx` and replace the hero background with a static dark background so the white hero text remains readable.

### Changes

1. **Hero section — remove background video**
   - Delete the `<video>` element and its `<div>` wrapper from the hero.
   - Keep the existing left-to-right and bottom gradient overlays so the section retains its current dark look.
   - Remove the `heroVideoRef`, the related `useEffect` that auto-plays the video, and the `heroVideoSrc` import.

2. **Remove "KAIMEC LASER CUTTING MACHINES IN ACTION" section**
   - Delete the entire section including the main `<video>` player, the chapter buttons grid, and all related markup.
   - Remove the `kaimecActionVideoSrc` import and the `Play` icon import from `lucide-react`.

3. **Clean up unused code**
   - Verify no leftover references to removed videos/refs/imports.

### Files changed
- `src/pages/Index.tsx` (only file)