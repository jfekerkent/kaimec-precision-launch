import { Link } from "react-router-dom";
import {
  Combine,
  Zap,
  Layers,
  Crosshair,
  Radio,
  Flag,
  Tractor,
  Shirt,
  UtensilsCrossed,
  HardHat,
  Factory,
  Building2,
  ChevronRight,
  Download,
  Award,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import RequestInfoForm from "@/components/RequestInfoForm";
import flcP1530Img from "@/assets/flc-p-1530-1.png";
import flcP2040Img from "@/assets/flc-p-2040-2.png";
import flp6035Img from "@/assets/machine-flp-6035-front.png";

const brochurePdf = "/Kaimec-Fiber-Laser-Brochure.pdf";

const features = [
  { icon: Combine, title: "Sheet + Pipe Combo", body: "Eliminates the need for separate machines. One footprint, two production capabilities." },
  { icon: Zap, title: "Up to 20 kW Laser Power", body: "Scales from production sheet work to thick plate cutting without compromise." },
  { icon: Layers, title: "Double Exchange Table", body: "Keeps cutting continuous between loads. 10-second table changeover." },
  { icon: Crosshair, title: "Auto-Centering Chucks", body: "Pipe clamping and centering at the press of a button. No manual setup between jobs." },
  { icon: Radio, title: "Wireless Remote Control", body: "Blowing, cutting, pause, calibration, and simulation functions accessible from anywhere on the floor." },
  { icon: Flag, title: "U.S.-Based Support", body: "Service technicians, replacement parts, and technical support all based in the United States." },
];

const industries = [
  { icon: Tractor, label: "Agriculture Equipment" },
  { icon: Shirt, label: "Textile Equipment" },
  { icon: UtensilsCrossed, label: "Food Machinery" },
  { icon: HardHat, label: "Construction" },
  { icon: Factory, label: "Heavy Machinery Manufacturing" },
  { icon: Building2, label: "Structural Fabrication" },
];

const configurations = ["FLC-P 1530", "FLC-P 2040"];

const specRows: { label: string; values: string[] }[] = [
  { label: "Working Area", values: ["1500 x 3000 mm (5 x 10 ft)", "2000 x 4000 mm (6.5 x 13 ft)"] },
  { label: "Loading Capacity", values: ["1200 kg (2650 lbs)", "1200 kg (2650 lbs)"] },
  { label: "X-Y Axis Travel", values: ["1520 x 3030 mm", "2020 x 4050 mm"] },
  { label: "Z Axis Travel", values: ['300 mm (11.8")', '350 mm (13.8")'] },
  { label: "X-Y-Z Axis Guideway", values: ["4 Point Ball Caged", "4 Point Ball Caged"] },
  { label: "X-Y Axis Drive System", values: ["Rack", "Rack"] },
  { label: "Z Axis Drive System", values: ["Ballscrew", "Ballscrew"] },
  { label: "X-Y Axis Speed", values: ["100 m/min", "100 m/min"] },
  { label: "Z Axis Speed", values: ["30 m/min", "30 m/min"] },
  { label: "X-Y Position Accuracy", values: ['0.05 mm (0.002")', '0.05 mm (0.002")'] },
  { label: "X-Y Repeatability Accuracy", values: ['0.03 mm (0.001")', '0.03 mm (0.001")'] },
  { label: "Table Change Time", values: ["10 sec", "10 sec"] },
  { label: "Max Pipe Diameter", values: ['Ø 350 mm (13.8")', 'Ø 350 mm (13.8")'] },
  { label: "Max Pipe Length", values: ["6000 mm (20 ft) standard / 9000 mm optional", "6000 mm (20 ft) standard / 9000 mm optional"] },
  { label: "Laser Source", values: ["Raycus / JPT / Han's", "Raycus / JPT / Han's"] },
  { label: "Laser Source Output Power", values: ["2 / 3 / 4 / 6 / 8 / 12 / 20 kW", "2 / 3 / 4 / 6 / 8 / 12 / 20 kW"] },
  { label: "CNC Control System", values: ["Fscut", "Fscut"] },
  { label: "Laser Cutting Head", values: ["Raytools / BOCI / WSX", "Raytools / BOCI / WSX"] },
  { label: "Assist Gases", values: ["Air / Oxygen / Nitrogen", "Air / Oxygen / Nitrogen"] },
  { label: "Cooling Type", values: ["Water Cooling", "Water Cooling"] },
  { label: "Machine Weight", values: ["12000 kg (26450 lbs)", "11500 kg (25350 lbs)"] },
  { label: "Machine Dimensions (W x L x H)", values: ["4400 x 10000 x 2120 mm", "4400 x 10000 x 2120 mm"] },
  { label: "Graphic Format Support", values: ["dwg / dxf / stp", "dwg / dxf / stp"] },
  { label: "Electrical", values: ["220 or 380 Volt / 3 phase / 60 Hz", "220 or 380 Volt / 3 phase / 60 Hz"] },
  { label: "Certifications", values: ["CE / ISO", "CE / ISO"] },
  { label: "Warranty", values: ["2 Years", "2 Years"] },
];

const powerCols = ["2 kW", "3 kW", "4 kW", "6 kW", "8 kW", "12 kW", "20 kW"];
const cuttingChart: { material: string; values: string[] }[] = [
  { material: "Carbon Steel", values: ['14 mm (9/16")', '16 mm (5/8")', '20 mm (3/4")', '22 mm (7/8")', '25 mm (1")', '30 mm (1-3/16")', '45 mm (1-3/4")'] },
  { material: "Stainless Steel", values: ['5 mm (3/16")', '6 mm (1/4")', '10 mm (3/8")', '20 mm (3/4")', '25 mm (1")', '25 mm (1")', '40 mm (1-9/16")'] },
  { material: "Aluminum", values: ['4 mm (1/8")', '5 mm (3/16")', '8 mm (5/16")', '10 mm (3/8")', '20 mm (3/4")', '25 mm (1")', '30 mm (1-3/16")'] },
  { material: "Brass", values: ['4 mm (1/8")', '5 mm (3/16")', '8 mm (5/16")', '8 mm (5/16")', '12 mm (1/2")', '12 mm (1/2")', '18 mm (11/16")'] },
];

const trustBand = [
  { icon: Award, title: "CE / ISO Certified", body: "Meets international and U.S. safety standards." },
  { icon: ShieldCheck, title: "2-Year Warranty", body: "Standard on all FLC-P series machines." },
  { icon: Wrench, title: "U.S.-Based Service", body: "Parts, support, and service technicians in the U.S." },
];

const flp6035Specs = [
  ["Max Profile Length", "6100 mm (20 ft)"],
  ["Max Profile Diameter", 'Ø 350 mm (13.8")'],
  ["Laser Power Options", "1 / 2 / 3 kW"],
  ["Machine Weight", "7000 kg (15430 lbs)"],
  ["Certifications", "CE / ISO / FDA | 2-Year Warranty"],
];

const gallery = [
  { src: flcP1530Img, caption: "Cutting head detail" },
  { src: flp6035Img, caption: "Pipe handling system" },
  { src: flcP1530Img, caption: "Control interface" },
  { src: flcP2040Img, caption: "Production view" },
];

function scrollToQuote(e?: React.MouseEvent) {
  if (e) e.preventDefault();
  const el = document.getElementById("quote-form");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ConfigCard({ img, title, subtitle, body, model }: { img: string; title: string; subtitle: string; body: string; model: string }) {
  return (
    <div className="bg-white border border-border flex flex-col">
      <div className="aspect-[4/3] flex items-center justify-center p-6 bg-[#f8f8f8]">
        <img src={img} alt={title} className="w-full h-full object-contain" />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-black text-foreground">{title}</h3>
        <p className="text-sm text-primary font-bold mt-1 mb-3">{subtitle}</p>
        <p className="text-muted-foreground leading-relaxed mb-5 flex-1">{body}</p>
        <Button asChild className="font-bold w-full sm:w-auto">
          <a href="#quote-form" onClick={(e) => { e.preventDefault(); const el = document.getElementById(`quote-form`); el?.scrollIntoView({ behavior: "smooth" }); const evt = new CustomEvent("set-machine", { detail: model }); window.dispatchEvent(evt); }}>
            Request Quote on {title}
          </a>
        </Button>
      </div>
    </div>
  );
}

export default function CoveredPipeProfileFiberLaser() {
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
                <span className="text-white">Covered Type & Pipe Profile Fiber Laser</span>
              </nav>
              <p className="text-xs font-bold tracking-[0.2em] text-primary mb-4 uppercase">
                Fiber Laser Cutting Series
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
                Covered Type & Pipe Profile Fiber Laser
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-xl">
                Fully enclosed sheet metal AND pipe/profile cutting in a single machine — laser power up to 20 kW, fully U.S. supported.
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
                  <a href={brochurePdf} download="Kaimec-Fiber-Laser-Brochure.pdf" aria-label="Download Kaimec fiber laser brochure">
                    <Download className="h-4 w-4" />
                    Download Spec Sheet
                  </a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-white/5 border border-white/10 rounded-lg overflow-hidden flex items-center justify-center p-6">
                <img src={flcP1530Img} alt="FLC-P Covered Type & Pipe Profile Fiber Laser" className="w-full h-full object-contain" />
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
              The FLC-P series represents a fusion of speed, sensitivity, reliability, and cost-effectiveness in fiber laser cutting — purpose-built for shops that need to cut both sheet metal and pipe/profile in a single fully enclosed machine. Laser power scales up to 20,000 watts, making it capable for thick plate work alongside everyday production cutting.
            </p>
            <p>
              Standard 6-meter pipe and profile cutting length, extendable to 9 meters if needed, with support for pipe diameters up to 350 mm. Chucks clamp and auto-center at the press of a button. A double exchange table design keeps cutting continuous between loads, and a wireless remote provides fast access to blowing, cutting, pause, calibration, and simulation functions.
            </p>
            <p className="border-l-4 border-primary pl-6 text-foreground font-medium">
              Every FLC-P Series machine sold by Kaimec ships with full U.S.-based technical support, parts inventory, and service. No international shipping delays for spare parts. No time-zone games when something needs answering. That's the Kaimec difference.
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
              <div key={label} className="flex flex-col items-center justify-center text-center bg-card border border-border p-8 hover:border-primary hover:bg-primary/5 transition-colors min-h-[160px]">
                <Icon className="h-10 w-10 text-primary mb-4" />
                <span className="text-sm md:text-base font-bold text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. AVAILABLE CONFIGURATIONS */}
      <section className="py-20 bg-[#f8f8f8]">
        <div className="container max-w-6xl">
          <div className="max-w-3xl mb-12">
            <p className="section-label mb-3 text-primary">Configurations</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">Available Configurations</h2>
            <p className="text-muted-foreground text-lg mt-3">
              Two sizes. Same proven FLC-P platform. Built around the cutting capacity your shop actually needs.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <ConfigCard
              img={flcP1530Img}
              title="FLC-P 1530"
              subtitle="5 x 10 ft Working Area | 2-20 kW"
              body="The compact combo machine. Sheet metal up to 5 x 10 ft and pipe/profile up to 350 mm diameter in a single fully enclosed footprint."
              model="FLC-P 1530"
            />
            <ConfigCard
              img={flcP2040Img}
              title="FLC-P 2040"
              subtitle="6.5 x 13 ft Working Area | 2-20 kW"
              body="Larger working area for shops handling oversized sheet stock alongside pipe cutting. Same proven FLC-P platform, more sheet cutting capacity."
              model="FLC-P 2040"
            />
          </div>
        </div>
      </section>

      {/* 6. SPECIFICATIONS COMPARISON */}
      <section className="py-20 bg-secondary">
        <div className="container max-w-6xl">
          <div className="max-w-3xl mb-12">
            <p className="section-label mb-3 text-primary">Specifications</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">Configuration Comparison</h2>
            <p className="text-white/70 text-lg mt-3">Side-by-side specs for available FLC-P series configurations.</p>
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

      {/* 7. MATERIAL CUTTING CAPABILITY */}
      <section className="py-20 bg-background">
        <div className="container max-w-6xl">
          <div className="max-w-3xl mb-10">
            <p className="section-label mb-3 text-primary">Capability</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">Material Cutting Capability</h2>
            <p className="text-muted-foreground text-lg">Maximum cuttable thickness by material and laser power.</p>
          </div>
          <div className="border border-border bg-card overflow-x-auto">
            <table className="w-full text-sm md:text-base min-w-[820px]">
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
                    <td className="px-5 py-3 font-semibold text-foreground border-b border-border whitespace-nowrap">{row.material}</td>
                    {row.values.map((v, j) => (
                      <td key={j} className="px-5 py-3 text-center text-muted-foreground border-b border-border whitespace-nowrap">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7b. CERTIFICATIONS & WARRANTY TRUST BAND */}
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

      {/* 8. FLP-6035 SUB-SECTION */}
      <section className="py-20 bg-[#eef2f6] border-t-4 border-primary">
        <div className="container max-w-5xl">
          <div className="max-w-3xl mb-10">
            <p className="section-label mb-3 text-primary">Pipe-Only Alternative</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
              Need Pipe Cutting Only? Consider the FLP-6035
            </h2>
            <p className="text-muted-foreground text-lg">
              When your shop only cuts tube and profile — no sheet — the FLP-6035 is a dedicated, purpose-built solution.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-5 items-start">
            <div className="md:col-span-3">
              <ConfigCard
                img={flp6035Img}
                title="FLP-6035"
                subtitle="Pipe & Profile Only | Up to 6 m length, Ø 350 mm"
                body="Built exclusively for tube and profile cutting. Smaller footprint than the FLC-P combo machines, lower price point, and optimized handling for high-volume pipe production. Ideal for fabrication shops that don't need sheet cutting in the same machine."
                model="FLP-6035"
              />
            </div>
            <div className="md:col-span-2 bg-white border border-border p-6">
              <p className="text-xs font-bold tracking-[0.15em] text-primary uppercase mb-4">Key Specs</p>
              <dl className="space-y-3">
                {flp6035Specs.map(([k, v]) => (
                  <div key={k} className="flex flex-col border-b border-border pb-2 last:border-0">
                    <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{k}</dt>
                    <dd className="text-sm font-bold text-foreground mt-0.5">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <p className="text-sm text-muted-foreground italic mt-8 max-w-3xl">
            Full specifications available on request. Talk to a Kaimec specialist about whether FLC-P or FLP-6035 is the right fit for your application.
          </p>
        </div>
      </section>

      {/* 9. GALLERY */}
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
                  <img src={g.src} alt={g.caption} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <figcaption className="px-4 py-3 text-sm font-medium text-foreground border-t border-border">{g.caption}</figcaption>
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

      {/* 10. QUOTE FORM */}
      <section id="quote-form" className="py-20 bg-background scroll-mt-24">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <p className="section-label mb-3 text-primary">Get In Touch</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              Get a Quote on the Covered Type & Pipe Profile Series
            </h2>
            <p className="text-lg text-muted-foreground">
              Talk to a U.S.-based specialist about your application. Most quotes returned within one business day.
            </p>
          </div>
          <div className="bg-card border border-border p-6 md:p-10">
            <CoveredQuoteForm />
          </div>
        </div>
      </section>
    </Layout>
  );
}

import { useEffect, useState } from "react";

function CoveredQuoteForm() {
  const [machine, setMachine] = useState("FLC-P Series");
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail) setMachine(detail);
    };
    window.addEventListener("set-machine", handler);
    return () => window.removeEventListener("set-machine", handler);
  }, []);
  return <RequestInfoForm key={machine} machine={machine} />;
}