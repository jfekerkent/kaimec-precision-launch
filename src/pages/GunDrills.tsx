import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Droplet,
  Plane,
  Zap,
  Truck,
  Car,
  Layers,
  Activity,
  Target,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import tskMain from "@/assets/tsk-2150-main.png";

const CALENDLY_URL = "https://calendly.com/jfeker-kentusa/kaimec-consultation";

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = tag?.content ?? "";
    if (!tag) {
      tag = document.createElement("meta");
      tag.name = "description";
      document.head.appendChild(tag);
    }
    tag.content = description;
    return () => {
      document.title = prevTitle;
      if (tag) tag.content = prevDesc;
    };
  }, [title, description]);
}

const tskSpecs: { label: string; value: string }[] = [
  { label: "Drilling Diameter", value: "Ø30 – Ø150 mm (Ø1.18 – Ø5.91 in)" },
  { label: "Boring Diameter", value: "Ø40 – Ø500 mm (Ø1.57 – Ø19.69 in)" },
  { label: "Max Processing Depth", value: "3,000 mm (118 in / 9.84 ft)" },
  { label: "Workpiece OD Range", value: "Ø100 – Ø700 mm (Ø3.94 – Ø27.56 in)" },
  { label: "Spindle Motor", value: "30 kW (~40 hp)" },
];

type SeriesCard = {
  model: string;
  title: string;
  bullets: { bold?: string; text: string }[];
};

const seriesCards: SeriesCard[] = [
  {
    model: "KDH-Series",
    title: "KDH General Deep-Hole Drilling",
    bullets: [
      { text: "The KDH Series is purpose-built for extreme drilling demands, combining massive capacity with proven precision." },
      { bold: "Drilling depths from 3,100 mm to 12,000 mm (122 – 472 in / 10 – 39 ft)", text: ", supported by rigid ballscrews and base spans up to 1,400 mm (55 in) for unmatched stability." },
      { bold: "Gear-driven spindles deliver 3 – 30 rpm", text: ", ideal for large-diameter boring, while auxiliary tool spindles reach 1,000 rpm (optionally 1,250 rpm) for added versatility." },
      { bold: "Dual chucks up to Ø630 mm (Ø24.8 in)", text: ", with an option for Ø800 mm (Ø31.5 in) and 3- or 4-jaw configurations." },
      { bold: "Workpieces from 20,000 kg (44,092 lb) to 120,000 kg (264,555 lb)", text: ", depending on the model." },
      { bold: "Standard accuracy of ±0.01 mm (±0.0004 in)", text: ", ensuring reliable results even at extreme depths." },
      { text: "Designed for oil & gas, aerospace, power generation, and heavy equipment — straight, accurate holes in the largest and most demanding parts." },
    ],
  },
  {
    model: "KPGD-Series",
    title: "KPGD Precision Micro Deep Hole Drilling",
    bullets: [
      { bold: "KPGD-4X and KPGD-8X", text: " are engineered for high-speed micro-drilling, with built-in ER-16 spindles reaching up to 30,000 rpm." },
      { text: "Perfect for aerospace, medical, and precision manufacturing — fine, accurate holes with exceptional repeatability." },
      { bold: "Workpieces up to Ø1,400 mm (Ø55 in)", text: ", with the 8X optimized for even bigger diameters." },
      { bold: "KCNC-36 belt-driven R-8 spindle up to 5,000 rpm", text: ", enabling heavier tooling up to 3.0 kg (6.6 lb) for versatile general-purpose deep-hole work." },
      { bold: "3,600 mm (141.7 in) base length", text: " across all three machines, ensuring rigidity and stable performance." },
      { bold: "Micron-level positioning accuracy ±0.01 mm (±0.0004 in)", text: " with rapid feed rates for repeatable, high-quality results." },
    ],
  },
  {
    model: "KMGD-Series",
    title: "KMGD Multi-Spindle Deep Hole Drilling",
    bullets: [
      { bold: "Tables from 380 – 685 mm (15 – 27 in) wide and 1,500 – 1,981 mm (59 – 78 in) long", text: ", up to heavy-duty platforms with travels exceeding 5,080 mm (200 in)." },
      { bold: "Spindle speeds up to 8,000 rpm (optional 10,000 rpm)", text: " with belt or gear drive, plus taper options including DIN or BT." },
      { bold: "Positioning accuracy ±0.01 mm (±0.0004 in)", text: " across the lineup." },
      { bold: "Motor power from 5.6 kW (7.5 hp) to over 30 kW (40 hp)", text: ", supporting table loads from 1,500 kg (3,300 lb) to 49,895 kg (110,000 lb)." },
      { bold: "Tooling capacity Ø15 mm (Ø0.6 in) to Ø150 mm (Ø5.9 in)", text: "; advanced models deliver rapid feed rates up to 80,000 mm/min (3,150 ipm)." },
      { text: "Ideal for automotive, aerospace, mold & die, and heavy equipment industries." },
    ],
  },
];

