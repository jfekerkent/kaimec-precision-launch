## Goal
Update the AI chat agent so it collects **name** and **company** as two separate questions, and pass `company` into the HubSpot upsert so it maps to the HubSpot `company` property.

## Changes

### 1. `supabase/functions/chat/system-prompt.ts` (and mirror `src/agent/system-prompt.md`)
Update the email-capture flow instructions:
- After receiving the email, ask for name and company on **separate lines** as two distinct questions:
  - "What's your name?"
  - "What company are you with?"
- Remove the current combined "And your name / company?" phrasing.
- Reinforce: only fire `capture_lead` once name AND company AND email are all collected.

### 2. `supabase/functions/chat/index.ts` — `capture_lead` tool schema
- Add `company` as an accepted (optional) input property on the tool.
- When invoking `hubspot-upsert-contact`, pass `company: input.company` through.

### 3. `src/agent/types.ts` (if `ToolCall` input is typed) and `src/hooks/useChat.ts`
- `fireLeadEmail` already reads loosely from input — add `company` so the EmailJS team template gets the real company instead of the hardcoded "(captured via AI Chat Agent)" string. (Fallback to that string if company is missing.)

### 4. Verify
- Hit the `chat` edge function with a simulated multi-turn conversation and confirm `capture_lead` receives `company` and the HubSpot upsert payload includes it.

## Notes
- HubSpot mapping in `hubspot-upsert-contact` already handles `company` and splits `name` into firstname/lastname — no changes needed there.
- No DB schema changes; `chat_leads` already has no company column and we won't add one unless you want it persisted there too (let me know).
