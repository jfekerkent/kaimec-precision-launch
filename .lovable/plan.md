## Add total price to quote breakdown

On the machine quote page (`src/pages/QuoteMachine.tsx`), under the "Indicative Pricing" list, add a **Total** row that sums:

- The machine base price (e.g. FLO-1530 x 3kW → $75,000)
- Only the accessories the user actually selected on the Quotations page (passed via the `?accessories=` query string), matched against the existing `accessoryPrices` table:
  - Dust / Smoke Collector → $22,000
  - Screw Type Air Compressor → $22,000

### Display

- Show line items only for selected accessories (currently both are hardcoded; will change to conditional based on `accessories` query param).
- Append a bold `Total: $XX,XXX FOB Tustin, CA` row with a top border separator.
- Keep the "Fill in information…" helper text below it.

### Example outputs

- Machine only: Total = $75,000
- Machine + Dust Collector: Total = $97,000
- Machine + both accessories: Total = $119,000

No backend or pricing-data changes — purely a presentation update in `QuoteMachine.tsx`.