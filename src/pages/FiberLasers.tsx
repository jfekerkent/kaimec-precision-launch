import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import Layout from "@/components/Layout";
import MachineGallery from "@/components/MachineGallery";
import kflc1530Img from "@/assets/machine-kflc-1530.png";
import kflo1530Img from "@/assets/machine-kflo-1530.png";
import kfloP1530Img from "@/assets/machine-kflo-p-1530.jpg";

const machines = [
  { id: "kflo-1530", model: "KFLO-1530", description: "Open Type Fiber Laser Cutting Machine", images: [kflo1530Img, kfloP1530Img, "placeholder:3", "placeholder:4"] },
  { id: "kflo-p-1530", model: "KFLO-P 1530", description: "Open Type Fiber Laser Cutting Machine", images: [kfloP1530Img, kflo1530Img, "placeholder:3", "placeholder:4"] },
  { id: "kflc-1530", model: "KFLC-1530", description: "Closed Type Fiber Laser Cutting Machine", images: [kflc1530Img, "placeholder:2", "placeholder:3", "placeholder:4"] },
  { id: "kflc-p-1530", model: "KFLC-P 1530", description: "Covered Type Pipe & Profile Fiber Laser", images: [kflc1530Img, "placeholder:2", "placeholder:3", "placeholder:4"] },
];

const specRows = [
  { label: "Working Area", values: ["1500 x 3000 mm", "1500 x 3000 mm", "1500 x 3000 mm", "1500 x 3000 mm"] },
  { label: "Loading Capacity", values: ["1200 kg", "1200 kg", "1200 kg", "1200 kg"] },
  { label: "X-Y Axis Travel", values: ["1520 x 3030 mm", "1520 x 3030 mm", "1520 x 3030 mm", "1520 x 3030 mm"] },
  { label: "Z Axis Travel", values: ["100 mm", "100 mm", "300 mm", "300 mm"] },
  { label: "X-Y-Z Axis Guideway", values: ["4 Point Ball Caged", "4 Point Ball Caged", "4 Point Ball Caged", "4 Point Ball Caged"] },
  { label: "X-Y Axis Drive System", values: ["Rack", "Rack", "Rack", "Rack"] },
  { label: "Z Axis Drive System", values: ["Ballscrew", "Ballscrew", "Ballscrew", "Ballscrew"] },
  { label: "X-Y Axis Speed", values: ["80 m/min", "80 m/min", "100 m/min", "100 m/min"] },
  { label: "Z Axis Speed", values: ["30 m/min", "30 m/min", "30 m/min", "30 m/min"] },
  { label: "X-Y Position Accuracy", values: ["0.05 mm", "0.05 mm", "0.05 mm", "0.05 mm"] },
  { label: "X-Y Repeatability Accuracy", values: ["0.03 mm", "0.03 mm", "0.03 mm", "0.03 mm"] },
  { label: "Table Change Time", values: ["—", "—", "10 sec", "10 sec"] },
  { label: "Laser Source", values: ["Raycus / JPT / Han's", "Raycus / JPT / Han's", "Raycus / Han's / JPT", "Raycus / Han's / JPT"] },
  { label: "Laser Output Power", values: ["1000 / 2000 / 3000W", "1000 / 2000 / 3000W", "2 / 3 / 4 / 6 / 8 / 12 / 20 kW", "2 / 3 / 4 / 6 / 8 / 12 / 20 kW"] },
  { label: "CNC Control System", values: ["Fscut", "Fscut", "Fscut", "Fscut"] },
  { label: "Laser Cutting Head", values: ["Raytools / BOCI / WSX", "Raytools / BOCI / WSX", "Raytools / BOCI / WSX", "Raytools / BOCI / WSX"] },
  { label: "Assist Gases", values: ["Air / Oxygen / Nitrogen", "Air / Oxygen / Nitrogen", "Air / Oxygen / Nitrogen", "Air / Oxygen / Nitrogen"] },
  { label: "Cooling Type", values: ["Water Cooling", "Water Cooling", "Water Cooling", "Water Cooling"] },
  { label: "Machine Weight", values: ["4500 kg", "4500 kg", "8500 kg", "12000 kg"] },
  { label: "Graphic Format", values: ["dwg / dxf / stp", "dwg / dxf / stp", "dwg / dxf / stp", "dwg / dxf / stp"] },
  { label: "Voltage", values: ["220 or 380V / 3ph / 60Hz", "220 or 380V / 3ph / 60Hz", "220 or 380V / 60Hz", "220 or 380V / 60Hz"] },
  { label: "Certifications", values: ["CE / ISO", "CE / ISO", "CE / ISO", "CE / ISO"] },
];

