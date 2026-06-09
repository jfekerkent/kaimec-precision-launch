## Goal
Fix the hero background video so:
1. No YouTube branding ever flashes (no title bar, no big play/pause button, no spinner).
2. The video looks higher quality (sharper, less compressed).

## Why the current setup looks bad
The hero uses a YouTube embed (`/embed/jUQt7jNPrh8?...`). Even with `controls=0&modestbranding=1`, YouTube still shows:
- A brief title/branding bar at the very start before autoplay kicks in
- A center play/pause button on the first frame
- A low-bitrate stream — YouTube embeds auto-pick quality based on player size and there is no reliable parameter to force HD

There is no YouTube embed parameter combination that fully removes those overlays — it's a platform limitation.

## Recommended approach: self-hosted MP4
Replace the YouTube iframe with a native HTML5 `<video>` tag using a self-hosted MP4 served from Lovable's CDN (asset pointer). This gives:
- Zero branding, zero buttons, no spinner — ever
- Full control over bitrate/quality
- Faster first paint (no YouTube player bootstrap)
- True `autoplay muted loop playsinline` behavior

### What I need from you
Either:
- **(A)** Upload the source MP4 of that video (drag into chat). I'll push it to the CDN and wire it up.
- **(B)** Confirm it's okay for me to download the YouTube video `jUQt7jNPrh8` as an MP4 and host it on the CDN (only do this if you own/have rights to that footage — it's your KAIMEC content, correct?).

Target encoding: 1080p H.264, ~4–6 Mbps, no audio track (since it's muted anyway — cuts file size in half).

## Implementation steps (after you confirm)
1. Obtain the MP4 source (your upload or downloaded from your YouTube).
2. If needed, re-encode to a web-optimized 1080p MP4 with `+faststart` and audio stripped.
3. Upload via `lovable-assets` → get `src/assets/hero-video.mp4.asset.json`.
4. In `src/pages/Index.tsx` (lines 73–89), replace the `<iframe>` with:
   ```tsx
   <video
     src={heroVideo.url}
     autoPlay muted loop playsInline
     preload="auto"
     style={{ position:"absolute", top:"50%", left:"50%",
              transform:"translate(-50%,-50%)",
              width:"177.78vh", minWidth:"100%",
              height:"56.25vw", minHeight:"100%",
              objectFit:"cover", border:0, zIndex:0,
              pointerEvents:"none" }}
   />
   ```
5. Keep the existing dark gradient overlay (line 90–93) unchanged.
6. Apply the same treatment to the second hero/video on the page (line 187) only if you also want that one swapped — let me know.

## Fallback (if you'd rather stay on YouTube)
I can stack a black `<div>` over the iframe for the first ~1 second to mask YouTube's startup branding, but the player still occasionally shows a pause icon on hover/tap and quality won't improve. Not recommended.

## Decision needed
1. Approve switching to a self-hosted MP4? (yes / no)
2. Will you upload the MP4, or should I pull it from YouTube?
3. Apply the same fix to the second video (line 187) too?
