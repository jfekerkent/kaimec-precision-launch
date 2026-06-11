## Goal
Replace the YouTube embed in the "Kaimec Laser Cutting Machines in Action" section with a self-hosted MP4 — instant autoplay, muted loop, no chrome — matching the hero video's behavior.

## Processing (no re-encode)
Using `ffmpeg -c copy` (stream copy, zero quality loss):

1. Trim an **8-second** clip starting at `00:00:49` from the uploaded source.
2. **Strip audio** (video is muted anyway).
3. Add `+faststart` so the moov atom is at the front and playback can start before the file fully downloads.

No re-encoding — the video bytes are bit-for-bit identical to the source. Expected size for an 8-second slice at 14.6 Mbps: roughly **14–15 MB**.

Heads-up: that's significantly heavier than the hero video, so first paint of the clip on slow connections will be slower than the hero. If load feels sluggish once you see it, we can re-run with a light CRF 20 pass (visually identical, ~4 MB) without touching anything else.

## Upload
Push the trimmed MP4 to the Lovable Assets CDN and write an `.asset.json` pointer at `src/assets/laser-cutting.mp4.asset.json`.

## Code change — `src/pages/Index.tsx` (lines 210–220 only)

Swap the YouTube `<iframe>` for a `<video>` mirroring the hero's exact config:

```tsx
<video
  src={laserCuttingVideo.url}
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  controls={false}
  disablePictureInPicture
  disableRemotePlayback
  onLoadedMetadata={(e) => {
    const v = e.currentTarget;
    v.controls = false;
    v.play().catch(() => {});
  }}
  className="absolute inset-0 w-full h-full object-cover"
/>
```

Wrapper (`relative aspect-video rounded-xl shadow-2xl ring-1 ring-black/5 bg-black`) stays exactly as-is. No other section is touched.

## Untouched
Hero video, AI chatbot, EmailJS, HubSpot form, navigation, all product pages, every other homepage section, and the video container styling/cropping.

## Verify
Run `bun run build`, then check the preview to confirm the clip autoplays instantly and loops cleanly at the 8-second mark.