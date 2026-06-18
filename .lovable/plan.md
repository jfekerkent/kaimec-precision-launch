Add "Automatic Loader" to the Accessories of Interest checkbox list on the quote request form.

## What to change
In `src/components/RequestInfoForm.tsx`, the `accessoryOptions` array currently has two items:
- "Dust / Smoke Collector"
- "Screw Type Air Compressor (30HP with Refrigerated Dryer)"

Add a third option:
- "Automatic Loader"

This will make the checkbox appear in the "Accessories of Interest (optional)" section on the quote summary page and any other page using `RequestInfoForm`.