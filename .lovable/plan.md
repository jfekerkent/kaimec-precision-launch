Wire up two more "View Specifications" links on the Index page.

1. **Combo Lasers card** (`src/pages/Index.tsx` line 40): change link to
   `/machines/laser-cutting/covered-pipe-profile-fiber-laser#specifications`.
   - In `src/pages/CoveredPipeProfileFiberLaser.tsx`, add `id="specifications"` and `scroll-mt-24` to the FLC-P "Technical Specs" section (line 382), and add a hash-based scroll `useEffect` like the other laser pages.

2. **Tube / Profile Cutting Lasers card – FLP 6035** (`src/pages/Index.tsx` line 41): change link to
   `/machines/tube-profile-lasers#specifications`.
   - In `src/pages/TubeProfileLasers.tsx`, add `id="specifications"` and `scroll-mt-24` to the "Technical Specifications" section (line 156), and add the hash-scroll `useEffect`.