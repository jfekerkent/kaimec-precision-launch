## Goal

Place the uploaded oval KAIMEC logo inside the home page hero section only. Navbar and footer logos stay unchanged.

## Steps

1. Save the uploaded PNG to `src/assets/kaimec-logo-hero.png` (bundled so it ships with the cPanel build).
2. In `src/pages/Index.tsx`:
   - Import the new logo.
   - Render it inside the hero text block (above the small "Precision Fabrication Machines..." label), sized around 80–110px tall, with transparent background so the dark hero video shows through.
3. No changes to Navbar, Footer, or any other page.

## Note

After this lands, you'll need to rebuild and redeploy `dist/` to cPanel for it to appear on the live site (same workflow as the other bundled assets).
