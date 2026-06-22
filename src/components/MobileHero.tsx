import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero-laser-mobile.jpg.asset.json";

type Service = {
  label: string;
  to: string;
  blurb: string;
};

const services: Service[] = [
  {
    label: "Laser Cutting",
    to: "/machines/laser-cutting/open-type-fiber-laser",
    blurb:
      "European-built CNC fiber lasers from 3 kW to 50 kW, with table sizes from 5x10 ft to 6.5x20 ft.",
  },
  {
    label: "Press Brakes",
    to: "/machines/press-brakes",
    blurb:
      "High-precision CNC press brakes engineered for accurate, repeatable bending across a wide range of tonnages.",
  },
  {
    label: "Tube Laser Cutting",
    to: "/machines/tube-profile-lasers",
    blurb:
      "Dedicated FLP tube & profile cutting lasers — fast, clean cuts on round, square and structural profiles.",
  },
  {
    label: "Gun Drills",
    to: "/gun-drills/gun-drilling-machines",
    blurb:
      "CNC gun drilling and BTA deep-hole drilling machines for precise, deep, straight holes in tough materials.",
  },
  {
    label: "Quotations",
    to: "/quotations",
    blurb:
      "Get a fast, factory-direct quote from our Tustin, CA team — no middleman markup.",
  },
];

export default function MobileHero() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="md:hidden -mt-24 bg-white">
      {/* Full-bleed hero image. Navbar (transparent on mobile home) sits on top. */}
      <div className="relative w-full h-[58vh] min-h-[420px] overflow-hidden bg-[#1a1a1a]">
        <img
          src={heroImg.url}
          alt="Kaimec fiber laser cutting head precision cutting steel"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        {/* Subtle top gradient so the white logo stays legible */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/55 to-transparent pointer-events-none" />
      </div>

      {/* Two-line headline */}
      <div className="px-5 pt-8 pb-6">
        <h1 className="font-black leading-[1.05] tracking-tight text-[28px]">
          <span className="block text-[#1a3a8a]">Precision Fabrication</span>
          <span className="block text-[#e3001b]">Machines, Factory-Direct.</span>
        </h1>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          European CNC fiber lasers, press brakes and deep-hole drilling
          machines — backed by US engineers in Tustin, CA.
        </p>
      </div>

      {/* Accordion */}
      <ul className="border-t border-[#e6dedf]">
        {services.map((s, i) => {
          const isOpen = open === i;
          return (
            <li key={s.label} className="border-b border-[#e6dedf]">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between px-5 py-5 text-left"
              >
                <span className="text-[17px] font-bold text-slate-900">
                  {s.label}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-slate-500 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 -mt-1">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {s.blurb}
                    </p>
                    <Link
                      to={s.to}
                      className="mt-3 inline-flex items-center text-sm font-bold text-[#1a3a8a] hover:underline"
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}