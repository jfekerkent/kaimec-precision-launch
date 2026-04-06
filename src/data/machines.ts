export interface Machine {
  id: string;
  model: string;
  category: string;
  categorySlug: string;
  description: string;
  specs: Record<string, string>;
  image: string;
}

export const categories = [
  { name: "CNC Fiber Lasers", slug: "cnc-fiber-lasers", description: "High-speed precision fiber laser cutting systems for sheet metal fabrication." },
  { name: "Tube & Profile Lasers", slug: "tube-profile-lasers", description: "Specialized laser systems for cutting tubes, pipes, and structural profiles." },
  { name: "Press Brakes", slug: "press-brakes", description: "CNC hydraulic and electric press brakes for precision metal bending." },
  { name: "Panel Benders", slug: "panel-benders", description: "Automated panel bending systems for high-volume sheet metal production." },
];

export const machines: Machine[] = [
  {
    id: "fl-3015",
    model: "KM-FL 3015",
    category: "CNC Fiber Lasers",
    categorySlug: "cnc-fiber-lasers",
    description: "3kW fiber laser with 3000×1500mm bed, IPG source, automatic pallet changer.",
    specs: { "Laser Power": "3,000W", "Bed Size": "3000 × 1500 mm", "Max Speed": "100 m/min", "Positioning Accuracy": "±0.03 mm" },
    image: "fiber-laser",
  },
  {
    id: "fl-6020",
    model: "KM-FL 6020",
    category: "CNC Fiber Lasers",
    categorySlug: "cnc-fiber-lasers",
    description: "6kW high-power fiber laser with 6000×2000mm bed for heavy plate cutting.",
    specs: { "Laser Power": "6,000W", "Bed Size": "6000 × 2000 mm", "Max Speed": "120 m/min", "Positioning Accuracy": "±0.03 mm" },
    image: "fiber-laser",
  },
  {
    id: "fl-12025",
    model: "KM-FL 12025",
    category: "CNC Fiber Lasers",
    categorySlug: "cnc-fiber-lasers",
    description: "12kW ultra-high-power fiber laser for thick plate processing up to 40mm.",
    specs: { "Laser Power": "12,000W", "Bed Size": "12000 × 2500 mm", "Max Speed": "140 m/min", "Positioning Accuracy": "±0.02 mm" },
    image: "fiber-laser",
  },
  {
    id: "tl-6016",
    model: "KM-TL 6016",
    category: "Tube & Profile Lasers",
    categorySlug: "tube-profile-lasers",
    description: "Tube laser for round, square, and rectangular profiles up to 160mm diameter.",
    specs: { "Laser Power": "3,000W", "Max Tube Length": "6,000 mm", "Max Diameter": "160 mm", "Chuck Type": "4-jaw pneumatic" },
    image: "tube-laser",
  },
  {
    id: "tl-9022",
    model: "KM-TL 9022",
    category: "Tube & Profile Lasers",
    categorySlug: "tube-profile-lasers",
    description: "Heavy-duty tube laser for large-diameter pipes and structural profiles.",
    specs: { "Laser Power": "6,000W", "Max Tube Length": "9,000 mm", "Max Diameter": "220 mm", "Chuck Type": "4-jaw servo" },
    image: "tube-laser",
  },
  {
    id: "pb-110t",
    model: "KM-PB 110T",
    category: "Press Brakes",
    categorySlug: "press-brakes",
    description: "110-ton CNC hydraulic press brake with DA-66T controller, 3100mm bending length.",
    specs: { "Tonnage": "110 tons", "Bending Length": "3,100 mm", "Stroke": "200 mm", "Controller": "DA-66T" },
    image: "press-brake",
  },
  {
    id: "pb-220t",
    model: "KM-PB 220T",
    category: "Press Brakes",
    categorySlug: "press-brakes",
    description: "220-ton heavy-duty press brake for thick plate bending, 4000mm length.",
    specs: { "Tonnage": "220 tons", "Bending Length": "4,000 mm", "Stroke": "250 mm", "Controller": "DA-69T" },
    image: "press-brake",
  },
  {
    id: "pb-400t",
    model: "KM-PB 400T",
    category: "Press Brakes",
    categorySlug: "press-brakes",
    description: "400-ton tandem press brake for extra-long bending applications.",
    specs: { "Tonnage": "400 tons", "Bending Length": "6,000 mm", "Stroke": "300 mm", "Controller": "DA-69T" },
    image: "press-brake",
  },
  {
    id: "pnb-2520",
    model: "KM-PNB 2520",
    category: "Panel Benders",
    categorySlug: "panel-benders",
    description: "Automated panel bender for complex bends, 2500mm working length.",
    specs: { "Working Length": "2,500 mm", "Max Thickness": "2.0 mm (steel)", "Bending Height": "200 mm", "Cycle Time": "< 8 sec/bend" },
    image: "panel-bender",
  },
  {
    id: "pnb-3220",
    model: "KM-PNB 3220",
    category: "Panel Benders",
    categorySlug: "panel-benders",
    description: "High-speed panel bending center with automatic tool setup, 3200mm length.",
    specs: { "Working Length": "3,200 mm", "Max Thickness": "2.5 mm (steel)", "Bending Height": "250 mm", "Cycle Time": "< 6 sec/bend" },
    image: "panel-bender",
  },
];

export function getMachinesByCategory(slug: string) {
  return machines.filter((m) => m.categorySlug === slug);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
