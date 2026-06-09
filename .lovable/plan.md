## Goal

Switch the dealer logos and hero video from Lovable's CDN (`.asset.json` pointers) back to real binary files that Vite bundles into `dist/`, so they work when hosted on cPanel.

## Files affected

- `src/assets/dhm-logo.png.asset.json` → delete, replace with real `src/assets/dhm-logo.png`
- `src/assets/etgi-logo.png.asset.json` → delete, replace with real `src/assets/etgi-logo.png`
- `src/assets/hero-video.mp4.asset.json` → delete, replace with real `src/assets/hero-video.mp4`
- `src/pages/Dealers.tsx` → import the PNGs directly (`import dhmLogo from "@/assets/dhm-logo.png"`) instead of reading the `.asset.json`
- `src/pages/Index.tsx` → import the MP4 directly instead of reading the `.asset.json`

## Steps

1. Download each binary from its current CDN URL (stored in the `.asset.json` files) into `src/assets/` with the real extension.
2. Delete the three `.asset.json` pointer files.
3. Update `Dealers.tsx` and `Index.tsx` so the imports point at the real files and the `src=` attributes use the imported variable directly (no `.url` lookup).
4. Run the build to confirm Vite emits hashed copies of the logos and video into `dist/assets/`.

## After this lands

You'll need to redeploy the new `dist/` to cPanel and hard-refresh (Ctrl+Shift+R) to clear the old broken URLs from your browser cache. The Lovable preview will keep working too — Vite-bundled assets work on every host.

## Note

This is the reverse of Lovable's default "migrate to CDN" workflow. The trade-off is a slightly larger repo and `dist/` in exchange for host-portability. If you ever move fully to Lovable hosting, we can flip back to the CDN pointers.
