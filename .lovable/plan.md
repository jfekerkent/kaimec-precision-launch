# Pass 1 (trimmed + preload path fix): Performance + Static Metadata

Scope locked. Per-route Helmet deferred. Preload paths will resolve to `/public` before build.

## 1. Hero video compression + poster
- Re-encode `src/assets/hero-laser-cutting.mp4` with `ffmpeg` into two outputs targeting ~2–3 MB combined:
  - MP4: H.264, CRF ~28, 1280w, no audio, `+faststart`
  - WebM: VP9, similar bitrate/size
- Extract poster frame → **`public/hero-laser-cutting-poster.jpg`** (~1280w, ~60–100 KB). Public path so `index.html` preload references a stable `/hero-laser-cutting-poster.jpg` URL that exists at build time (no Vite hashing).
- Update desktop `<video>` in `src/pages/Index.tsx`:
  - `preload="auto"` → `preload="metadata"`
  - Add `poster="/hero-laser-cutting-poster.jpg"`
  - Replace single `src` with `<source>` tags (webm first, mp4 fallback)

## 2. Conditional hero rendering
- Import `useIsMobile()` in `src/pages/Index.tsx`.
- Replace the two CSS-hidden branches with `{isMobile ? <MobileHero /> : <desktop hero JSX>}` so only one mounts.
- Remove the now-dead mobile-only Vimeo iframe block inside the desktop hero.
- Silences the `fetchPriority` React warning naturally (non-LCP branch never mounts).

## 3. Lazy-load "Why KAIMEC" carousel
- Remove eager `import slideX from "@/assets/..."` block for the 9 facility slides.
- Store slide sources via `new URL('../assets/slide-....png', import.meta.url).href` so Vite still hashes and fingerprints them, but they're only requested when rendered.
- Render only slides `slideIdx` and `slideIdx + 1` (mod length); keep `loading="lazy"` and add `decoding="async"`.

## 4. LCP preload (public-path only, verified)
- **Mobile LCP image**: move/copy the file currently backing `MobileHero.tsx` into `public/` (e.g. `public/hero-laser-mobile.jpg`) and update `MobileHero.tsx` to `src="/hero-laser-mobile.jpg"`. Keep `fetchPriority="high"`, explicit width/height, `decoding="async"`.
- **Desktop LCP**: hero video poster already at `public/hero-laser-cutting-poster.jpg` from step 1.
- In `index.html` `<head>` add viewport-scoped preloads that reference **only `/public` paths**:
  ```html
  <link rel="preload" as="image" href="/hero-laser-cutting-poster.jpg" fetchpriority="high" media="(min-width: 768px)" />
  <link rel="preload" as="image" href="/hero-laser-mobile.jpg"        fetchpriority="high" media="(max-width: 767px)" />
  ```
- Verification gate before marking done: `ls public/hero-laser-cutting-poster.jpg public/hero-laser-mobile.jpg` must succeed, and the two `href` values in `index.html` must match those filenames byte-for-byte. No `src/assets/…` paths in any `<link rel="preload">`.

## 5. Static metadata (`index.html` only)
- `<title>` → `Kaimec Fabrication — Fiber Lasers & CNC Machines`; mirror `og:title`, `twitter:title`.
- Meta description (name + og + twitter) → `Kaimec Fabrication: fiber lasers, CNC press brakes & deep-hole drilling machines. Factory-direct with US engineering and parts support from Tustin, CA.`
- `og:url` → `https://kaimec.com/`
- Add `<link rel="canonical" href="https://kaimec.com/" />`.
- JSON-LD Organization `url` + `logo` → `https://kaimec.com/`; LocalBusiness `url` → `https://kaimec.com/`.
- Sync `<Seo>` call in `Index.tsx` to the new homepage title/description strings so the React head matches.
- No `react-helmet-async`, no `main.tsx` changes, no `PageMeta` — deferred.

## Out of scope (pass 2)
- vite-imagetools / AVIF-WebP pipeline
- `assetsInlineLimit` Vite change
- Per-route canonical/og:url via Helmet

## Credit estimate
~**5–8 credits**: one ffmpeg re-encode + poster extraction, `Index.tsx` refactor, `MobileHero.tsx` update, moving mobile hero to `public/`, `index.html` edits. No dependencies added.

Execution order: video → hero conditional → carousel lazy-load → LCP preload (with public-path verification) → static metadata.
