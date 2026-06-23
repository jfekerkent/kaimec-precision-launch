I’ll fix the mobile published image issue by removing the fragile CDN-only dependency for the images that are showing question marks.

Plan:
1. Update the mobile navbar logo to use the already-working bundled logo asset instead of the `kaimec-logo-oval.png.asset.json` CDN pointer.
2. Update the mobile hero image to use a bundled local asset fallback, so the published mobile page still shows an image even if the live CDN asset route is delayed or blocked.
3. Keep the current layout and sizing the same; only the image sources will change.
4. Verify the published-page issue path locally/mobile after implementation so the logo and hero image render instead of showing broken-image icons.

Technical details:
- `src/components/Navbar.tsx`: replace the mobile/tablet logo source from the `.asset.json` URL to the existing imported `kaimec-logo-nav-v4.png` or equivalent bundled image.
- `src/components/MobileHero.tsx`: replace `hero-laser-mobile.jpg.asset.json` usage with an existing bundled image such as `hero-cnc.jpg` or `hero-main.png`, avoiding the CDN pointer for the above-the-fold mobile hero.
- Leave lower-page CDN assets alone unless they are confirmed broken too.