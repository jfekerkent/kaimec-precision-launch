import { Link } from "react-router-dom";
import { useState } from "react";
import { convertValue, type Unit } from "@/lib/unitConvert";
import UnitToggle from "@/components/UnitToggle";
import {
  ShieldCheck,
  Layers,
  Zap,
  Crosshair,
  Cpu,
  Wifi,
  ChevronRight,
  Download,
  Award,
  Wrench,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import TrustSignals from "@/components/shared/TrustSignals";
import RequestInfoForm from "@/components/RequestInfoForm";
import heroImg from "@/assets/flc-hero.png";
import sideProfileImg from "@/assets/flc-side-profile.png";
import tableExtendedImg from "@/assets/flc-table-extended.png";
import flc1530_2 from "@/assets/flc-1530-2.png";
import flc1530_3 from "@/assets/flc-1530-3.png";
import flc1530_4 from "@/assets/flc-1530-4.png";
import cuttingHeadImg from "@/assets/raytools-cutting-head.png";
import remoteControlImg from "@/assets/remote-control.png";
import controlInterfaceImg from "@/assets/mekotek-control-interface.png";
import chillerHeaterImg from "@/assets/chiller-heater-unit.png";
import regulatingTransformerImg from "@/assets/regulating-transformer.png";

const brochurePdf = "/Kaimec-Fiber-Laser-Brochure.pdf";

const features = [
  {
    icon: ShieldCheck,
    title: "Fully Enclosed, Class-1 Safe",
    body: "Fully enclosed cabin with viewing window protects operators and contains light, fume, and noise.",
  },
  {
    icon: Layers,
    title: "Dual Exchange Tables",
    body: "10-second table change time keeps the laser cutting while the next sheet loads.",
  },
  {
    icon: Zap,
    title: "Up to 20 kW Laser Power",
    body: "Optional outputs from 2 kW to 20 kW for plate up to 45 mm carbon steel.",
  },
  {
    icon: Cpu,
    title: "Aluminum Alloy Bridge",
    body: "Single-piece welded aluminum bridge for higher acceleration and zero deformation.",
  },
  {
    icon: Crosshair,
    title: "Auto-Focus Cutting Head",
    body: "Active anti-collision, auto-view obstacle detection, and automatic head cooling.",
  },
  {
    icon: Wifi,
    title: "Wireless Remote + Smart Nesting",
    body: "Standard nesting software, flycut, and wireless remote for blowing, pause, and calibration.",
  },
];

const models = [
  { id: "FLC-1530", area: "1524 x 3048 mm (5 x 10 ft)", detail: "2 tables + 6.5x20ft capacity + 6,12, 20kW laser powers ", image: heroImg },
  { id: "FLC-2040", area: "2000 x 4000 mm (6.5 x 13 ft)", detail: "Mid-format workhorse for high-volume sheet work.", image: tableExtendedImg },
  { id: "FLC-2060", area: "2000 × 6000 mm (6.5 × 20 ft)", detail: "Long-bed format for large plates and structural parts.", image: sideProfileImg },
];

const configurations = ["FLC-1530", "FLC-2040", "FLC-2060"];

const specRows: { label: string; values: string[] }[] = [
  { label: "Working Area", values: ["1524 x 3048 mm (5 x 10 ft)", "2000 x 4000 mm (6.5 x 13 ft)", "2000 × 6000 mm (6.5 × 20 ft)"] },
  { label: "Loading Capacity", values: ["1200 kg", "1200 kg", "1450 kg"] },
  { label: "X-Y Axis Travel", values: ["1524 x 3048 mm (5 x 10 ft)", "2020 × 4040 mm (6.5 × 13 ft)", "2020 × 6050 mm (6.5 × 20 ft)"] },
  { label: "Z Axis Travel", values: ["300 mm", "300 mm", "350 mm"] },
  { label: "X-Y-Z Axis Guideway", values: ["4 Point Ball Caged", "4 Point Ball Caged", "4 Point Ball Caged"] },
  { label: "X-Y Axis Drive System", values: ["Rack", "Rack", "Rack"] },
  { label: "Z Axis Drive System", values: ["Ballscrew", "Ballscrew", "Ballscrew"] },
  { label: "X-Y Axis Speed", values: ["100 m/min", "80 m/min", "100 m/min"] },
  { label: "Z Axis Speed", values: ["30 m/min", "30 m/min", "30 m/min"] },
  { label: "X-Y Position Accuracy", values: ["0.05 mm", "0.05 mm", "0.05 mm"] },
  { label: "X-Y Repeatability Accuracy", values: ["0.03 mm", "0.03 mm", "0.03 mm"] },
  { label: "Table Change Time", values: ["10 sec", "10 sec", "10 sec"] },
  { label: "Laser Source", values: ["3, 6 and 12kW", "3, 6 and 12kW", "3, 6 and 12kW"] },
  { label: "Laser Source Output Power", values: ["2 / 3 / 4 / 6 / 8 / 12 / 20 kW", "2 – 20 kW", "2 / 3 / 4 / 6 / 8 / 12 / 20 kW"] },
  { label: "CNC Control System", values: ["Fscut", "Fscut", "Fscut"] },
  { label: "Laser Head", values: ["Raytools / BOCI / WSX", "Raytools / BOCI / WSX", "Raytools / BOCI / WSX"] },
  { label: "Assist Gases", values: ["Air / Oxygen / Nitrogen", "Air / Oxygen / Nitrogen", "Air / Oxygen / Nitrogen"] },
  { label: "Cooling Type", values: ["Water Cooling", "Water Cooling", "Water Cooling"] },
  { label: "Machine Weight", values: ["8500 kg", "10000 kg", "11500 kg"] },
  { label: "Machine Dimensions (W × L × H)", values: ["2698 × 9175 × 2560 mm", "3500 × 11200 × 2560 mm", "4400 × 10000 × 2120 mm"] },
  { label: "Graphic Format", values: ["dwg / dxf / stp", "dwg / dxf / stp", "dwg / dxf / stp"] },
  { label: "Voltage", values: ["220 or 480 V / 60 Hz", "220 or 480 V / 60 Hz", "220 or 480 V / 60 Hz"] },
  { label: "Certifications", values: ["CE / ISO / FDA", "CE / ISO / FDA", "CE / ISO / FDA"] },
];

const cuttingChart: { material: string; values: string[] }[] = [
  { material: "Carbon Steel", values: ['14 mm (9/16")', '16 mm (5/8")', '10 mm (3/8")', '22 mm (7/8")', '25 mm (1")', '30 mm (1-3/16")', '45 mm (1-3/4")'] },
  { material: "Stainless Steel", values: ['5 mm (3/16")', '6 mm (1/4")', '10 mm (3/8")', '20 mm (3/4")', '25 mm (1")', '25 mm (1")', '40 mm (1-9/16")'] },
  { material: "Aluminum", values: ['4 mm (5/32")', '5 mm (3/16")', '8 mm (5/16")', '10 mm (3/8")', '20 mm (3/4")', '25 mm (1")', '30 mm (1-3/16")'] },
  { material: "Brass", values: ['4 mm (5/32")', '5 mm (3/16")', '8 mm (5/16")', '8 mm (5/16")', '12 mm (1/2")', '12 mm (1/2")', '18 mm (11/16")'] },
];
const powerCols = ["2 kW", "3 kW", "4 kW", "6 kW", "8 kW", "12 kW", "20 kW"];

const standardConfig = [
  "Fully enclosed cabin with safety interlocks and Class-1 viewing window",
  "Dual exchange tables (10-second change)",
  "Fscut CNC control system with smart nesting software",
  "Wireless remote control (blowing, cutting, pause, calibration)",
  "Aluminum alloy welded bridge",
  "Auto-focus laser cutting head with active anti-collision and auto-view",
  "Water cooling system",
  "Automatic nozzle cleaning system and dual-camera setup",
  "CE / ISO / FDA certification",
];

const optionalConfig = [
  "Laser sources: Raycus, Han's Laser, or JPT",
  "Cutting heads: Raytools, BOCI, or WSX",
  "Laser power: 2, 3, 4, 6, 8, 12, or 20 kW",
  "Assist gas configurations: Air, Oxygen, Nitrogen",
  "Voltage: 220 or 480 V / 60 Hz",
];

const trustBand = [
  { icon: Award, title: "CE / ISO / FDA Certified", body: "Built to European standards for safety and quality." },
  { icon: ShieldCheck, title: "Built for Production", body: "Dual-table, 24/7-ready industrial fabrication platform." },
  { icon: Wrench, title: "24/7 U.S.-Based Service", body: "Parts, support, and service technicians in the U.S." },
];

const gallery = [
  { src: cuttingHeadImg, caption: "Cutting head detail" },
  { src: remoteControlImg, caption: "Remote control" },
  { src: controlInterfaceImg, caption: "Control interface" },
  { src: chillerHeaterImg, caption: "Chiller / Heater Unit" },
  { src: regulatingTransformerImg, caption: "Regulating Transformer (for 220 or 480 volt input)" },
];

function scrollToQuote(e: React.MouseEvent) {
  e.preventDefault();
  const el = document.getElementById("quote-form");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function scrollToSpecs(e: React.MouseEvent) {
  e.preventDefault();
  const el = document.getElementById("specs");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function ClosedTypeFiberLaser() {
  const [unit, setUnit] = useState<Unit>("metric");
  return (
    <Layout>
      {/* 1. HERO */}
      <section className="relative bg-green-100 overflow-hidden">
        <div className="absolute inset-1 bg-gradient-to-br from-green-100 via-green-200 to-green-300 pointer-events-none rounded-lg" />
        <div className="container relative py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <nav className="flex items-center flex-wrap gap-1 text-xs text-white/60 mb-6">
                <Link to="/" className="hover:text-white">Home</Link>
                <ChevronRight className="h-3 w-3" />
                <Link to="/machines" className="hover:text-white">Laser</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white">Closed Type</span>
              </nav>
              <p className="font-bold tracking-[0.2em] text-[#050212]/[0.87] mb-4 uppercase text-3xl text-neutral-200">
                
              </p>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight lg:text-5xl">
                Fully Enclosed Laser Machines
              </h1>
              <p className="text-base font-bold tracking-wide text-primary mb-6 uppercase">
                HIGH QUALITY MACHINES FROM EUROPE
              </p>
              <ul className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-xl list-disc list-inside space-y-1">
                <li>Cost effective</li>
                <li>24/7 USA support</li>
                <li>Made in Europe</li>
                <li>2 Year Full Warranty</li>
                <li>5x10ft / 6.5x13ft / 6.5x20ft models</li>
                <li>6 , 12, 20, 30, 50 kW laser powers<br />. &nbsp; &nbsp;2 (two) exchange tables</li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="font-bold px-8" onClick={scrollToQuote}>
                  Request a Quote
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-bold px-8 border-white/30 bg-transparent text-white hover:bg-white hover:text-secondary"
                  asChild
                >
                  <a href={brochurePdf} download="Kaimec-Fiber-Laser-Brochure.pdf">
                    <Download className="h-4 w-4" />
                    Download Brochure
                  </a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="group relative aspect-[4/3] bg-white/5 border-white/10 overflow-hidden flex items-center justify-center p-4 rounded-lg border">
                <img src={flc1530_2} alt="FLC-1530 front view" className="absolute inset-0 w-full h-full object-contain p-4 opacity-100 transition-opacity duration-700 group-hover:opacity-0" />
                <img src={flc1530_3} alt="FLC-1530 side view" className="absolute inset-0 w-full h-full object-contain p-4 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-hover:[animation:flcCycle_4s_ease-in-out_infinite]" style={{ animationDelay: "0s" }} />
                <img src={flc1530_4} alt="FLC-1530 with exchange table" className="absolute inset-0 w-full h-full object-contain p-4 opacity-0 transition-opacity duration-700 group-hover:[animation:flcCycle2_4s_ease-in-out_infinite]" />
                <style>{`
                  @keyframes flcCycle { 0%,33%{opacity:1} 50%,100%{opacity:0} }
                  @keyframes flcCycle2 { 0%,50%{opacity:0} 66%,100%{opacity:1} }
                `}</style>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT HIGHLIGHTS */}
      <section className="py-20 bg-background">
        <div className="container max-w-4xl">
          <p className="section-label mb-3 text-primary">Overview</p>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-10">
            Built for Precision and cost effectiveness
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              The FLC series epitomizes speed, sensitivity, reliability, and cost-effectiveness in fiber laser
              cutting. Capable of handling laser power up to 20 kW, it is purpose-built for cutting thick plate
              efficiently — making it a preferred choice for agriculture, textile, food machinery, construction,
              lifting equipment, and large-scale industrial fabrication.
            </p>
            <p>
              Ideal for high-volume production and outsourcing shops, the FLC series offers blowing, cutting,
              pause, and calibration-simulation controls accessible via wireless remote. Standard nesting software
              prepares parts quickly and reduces the need for constant operator supervision, while the flycut
              feature further accelerates throughput.
            </p>
            <p className="border-l-4 border-primary pl-6 text-foreground font-medium">
              A double-exchange table design enables continuous cutting without delays between loads. Every machine
              is built to European standards and CE-certified. Bridges are constructed from aluminum-alloy
              sheet-plate welding — a single-piece rigid structure that prevents deformation under impact, overlap,
              or strain, while the lightweight construction enables higher speeds and accelerations than comparable
              steel-profile bridges.
            </p>
          </div>
        </div>
      </section>

      {/* 3. MODEL LINEUP */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <p className="section-label mb-3 text-primary">Model Lineup</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">Available Sizes and Models</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {models.map((m) => (
              <div
                key={m.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-colors flex flex-col"
              >
                <div className="aspect-[4/3] bg-white/5 border-white/10 overflow-hidden flex items-center justify-center p-6 rounded-lg border">
                  <img src={m.image} alt={m.id} className="w-full h-full object-contain" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-black text-foreground mb-1">{m.id}</h3>
                  <p className="text-sm font-semibold text-primary mb-3">{m.area}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{m.detail}</p>
                  <a
                    href="#specs"
                    onClick={scrollToSpecs}
                    className="text-sm font-bold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    View Specs <ChevronRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. KEY FEATURES */}
      <section className="py-20 bg-[#f8f8f8]">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <p className="section-label mb-3 text-primary">Engineering</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">Why the FLC Series</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white border border-border p-8 hover:border-primary transition-colors">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-5">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SPECIFICATIONS COMPARISON */}
      <section id="specs" className="py-20 bg-secondary scroll-mt-24">
        <div className="container max-w-6xl">
          <div className="max-w-3xl mb-12">
            <p className="section-label mb-3 text-primary">{" "}</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">Specifications</h2>
            <p className="text-white/70 text-lg mt-3">
              Side-by-side comparison across all three FLC configurations.
            </p>
          </div>
          <UnitToggle unit={unit} onChange={setUnit} variant="dark" />
          <div className="bg-white overflow-x-auto">
            <table className="w-full text-sm md:text-base min-w-[720px]">
              <thead className="sticky top-0">
                <tr className="bg-secondary text-white">
                  <th className="px-5 py-4 text-left font-bold w-1/4">Specification</th>
                  {configurations.map((c) => (
                    <th key={c} className="px-5 py-4 text-left font-bold">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specRows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-[#f8f8f8]"}>
                    <td className="px-5 py-3 font-semibold text-foreground border-b border-border">{row.label}</td>
                    {row.values.map((v, j) => (
                      <td key={j} className="px-5 py-3 text-muted-foreground border-b border-border">{convertValue(v, unit)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. CUTTING CAPACITY */}
      <section className="py-20 bg-background">
        <div className="container max-w-6xl">
          <div className="max-w-3xl mb-10">
            <p className="section-label mb-3 text-primary">Capability</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">Cutting Capacity by Laser Power</h2>
            <p className="text-muted-foreground text-lg">
              Maximum cutting thickness for each FLC configuration.
            </p>
          </div>
          <UnitToggle unit={unit} onChange={setUnit} variant="light" />
          <div className="border border-border bg-card overflow-x-auto">
            <table className="w-full text-sm md:text-base min-w-[720px]">
              <thead>
                <tr className="bg-secondary text-white">
                  <th className="px-5 py-4 text-left font-bold">Material</th>
                  {powerCols.map((p) => (
                    <th key={p} className="px-5 py-4 text-center font-bold">{p}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cuttingChart.map((row, i) => (
                  <tr key={row.material} className={i % 2 === 0 ? "bg-white" : "bg-[#f8f8f8]"}>
                    <td className="px-5 py-3 font-semibold text-foreground border-b border-border">{row.material}</td>
                    {row.values.map((v, j) => (
                      <td key={j} className="px-5 py-3 text-center text-muted-foreground border-b border-border">{convertValue(v, unit)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs italic text-muted-foreground mt-4">
            Maximum cutting capacity may vary with material grade, assist gas, and cut quality requirements. Contact us for application-specific testing.
          </p>
        </div>
      </section>

      {/* 6b. TRUST BAND */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            {trustBand.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-11 h-11 flex items-center justify-center bg-primary/10 text-primary shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm md:text-base">{title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CONFIGURATION OPTIONS */}
      <section className="py-20 bg-[#f8f8f8]">
        <div className="container max-w-6xl">
          <div className="max-w-3xl mb-12">
            <p className="section-label mb-3 text-primary">Configurations</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">Standard & Optional Configurations</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white border border-border p-8">
              <h3 className="text-xl font-black text-foreground mb-6">Included as Standard</h3>
              <ul className="space-y-3">
                {standardConfig.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-muted-foreground">
                    <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-1" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-border p-8">
              <h3 className="text-xl font-black text-foreground mb-6">Available configurations</h3>
              <ul className="space-y-3">
                {optionalConfig.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-muted-foreground">
                    <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-1" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8. GALLERY */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <p className="section-label mb-3 text-primary">Gallery</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">Standard Accessories included</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((g, i) => (
              <figure key={i} className="bg-white border border-border overflow-hidden group rounded-lg">
                <div className="aspect-[4/3] bg-white/5 border-white/10 overflow-hidden flex items-center justify-center p-6 rounded-lg border">
                  <img
                    src={g.src}
                    alt={g.caption}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <figcaption className="px-4 py-3 text-sm font-medium text-foreground border-t border-border">
                  {g.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA BAND */}
      <section className="py-16 bg-primary">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-secondary">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black mb-2">Ready to spec your FLC?</h2>
              <p className="text-lg opacity-90">
                Get a quote tailored to your shop's material mix, throughput targets, and budget.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Button
                size="lg"
                onClick={scrollToQuote}
                className="font-bold px-8 bg-secondary text-white hover:bg-secondary/90"
              >
                Request a Quote
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="font-bold px-8 border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-white"
              >
                <a href="tel:5623502071">
                  <Phone className="h-4 w-4" />
                  (562) 350-2071
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. QUOTE FORM */}
      <section id="quote-form" className="py-20 bg-background scroll-mt-24">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <p className="section-label mb-3 text-primary">Get In Touch</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              Get a Quote on the Closed Type Fiber Laser
            </h2>
            <p className="text-lg text-muted-foreground">
              Talk to a 24/7 U.S.-Based specialist about your application. Most quotes returned within one business day.
            </p>
          </div>
          <div className="bg-card border border-border p-6 md:p-10">
            <RequestInfoForm machine="Closed Type Fiber Laser (FLC Series)" />
          </div>
        </div>
      </section>
    <TrustSignals />
    </Layout>
  );
}