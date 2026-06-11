## Plan

Replace the image slideshow on the left of the "The machines your shop needs..." heading (the "Why KAIMEC" section in `src/pages/Index.tsx`) with the 6 newly uploaded machine images.

### Steps

1. Upload the 6 attached images to Lovable Assets CDN via `lovable-assets create` and write `.asset.json` pointer files into `src/assets/`:
   - `slide-flo-1530-6kw.png.asset.json` (FLO_1530_X_6KW-2.png)
   - `slide-flc-1530-6kw.jpg.asset.json` (FLC_1530_6KW-2.jpg)
   - `slide-flo-2060.avif.asset.json` (mekotek-flo-2060...avif)
   - `slide-mkt-1560.jpg.asset.json` (mkt-1560.jpg)
   - `slide-flp-6020.png.asset.json` (FLP-6020-3.png)
   - `slide-flc-1530-4.png.asset.json` (FLC-1530-4-7.png)
   - `slide-flo-2040.png.asset.json` (FLO-2040-2-2.png)

   (Note: 6 images attached + 1 avif file = 7 total. I'll include all 7.)

2. In `src/pages/Index.tsx`:
   - Remove the 9 existing `slideshow-*` imports.
   - Import the 7 new `.asset.json` pointers and reference `.url`.
   - Replace the `facilitySlides` array with the 7 new image URLs.
   - Keep the same 1-second rotation, layout, sizing, and section structure unchanged.

3. No other sections, components, AI chatbot, EmailJS config, navigation, or product pages will be touched.

### Open question
The current slideshow has 9 slides; you've uploaded 7 images. I'll replace all 9 with the 7 new ones (the slideshow will simply cycle through 7). Confirm if you'd rather keep some of the existing slides mixed in.
