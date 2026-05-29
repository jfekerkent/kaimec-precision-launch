import { useEffect, ReactNode } from "react";
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
import TrustSignals from "@/components/shared/TrustSignals";
import { Button } from "@/components/ui/button";
import tskMain from "@/assets/tsk-2150-deep-hole-drilling.jpg";
import kaimecLogo from "@/assets/kaimec-logo-dark.png";
import kdhImg from "@/assets/kdh-deep-hole-drilling.jpg";
import kpgdImg from "@/assets/kpgd-precision-micro-drilling.jpg";
import kmgdImg from "@/assets/kmgd-multitasking-deep-hole-drilling.jpg";

function ProductImage({ src, alt, bg = "white" }: { src: string; alt: string; bg?: "white" | "light" }) {
  const bgClass = bg === "light" ? "bg-[#f5f5f5]" : "bg-white";
  return (
    <div className={`w-full min-h-[450px] ${bgClass} rounded-xl border border-black/5 flex items-center justify-center p-6`}>
      <img src={src} alt={alt} className="w-full h-auto max-h-[420px] object-contain" />
    </div>
  );
}

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

type Spec = { label: string; value: string };

const tskSpecs: Spec[] = [
  { label: "Drilling Diameter", value: "Ø30 – Ø150 mm (Ø1.18 – Ø5.91 in)" },
  { label: "Boring Diameter", value: "Ø40 – Ø500 mm (Ø1.57 – Ø19.69 in)" },
  { label: "Max Processing Depth", value: "3,000 mm (118 in / 9.84 ft)" },
  { label: "Workpiece OD Range", value: "Ø100 – Ø700 mm (Ø3.94 – Ø27.56 in)" },
  { label: "Spindle Motor", value: "30 kW (~40 hp)" },
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

function CTAButtons({ quoteMachine, quoteLabel }: { quoteMachine: string; quoteLabel: string }) {
  return (
    <div className="mt-8 flex flex-col sm:flex-row gap-3">
      <Link to={`/quote?machine=${encodeURIComponent(quoteMachine)}`}>
        <Button
          size="lg"
          className="w-full sm:w-auto font-bold tracking-wide bg-[#F5A623] text-[#1a1a1a] hover:bg-[#f4b347] px-6"
        >
          {quoteLabel} →
        </Button>
      </Link>
      <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
        <Button
          size="lg"
          variant="outline"
          className="w-full sm:w-auto font-bold tracking-wide border-2 border-[#F5A623] text-[#1a1a1a] bg-transparent hover:bg-[#F5A623] hover:text-[#1a1a1a] px-6"
        >
          📅 BOOK A CONSULT
        </Button>
      </a>
    </div>
  );
}

function PlaceholderImage({ label }: { label: string }) {
  return (
    <div className="w-full min-h-[450px] bg-[#fafafa] rounded-xl border border-black/5 flex flex-col items-center justify-center gap-4 p-8">
      <img src={kaimecLogo} alt="Kaimec" className="h-24 w-auto opacity-40" />
      <p className="text-neutral-400 text-sm font-medium tracking-wide uppercase">
        {label} — image coming soon
      </p>
    </div>
  );
}

interface ProductSectionProps {
  bg: "white" | "light" | "dark";
  imageSide: "left" | "right";
  kicker: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  description: ReactNode;
  specs?: Spec[];
  quoteMachine: string;
  quoteLabel: string;
  image: ReactNode;
}

function ProductSection({
  bg,
  imageSide,
  kicker,
  title,
  subtitle,
  tagline,
  description,
  specs,
  quoteMachine,
  quoteLabel,
  image,
}: ProductSectionProps) {
  const bgClass =
    bg === "white" ? "bg-white" : bg === "light" ? "bg-[#f5f5f5]" : "bg-[#1a1a1a]";
  const imageOrder =
    imageSide === "left" ? "md:order-1" : "md:order-2";
  const contentOrder =
    imageSide === "left" ? "md:order-2" : "md:order-1";

  return (
    <section className={`${bgClass} py-16 md:py-24`}>
      <div className="container max-w-7xl">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className={`${imageOrder}`}>
            <div className="min-h-[450px] flex items-center justify-center">
              {image}
            </div>
          </div>
          <div className={`${contentOrder}`}>
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#F5A623] mb-3">
              {kicker}
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg md:text-xl font-medium text-neutral-600 mt-2">
                {subtitle}
              </p>
            )}
            {tagline && (
              <p className="text-base md:text-lg italic font-medium text-[#F5A623] mt-3">
                {tagline}
              </p>
            )}
            <div className="mt-5 text-neutral-700 leading-relaxed max-w-[560px] text-[15px] md:text-base">
              {description}
            </div>
            {specs && (
              <ul className="mt-6 border-t border-black/10">
                {specs.map((s) => (
                  <li
                    key={s.label}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4 py-3 border-b border-black/10 text-sm md:text-[15px]"
                  >
                    <span className="font-bold text-[#1a1a1a]">{s.label}</span>
                    <span className="text-neutral-700 sm:text-right">{s.value}</span>
                  </li>
                ))}
              </ul>
            )}
            <CTAButtons quoteMachine={quoteMachine} quoteLabel={quoteLabel} />
          </div>
        </div>
      </div>
    </section>
  );
}

