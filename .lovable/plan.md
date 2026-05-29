## Goal

Replace the current phone number `(562) 350-2071` with the new main number `+1 (949) 543-1508` across the site, while keeping the original 562 number only on the Consultation page "Prefer to Just Call?" section (salesperson direct line).

## Files to update (replace 562-350-2071 → 949-543-1508)

- `src/components/Navbar.tsx` — top bar phone link
- `src/components/Footer.tsx` — contact list phone link
- `src/pages/Quote.tsx` — Contact Information card
- `src/pages/Faq.tsx` — "Call …" CTA button
- `src/pages/GunDrills.tsx` — secondary CTA label/href and bottom "CALL …" link
- `src/pages/FlcP1530.tsx` — sidebar phone button
- `src/pages/ClosedTypeFiberLaser.tsx` — phone link
- `src/pages/Eblast1.tsx` — phone link
- `src/hooks/useChat.ts` — both chat error fallback strings
- `src/agent/system-prompt.md` and `supabase/functions/chat/system-prompt.md` / `system-prompt.ts` — all references in the agent's contact lines

Display format: `(949) 543-1508`. `tel:` href: `tel:+19495431508`.

## Files to leave unchanged

- `src/pages/Consultation.tsx` — "Prefer to Just Call?" keeps `562-350-2071` (salesperson direct).

## Verification

Re-run `rg "562|949"` after edits to confirm only Consultation.tsx still holds the 562 number and all other locations show the new 949 number.