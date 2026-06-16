## Problem

Four product pages still import images via `.asset.json` pointers, which resolve to `/__l5e/assets-v1/<id>/<file>` URLs. That path is served by Lovable's CDN — it works on `*.lovable.app` but **404s on kaimec.com** because cPanel only serves the static `dist/` folder. Result: blank image boxes (alt text only) on those pages.

Affected pages (40 broken image refs total):
- `src/pages/OpenTypeFiberLaser.tsx` — 13 refs
- `src/pages/ClosedTypeFiberLaser.tsx` — 12 refs
- `src/pages/CoveredPipeProfileFiberLaser.tsx` — 9 refs
- `src/pages/TubeProfileLasers.tsx` — 6 refs

## Fix (same pattern as Tier 1/2 migration)

For each `.asset.json` actually imported by these 4 pages:

1. Read the pointer JSON to get the CDN URL (`https://kaimec-industrial-hub.lovable.app/__l5e/assets-v1/<id>/<filename>`).
2. `curl` the binary into `src/assets/<filename>` so Vite bundles it locally.
3. Rewrite the page imports:
   ```ts
   // before
   import floTop2_1530A from "@/assets/flo-top2-1530-a.png.asset.json";
   ...src={floTop2_1530A.url}

   // after
   import floTop2_1530A from "@/assets/flo-top2-1530-a.png";
   ...src={floTop2_1530A}
   ```
4. Delete the now-unused `.asset.json` pointer files for those imports.
5. Leave the ~28 orphan `.asset.json` files in `src/assets/` that no page imports (they don't affect the build; cleanup can happen later).

## What stays the same

- No visual / layout changes — same images, same positions.
- No component edits beyond import path + `.url` removal.
- No backend, no routing, no SEO changes.

## Verification

- After Lovable auto-pushes → GitHub Action builds → cPanel pulls, the deep product pages render images on kaimec.com.
- Bundled images will use Vite's hashed filenames in `dist/assets/`, served directly from cPanel.
- Build size will grow (these are real binaries now, not pointers). Acceptable cost to keep the site working pre-custom-domain.

## Out of scope

- Migration to custom domain on Lovable (waiting on Cloudflare access).
- Deleting orphan `.asset.json` files in `src/assets/` that no page references.
- The build-marker / GitHub Action / cPanel pull issues — separate from this.

Approve and I'll run the download + import-rewrite for all 4 pages in one pass.
