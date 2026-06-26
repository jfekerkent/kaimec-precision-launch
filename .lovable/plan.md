## Changes

### 1. Add kW dropdown for laser categories (RequestInfoForm)
After the "Specific Model" step, add a third dropdown labeled **Power (kW)** with options **3 kW / 6 kW / 12 kW**. Only show it when the selected category is one of:
- Open Type Fiber Laser
- Closed Type Fiber Laser
- Combo Lasers (Sheet + Pipe Cutting)
- Tube & Profile Laser

(Not shown for CNC Press Brakes, Gun / BTA Drilling, or Multiple / Not sure yet.)

Behavior:
- Required when visible — submit blocks until a kW is picked.
- Selected kW is appended to the final model string sent everywhere (EmailJS team + reply, HubSpot Forms, `hubspot-upsert-contact` edge function), e.g. `FLO-1530 Open Type Fiber Laser — 6 kW`. That way it lands in HubSpot's `machine_of_interest` field with no schema change, and the quotation-PDF mapping continues to work (matching is on the model prefix).
- Pre-fill from URL/path stays unchanged; kW starts empty and the user picks it.

### 2. Quotations page form (QuoteSummary) — hide Machine of Interest from customer
On `/quotations/summary` the customer already picked machines + accessories on cards, so the form shouldn't re-ask. Changes scoped to this page only — all other forms (Hero, Request Info on machine pages) keep the dropdowns:

- Add a new prop `hideMachineSelector?: boolean` to `RequestInfoForm`.
- When true:
  - Do NOT render the Machine of Interest category/model dropdowns, the kW dropdown, or the Accessories checkboxes.
  - Invisibly carry the machines + accessories already chosen on the Quotations page (passed in via the existing `machine` prop, which already contains `"<machines> + <accessories>"`).
  - These hidden values still flow to:
    - EmailJS team template (seller sees full machine + accessories list)
    - HubSpot Forms submission (`machine_of_interest` + `accessories_selected`)
    - `hubspot-upsert-contact` edge function
  - Customer-facing auto-reply continues to send the right quotation PDF link based on the hidden machine value.
- In `QuoteSummary.tsx`:
  - Pass `hideMachineSelector` to the form.
  - Remove the visible "Pricing for: …" and "Accessories: …" lines above the form (or keep — confirm if you want them removed too; the request was specifically about the form fields, so I'll keep the summary text above the form since that's the whole point of the page).

### Files touched
- `src/components/RequestInfoForm.tsx` — add kW dropdown + `hideMachineSelector` prop logic.
- `src/pages/QuoteSummary.tsx` — pass `hideMachineSelector` to the form.

No backend/schema changes. HubSpot continues to receive the model + kW as a single free-text string in `machine_of_interest`.
