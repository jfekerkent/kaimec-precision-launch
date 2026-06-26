// Maps "Machine of Interest" + kW to a public PDF download URL.
// PDFs are served as static assets from /public/quotations/ on the deployed site.
// To add or replace a quotation, drop the PDF into public/quotations/ with the
// matching filename below, then add an entry keyed by `${machine}|${kW}`.

export const QUOTATION_PDFS: Record<string, string> = {
  "FLO-1530 Open Type Fiber Laser|3 kW": "/quotations/flo-1530-3kw.pdf",
  "FLO-1530 Open Type Fiber Laser|6 kW": "/quotations/flo-1530-6kw.pdf",
};

/**
 * Returns an absolute URL to the quotation PDF for the given machine + kW, or
 * an empty string if no quotation is available for that combination.
 */
export function getQuotationLink(machine: string, powerKw?: string): string {
  if (!machine || !powerKw) return "";
  const key = `${machine}|${powerKw}`;
  const path = QUOTATION_PDFS[key];
  if (!path) return "";
  if (typeof window === "undefined") return path;
  return `${window.location.origin}${path}`;
}