function HelpMeChooseBanner({
  headline,
  subhead,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  secondaryExternal = false,
}: {
  headline: string;
  subhead: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  secondaryExternal?: boolean;
}) {
  return (
    <section className="bg-[#F5A623] py-10 md:py-12">
      <div className="container max-w-5xl text-center">
        <h2 className="text-2xl md:text-3xl font-black text-[#1a1a1a] mb-3">
          {headline}
        </h2>
        <p className="text-base md:text-lg text-[#1a1a1a]/90 max-w-2xl mx-auto mb-6 leading-relaxed">
          {subhead}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to={primaryHref}>
            <Button
              size="lg"
              className="w-full sm:w-auto font-bold tracking-wide bg-[#1a1a1a] text-white hover:bg-[#1a1a1a]/90 px-6"
            >
              {primaryLabel} →
            </Button>
          </Link>
          {secondaryExternal ? (
            <a href={secondaryHref} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto font-bold tracking-wide border-2 border-[#1a1a1a] text-[#1a1a1a] bg-transparent hover:bg-[#1a1a1a] hover:text-white px-6"
              >
                {secondaryLabel}
              </Button>
            </a>
          ) : (
            <a href={secondaryHref}>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto font-bold tracking-wide border-2 border-[#1a1a1a] text-[#1a1a1a] bg-transparent hover:bg-[#1a1a1a] hover:text-white px-6"
              >
                {secondaryLabel}
              </Button>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default function GunDrills() {
  usePageMeta(
    "Gun & BTA Drilling Machines | Kaimec",
    "From standard gun drilling to heavy-duty deep-hole machining for parts up to 120 tons — Kaimec delivers precision deep-hole solutions for aerospace, oil & gas, mold & die, and heavy equipment."
  );

  return (
    <Layout>
      {/* SECTION 1 — Hero */}
      <section className="bg-[#1a1a1a] py-14 md:py-20">
        <div className="container max-w-5xl">
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#F5A623] mb-4">
            Gun & BTA Drilling Machines
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
            CNC Deep-Hole Drilling Solutions
          </h1>
          <p className="text-base md:text-lg font-medium text-white/90 max-w-[800px] leading-relaxed">
            From standard production gun drilling to precision micro-drilling and heavy-duty deep-hole platforms. One source, full range — built for shops that need straight, accurate holes in serious parts.
          </p>
        </div>
      </section>

      {/* KDH — image LEFT, white */}
      <ProductSection
        bg="white"
        imageSide="left"
        kicker="KDH Series"
        title="General-Purpose Deep-Hole Drilling"
        tagline="For the largest parts, the deepest holes."
        description={
          <p>
            The KDH Series is purpose-built for deep-hole drilling, combining massive capacity with proven precision. Models range from <strong>3,100 mm up to 12,000 mm (122 – 472 in / 10 – 39 ft) drilling depth</strong>, supported by rigid ballscrews and wide base spans up to <strong>1,400 mm (55 in)</strong> for maximum stability. With <strong>gear-driven spindles offering speeds of 3 – 30 rpm</strong> for large-diameter boring, and auxiliary tool spindles reaching <strong>1,000 rpm (optionally 1,250 rpm)</strong>, the KDH Series balances high torque with operational flexibility. Workholding includes <strong>dual chucks up to Ø630 mm (Ø24.8 in)</strong> (optional Ø800 mm / Ø31.5 in, 3- or 4-jaw), while workpiece weight capacity extends from <strong>20,000 kg to 120,000 kg (44,092 – 264,555 lb)</strong> on larger models. Standard accuracy reaches <strong>±0.01 mm (±0.0004 in)</strong>, ensuring reliable results even at extreme depths. Designed for oil &amp; gas, aerospace, power generation, and heavy equipment, the KDH Series delivers straight, accurate holes in the largest and most demanding parts.
          </p>
        }
        quoteMachine="KDH-Series"
        quoteLabel="REQUEST KDH QUOTE"
        image={
          <ProductImage src={kdhImg} alt="KDH Series deep-hole drilling machine" bg="light" />
        }
      />

      {/* KPGD — image RIGHT, light gray */}
      <ProductSection
        bg="light"
        imageSide="right"
        kicker="KPGD Series"
        title="Precision Micro Deep-Hole Drilling"
        tagline="High-speed micro-drilling for aerospace, medical, and precision work."
        description={
          <p>
            The Kaimec KPGD and KCNC Series deliver precision deep-hole drilling solutions across a range of applications. The compact <strong>KPGD-4X and KPGD-8X</strong> are engineered for high-speed micro-drilling, reaching <strong>spindle speeds of up to 30,000 rpm</strong> with built-in ER-16 spindles, making them ideal for fine, accurate holes in aerospace, medical, and high-precision components. Both handle large workpieces up to <strong>Ø1,400 mm (Ø55 in)</strong>, with the 8X tailored for even bigger diameters. By contrast, the <strong>KCNC-36</strong> offers spindle speeds up to <strong>5,000 rpm</strong> with a belt-driven R-8 spindle, supporting heavier tooling up to <strong>6.6 lb (3.0 kg)</strong> for general-purpose deep-hole work. All three share a <strong>141.7 in (3,600 mm) base length</strong> for rigidity, while rapid feed rates and <strong>micron-level positioning accuracy (±0.01 mm / ±0.0004 in)</strong> deliver repeatable, high-quality results.
          </p>
        }
        quoteMachine="KPGD-Series"
        quoteLabel="REQUEST KPGD QUOTE"
        image={
          <ProductImage src={kpgdImg} alt="KPGD Series precision micro deep-hole drilling machine" bg="white" />
        }
      />

      {/* HELP ME CHOOSE banner #1 — between KPGD and KMGD */}
      <HelpMeChooseBanner
        headline="Not sure which Gun & BTA Drilling Machine fits your shop?"
        subhead="Tell us your application and we'll match you to the right machine — usually in under 20 minutes."
        primaryLabel="HELP ME CHOOSE"
        primaryHref="/consultation"
        secondaryLabel="OR CALL 949-543-1508"
        secondaryHref="tel:+19495431508"
      />

      {/* KMGD — image LEFT, white */}
      <ProductSection
        bg="white"
        imageSide="left"
        kicker="KMGD Series"
        title="Multitasking Deep-Hole Drilling"
        tagline="Versatility from compact production to heavy-duty platforms."
        description={
          <p>
            The Kaimec KMGD Series offers a wide range of multi-spindle deep-hole drilling centers designed for precision and productivity. Models vary from compact machines with <strong>tables around 380 – 685 mm (15 – 27 in) wide and 1,500 – 1,981 mm (59 – 78 in) long</strong>, up to heavy-duty platforms with <strong>travels exceeding 5,080 mm (200 in)</strong>. Across the series, <strong>spindle speeds reach 8,000 rpm (optional 10,000 rpm)</strong> with belt or gear drive systems and DIN or BT taper options. Positioning accuracy is consistently <strong>±0.01 mm (±0.0004 in)</strong>. Spindle motor power ranges from <strong>5.6 kW (7.5 hp) to over 30 kW (40 hp)</strong>, while <strong>table load capacities extend from 1,500 kg (3,300 lb) to 49,895 kg (110,000 lb)</strong>. Tooling capability accommodates diameters from <strong>Ø15 mm (Ø0.6 in) up to Ø150 mm (Ø5.9 in)</strong>, with rapid feed rates up to <strong>80,000 mm/min (3,150 ipm)</strong> on advanced models — suitable for automotive, aerospace, and heavy equipment manufacturing.
          </p>
        }
        quoteMachine="KMGD-Series"
        quoteLabel="REQUEST KMGD QUOTE"
        image={
          <ProductImage src={kmgdImg} alt="KMGD Series multitasking deep-hole drilling machine" bg="light" />
        }
      />

      {/* TSK-2150 — image RIGHT, light gray */}
      <ProductSection
        bg="light"
        imageSide="right"
        kicker="Standard Production Gun & BTA Drilling Machine"
        title="TSK-2150"
        subtitle="Deep Hole Drilling & Boring Machine"
        description={
          <p>
            The TSK-2150 is the standard production gun drill for general manufacturing, mold work, hydraulic blocks, and tool &amp; die. Built for daily runs with consistent precision and a <strong>3,000 mm / 118 in stroke</strong>. The first machine most shops ask us about — for good reason.
          </p>
        }
        specs={tskSpecs}
        quoteMachine="TSK-2150"
        quoteLabel="REQUEST QUOTE"
        image={
          <ProductImage src={tskMain} alt="TSK-2150 Deep Hole Drilling & Boring Machine" bg="white" />
        }
      />

      {/* HELP ME CHOOSE banner #2 — after TSK, before TrustSignals */}
      <HelpMeChooseBanner
        headline="Still weighing your options?"
        subhead="Send us a note. We'll review your application, recommend the right series, and have a real number ready for the call."
        primaryLabel="SEND US A NOTE"
        primaryHref="/consultation"
        secondaryLabel="📅 BOOK 20 MIN"
        secondaryHref={CALENDLY_URL}
        secondaryExternal
      />

      {/* SECTION 8 — Industries */}
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

      <TrustSignals />

      {/* SECTION 10 — Closing CTA */}
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
            <a href="tel:+19495431508">
              <Button
                size="lg"
                variant="outline"
                className="font-bold tracking-wide border-2 border-[#1a1a1a] text-[#1a1a1a] bg-transparent hover:bg-[#1a1a1a] hover:text-white px-8"
              >
                CALL 949-543-1508
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
