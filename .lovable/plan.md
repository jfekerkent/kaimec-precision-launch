Wire the homepage "View Specifications" link on the CNC Press Brakes cards (MKT 1560 / MKT 32135) to jump directly to the spec section on the CNC Press Brakes page, matching the pattern used for the laser cards.

1. **`src/pages/Index.tsx`** (line 212): change `to="/machines/press-brakes"` to `to="/machines/press-brakes#specifications"`.

2. **`src/pages/PressBrakes.tsx`**:
   - Add `id="specifications"` and `scroll-mt-24` to the specs section (`<section className="py-20 bg-[#f8f8f8]">`).
   - Add a `useLocation` + `useEffect` hash-scroll hook so navigating with `#specifications` smoothly scrolls to that section (same pattern as the other laser pages).

No other pages or sections are touched.