import { Link } from "react-router-dom";
import {
  Crosshair,
  ShieldAlert,
  Minimize2,
  Layers,
  Gauge,
  Flag,
  Zap,
  Building2,
  Hammer,
  Droplet,
  DoorOpen,
  Sofa,
  UtensilsCrossed,
  ChevronRight,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import RequestInfoForm from "@/components/RequestInfoForm";
import flo1530Img from "@/assets/machine-kflo-1530.png";

const features = [
  {
    icon: Minimize2,
    title: "Compact Footprint",
    body: "Installs in roughly 160 sq ft. Single-table design fits where larger systems can't.",
  },
  {
    icon: Crosshair,
    title: "Auto-Focus Cutting Head",
    body: "Maintains optimal focal distance automatically across varying material thicknesses for consistent edge quality.",
  },
  {
    icon: ShieldAlert,
    title: "Active Anti-Collision",
    body: "Detects obstacles in real time and adjusts head position to protect cutting optics from costly damage.",
  },
  {
    icon: Layers,
    title: "Standard Nesting Software",
    body: "Get parts prepped and cutting fast with included nesting software. No add-on licenses required.",
  },
  {
    icon: Gauge,
    title: "Flycut Cutting",
    body: "Optimized for high-volume repetitive parts. Maintains speed across long production runs.",
  },
  {
    icon: Flag,
    title: "U.S.-Based Support",
    body: "Service technicians, replacement parts, and technical support all based in the United States.",
  },
];

const industries = [
  { icon: Zap, label: "Electrical Cabinet Manufacturing" },
  { icon: Building2, label: "Billboard & Sign Production" },
  { icon: Droplet, label: "Water Tank Fabrication" },
  { icon: DoorOpen, label: "Steel Door Production" },
  { icon: Sofa, label: "Metal Furniture" },
  { icon: UtensilsCrossed, label: "Kitchenware Manufacturing" },
];

const configurations = ["FLO-1530", "FLO-P 1530"];

const specRows: { label: string; values: string[] }[] = [
  { label: "Working Area", values: ["1500 x 3000 mm (5 x 10 ft)", "1500 x 3000 mm (5 x 10 ft)"] },
  { label: "Loading Capacity", values: ["TBD", "TBD"] },
  { label: "X-Y Axis Travel", values: ["TBD", "TBD"] },
  { label: "Z Axis Travel", values: ["TBD", "TBD"] },
  { label: "X-Y-Z Axis Guideway", values: ["TBD", "TBD"] },
  { label: "X-Y Axis Drive System", values: ["TBD", "TBD"] },
  { label: "Z Axis Drive System", values: ["TBD", "TBD"] },
  { label: "X-Y Axis Speed", values: ["TBD", "TBD"] },
  { label: "Z Axis Speed", values: ["TBD", "TBD"] },
  { label: "X-Y Position Accuracy", values: ["TBD", "TBD"] },
  { label: "X-Y Repeatability Accuracy", values: ["TBD", "TBD"] },
  { label: "Laser Source", values: ["TBD", "TBD"] },
  { label: "Laser Source Output Power", values: ["1kW / 2kW / 3kW / 4kW", "1kW / 2kW / 3kW / 4kW"] },
  { label: "CNC Control System", values: ["TBD", "TBD"] },
  { label: "Laser Cutting Head", values: ["TBD", "TBD"] },
  { label: "Assist Gases", values: ["Air / Oxygen / Nitrogen", "Air / Oxygen / Nitrogen"] },
  { label: "Cooling Type", values: ["Water Cooling", "Water Cooling"] },
  { label: "Machine Weight", values: ["TBD", "TBD"] },
  { label: "Machine Dimensions (L x W x H)", values: ["TBD", "TBD"] },
  { label: "Graphic Format Support", values: ["dwg / dxf / stp", "dwg / dxf / stp"] },
  { label: "Electrical", values: ["TBD", "TBD"] },
];

const cuttingChart: { material: string; values: string[] }[] = [
  { material: "Mild Steel", values: ["TBD mm", "TBD mm", "TBD mm", "TBD mm"] },
  { material: "Stainless Steel", values: ["TBD mm", "TBD mm", "TBD mm", "TBD mm"] },
  { material: "Aluminum", values: ["TBD mm", "TBD mm", "TBD mm", "TBD mm"] },
  { material: "Brass", values: ["TBD mm", "TBD mm", "TBD mm", "TBD mm"] },
  { material: "Copper", values: ["TBD mm", "TBD mm", "TBD mm", "TBD mm"] },
];

const gallery = [
  { src: flo1530Img, caption: "Cutting head detail" },
  { src: flo1530Img, caption: "Production view" },
  { src: flo1530Img, caption: "Control interface" },
  { src: flo1530Img, caption: "Demo video" },
];

function scrollToQuote(e: React.MouseEvent) {
  e.preventDefault();
  const el = document.getElementById("quote-form");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function OpenTypeFiberLaser() {
  return (
    <Layout>
      {/* 1. HERO */}
      <section className="relative bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-secondary/80 pointer-events-none" />
        <div className="container relative py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <nav className="flex items-center flex-wrap gap-1 text-xs text-white/60 mb-6">
                <Link to="/" className="hover:text-white">Home</Link>
                <ChevronRight className="h-3 w-3" />
                <Link to="/machines" className="hover:text-white">Laser Cutting</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white">Open Type Fiber Laser</span>
              </nav>
              <p className="text-xs font-bold tracking-[0.2em] text-primary mb-4 uppercase">
                Fiber Laser Cutting Series
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
                Open Type Fiber Laser
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-xl">
                Compact, cost-effective fiber laser cutting for shops that need precision without the footprint —
                fully U.S. supported.
              </p>
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
                  <a href="#" aria-label="Download spec sheet (TBD)">
                    <Download className="h-4 w-4" />
                    Download Spec Sheet
                  </a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-white/5 border border-white/10 rounded-lg overflow-hidden flex items-center justify-center p-6">
                <img
                  src={flo1530Img}
                  alt="Open Type Fiber Laser FLO Series"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT HIGHLIGHTS */}
      <section className="py-20 bg-background">
        <div className="container max-w-4xl">
          <p className="section-label mb-3 text-primary">Overview</p>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-10">Product Highlights</h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              The Open Type Fiber Laser series is built for shops that want serious cutting capability without
              committing serious floor space. Compact, single-table design installs in roughly 160 square feet
              and ships in 1kW, 2kW, 3kW, and 4kW power configurations — letting you match the machine to your
              actual production needs instead of overspending on capacity you won't use.
            </p>
            <p>
              These machines are workhorses for shops producing electrical cabinets, billboards, water tanks,
              steel doors, metal furniture, and similar high-volume sheet metal work. Standard nesting software
              gets parts prepped fast, and the flycut feature keeps repetitive jobs moving.
            </p>
            <p className="border-l-4 border-primary pl-6 text-foreground font-medium">
              Every Open Type Fiber Laser sold by Kaimec ships with full U.S.-based technical support, parts
              inventory, and service technicians. No international shipping delays for spare parts. No time-zone
              games when something needs answering. That's the Kaimec difference.
            </p>
          </div>
        </div>
      </section>

      {/* 3. KEY FEATURES */}
      <section className="py-20 bg-[#f8f8f8]">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <p className="section-label mb-3 text-primary">Engineering</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">Key Features</h2>
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

      {/* 4. INDUSTRIES */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <p className="section-label mb-3 text-primary">Applications</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">Built for These Industries</h2>
          </div>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
            {industries.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center text-center bg-card border border-border p-8 hover:border-primary hover:bg-primary/5 transition-colors min-h-[160px]"
              >
                <Icon className="h-10 w-10 text-primary mb-4" />
                <span className="text-sm md:text-base font-bold text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SPECIFICATIONS COMPARISON */}
      <section className="py-20 bg-secondary">
        <div className="container max-w-6xl">
          <div className="max-w-3xl mb-12">
            <p className="section-label mb-3 text-primary">Specifications</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">Configuration Comparison</h2>
            <p className="text-white/70 text-lg mt-3">
              Side-by-side specs for available FLO series configurations.
            </p>
          </div>
          <div className="bg-white overflow-x-auto">
            <table className="w-full text-sm md:text-base min-w-[640px]">
              <thead>
                <tr className="bg-secondary text-white">
                  <th className="px-5 py-4 text-left font-bold w-1/3">Specification</th>
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
                      <td key={j} className="px-5 py-3 text-muted-foreground border-b border-border">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. MATERIAL CUTTING CAPABILITY */}
      <section className="py-20 bg-background">
        <div className="container max-w-5xl">
          <div className="max-w-3xl mb-10">
            <p className="section-label mb-3 text-primary">Capability</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">Material Cutting Capability</h2>
            <p className="text-muted-foreground text-lg">
              Maximum cuttable thickness by material and laser power.
            </p>
          </div>
          <div className="border border-border bg-card overflow-x-auto">
            <table className="w-full text-sm md:text-base min-w-[560px]">
              <thead>
                <tr className="bg-secondary text-white">
                  <th className="px-5 py-4 text-left font-bold">Material</th>
                  <th className="px-5 py-4 text-center font-bold">1kW</th>
                  <th className="px-5 py-4 text-center font-bold">2kW</th>
                  <th className="px-5 py-4 text-center font-bold">3kW</th>
                  <th className="px-5 py-4 text-center font-bold">4kW</th>
                </tr>
              </thead>
              <tbody>
                {cuttingChart.map((row, i) => (
                  <tr key={row.material} className={i % 2 === 0 ? "bg-white" : "bg-[#f8f8f8]"}>
                    <td className="px-5 py-3 font-semibold text-foreground border-b border-border">{row.material}</td>
                    {row.values.map((v, j) => (
                      <td key={j} className="px-5 py-3 text-center text-muted-foreground border-b border-border">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. GALLERY */}
      <section className="py-20 bg-[#f8f8f8]">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <p className="section-label mb-3 text-primary">Gallery</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">See It in Detail</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((g) => (
              <figure key={g.caption} className="bg-white border border-border overflow-hidden group">
                <div className="aspect-[4/3] flex items-center justify-center p-4 bg-white">
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
          <div className="mt-16 text-center">
            <Button size="lg" className="font-bold px-10" onClick={scrollToQuote}>
              Request a Quote
            </Button>
          </div>
        </div>
      </section>

      {/* 8. QUOTE FORM */}
      <section id="quote-form" className="py-20 bg-background scroll-mt-24">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <p className="section-label mb-3 text-primary">Get In Touch</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              Get a Quote on the Open Type Fiber Laser
            </h2>
            <p className="text-lg text-muted-foreground">
              Talk to a U.S.-based specialist about your application. Most quotes returned within one business day.
            </p>
          </div>
          <div className="bg-card border border-border p-6 md:p-10">
            <RequestInfoForm machine="Open Type Fiber Laser (FLO Series)" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
