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
  { name: "Fiber Laser Cutting Machines", slug: "cnc-fiber-lasers", description: "High-speed precision fiber laser cutting systems for sheet metal fabrication." },
  { name: "Tube & Profile Lasers", slug: "tube-profile-lasers", description: "Specialized laser systems for cutting tubes, pipes, and structural profiles." },
  { name: "Press Brakes", slug: "press-brakes", description: "CNC hydraulic and electric press brakes for precision metal bending." },
  { name: "Gun Drills", slug: "gun-drills", description: "Deep hole drilling machines for precision boring in demanding industrial applications." },
];

export const machines: Machine[] = [
  {
    id: "kflo-1530",
    model: "FLO-1530",
    category: "Fiber Laser Cutting Machines",
    categorySlug: "cnc-fiber-lasers",
    description: "Open Type Fiber Laser Cutting Machine",
    specs: { "Laser Power": "3,000W", "Bed Size": "3000 × 1500 mm", "Max Speed": "100 m/min", "Positioning Accuracy": "±0.03 mm" },
    image: "kflo-1530",
  },
  {
    id: "kflo-p-1530",
    model: "FLO-P 1530",
    category: "Fiber Laser Cutting Machines",
    categorySlug: "cnc-fiber-lasers",
    description: "Open Type Fiber Laser Cutting Machine",
    specs: { "Laser Power": "6,000W", "Bed Size": "3000 × 1500 mm", "Max Speed": "120 m/min", "Positioning Accuracy": "±0.03 mm" },
    image: "kflo-p-1530",
  },
  {
    id: "kflc-1530",
    model: "FLC-1530",
    category: "Fiber Laser Cutting Machines",
    categorySlug: "cnc-fiber-lasers",
    description: "Closed Type Fiber Laser Cutting Machine",
    specs: { "Laser Power": "6,000W", "Bed Size": "3000 × 1500 mm", "Max Speed": "120 m/min", "Positioning Accuracy": "±0.03 mm" },
    image: "fiber-laser",
  },
  {
    id: "kflc-p-1530",
    model: "FLC-P 1530",
    category: "Fiber Laser Cutting Machines",
    categorySlug: "cnc-fiber-lasers",
    description: "Closed Type Pipe & Profile Fiber Laser",
    specs: { "Laser Power": "12,000W", "Bed Size": "3000 × 1500 mm", "Max Speed": "140 m/min", "Positioning Accuracy": "±0.02 mm" },
    image: "fiber-laser",
  },
  {
    id: "kflp-6020",
    model: "FLP-6020",
    category: "Tube & Profile Lasers",
    categorySlug: "tube-profile-lasers",
    description: "Tube & Profile Laser",
    specs: { "Laser Power": "3,000W", "Max Tube Length": "6,000 mm", "Max Diameter": "200 mm", "Chuck Type": "4-jaw pneumatic" },
    image: "tube-laser",
  },
  {
    id: "kflp-6035",
    model: "FLP-6035",
    category: "Tube & Profile Lasers",
    categorySlug: "tube-profile-lasers",
    description: "Tube & Profile Laser",
    specs: { "Laser Power": "6,000W", "Max Tube Length": "6,000 mm", "Max Diameter": "350 mm", "Chuck Type": "4-jaw servo" },
    image: "tube-laser",
  },
  {
    id: "kmkt-1560",
    model: "MKT-1560",
    category: "Press Brakes",
    categorySlug: "press-brakes",
    description: "Press Brake",
    specs: { "Tonnage": "60 tons", "Bending Length": "1,500 mm", "Stroke": "200 mm", "Controller": "DA-66T" },
    image: "press-brake",
  },
  {
    id: "kmkt-32135",
    model: "MKT-32135",
    category: "Press Brakes",
    categorySlug: "press-brakes",
    description: "Press Brake",
    specs: { "Tonnage": "135 tons", "Bending Length": "3,200 mm", "Stroke": "250 mm", "Controller": "DA-69T" },
    image: "press-brake",
  },
  {
    id: "gun-drilling-machine",
    model: "TSK-2150 × 3000mm",
    category: "Gun Drills",
    categorySlug: "gun-drills",
    description: "Deep Hole Drilling & Boring Machine",
    specs: { "Drilling Diameter": "Ø30 – Ø150 mm", "Boring Diameter": "Ø40 – Ø500 mm", "Max Processing Depth": "3,000 mm", "Spindle Motor": "30 kW", "Machine Weight": "~39 Tons" },
    image: "tsk-2150",
  },
];

export function getMachinesByCategory(slug: string) {
  return machines.filter((m) => m.categorySlug === slug);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
