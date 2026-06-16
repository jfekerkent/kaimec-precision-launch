## Problem
`kaimec.com` is served from a cPanel server via a GitHub Actions mirror. Lovable's CDN assets (`.asset.json` pointers) only resolve inside Lovable's infrastructure, so they 404 on the live site — causing missing images and broken videos.

## Goal
Do a **light triage**: restore only the assets visible on the homepage, global navbar, and core conversion pages back to local files so the live site looks presentable to visitors today. Leave deeper product-detail-page assets on CDN; those will work automatically once the custom-domain migration happens later.

## Scope — what gets fixed
| Tier | Pages | Assets |
|------|-------|--------|
| 1 (must-fix) | Every page (Navbar) | Logo `kaimec-logo-nav-v4.png` |
| 1 (must-fix) | Homepage (`/`) | Hero video, "in-action" video, 10 slideshow images, 2 combo images |
| 2 (conversion) | `/quotations`, `/quotations/summary` | Quote-configurator images (laser spec sheet, dust collector, air compressor) |
| 3 (defer) | Product detail pages (`/machines/laser-cutting/...`, `/machines/tube-profile-lasers`) | Left on CDN; will auto-fix after custom-domain move |

Core pages such as `/about`, `/faq`, `/quote`, `/consultation`, `/dealers`, `/eblast-1`, `/machines`, `/press-brakes`, `/gun-drills` do **not** reference any CDN assets, so they already work fine.

## Steps

1. **Download binaries from Lovable CDN**
   - Use the published Lovable URL (`https://kaimec-industrial-hub.lovable.app/__l5e/assets-v1/...`) to `curl` each Tier 1 & 2 asset back into `src/assets/` with its original filename.

2. **Replace `.asset.json` pointers with local files**
   - Delete the `.asset.json` files for the restored assets.
   - Update imports in `Navbar.tsx`, `Index.tsx`, `Quotations.tsx`, and `QuoteSummary.tsx` to import the local image/video files directly instead of reading `.url` from the asset JSON objects.

3. **Clean up stray duplicates**
   - Remove the duplicate `.asset.json` files sitting in the project root (e.g. `./combo-flcp-2040-new.jpg.asset.json`) that are not referenced by any source file.

4. **Verify build**
   - Run `bun run build` locally to confirm Vite bundles all restored assets and the build exits cleanly.

5. **Push to GitHub**
   - The existing GitHub Action will build and mirror to cPanel automatically, so the live site picks up the fixed assets on the next deploy.

## Side issue — dead `www` CNAME
`www.kaimec.com` still has a CNAME pointing to `kaimec.netlify.app`, but Netlify hosting was removed. Visitors hitting `www.` will see a Netlify "Not Found" error instead of the site.

**Action for you:** In cPanel DNS, either:
- Delete the `www` CNAME entirely (most browsers will fall back to the root A record), **or**
- Repoint `www` to the same cPanel server IP as the root `kaimec.com` A record.

This is independent of the asset-fix work above and can be done immediately.

## Future — custom domain through Lovable
Once you get Cloudflare access:
1. Add `kaimec.com` and `www.kaimec.com` in Lovable Project Settings → Domains.
2. Update DNS A records to `185.158.133.1`.
3. Remove the GitHub Action and `.cpanel.yml` — they become unnecessary because Lovable handles publishing directly.
4. At that point every `.asset.json` pointer works natively and the live site stays in sync with preview automatically.