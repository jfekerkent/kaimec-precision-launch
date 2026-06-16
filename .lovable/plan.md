## Goal
Help your site rank for branded searches like **"kaimec fabrication"** and **"kaimec fiber lasers"** so Kaimec shows up first instead of competitors with paid ads.

## Why this is happening
- **Sponsored (ad) results** always sit above organic results. You can't beat those with SEO alone — only with your own Google Ads.
- For the **organic** spot right under the ads, Google needs clear signals that your site is the authoritative match for those exact phrases. Right now your pages mostly say "Kaimec" or "fiber laser" separately, not the combined phrases users are typing.

## Plan — On-page SEO for branded phrases

### 1. Target the exact phrases users search
Update titles, H1s, meta descriptions, and intro copy on key pages to include the full phrases:
- Homepage → title includes "Kaimec Fabrication" and "Kaimec Fiber Laser Cutting Machines"
- `/machines/cnc-fiber-lasers` (and `/fiber-lasers`) → "Kaimec Fiber Lasers" in title + H1
- Product pages (FlcP1530, Open Type, Closed Type) → "Kaimec [Model] Fiber Laser" in title + H1

### 2. Add a clear brand/about block
Add an "About Kaimec" section on the homepage with a paragraph naming "Kaimec Fabrication", "Kaimec Fiber Lasers", location, and what you do. This is the kind of text Google quotes in branded results.

### 3. Strengthen structured data (JSON-LD)
- Add `Organization` schema with `name: "Kaimec"`, `alternateName: ["Kaimec Fabrication", "Kaimec Fiber Lasers"]`, logo, URL, sameAs (LinkedIn, YouTube, social).
- Add `Product` schema on each machine page (name, brand=Kaimec, image, description).
- Add `BreadcrumbList` schema on category/product pages.

### 4. Fix duplicate routes (canonical URLs)
`/machines/cnc-fiber-lasers` and `/fiber-lasers` load the same page. Pick one canonical URL via `<link rel="canonical">` on each so Google consolidates ranking signals instead of splitting them.

### 5. Complete the sitemap
Add missing routes (`/flc-p-1530`, `/laser-cutting/closed-type-fiber-laser`, `/laser-cutting/open-type-fiber-laser`, etc.) so Google discovers and indexes every page.

### 6. Off-page signals (longer term, biggest impact for branded search)
These aren't code changes but they're what actually wins branded queries:
- **Google Business Profile** for Kaimec — single biggest lever for a branded local/B2B search.
- **Consistent NAP** (Name, Address, Phone) on the site footer and on directories.
- **Social profiles** (LinkedIn company page, YouTube) linking back to the site, with "Kaimec Fabrication" in the name.
- A few **backlinks** from supplier/industry directories using "Kaimec" as anchor text.

### 7. Beat the ads (optional)
If competitors keep buying ads for "kaimec …", the only way to push them off the top is to run your own Google Ads on your brand name (usually very cheap since it's your trademark).

## What I'd build now (code-side)
Steps 1–5 above. Steps 6–7 are guidance — they live outside the codebase.

## Want me to also run a Semrush check?
I can pull a Semrush snapshot of `kaimec-industrial-hub.lovable.app` and the top competitors ranking for "kaimec fiber lasers" to confirm exactly which pages/phrases to target. Say the word and I'll run it before implementing.
