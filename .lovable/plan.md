## Goal
When a user submits the Request Info form, the auto-reply email includes a **download link** to the quotation PDF matching the selected machine.

## How it will work

1. **You upload the quotation PDFs** (one per machine option in the form):
   - FLO-1530 → `flo-1530.pdf`
   - FLC-1530 → `flc-1530.pdf`
   - FLO-P 1530 → `flo-p-1530.pdf`
   - Tube & Profile Laser → `tube-profile.pdf`
   - Press Brake → `press-brake.pdf`
   - Gun Drill → `gun-drill.pdf`

2. **Storage**: Create a public Lovable Cloud Storage bucket `quotations`. I'll upload the PDFs there when you provide them. Each gets a stable public URL.

3. **Mapping file** `src/lib/quotationPdfs.ts` — maps each machine value from the form dropdown to its public PDF URL.

4. **EmailJS auto-reply template update** (you do this in the EmailJS dashboard):
   - Add a new variable `{{quotation_link}}` to the customer auto-reply template.
   - Wrap it in conditional copy, e.g.:
     > "Attached below is the quotation for your selected machine:
     > 👉 [Download Quotation PDF]({{quotation_link}})"
   - If no machine match, the form will send an empty string and you can hide the section with EmailJS's `{{#quotation_link}}...{{/quotation_link}}` conditional block (Handlebars-style).

5. **`RequestInfoForm.tsx` update** — Before the EmailJS auto-reply call, look up the PDF URL for the selected machine and pass it as `quotation_link` in the template params. If "Multiple / Not sure yet" or no match, pass empty string. HubSpot upsert + team notification unchanged.

## What I need from you (after plan approval)

1. The 6 quotation PDF files.
2. After I deploy, update the EmailJS auto-reply template to include `{{quotation_link}}` (I'll give you the exact snippet to paste).
