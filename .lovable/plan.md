# Redesign accessory cards on /quotations

Scope: visual redesign of the two accessory cards (Dust / Smoke Collector, Screw Type Air Compressor) in `src/pages/Quotations.tsx` only. Selection state, query-string routing, machine cards, pricing logic in `QuoteSummary.tsx`, EmailJS/HubSpot/chat — all untouched.

## What changes

In `src/pages/Quotations.tsx`, replace the JSX inside the `accessories.map((a) => …)` block (lines ~198–245) with a new card layout. The `accessories` data array stays the same; we extend it locally with two new display-only fields:

- `displayPrice: string` — `"+$22,000"` for Dust Collector, `"+$8,500"` for Air Compressor (UI label only; does not alter `accessoryPrices` in `QuoteSummary.tsx`).
- `shortSubtitle: string` — `"Pulse Filter Cartridge · Stand-alone Unit"` and `"30HP · With Refrigerated Dryer"`.

Existing `toggleAccessory`, `selectedAccessories` Set, and the summary/CTA block remain unchanged.

## New card structure (per accessory)

Container: `<div>` (not a button) — `bg-[#111111] border rounded-lg overflow-hidden flex flex-col`, border `border-[#2a2a2a]` by default, `border-2 border-[#F5A623]` when selected.

1. **Image** — `h-[180px] w-full bg-[#1a1a1a] flex items-center justify-center overflow-hidden`. Uses the existing `dustCollectorImg` / `airCompressorImg` with `object-cover w-full h-full`. (Both assets exist; no placeholder needed.)
2. **Body** — `p-4 flex flex-col gap-3`:
   - Name: `text-[18px] font-bold text-white leading-tight`
   - Subtitle: `text-[13px] text-neutral-400`
   - **Specs accordion**: shadcn `<Accordion type="single" collapsible>` with one item. Trigger styled as `text-[13px] text-[#F5A623] hover:no-underline` reading `View Specs`. Content renders the existing `a.specs` array as a two-column list — each row `flex justify-between gap-4 py-2 border-b border-[#2a2a2a] last:border-0`, key `text-neutral-400 text-[13px]`, value `text-white text-[13px] text-right`.
3. **Add row** — `mt-auto px-4 py-3 border-t border-[#2a2a2a] flex items-center justify-between`:
   - Left: `<span className="text-white font-semibold">{a.displayPrice}</span>`
   - Right: a `<button onClick={() => toggleAccessory(a.id)}>` toggling between:
     - Unselected: `border border-[#F5A623] text-[#F5A623] hover:bg-[#F5A623]/10 px-4 py-2 rounded-md text-sm font-semibold` → `+ Add to Quote`
     - Selected: `bg-[#F5A623] text-[#111111] px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-1` → `✓ Added` (Check icon from lucide-react)

The whole card is no longer a `<button>` — only the Add to Quote control toggles selection. The check-badge in the top-right corner is removed (the border + button state communicate selection).

## Grid

Wrapping grid stays `grid gap-6 sm:grid-cols-2 max-w-4xl` (already side-by-side on desktop, stacked on mobile).

## Files

- `src/pages/Quotations.tsx` — only the accessories `data array` (add two fields) and the accessories `.map(...)` JSX. Also add `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` imports from `@/components/ui/accordion`.

No other files modified.
