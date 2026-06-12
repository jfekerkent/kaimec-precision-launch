## Remove navbar left/right margins

The navbar currently sits inside a `max-w-7xl mx-auto` container (`src/components/Navbar.tsx` line 45). On wide screens this creates white gutters on both sides.

**Change:**
- `src/components/Navbar.tsx`: Replace `max-w-7xl mx-auto` with just `w-full` on the inner container so nav content stretches edge-to-edge.

No other styles or components will be touched.