const cuttingThickness = [
  { material: "Carbon Steel", values: ["10 mm", "14 mm", "16 mm"] },
  { material: "Stainless Steel", values: ["3 mm", "5 mm", "6 mm"] },
  { material: "Aluminium", values: ["2 mm", "4 mm", "5 mm"] },
  { material: "Brass", values: ["2 mm", "4 mm", "5 mm"] },
];

export default function FiberLasers() {
  return (
    <Layout>
      <section className="py-20 bg-secondary">
        <div className="container max-w-3xl text-center">
          <p className="section-label mb-3">Machine Catalog</p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">Fiber Laser Cutting Machines</h1>
          <p className="text-lg text-muted-foreground">High-speed precision fiber laser cutting systems for sheet metal fabrication.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {machines.map((m) => (
              <div key={m.id} className="rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors">
                <MachineGallery images={m.images} model={m.model} />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{m.model}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{m.description}</p>
                  <Link to="/quote">
                    <Button className="w-full font-bold">Request Quote</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container max-w-5xl">
          <h2 className="text-3xl font-black text-foreground mb-10 text-center">Product Highlights</h2>
          <div className="space-y-8">
            <div className="rounded-lg border border-border bg-card p-8">
              <h3 className="text-xl font-bold text-primary mb-3">Open Type — KFLO-1530 & KFLO-P 1530</h3>
              <p className="text-muted-foreground leading-relaxed">
                With its compact size and cost-effective operation, this machine series stands out as the ideal choice for businesses operating within tight budgets. Occupying just 15 square meters, it's easily installed and comes in 1kW, 2kW, and 3kW power variants. Ideal for rapid and repetitive tasks, it features standard nesting software, flycut-cutting, auto-focus laser head, and Active Anti-collision Function. Constructed with one-piece aluminium alloy sheet-plate welded bridges for rigidity and precision. CE certified.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-8">
              <h3 className="text-xl font-bold text-primary mb-3">Closed Type — KFLC-1530</h3>
              <p className="text-muted-foreground leading-relaxed">
                The FLC series epitomizes speed, sensitivity, reliability, and cost-effectiveness. Capable of handling laser power of up to 30,000W, it's an excellent choice for cutting thick plates. Features double exchange table design for continuous cutting, wireless remote control, nesting software, nozzle cleaning system, and double camera setup. CE certified.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-8">
              <h3 className="text-xl font-bold text-primary mb-3">Covered Type Pipe & Profile — KFLC-P 1530</h3>
              <p className="text-muted-foreground leading-relaxed">
                The FLC-P series is a fusion of speed, sensitivity, reliability and cost-effectiveness tailored for both sheet metal and pipe/profile cutting. Accommodates laser power up to 20,000W. Features 6-meter pipe/profile cutting length (extendable to 9m), pipe diameters up to 350mm, double exchange table, wireless remote control, nozzle cleaning system, and double camera setup. CE certified.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-black text-foreground mb-10 text-center">Specification Comparison</h2>
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/10">
                  <TableHead className="font-bold text-foreground min-w-[180px]">Specification</TableHead>
                  <TableHead className="font-bold text-foreground text-center">KFLO-1530</TableHead>
                  <TableHead className="font-bold text-foreground text-center">KFLO-P 1530</TableHead>
                  <TableHead className="font-bold text-foreground text-center">KFLC-1530</TableHead>
                  <TableHead className="font-bold text-foreground text-center">KFLC-P 1530</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {specRows.map((row, i) => (
                  <TableRow key={row.label} className={i % 2 === 0 ? "bg-muted/30" : ""}>
                    <TableCell className="font-medium text-foreground">{row.label}</TableCell>
                    {row.values.map((val, j) => (
                      <TableCell key={j} className="text-center text-muted-foreground">{val}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-black text-foreground mb-4 text-center">Cutting Thickness — KFLO Open Type</h2>
          <p className="text-muted-foreground text-center mb-10">Maximum cutting thickness by material and laser power.</p>
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/10">
                  <TableHead className="font-bold text-foreground">Material</TableHead>
                  <TableHead className="font-bold text-foreground text-center">1000W</TableHead>
                  <TableHead className="font-bold text-foreground text-center">2000W</TableHead>
                  <TableHead className="font-bold text-foreground text-center">3000W</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cuttingThickness.map((row, i) => (
                  <TableRow key={row.material} className={i % 2 === 0 ? "bg-muted/30" : ""}>
                    <TableCell className="font-medium text-foreground">{row.material}</TableCell>
                    {row.values.map((val, j) => (
                      <TableCell key={j} className="text-center text-muted-foreground">{val}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container text-center">
          <Link to="/quote">
            <Button size="lg" className="font-bold px-10">Request a Quote</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
