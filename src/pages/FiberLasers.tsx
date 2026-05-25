import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import Layout from "@/components/Layout";
import TrustSignals from "@/components/shared/TrustSignals";
import MachineGallery from "@/components/MachineGallery";
import { convertValue, type Unit } from "@/lib/unitConvert";
import UnitToggle from "@/components/UnitToggle";
import kflo1530Img from "@/assets/machine-kflo-primary.png";
import kfloSecondaryImg from "@/assets/machine-kflo-secondary.png";
import kfloTertiaryImg from "@/assets/machine-kflo-tertiary.png";
import kflc1530Img from "@/assets/machine-kflc-1530.png";
import flcP1530Img from "@/assets/flc-p-1530-1.png";
import flcP1530Img2 from "@/assets/flc-p-1530-2.png";
import flcP1530Img3 from "@/assets/flc-p-1530-3.png";
import flcP2040Img2 from "@/assets/flc-p-2040-2.png";
import mkt1560Img from "@/assets/machine-mkt-1560.png";
import mkt32135Img from "@/assets/machine-mkt-32135.png";

const machines = [
  { id: "kflo-1530", model: "FLO-1530", description: "Open Type Laser Machine", images: [kflo1530Img, kfloSecondaryImg, kfloTertiaryImg, "placeholder:4"] },
  { id: "kflo-p-1530", model: "FLO-P 1530 ( open, single table)", description: "Open Type Laser Machine", images: [kfloTertiaryImg, kfloSecondaryImg, "placeholder:4"] },
  { id: "kflc-1530", model: "FLC-1530", description: "Closed Type Laser Machine", images: [kflc1530Img, "placeholder:2", "placeholder:3", "placeholder:4"] },
  { id: "kflc-p-1530", model: "FLC-P 1530 (fully enclosed/2 tables)", description: "Covered Type Pipe & Profile Fiber Laser", images: [flcP1530Img, flcP1530Img2, flcP1530Img3, flcP2040Img2] },
];

const pressBrakes = [
  { id: "kmkt-1560", model: "MKT 1560", description: "CNC Press Brake — 5 ft / 60 ton capacity", image: mkt1560Img },
  { id: "kmkt-32135", model: "MKT 32135", description: "CNC Press Brake — 13.5 ft / 320 ton capacity", image: mkt32135Img },
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
  { label: "Laser Head", values: ["Raytools / BOCI / WSX", "Raytools / BOCI / WSX", "Raytools / BOCI / WSX", "Raytools / BOCI / WSX"] },
  { label: "Assist Gases", values: ["Air / Oxygen / Nitrogen", "Air / Oxygen / Nitrogen", "Air / Oxygen / Nitrogen", "Air / Oxygen / Nitrogen"] },
  { label: "Cooling Type", values: ["Water Cooling", "Water Cooling", "Water Cooling", "Water Cooling"] },
  { label: "Machine Weight", values: ["4500 kg", "4500 kg", "8500 kg", "12000 kg"] },
  { label: "Graphic Format", values: ["dwg / dxf / stp", "dwg / dxf / stp", "dwg / dxf / stp", "dwg / dxf / stp"] },
  { label: "Voltage", values: ["220 or 380V / 3ph / 60Hz", "220 or 380V / 3ph / 60Hz", "220 or 380V / 60Hz", "220 or 380V / 60Hz"] },
  { label: "Certifications", values: ["CE / ISO / FDA", "CE / ISO / FDA", "CE / ISO / FDA", "CE / ISO / FDA"] },
];

const cuttingThickness = [
  { material: "Carbon Steel", values: ["10 mm", "14 mm", "16 mm"] },
  { material: "Stainless Steel", values: ["3 mm", "5 mm", "6 mm"] },
  { material: "Aluminium", values: ["2 mm", "4 mm", "5 mm"] },
  { material: "Brass", values: ["2 mm", "4 mm", "5 mm"] },
];

