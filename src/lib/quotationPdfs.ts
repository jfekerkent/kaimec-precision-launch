// Maps the "Machine of Interest" form value to a public PDF download URL.
// PDFs are served as static assets from /public/quotations/ on the deployed site.
// To add or replace a quotation, drop the PDF into public/quotations/ with the
// matching filename below.

export const QUOTATION_PDFS: Record<string, string> = {
  "FLO-1530 Open Type Fiber Laser": "/quotations/flo-1530.pdf",
  "FLO-2040 Open Type Fiber Laser": "/quotations/flo-1530.pdf",
  "FLO-2060 Open Type Fiber Laser": "/quotations/flo-1530.pdf",
  "FLC-1530 Closed Type Fiber Laser": "/quotations/flc-1530.pdf",
  "FLC-2040 Closed Type Fiber Laser": "/quotations/flc-1530.pdf",
  "FLC-2060 Closed Type Fiber Laser": "/quotations/flc-1530.pdf",
  "FLO-P 1530 Pallet Changer Laser": "/quotations/flo-p-1530.pdf",
  "FLO-P 2040 Pallet Changer Laser": "/quotations/flo-p-1530.pdf",
  "FLO-P 2060 Pallet Changer Laser": "/quotations/flo-p-1530.pdf",
  "Tube & Profile Laser": "/quotations/tube-profile.pdf",
  "Press Brake": "/quotations/press-brake.pdf",
  "Gun Drill": "/quotations/gun-drill.pdf",
};

/**
 * Returns an absolute URL to the quotation PDF for the given machine, or an
 * empty string if no quotation is available (e.g. "Multiple / Not sure yet").
 */
export function getQuotationLink(machine: string): string {
  const path = QUOTATION_PDFS[machine];
  if (!path) return "";
  if (typeof window === "undefined") return path;
  return `${window.location.origin}${path}`;
}