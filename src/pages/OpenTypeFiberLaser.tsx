import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { convertValue, type Unit } from "@/lib/unitConvert";
import UnitToggle from "@/components/UnitToggle";
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
import flo1530Slide1 from "@/assets/flo-1530-1.png";
import flo1530Slide2 from "@/assets/flo-1530-2.png";
import flo1530Slide3 from "@/assets/flo-1530-3.png";
import flo1530Slide4 from "@/assets/flo-1530-4.png";
import flo2040Img from "@/assets/machine-flo-2040.png";
import flo2040Slide1 from "@/assets/flo-2040-1.png";
import flo2040Slide2 from "@/assets/flo-2040-2.png";
import flo2040Slide3 from "@/assets/flo-2040-3.png";
import flo2060Img from "@/assets/machine-flo-2060.avif";
import controlInterfaceImg from "@/assets/mekotek-control-interface.png";
import cuttingHeadImg from "@/assets/raytools-cutting-head.png";
import remoteControlImg from "@/assets/remote-control.png";
import chillerHeaterImg from "@/assets/chiller-heater-unit.png";
import regulatingTransformerImg from "@/assets/regulating-transformer.png";

const brochurePdf = "/Kaimec-Fiber-Laser-Brochure.pdf";

const flo1530Slides = [flo1530Slide1, flo1530Slide2, flo1530Slide3, flo1530Slide4];
const flo2040Slides = [flo2040Slide1, flo2040Slide2, flo2040Slide3];

