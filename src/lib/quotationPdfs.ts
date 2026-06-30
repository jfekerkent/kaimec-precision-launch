// Maps "Machine of Interest" + kW to a public PDF download URL.
// PDFs are served as static assets from /public/quotations/ on the deployed site.
// To add or replace a quotation, drop the PDF into public/quotations/ with the
// matching filename below, then add an entry keyed by `${machine}|${kW}`.

export const QUOTATION_PDFS: Record<string, string> = {
  "FLO-1530 Open Type Fiber Laser|3 kW": "/quotations/flo-1530-3kw.pdf",
  "FLO-1530 Open Type Fiber Laser|6 kW": "/quotations/flo-1530-6kw.pdf",
  "FLC-1530 Closed Type Fiber Laser|6 kW": "/quotations/flc-1530-6kw.pdf",
  "FLC-1530 Closed Type Fiber Laser|12 kW": "/quotations/flc-1530-12kw.pdf",
  "FLC-P 1530 Combo Laser|6 kW": "/quotations/flc-p-1530-6kw.pdf",
  "FLC-P 1530 Combo Laser|12 kW": "/quotations/flc-p-1530-12kw.pdf",
  "MKT-1560 CNC Press Brake": "/quotations/mkt-1560.pdf",
  "MKT-32135 CNC Press Brake": "/quotations/mkt-32135.pdf",
};

// Quotation PDFs keyed by the QuoteMachine slugs used on /quotations.
// Used by the Quotations summary / per-machine forms where we know the exact
// machine + kW combo via slug.
export const QUOTATION_PDFS_BY_SLUG: Record<string, string> = {
  "flo-1530-3kw": "/quotations/flo-1530-3kw.pdf",
  "flo-1530-6kw": "/quotations/flo-1530-6kw.pdf",
  "flc-1530-6kw": "/quotations/flc-1530-6kw.pdf",
  "flc-1530-12kw": "/quotations/flc-1530-12kw.pdf",
  "flc-p-1530-6kw": "/quotations/flc-p-1530-6kw.pdf",
  "flc-p-1530-12kw": "/quotations/flc-p-1530-12kw.pdf",
  "mkt-1560": "/quotations/mkt-1560.pdf",
  "mkt-32135": "/quotations/mkt-32135.pdf",
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

/**
 * Returns an absolute URL for a QuoteMachine slug (e.g. "flo-1530-3kw"). If
 * multiple slugs are provided (comma-separated), returns the first match.
 */
export function getQuotationLinkBySlug(slugs: string): string {
  if (!slugs) return "";
  const list = slugs.split(",").map((s) => s.trim()).filter(Boolean);
  for (const slug of list) {
    const path = QUOTATION_PDFS_BY_SLUG[slug];
    if (path) {
      return typeof window === "undefined" ? path : `${window.location.origin}${path}`;
    }
  }
  return "";
}