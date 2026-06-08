## Plan

### Goal
Add a "Dealers" navigation item under the "More" dropdown and create a dedicated page listing the Canada dealer (Marco Franchitto / Executive Technologies Group Inc.).

### Changes

1. **New Page — `src/pages/Dealers.tsx`**
   - Use the existing `Layout` wrapper (Navbar + Footer + `pt-24` main).
   - Follow the visual style of `About.tsx` (section labels, uppercase headings, card/grid layouts).
   - Display the Canada dealer entry with all provided details:
     - Name: Marco Franchitto – President
     - Company: Executive Technologies Group Inc.
     - Address: 7-1455 Britannia Rd E. | Mississauga | Ontario | L4W 1C7
     - Office: 289-212-ETGI(3844)
     - Mobile: 416-951-7800
     - Website: www.etgi.ca

2. **Routing — `src/App.tsx`**
   - Add `import Dealers from "./pages/Dealers";`
   - Add `<Route path="/dealers" element={<Dealers />} />` inside `<Routes>`.

3. **Navbar — `src/components/Navbar.tsx`**
   - Append `{ label: "Dealers", to: "/dealers" }` to the `moreLinks` array so it appears in both desktop and mobile "More" dropdowns.

### Out of scope (unless requested)
- Adding dealer to Footer quick-links.
- SEO meta tags beyond basic `<title>` / `<meta name="description">`.
- Multiple dealer cards / regional filters.
- Contact form on the dealers page.