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
  Award,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import TrustSignals from "@/components/shared/TrustSignals";
import RequestInfoForm from "@/components/RequestInfoForm";
import flo1530Img from "@/assets/machine-kflo-1530.png";
import flo2040Img from "@/assets/machine-flo-2040.png";

const brochurePdf = "/Kaimec-Fiber-Laser-Brochure.pdf";

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
    title: "24/7 U.S.-Based Support",
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

const configurations = ["FLO-1530", "FLO-2040"];

const specRows: { label: string; values: string[] }[] = [
  { label: "Working Area", values: ["1500 x 3000 mm (5 x 10 ft)", "2000 x 4000 mm (6.5 x 13 ft)"] },
  { label: "Loading Capacity", values: ["800 kg (1750 lbs)", "800 kg (1750 lbs)"] },
  { label: "X-Y Axis Travel", values: ["1520 x 3030 mm (5 x 10 ft)", "2020 x 4050 mm (6.6 x 13.3 ft)"] },
  { label: "Z Axis Travel", values: ['100 mm (3.94")', '100 mm (3.94")'] },
  { label: "X-Y-Z Axis Guideway", values: ["4 Point Ball Caged", "4 Point Ball Caged"] },
  { label: "X-Y Axis Drive System", values: ["Rack", "Rack"] },
  { label: "Z Axis Drive System", values: ["Ballscrew", "Ballscrew"] },
  { label: "X-Y Axis Speed", values: ["80 m/min (3150 ipm)", "80 m/min (3150 ipm)"] },
  { label: "Z Axis Speed", values: ["30 m/min (1180 ipm)", "30 m/min (1180 ipm)"] },
  { label: "X-Y Position Accuracy", values: ['0.05 mm (0.002")', '0.05 mm (0.002")'] },
  { label: "X-Y Repeatability Accuracy", values: ['0.03 mm (0.001")', '0.03 mm (0.001")'] },
  { label: "Laser Source", values: ["JPT / Han's", "JPT / Han's"] },
  { label: "Laser Source Output Power", values: ["1000 / 2000 / 3000 W", "1000 / 2000 / 3000 W"] },
  { label: "CNC Control System", values: ["Fscut / Cypcut", "Fscut / Cypcut"] },
  { label: "Laser Cutting Head", values: ["Raytools / BOCI / WSX", "Raytools / BOCI / WSX"] },
  { label: "Assist Gases", values: ["Air / Oxygen / Nitrogen", "Air / Oxygen / Nitrogen"] },
  { label: "Cooling Type", values: ["Water Cooling", "Water Cooling"] },
  { label: "Machine Weight", values: ["2300 kg (5100 lbs)", "2300 kg (5100 lbs)"] },
  { label: "Machine Dimensions (L x W x H)", values: ["2355 x 4302 x 1980 mm (7.7 x 14.1 x 6.5 ft)", "2355 x 5302 x 1980 mm (7.7 x 17.4 x 6.5 ft)"] },
  { label: "Graphic Format Support", values: ["dwg / dxf / stp", "dwg / dxf / stp"] },
  { label: "Electrical", values: ["220 or 380 Volt / 3 phase / 60 Hz", "220 or 380 Volt / 3 phase / 60 Hz"] },
  { label: "Certifications", values: ["CE / ISO / FDA", "CE / ISO / FDA"] },
  { label: "Warranty", values: ["2 Years", "2 Years"] },
];

const cuttingChart: { material: string; values: string[] }[] = [
  { material: "Carbon Steel", values: ['10 mm (3/8")', '14 mm (9/16")', '16 mm (5/8")'] },
  { material: "Stainless Steel", values: ['3 mm (1/8")', '5 mm (3/16")', '6 mm (1/4")'] },
  { material: "Aluminum", values: ['2 mm (1/16")', '4 mm (1/8")', '5 mm (3/16")'] },
  { material: "Brass", values: ['2 mm (1/16")', '4 mm (1/8")', '5 mm (3/16")'] },
];

const trustBand = [
  { icon: Award, title: "CE / ISO / FDA Certified", body: "Meets international and U.S. safety standards." },
  { icon: ShieldCheck, title: "2-Year Warranty", body: "Standard on all FLO series machines." },
  { icon: Wrench, title: "24/7 U.S.-Based Service", body: "Parts, support, and service technicians in the U.S." },
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
                <span className="text-white">Open Type Fiber Lasers</span>
              </nav>
              <p className="font-bold tracking-[0.2em] text-primary mb-4 uppercase text-3xl text-neutral-200">
                
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
                Open Type Fiber Lasers
              </h1>
              <ul className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-xl list-disc list-inside space-y-1">
                <li>Cost effective</li>
                <li>24/7 USA support</li>
                <li>Made in Europe</li>
                <li>2 Year Full Warranty</li>
                <li>5x10ft (1500X3000mm) and 6.5x13ft (2000x4000mm)  models</li>
                <li>3,6 or 12kW laser power</li>
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
                  <a
                    href={brochurePdf}
                    download="Kaimec-Fiber-Laser-Brochure.pdf"
                    aria-label="Download Kaimec fiber laser brochure"
                  >
                    <Download className="h-4 w-4" />
                    Download Spec Sheet
                  </a>
                </Button>
              </div>
            </div>
            <div className="relative grid gap-4">
              <figure className="bg-white/5 border-white/10 overflow-hidden rounded-lg border">
                <div className="aspect-[4/3] flex items-center justify-center p-6 bg-white">
                  <img
                    src={flo1530Img}
                    alt="Open Type Fiber Laser FLO-1530"
                    className="w-full h-full object-contain"
                  />
                </div>
                <figcaption className="px-4 py-2 text-sm font-bold text-white text-center">FLO-1530</figcaption>
              </figure>
              <figure className="bg-white/5 border-white/10 overflow-hidden rounded-lg border">
                <div className="aspect-[1/1] flex items-center justify-center p-6 bg-white">
                  <img
                    src={flo2040Img}
                    alt="Open Type Fiber Laser FLO-2040"
                    className="w-full h-full object-contain"
                  />
                </div>
                <figcaption className="px-4 py-2 text-sm font-bold text-white text-center">FLO-2040</figcaption>
              </figure>
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
                  <th className="px-5 py-4 text-center font-bold">1000 W</th>
                  <th className="px-5 py-4 text-center font-bold">2000 W</th>
                  <th className="px-5 py-4 text-center font-bold">3000 W</th>
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

      {/* 6b. CERTIFICATIONS & WARRANTY TRUST BAND */}
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

      {/* 7. GALLERY */}
      <section className="py-20 bg-[#f8f8f8]">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <p className="section-label mb-3 text-primary">Gallery</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">See It in Detail</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((g) => (
              <figure key={g.caption} className="bg-white border border-border overflow-hidden group rounded-lg">
                <div className="aspect-[4/3] bg-white/5 border-white/10 overflow-hidden flex items-center justify-center p-6 rounded-lg border">
                  <img
                    src={g.src}
                    alt={g.caption}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 bg-white"
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
              Talk to a 24/7 U.S.-Based specialist about your application. Most quotes returned within one business day.
            </p>
          </div>
          <div className="bg-card border border-border p-6 md:p-10">
            <RequestInfoForm machine="Open Type Fiber Laser (FLO Series)" />
          </div>
        </div>
      </section>
    <TrustSignals />
    </Layout>
  );
}
