## Plan

1. Upload the new image to Lovable Assets CDN as `src/assets/kaimec-logo-nav-v2.png.asset.json` via `lovable-assets create`.
2. Update `src/components/Navbar.tsx` to import the new asset pointer and use its `.url` for the logo `<img>` (replacing the current `kaimec-logo-light.png` import).

No other changes.