function Flo1530Slideshow() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % flo1530Slides.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative w-full h-full">
      {flo1530Slides.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Open Type Fiber Laser FLO-1530 view ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

function Flo2040Slideshow() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % flo2040Slides.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative w-full h-full">
      {flo2040Slides.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Open Type Fiber Laser FLO-2040 view ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

const features = [
  {
    icon: Minimize2,
    title: "Compact Footprint",
    body: "Installs in roughly 80 sq ft. Single-table design fits where larger systems can't.",
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
  { label: "Working Area", values: ["1524 x 3048 mm (5 x 10 ft)", "2000 x 4000 mm (6.5 x 13 ft)"] },
  { label: "Loading Capacity", values: ["800 kg (1750 lbs)", "800 kg (1750 lbs)"] },
  { label: "X-Y Axis Travel", values: ["1524 x 3048 mm (6.5 x 13 ft)", "2000 x 4000 mm (6.5 x 13 ft)"] },
  { label: "Z Axis Travel", values: ['100 mm (3.94")', '100 mm (3.94")'] },
  { label: "X-Y-Z Axis Guideway", values: ["4 Point Ball Caged", "4 Point Ball Caged"] },
  { label: "X-Y Axis Drive System", values: ["Rack", "Rack"] },
  { label: "Z Axis Drive System", values: ["Ballscrew", "Ballscrew"] },
  { label: "X-Y Axis Speed", values: ["80 m/min (3150 ipm)", "80 m/min (3150 ipm)"] },
  { label: "Z Axis Speed", values: ["30 m/min (1180 ipm)", "30 m/min (1180 ipm)"] },
  { label: "X-Y Position Accuracy", values: ['0.05 mm (0.002")', '0.05 mm (0.002")'] },
  { label: "X-Y Repeatability Accuracy", values: ['0.03 mm (0.001")', '0.03 mm (0.001")'] },
  { label: "Laser Source", values: ["3, 6 and 12kW", "3, 6 and 12kW"] },
  { label: "Laser Source Output Power", values: ["Max / Han's / IPG", "Max / Han's / IPG"] },
  { label: "CNC Control System", values: ["Fscut / Cypcut", "Fscut / Cypcut"] },
  { label: "Laser Head", values: ["Raytools / BOCI / WSX", "Raytools / BOCI / WSX"] },
  { label: "Assist Gases", values: ["Air / Oxygen / Nitrogen", "Air / Oxygen / Nitrogen"] },
  { label: "Cooling Type", values: ["Water Cooling", "Water Cooling"] },
  { label: "Machine Weight", values: ["2300 kg (5100 lbs)", "2300 kg (5100 lbs)"] },
  { label: "Machine Dimensions (L x W x H)", values: ["2355 x 4302 x 1980 mm (7.7 x 14.1 x 6.5 ft)", "2355 x 5302 x 1980 mm (7.7 x 17.4 x 6.5 ft)"] },
  { label: "Graphic Format Support", values: ["dwg / dxf / stp", "dwg / dxf / stp"] },
  { label: "Electrical", values: ["220 or 480 V / 60 Hz", "220 or 480 V / 60 Hz"] },
  { label: "Certifications", values: ["CE / ISO / FDA", "CE / ISO / FDA"] },
  { label: "Warranty", values: ["2 Years", "2 Years"] },
];

const cuttingChart: { material: string; values: string[] }[] = [
  { material: "Carbon Steel", values: ['14 mm (9/16")', '16 mm (5/8")', '10 mm (3/8")', '22 mm (7/8")', '25 mm (1")', '30 mm (1-3/16")', '45 mm (1-3/4")'] },
  { material: "Stainless Steel", values: ['5 mm (3/16")', '6 mm (1/4")', '10 mm (3/8")', '20 mm (3/4")', '25 mm (1")', '25 mm (1")', '40 mm (1-9/16")'] },
  { material: "Aluminum", values: ['4 mm (5/32")', '5 mm (3/16")', '8 mm (5/16")', '10 mm (3/8")', '20 mm (3/4")', '25 mm (1")', '30 mm (1-3/16")'] },
  { material: "Brass", values: ['4 mm (5/32")', '5 mm (3/16")', '8 mm (5/16")', '8 mm (5/16")', '12 mm (1/2")', '12 mm (1/2")', '18 mm (11/16")'] },
];
const powerCols = ["2 kW", "3 kW", "4 kW", "6 kW", "8 kW", "12 kW", "20 kW"];

const trustBand = [
  { icon: Award, title: "CE / ISO / FDA Certified", body: "Meets international and U.S. safety standards." },
  { icon: ShieldCheck, title: "2-Year Warranty", body: "Standard on all FLO series machines." },
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

export default function OpenTypeFiberLaser() {
  const [unit, setUnit] = useState<Unit>("metric");
  return (
    <Layout>
      {/* 1. HERO */}
      <section className="relative bg-[#f5f5f5] overflow-hidden">
        <div className="absolute inset-1 bg-gradient-to-br from-[#f5f5f5] via-[#f5f5f5] to-[#e8e8e8] pointer-events-none" />
        <div className="container relative py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <nav className="flex items-center flex-wrap gap-1 text-xs text-muted-foreground mb-6">
                <Link to="/" className="hover:text-foreground">Home</Link>
                <ChevronRight className="h-3 w-3" />
                <Link to="/machines" className="hover:text-foreground">Laser</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-foreground">Open Type Fiber Lasers</span>
              </nav>
              <p className="font-bold tracking-[0.2em] text-primary mb-4 uppercase text-3xl">

              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 tracking-tight">
                Open Type Fiber Lasers
              </h1>
              <ul className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl list-disc list-inside space-y-1">
                <li>Cost effective</li>
                <li>24/7 USA support</li>
                <li>Made in Europe</li>
                <li>2 Year Full Warranty</li>
                <li>5x10ft / 6.5x13ft / 6.5x20ft models</li>
                <li>3,6 or 12kW laser power</li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="font-bold px-8" onClick={scrollToQuote}>
                  Request a Quote
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-bold px-8 border-foreground/30 bg-transparent text-foreground hover:bg-foreground hover:text-white"
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
              <figure className="bg-white border border-border overflow-hidden rounded-lg shadow-sm">
                <div className="aspect-[4/3] flex items-center justify-center p-6">
                  <Flo1530Slideshow />
                </div>
                <figcaption className="px-4 py-2 text-sm font-bold text-foreground text-center">FLO-1530</figcaption>
              </figure>
              <figure className="bg-white border border-border overflow-hidden rounded-lg shadow-sm">
                <div className="aspect-[1/1] flex items-center justify-center p-6">
                  <Flo2040Slideshow />
                </div>
                <figcaption className="px-4 py-2 text-sm font-bold text-foreground text-center">FLO-2040</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT HIGHLIGHTS */}
      <section className="py-20 bg-background">
        <div className="container max-w-5xl mb-16">
          <div className="aspect-video w-full overflow-hidden rounded-lg border border-border shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/USZ4uyD315s?autoplay=1&mute=1&loop=1&playlist=USZ4uyD315s&controls=0&modestbranding=1&playsinline=1&rel=0"
              title="Open Type Fiber Laser in action"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <div className="container max-w-4xl">
          <p className="section-label mb-3 text-primary">Overview</p>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-10">Product Highlights</h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              The Open Type Fiber Laser series is built for shops that want serious cutting capability without
              committing serious floor space. Compact, single-table design installs in roughly 160 square feet
              and ships in 3,6 and 12kW power configurations — letting you match the machine to your
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
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <p className="section-label mb-3 text-primary">Model Lineup</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">Available Sizes and Models</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { id: "FLO-1530", area: "1524 x 3048 mm (5 x 10 ft)", image: flo1530Img },
              { id: "FLO-2040", area: "2000 x 4000 mm (6.5 x 13 ft)", image: flo2040Img },
              { id: "FLO-2060", area: "2000 x 6000 mm (6.5 x 20 ft)", image: flo2060Img },
            ].map((m) => (
              <div
                key={m.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-colors flex flex-col"
              >
                <div className="aspect-[4/3] bg-white overflow-hidden flex items-center justify-center p-6 rounded-lg border border-border">
                  <img src={m.image} alt={m.id} className="w-full h-full object-contain" />
                </div>
                <div className="p-6 flex-1 flex flex-col items-center text-center">
                  <h3 className="text-xl font-black text-foreground mb-1">{m.id}</h3>
                  <p className="text-sm font-semibold text-primary">{m.area}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SPECIFICATIONS COMPARISON */}
      <section className="py-20 bg-secondary">
        <div className="container max-w-6xl">
          <div className="max-w-3xl mb-12">
            <p className="section-label mb-3 text-primary">{" "}</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">Technical Specifications</h2>
            <p className="text-white/70 text-lg mt-3">
              {" "}
            </p>
          </div>
          <UnitToggle unit={unit} onChange={setUnit} variant="dark" />
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
                      <td key={j} className="px-5 py-3 text-muted-foreground border-b border-border">{convertValue(v, unit)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. MATERIAL CUTTING CAPABILITY */}
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
        </div>
      </section>

      {/* 6. KEY FEATURES */}
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

      {/* 7. INDUSTRIES */}
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
            <h2 className="text-3xl md:text-4xl font-black text-foreground">Standard Accessories included</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((g) => (
              <figure key={g.caption} className="bg-white border border-border overflow-hidden group rounded-lg">
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