const industries = [
  { icon: Droplet, name: "Oil & Gas", desc: "Downhole tooling, valve bodies, drilling components" },
  { icon: Plane, name: "Aerospace", desc: "Engine shafts, structural forgings, precision micro-holes" },
  { icon: Zap, name: "Power Generation", desc: "Turbine shafts, generator components, large bores" },
  { icon: Truck, name: "Heavy Equipment", desc: "Hydraulic cylinders, axles, structural parts" },
  { icon: Car, name: "Automotive", desc: "Crankshafts, transmission components, prototype work" },
  { icon: Layers, name: "Mold & Die", desc: "Cooling lines, ejector pin holes, hydraulic passages" },
  { icon: Activity, name: "Medical", desc: "Surgical instruments, implant precision drilling" },
  { icon: Target, name: "Precision Manufacturing", desc: "Aerospace fasteners, fluid passages, micro-features" },
];

function QuoteButton({ machine, className = "" }: { machine: string; className?: string }) {
  return (
    <Link to={`/quote?machine=${encodeURIComponent(machine)}`} className={className}>
      <Button className="w-full font-bold tracking-wide bg-primary text-primary-foreground hover:bg-primary/90">
        REQUEST QUOTE →
      </Button>
    </Link>
  );
}

export default function GunDrills() {
  usePageMeta(
    "Gun Drills & Deep-Hole Drilling Solutions | KaiMec",
    "From standard gun drilling to heavy-duty deep-hole machining for parts up to 120 tons — KaiMec delivers precision deep-hole solutions for aerospace, oil & gas, mold & die, and heavy equipment."
  );

  return (
    <Layout>
      {/* SECTION 1 — Hero */}
      <section className="bg-[#1a1a1a] py-14 md:py-20">
        <div className="container max-w-5xl">
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#F5A623] mb-4">
            Gun Drills & Deep-Hole Drilling
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
            CNC Deep-Hole Drilling Solutions
          </h1>
          <p className="text-base md:text-lg font-medium text-white/90 max-w-[800px] leading-relaxed">
            From standard production gun drilling to precision micro-drilling and heavy-duty deep-hole platforms. One source, full range — built for shops that need straight, accurate holes in serious parts.
          </p>
        </div>
      </section>

      {/* SECTION 2 — Featured TSK-2150 */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto rounded-xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-black/5 overflow-hidden">
            <div className="grid md:grid-cols-[45%_55%]">
              {/* LEFT — image */}
              <div className="bg-[#f7f7f7] flex items-center justify-center p-6 md:p-10">
                {/* TODO: swap in higher-res TSK-2150 hero asset if available */}
                <img
                  src={tskMain}
                  alt="TSK-2150 Deep Hole Drilling & Boring Machine"
                  className="w-full h-auto max-h-[420px] object-contain"
                />
              </div>
              {/* RIGHT — content */}
              <div className="p-6 md:p-10 flex flex-col">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5A623] mb-3">
                  Flagship Gun Drill
                </p>
                <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] mb-1">
                  TSK-2150
                </h2>
                <p className="text-base md:text-lg font-medium text-neutral-600 mb-4">
                  Deep Hole Drilling & Boring Machine
                </p>
                <p className="text-neutral-700 leading-relaxed mb-6">
                  Standard production gun drilling for general manufacturing, mold work, hydraulic blocks, and tool & die. Built for daily runs with consistent precision and a 3,000 mm / 118 in stroke.
                </p>
                <ul className="space-y-2.5 mb-8">
                  {tskSpecs.map((s) => (
                    <li key={s.label} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 text-sm md:text-[15px]">
                      <span className="font-bold text-[#1a1a1a] sm:min-w-[180px]">{s.label}:</span>
                      <span className="text-neutral-700">{s.value}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <QuoteButton machine="TSK-2150" className="block max-w-xs" />
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-3 text-sm text-neutral-500 hover:text-[#F5A623] transition-colors"
                  >
                    or 📅 Book a 20-min consult — opens in new tab
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — K-Series grid */}
      <section className="py-12 md:py-20 bg-[#f5f5f5]">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#F5A623] mb-3">
              Deep-Hole Drilling Lineup
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] mb-4">
              Specialized Solutions for Demanding Work
            </h2>
            <p className="text-neutral-700 max-w-[700px] mx-auto leading-relaxed">
              When standard gun drilling won't cut it — purpose-built platforms for the deepest, largest, or most precise jobs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {seriesCards.map((card) => (
              <div
                key={card.model}
                className="flex flex-col bg-white rounded-xl border border-black/5 shadow-sm p-8"
              >
                {/* TODO: replace with actual product image for {card.model} */}
                <div className="h-[200px] flex items-center justify-center mb-5 bg-[#fafafa] rounded-lg">
                  <span className="text-neutral-400 text-sm">Image coming soon</span>
                </div>
                <h3 className="text-xl font-black text-[#1a1a1a] text-center">
                  {card.title}
                </h3>
                <div className="h-[3px] w-[60px] bg-[#F5A623] mx-auto my-4 rounded-full" />
                <ul className="space-y-3 text-[0.95rem] text-neutral-700 leading-relaxed flex-grow">
                  {card.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-[#F5A623] mt-1.5 shrink-0">•</span>
                      <span>
                        {b.bold && <span className="font-bold text-[#1a1a1a]">{b.bold}</span>}
                        {b.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <QuoteButton machine={card.model} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — Industries */}
      <section className="py-12 md:py-16 bg-[#1a1a1a]">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#F5A623] mb-3">
              Industries Served
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              From Aerospace to Oil & Gas
            </h2>
            <p className="text-white/80 max-w-[700px] mx-auto leading-relaxed">
              Wherever a straight, precise, deep hole matters.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind) => (
              <div key={ind.name} className="flex flex-col items-start gap-3">
                <ind.icon className="text-[#F5A623]" size={40} strokeWidth={1.75} />
                <h3 className="font-bold text-white">{ind.name}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — Closing CTA */}
      <section className="py-16 md:py-20 bg-[#F5A623]">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] mb-4">
            Not sure which fits your shop?
          </h2>
          <p className="text-[#1a1a1a]/90 text-base md:text-lg mb-8 leading-relaxed">
            Talk to our team. 20 minutes — real specs, real pricing, no fluff. Or open the chat in the bottom-right and we'll help right now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="font-bold tracking-wide bg-[#1a1a1a] text-white hover:bg-[#1a1a1a]/90 px-8"
              >
                📅 BOOK A 20-MIN CONSULT
              </Button>
            </a>
            <a href="tel:7142588526">
              <Button
                size="lg"
                variant="outline"
                className="font-bold tracking-wide border-2 border-[#1a1a1a] text-[#1a1a1a] bg-transparent hover:bg-[#1a1a1a] hover:text-white px-8"
              >
                CALL 714-258-8526
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