export default function FiberLasers() {
  const [unit, setUnit] = useState<Unit>("metric");
  return (
    <Layout>
      <section className="py-20 bg-secondary">
        <div className="container max-w-3xl text-center">
          <br />
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Laser Machines</h1>
          <p className="text-lg text-white/80">High-speed precision laser systems for sheet metal fabrication.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {machines.map((m) => (
              <div key={m.id} className="rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors">
                <MachineGallery images={m.images} model={m.model} background="light" fit="contain" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{m.model}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{m.description}</p>
                  <Link to={`/quote?machine=${encodeURIComponent(m.model)}`}>
                    <Button className="w-full font-bold">Request Quote</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CNC Press Brakes */}
      <section className="py-20 border-t border-border">
        <div className="container">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Press Brakes</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">CNC Press Brakes</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">High-precision CNC press brakes engineered for accurate, repeatable bending across a wide range of sheet sizes and tonnages.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            {pressBrakes.map((m) => (
              <div key={m.id} className="rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors">
                <div className="aspect-[4/3] overflow-hidden bg-white flex items-center justify-center">
                  <img src={m.image} alt={m.model} loading="lazy" width={800} height={600} className="h-full w-full object-contain p-4" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{m.model}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{m.description}</p>
                  <Link to={`/quote?machine=${encodeURIComponent(m.model)}`}>
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
              <h3 className="text-xl font-bold text-primary mb-3">Open Type — FLO-1530 & FLO-P 1530 ( open, single table)</h3>
              <p className="text-muted-foreground leading-relaxed">
                With its compact size and cost-effective operation, this machine series stands out as the ideal choice for businesses operating within tight budgets. Occupying just 15 square meters, it's easily installed and comes in 1kW, 2kW, and 3kW power variants. Ideal for rapid and repetitive tasks, it features standard nesting software, flycut-cutting, auto-focus laser head, and Active Anti-collision Function. Constructed with one-piece aluminium alloy sheet-plate welded bridges for rigidity and precision. CE certified.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-8">
              <h3 className="text-xl font-bold text-primary mb-3">Closed Type — FLC-1530</h3>
              <p className="text-muted-foreground leading-relaxed">
                The FLC series epitomizes speed, sensitivity, reliability, and cost-effectiveness. Capable of handling laser power of up to 30,000W, it's an excellent choice for cutting thick plates. Features double exchange table design for continuous cutting, wireless remote control, nesting software, nozzle cleaning system, and double camera setup. CE certified.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-8">
              <h3 className="text-xl font-bold text-primary mb-3">Covered Type Pipe & Profile — FLC-P 1530 (fully enclosed/2 tables)</h3>
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
          <div className="flex justify-center mb-6"><UnitToggle unit={unit} onChange={setUnit} variant="light" className="mb-0" /></div>
          {/* Desktop: comparison table */}
          <div className="hidden md:block rounded-lg border border-border bg-card overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/10">
                  <TableHead className="font-bold text-foreground min-w-[180px]">Specification</TableHead>
                  <TableHead className="font-bold text-foreground text-center">FLO-1530</TableHead>
                  <TableHead className="font-bold text-foreground text-center">FLO-P 1530 ( open, single table)</TableHead>
                  <TableHead className="font-bold text-foreground text-center">FLC-1530</TableHead>
                  <TableHead className="font-bold text-foreground text-center">FLC-P 1530 (fully enclosed/2 tables)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {specRows.map((row, i) => (
                  <TableRow key={row.label} className={i % 2 === 0 ? "bg-muted/30" : ""}>
                    <TableCell className="font-medium text-foreground">{row.label}</TableCell>
                    {row.values.map((val, j) => (
                      <TableCell key={j} className="text-center text-muted-foreground">{convertValue(val, unit)}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* Mobile: stacked per-machine specs */}
          <div className="md:hidden space-y-6">
            {["FLO-1530", "FLO-P 2040 ( open, single table)", "FLC-1530", "FLC-P 1530 (fully enclosed/2 tables)"].map((model, idx) => (
              <div key={model} className="rounded-lg border border-border bg-card overflow-hidden">
                <div className="bg-primary/10 px-4 py-3 font-bold text-foreground">{model}</div>
                <div>
                  {specRows.map((row, i) => (
                    <div
                      key={row.label}
                      className={`flex justify-between gap-3 px-4 py-2 text-sm border-b border-border ${i % 2 === 0 ? "bg-white" : "bg-[#f8f8f8]"}`}
                    >
                      <span className="font-medium text-foreground">{row.label}</span>
                      <span className="text-muted-foreground text-right">{convertValue(row.values[idx], unit)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-black text-foreground mb-4 text-center">Cutting Thickness — KFLO Open Type</h2>
          <p className="text-muted-foreground text-center mb-10">Maximum cutting thickness by material and laser power.</p>
          <div className="flex justify-center mb-6"><UnitToggle unit={unit} onChange={setUnit} variant="light" className="mb-0" /></div>
          <div className="rounded-lg border border-border bg-card overflow-x-auto">
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
                      <TableCell key={j} className="text-center text-muted-foreground">{convertValue(val, unit)}</TableCell>
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
    <TrustSignals />
    </Layout>
  );
}
