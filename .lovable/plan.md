## Problem
`src/pages/QuoteSummary.tsx` still imports old accessory images:
- `dust-collector-v2.jpg` → should be `dust-collector-todc-4l.png`
- `air-compressor-v3.png` → should be `screw-air-compressor.png`

This causes the old dust collector photo to appear in the pricing breakdown thumbnail on the quote summary page.

## Fix
Update the two `import` statements at the top of `src/pages/QuoteSummary.tsx` to point to the new image files. No other logic or labels change — only the image sources.

## Verification
After the edit, the dust collector thumbnail on the quote summary page should display the new `dust-collector-todc-4l.png` image instead of the old one.