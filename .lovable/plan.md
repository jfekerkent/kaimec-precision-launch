## Replace FLP-6035 rollover images

Mirror the FLP-6020 update for FLP-6035 on `/machines/tube-profile-lasers`.

**Steps**
1. Upload the 3 attached images via `lovable-assets` and write pointer files to `src/assets/flp-6035-1.png.asset.json`, `flp-6035-2.png.asset.json`, `flp-6035-3.png.asset.json`.
2. In `src/pages/TubeProfileLasers.tsx`:
   - Replace the `flp6035Front` / `flp6035Side` imports with the 3 new `.asset.json` imports.
   - Update the `kflp-6035` entry's `images` array to `[flp6035_1.url, flp6035_2.url, flp6035_3.url]`.

No other pages or styling touched.
