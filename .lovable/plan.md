## Problem

The three accessory images (Dust/Smoke Collector, Screw Type Air Compressor, Automatic Loader) shown on the Quotations page and at the bottom of the laser cutting machine pages are stored as `.asset.json` pointer files referencing Lovable's CDN (`/__l5e/assets-v1/...`). That CDN path only resolves on Lovable's hosting — the live site is deployed to cPanel, so those URLs 404 in production. This is the same issue we fixed previously for the dealer logos and hero video.

## Fix (same pattern we used for dealer logos / hero video)

1. **Download the three binaries from their current CDN URLs** into `src/assets/` as real PNG files:
   - `src/assets/dust-collector-todc-4l.png`
   - `src/assets/screw-air-compressor.png`
   - `src/assets/auto-loader.png`

2. **Delete the three `.asset.json` pointer files:**
   - `src/assets/dust-collector-todc-4l.png.asset.json`
   - `src/assets/screw-air-compressor.png.asset.json`
   - `src/assets/auto-loader.png.asset.json`
   (Also remove the stale `src/assets/dust-collector-todc-4l.jpg.asset.json` if still present.)

3. **Update imports in `src/components/OptionalAccessoriesSection.tsx`** — switch from `.asset.json` imports (using `.url`) to direct PNG imports:
   ```ts
   import dustCollectorImg from "@/assets/dust-collector-todc-4l.png";
   import airCompressorImg from "@/assets/screw-air-compressor.png";
   import autoLoaderImg from "@/assets/auto-loader.png";
   ```
   And use `image: dustCollectorImg` directly (no `.url`).

4. **Update imports in `src/pages/Quotations.tsx`** the same way — replace the three `.asset.json` imports with direct PNG imports, and drop the `.url` accessors.

5. **Verify the build** — confirm Vite emits hashed copies of all three PNGs into `dist/assets/`.

## After this lands

You'll need to push/deploy the new build to cPanel as usual, then hard-refresh the live site (Ctrl+Shift+R) to clear cached broken URLs. The Lovable preview will continue to work too.

## Files touched

- Add: `src/assets/dust-collector-todc-4l.png`, `src/assets/screw-air-compressor.png`, `src/assets/auto-loader.png`
- Delete: the three matching `.asset.json` files
- Edit: `src/components/OptionalAccessoriesSection.tsx`, `src/pages/Quotations.tsx`
