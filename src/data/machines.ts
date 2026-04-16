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
  
  { name: "Panel Benders", slug: "panel-benders", description: "CNC panel bending machines for high-speed, automated sheet metal forming." },
  { name: "Gun Drills", slug: "gun-drills", description: "Deep hole drilling machines for precision boring in demanding industrial applications." },
];

export const machines: Machine[] = [
  {
    id: "kflo-1530",
    model: "KFLO-1530",
    category: "Fiber Laser Cutting Machines",
    categorySlug: "cnc-fiber-lasers",
    description: "Open Type Fiber Laser Cutting Machine",
    specs: { "Laser Power": "3,000W", "Bed Size": "3000 × 1500 mm", "Max Speed": "100 m/min", "Positioning Accuracy": "±0.03 mm" },
    image: "kflo-1530",
  },
  {
    id: "kflo-p-1530",
    model: "KFLO-P 1530",
    category: "Fiber Laser Cutting Machines",
    categorySlug: "cnc-fiber-lasers",
    description: "Open Type Fiber Laser Cutting Machine",
    specs: { "Laser Power": "6,000W", "Bed Size": "3000 × 1500 mm", "Max Speed": "120 m/min", "Positioning Accuracy": "±0.03 mm" },
    image: "kflo-p-1530",
  },
  {
    id: "kflc-1530",
    model: "KFLC-1530",
    category: "Fiber Laser Cutting Machines",
    categorySlug: "cnc-fiber-lasers",
    description: "Closed Type Fiber Laser Cutting Machine",
    specs: { "Laser Power": "6,000W", "Bed Size": "3000 × 1500 mm", "Max Speed": "120 m/min", "Positioning Accuracy": "±0.03 mm" },
    image: "fiber-laser",
  },
  {
    id: "kflc-p-1530",
    model: "KFLC-P 1530",
    category: "Fiber Laser Cutting Machines",
    categorySlug: "cnc-fiber-lasers",
    description: "Closed Type Pipe & Profile Fiber Laser",
    specs: { "Laser Power": "12,000W", "Bed Size": "3000 × 1500 mm", "Max Speed": "140 m/min", "Positioning Accuracy": "±0.02 mm" },
    image: "fiber-laser",
  },
  {
    id: "kflp-6020",
    model: "KFLP-6020",
    category: "Tube & Profile Lasers",
    categorySlug: "tube-profile-lasers",
    description: "Tube & Profile Laser",
    specs: { "Laser Power": "3,000W", "Max Tube Length": "6,000 mm", "Max Diameter": "200 mm", "Chuck Type": "4-jaw pneumatic" },
    image: "tube-laser",
  },
  {
    id: "kflp-6035",
    model: "KFLP-6035",
    category: "Tube & Profile Lasers",
    categorySlug: "tube-profile-lasers",
    description: "Tube & Profile Laser",
    specs: { "Laser Power": "6,000W", "Max Tube Length": "6,000 mm", "Max Diameter": "350 mm", "Chuck Type": "4-jaw servo" },
    image: "tube-laser",
  },
  {
    id: "kmkt-1560",
    model: "KMKT-1560",
    category: "Press Brakes",
    categorySlug: "press-brakes",
    description: "Press Brake",
    specs: { "Tonnage": "60 tons", "Bending Length": "1,500 mm", "Stroke": "200 mm", "Controller": "DA-66T" },
    image: "press-brake",
  },
  {
    id: "kmkt-32135",
    model: "KMKT-32135",
    category: "Press Brakes",
    categorySlug: "press-brakes",
    description: "Press Brake",
    specs: { "Tonnage": "135 tons", "Bending Length": "3,200 mm", "Stroke": "250 mm", "Controller": "DA-69T" },
    image: "press-brake",
  },
  {
    id: "kmkj-32220",
    model: "KMKJ-32220",
    category: "Press Brakes",
    categorySlug: "press-brakes",
    description: "Press Brake",
    specs: { "Tonnage": "220 tons", "Bending Length": "3,200 mm", "Stroke": "300 mm", "Controller": "DA-69T" },
    image: "press-brake",
  },
  {
    id: "gun-drilling-machine",
    model: "Gun Drilling Machine",
    category: "Gun Drills",
    categorySlug: "gun-drills",
    description: "Gun Drilling Machine",
    specs: { "Max Drilling Depth": "1,500 mm", "Drill Diameter Range": "3–32 mm", "Spindle Speed": "500–6,000 RPM", "Coolant Pressure": "70 bar" },
    image: "gun-drill",
  },
  {
    id: "deep-hole-drilling-machine",
    model: "Deep Hole Drilling Machine",
    category: "Gun Drills",
    categorySlug: "gun-drills",
    description: "Deep Hole Drilling Machine",
    specs: { "Max Drilling Depth": "2,500 mm", "Drill Diameter Range": "5–40 mm", "Spindle Speed": "300–4,500 RPM", "Coolant Pressure": "100 bar" },
    image: "gun-drill",
  },
];

export function getMachinesByCategory(slug: string) {
  return machines.filter((m) => m.categorySlug === slug);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
