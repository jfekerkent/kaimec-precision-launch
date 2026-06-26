# Per-kW Quotation PDF Mapping

## Scope
Today the auto-reply PDF link is chosen by **machine model only**. Extend it so it picks the PDF by **machine model + kW**. Start with FLO-1530 (3 kW and 6 kW). Everything else continues to behave as it does today.

## Behavior

When a customer submits a Request Info form:
- Picks **Open Type Fiber Laser → FLO-1530 → 3 kW** → auto-reply links `flo-1530-3kw.pdf`
- Picks **Open Type Fiber Laser → FLO-1530 → 6 kW** → auto-reply links `flo-1530-6kw.pdf`
- Picks **FLO-1530** with any other kW (none expected today, but safe) → no download link in the auto-reply (current fallback behavior).
- Picks any other model (FLO-2040, FLC-anything, combos, tube, press brakes, gun drill) → no download link in the auto-reply (per your "no link" fallback). I'll **remove the current stub mappings** that point those models at a non-existent generic PDF so customers don't get a broken download button.

HubSpot / EmailJS team notification / `machine_of_interest` field are unchanged. Only the customer-facing reply link changes.

## Files

- `src/lib/quotationPdfs.ts` — change the lookup key from `machine` to `machine + kW`. New signature: `getQuotationLink(machine: string, powerKw?: string)`. Internal map keyed by composite string like `"FLO-1530 Open Type Fiber Laser|3 kW"`. Seed it with the two FLO-1530 entries. Drop the stub entries for all other models.
- `src/components/RequestInfoForm.tsx` — pass `powerKw` into `getQuotationLink(...)` when building the auto-reply payload. No UI changes (the kW dropdown already exists for laser categories).
- `public/quotations/` — you'll need to drop in `flo-1530-3kw.pdf` and `flo-1530-6kw.pdf`. I'll add a placeholder note in the file, but the actual PDFs need to be uploaded by you.

## What you need to provide
1. `flo-1530-3kw.pdf`
2. `flo-1530-6kw.pdf`

Drop them in chat and I'll place them at `public/quotations/flo-1530-3kw.pdf` and `public/quotations/flo-1530-6kw.pdf`. Once committed + deployed, the EmailJS reply template's existing `{{quotation_link}}` block will render the download button for those two combos.

## Not in scope
- No template change in EmailJS (the conditional `{{#quotation_link}}` block already handles the empty case).
- No changes to HubSpot upsert, team notification, or chat agent capture_lead.
- No new PDFs for other machines until you say so.
