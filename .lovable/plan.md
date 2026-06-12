# Make quote-summary machine images flush & same size

In `src/pages/QuoteSummary.tsx`, each selected machine card renders its image inside a `w-fit` wrapper with `max-h-[200px]` and `object-contain`. Because the wrapper sizes to the image, machines with different aspect ratios render at visibly different widths — the two cards end up mismatched.

## Change

Rewrite the image area of each card (lines ~77–96) so both cards share an **identical fixed-size image frame**:

- Replace the `w-fit` flex wrapper with a full-width frame: `relative w-full aspect-[4/3] bg-white flex items-center justify-center`.
- Make the main `<img>` fill that frame uniformly: `absolute inset-0 w-full h-full object-contain p-3`.
- Move the accessory thumbnails out of the image flex row and into a small overlay strip in the top-right corner of the same frame (`absolute top-2 right-2 flex flex-col gap-1`), so the accessory column no longer steals horizontal space from the main image.
- Keep the card container as-is otherwise so spacing matches the rest of the layout.

Result: both cards have an identical image box (same width and height), each machine photo is centered and scaled uniformly, and accessory icons sit as small overlays — flush and consistent.

No data, pricing, or form changes.
