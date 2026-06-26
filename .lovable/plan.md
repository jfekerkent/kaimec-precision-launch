# HubSpot Contact Sync — Implementation Plan

## 1. Link HubSpot connection to project
Link "Joseph's Hubspot" so `HUBSPOT_API_KEY` is injected into edge functions.

## 2. New edge function: `hubspot-upsert-contact`
Public endpoint (no JWT). Validates input with Zod, calls HubSpot via the Lovable connector gateway:

- `POST /crm/v3/objects/contacts` to create
- On `409 CONFLICT` → search by email, then `PATCH /crm/v3/objects/contacts/{id}` to update
- Returns `{ ok, contactId }`; non-blocking from form perspective

**Property mapping** (per your spec):
| Input | HubSpot property |
|---|---|
| email | `email` |
| first name (split from name) | `firstname` |
| last name (split from name) | `lastname` |
| phone | `phone` |
| company | `company` |
| machine of interest | `machine_of_interest` (your existing custom property) |
| source | `lead_source` set to `"Hero"`, `"Request Info"`, `"Quotation"`, or `"AI Chat"` |

Other custom props (Machine Requested, Interest Notes, Priority, Dust Collector, Air Compressor checkboxes) — **not mapped now**, leave for later.

## 3. Wire 4 forms (fire-and-forget after existing email send)

- **`src/components/HeroLeadForm.tsx`** → source: `"Hero"`. Remove the dead `window._hsq` stub.
- **`src/components/RequestInfoForm.tsx`** → source: `"Request Info"`.
- **`src/pages/QuoteSummary.tsx`** (quotation submit) → source: `"Quotation"`, include selected machine.
- **`supabase/functions/chat/index.ts`** `capture_lead` tool → source: `"AI Chat"`, server-side fetch to the new function.

Failures are logged only — forms keep working if HubSpot is down.

## 4. Test
Submit one entry per form, verify each appears as a contact in HubSpot with correct `lead_source` and `machine_of_interest`.

---

### Out of scope (we can add later)
- Mapping Machine Requested, Interest Notes, Priority, accessory checkboxes
- Creating HubSpot Deals
- Backfilling existing `chat_leads` rows
