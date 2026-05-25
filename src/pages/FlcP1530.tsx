import { Link } from "react-router-dom";
import { useState } from "react";
import { convertValue, type Unit } from "@/lib/unitConvert";
import UnitToggle from "@/components/UnitToggle";
import {
  Crosshair,
  ShieldAlert,
  Layers,
  Combine,
  Flag,
  Zap,
  Tractor,
  HardHat,
  UtensilsCrossed,
  Factory,
  Shirt,
  Building2,
  ChevronRight,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import TrustSignals from "@/components/shared/TrustSignals";
import RequestInfoForm from "@/components/RequestInfoForm";
import flcP1530Img from "@/assets/flc-p-1530-1.png";
import flcP1530Img2 from "@/assets/flc-p-1530-2.png";
import flcP1530Img3 from "@/assets/flc-p-1530-3.png";
import flcP1530Img4 from "@/assets/flc-p-2040-2.png";

const features = [
  {
    icon: Crosshair,
    title: "Auto-Focus Laser Head",
    body: "Maintains optimal focal distance automatically across varying material thicknesses for consistent edge quality.",
  },
  {
    icon: ShieldAlert,
    title: "Active Anti-Collision",
    body: "Detects obstacles in real time and adjusts head position to protect cutting optics from costly damage.",
  },
  {
    icon: Layers,
    title: "Aluminum Alloy Bridge",
    body: "Single-piece welded construction prevents deformation under high-acceleration cutting and extends machine life.",
  },
  {
    icon: Combine,
    title: "Sheet + Pipe Combo",
    body: "Eliminates the need for separate machines. One footprint, two production capabilities.",
  },
  {
    icon: Flag,
    title: "24/7 U.S.-Based Support",
    body: "Service technicians, replacement parts, and technical support all based in the United States. No international delays.",
  },
  {
    icon: Zap,
    title: "Up to 20kW Power",
    body: "Scales from production sheet work to thick plate cutting without compromise.",
  },
];

const industries = [
  { icon: Tractor, label: "Agricultural Equipment" },
  { icon: HardHat, label: "Construction" },
  { icon: UtensilsCrossed, label: "Food Machinery" },
  { icon: Factory, label: "Heavy Machinery Manufacturing" },
  { icon: Shirt, label: "Textile Equipment" },
  { icon: Building2, label: "Structural Fabrication" },
];

const machineSpecs: [string, string][] = [
  ["Cutting Area (Sheet)", "1500 x 3000 mm (5' x 10')"],
  ["Pipe Cutting Length", "6000 mm standard / 9000 mm optional"],
  ["Pipe Diameter Range", "15 mm to 350 mm"],
  ["Laser Power Options", "3kW, 6kW, 12kW, 20kW"],
  ["Positioning Accuracy", "±0.05 mm (TBD — confirm)"],
  ["Repeat Accuracy", "±0.03 mm (TBD — confirm)"],
  ["Max Cutting Speed", "TBD"],
  ["Rapid Traverse Speed", "TBD"],
  ["Machine Dimensions (L x W x H)", "TBD"],
  ["Machine Weight", "TBD"],
  ["Power Requirement", "TBD"],
  ["Control System", "TBD"],
];

const includedFeatures = [
  "Auto-focus cutting head",
  "Active anti-collision system",
  "Standard nesting software",
  "Wireless remote control",
  "Aluminum alloy single-piece bridge",
];

const cuttingChart: { material: string; values: string[] }[] = [
  { material: "Mild Steel", values: ["TBD mm", "TBD mm", "TBD mm", "TBD mm"] },
  { material: "Stainless Steel", values: ["TBD mm", "TBD mm", "TBD mm", "TBD mm"] },
  { material: "Aluminum", values: ["TBD mm", "TBD mm", "TBD mm", "TBD mm"] },
  { material: "Brass", values: ["TBD mm", "TBD mm", "TBD mm", "TBD mm"] },
  { material: "Copper", values: ["TBD mm", "TBD mm", "TBD mm", "TBD mm"] },
];

const gallery = [
  { src: flcP1530Img2, caption: "Cutting head detail" },
  { src: flcP1530Img3, caption: "Pipe handling system" },
  { src: flcP1530Img4, caption: "Control interface" },
  { src: flcP1530Img, caption: "Remote control" },
];

function scrollToQuote(e: React.MouseEvent) {
  e.preventDefault();
  const el = document.getElementById("quote-form");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function FlcP1530() {
  const [unit, setUnit] = useState<Unit>("metric");
  return (
    <Layout>
      {/* 1. HERO */}
      <section className="relative bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-secondary/80 pointer-events-none" />
        <div className="container relative py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              {/* Breadcrumb */}
              <nav className="flex items-center flex-wrap gap-1 text-xs text-white/60 mb-6">
                <Link to="/" className="hover:text-white">Home</Link>
                <ChevronRight className="h-3 w-3" />
                <Link to="/machines" className="hover:text-white">Laser Cutting</Link>
                <ChevronRight className="h-3 w-3" />
                <Link to="/machines/cnc-fiber-lasers" className="hover:text-white">Combo lasers (sheet + pipe cutting)</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white">FLC-P 1530</span>
              </nav>
              <p className="text-xs font-bold tracking-[0.2em] text-primary mb-4 uppercase">
                Combo lasers (sheet + pipe cutting)
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
                FLC-P 1530
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-xl">
                Combined sheet metal and pipe/profile cutting in a single machine — up to 20kW, fully U.S. supported.
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
              <div className="aspect-[4/3] bg-white/5 border-white/10 overflow-hidden flex items-center justify-center p-6 rounded-lg border">
                <img
                  src={flcP1530Img}
                  alt="FLC-P 1530 Combo lasers (sheet + pipe cutting)"
                  className="w-full h-full object-contain bg-white"
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
              The FLC-P 1530 brings together speed, precision, and versatility in a single fiber laser platform.
              Engineered for shops that need to cut both sheet metal and pipe/profile without dedicating floor space
              to two machines, it handles laser power up to 20,000 watts — making it a serious option for thick plate
              work alongside everyday production cutting.
            </p>
            <p>
              With a standard 6-meter pipe cutting length (extendable to 9 meters) and support for pipe diameters up
              to 350mm, the FLC-P 1530 is built for the kind of varied workload most fab shops actually run:
              structural tube one hour, sheet stock the next.
            </p>
            <p className="border-l-4 border-primary pl-6 text-foreground font-medium">
              Every FLC-P 1530 sold by Kaimec ships with full U.S.-based technical support, parts availability, and
              service. No international shipping delays for spare parts. No time-zone games when something needs
              answering. That's the Kaimec difference.
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
              <div
                key={title}
                className="bg-white border border-border p-8 hover:border-primary transition-colors"
              >
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

      {/* 4. INDUSTRIES SERVED */}
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

      {/* 5. TECHNICAL SPECIFICATIONS */}
      <section className="py-20 bg-secondary">
        <div className="container max-w-5xl">
          <div className="max-w-3xl mb-12">
            <p className="section-label mb-3 text-primary">{" "}</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">Technical Specifications</h2>
          </div>
          <UnitToggle unit={unit} onChange={setUnit} variant="dark" />

          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h3 className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-4">Machine Specs</h3>
              <div className="bg-white">
                <table className="w-full text-sm md:text-base">
                  <tbody>
                    {machineSpecs.map(([k, v], i) => (
                      <tr key={k} className={i % 2 === 0 ? "bg-white" : "bg-[#f8f8f8]"}>
                        <td className="px-5 py-3 font-semibold text-foreground border-b border-border w-1/2">{k}</td>
                        <td className="px-5 py-3 text-muted-foreground border-b border-border">{convertValue(v, unit)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-4">Included Features</h3>
              <ul className="bg-white border border-border p-6 space-y-3">
                {includedFeatures.map((f) => (
                  <li key={f} className="flex gap-3 text-foreground">
                    <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-sm md:text-base">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
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
          <UnitToggle unit={unit} onChange={setUnit} variant="light" />
          <div className="border border-border bg-card overflow-x-auto">
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="bg-secondary text-white">
                  <th className="px-5 py-4 text-left font-bold">Material</th>
                  <th className="px-5 py-4 text-center font-bold">3kW</th>
                  <th className="px-5 py-4 text-center font-bold">6kW</th>
                  <th className="px-5 py-4 text-center font-bold">12kW</th>
                  <th className="px-5 py-4 text-center font-bold">20kW</th>
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
        </div>
      </section>

      {/* 7. IMAGE GALLERY */}
      <section className="py-20 bg-[#f8f8f8]">
        <div className="container">
          <div className=\"max-w-3xl mb-12\">
            <p className=\"section-label mb-3 text-primary\">Gallery</p>
            <h2 className=\"text-3xl md:text-4xl font-black text-foreground\">Standard Accessories included</h2>
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
              Get a Quote on the FLC-P 1530
            </h2>
            <p className="text-lg text-muted-foreground">
              Talk to a 24/7 U.S.-Based specialist about your application. Most quotes returned within one business day.
            </p>
          </div>
          <div className="bg-card border border-border p-6 md:p-10">
            <RequestInfoForm machine="FLC-P 1530" />
          </div>
        </div>
      </section>
    <TrustSignals />
    </Layout>
  );
}