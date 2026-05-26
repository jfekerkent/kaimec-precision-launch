I found the issue: the Fully Enclosed Lasers card still points to `/machines/closed-type-fiber-laser#specifications`, but the actual Laser Cutting Machines route is `/machines/laser-cutting/closed-type-fiber-laser`.

Plan:
1. Update the Fully Enclosed Lasers card link in `src/pages/Index.tsx` to:
   `/machines/laser-cutting/closed-type-fiber-laser#specifications`
2. Fix `src/pages/ClosedTypeFiberLaser.tsx` so its own “View Specifications” button uses `#specifications` instead of the old `#specs` anchor.
3. Ensure the closed type page scroll handler targets the `specifications` section consistently.