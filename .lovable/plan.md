# Make logo background match navbar white

The current logo (`kaimec-logo-nav-v3.png`) has a non-white background that shows against the white navbar.

## Step

1. Run `imagegen--edit_image` on the existing logo with `transparent_background: true` to produce a transparent PNG (`src/assets/kaimec-logo-nav-v4.png`). A transparent background blends perfectly with the navbar's white — and stays correct if the navbar color ever changes.
2. Upload the new PNG via `lovable-assets` → `src/assets/kaimec-logo-nav-v4.png.asset.json`.
3. Update `src/components/Navbar.tsx` to import `kaimec-logo-nav-v4.png.asset.json` instead of v3.
4. Delete the old `kaimec-logo-nav-v3.png.asset.json` pointer via `assets--delete_asset`.

No other navbar styling changes.
