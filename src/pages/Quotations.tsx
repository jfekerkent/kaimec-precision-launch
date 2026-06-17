import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

import flo1530_3kw from "@/assets/machine-kflo-1530.png";
import flo1530_6kw from "@/assets/flo-1530-6kw.png";
import floP1530_3kw from "@/assets/machine-kflo-p-1530.jpg";
import floP1530_6kw from "@/assets/flo-p-1530-2.png";
import flc1530_6kw from "@/assets/flc-1530-6kw.jpg";
import flc1530_12kw from "@/assets/flc-1530-12kw-quote.png";
import flcP1530_6kw from "@/assets/flc-p-1530-1.png";
import flcP1530_12kw from "@/assets/flc-p-1530-eu-1.jpg";
import dustCollectorImg from "@/assets/dust-collector-v2.jpg";
import airCompressorImg from "@/assets/air-compressor-v3.png";
import autoLoaderImg from "@/assets/auto-loader.png.asset.json";

const machines = [
  { id: "FLO-1530 x 3kW",    slug: "flo-1530-3kw",    name: "FLO-1530 x 3kW",    subtitle: "Open Type Fiber Laser",       image: flo1530_3kw },
  { id: "FLO-1530 x 6kW",    slug: "flo-1530-6kw",    name: "FLO-1530 x 6kW",    subtitle: "Open Type Fiber Laser",       image: flo1530_6kw },
  { id: "FLO-P 1530 x 3kW",  slug: "flo-p-1530-3kw",  name: "FLO-P 1530 x 3kW",  subtitle: "Open Type Sheet + Pipe",      image: floP1530_3kw },
  { id: "FLO-P 1530 x 6kW",  slug: "flo-p-1530-6kw",  name: "FLO-P 1530 x 6kW",  subtitle: "Open Type Sheet + Pipe",      image: floP1530_6kw },
  { id: "FLC-1530 x 6kW",    slug: "flc-1530-6kw",    name: "FLC-1530 x 6kW",    subtitle: "Fully Enclosed Fiber Laser",  image: flc1530_6kw },
  { id: "FLC-1530 x 12kW",   slug: "flc-1530-12kw",   name: "FLC-1530 x 12kW",   subtitle: "Fully Enclosed Fiber Laser",  image: flc1530_12kw },
  { id: "FLC-P 1530 x 6kW",  slug: "flc-p-1530-6kw",  name: "FLC-P 1530 x 6kW",  subtitle: "Fully Enclosed Sheet + Pipe", image: flcP1530_6kw },
  { id: "FLC-P 1530 x 12kW", slug: "flc-p-1530-12kw", name: "FLC-P 1530 x 12kW", subtitle: "Fully Enclosed Sheet + Pipe", image: flcP1530_12kw },
];

const accessories = [
  {
    id: "Dust / Smoke Collector",
    name: "Dust / Smoke Collector",
    subtitle: "Pulse Filter Cartridge",
    image: dustCollectorImg,
    specs: [
      ["Filter Type", "Pulse filter cartridge"],
      ["Air Speed", "236 ft/min"],
      ["Cleaning", "Automatic pulse cleaning"],
      ["Size", '48" × 48" × 48"'],
      ["Design", "Stand-alone integrated unit"],
      ["Sections", "Fan (top) · Cartridge (mid) · Drawer (base)"],
      ["Compliance", "GB16297-1996 emission standards"],
    ],
  },
  {
    id: "Screw Type Air Compressor",
    name: "Screw Type Air Compressor",
    subtitle: "30HP · With Refrigerated Dryer",
    image: airCompressorImg,
    specs: [
      ["Power", "30 HP"],
      ["Air Capacity", "81 CFM (with refrigerated dryer)"],
      ["Pressure", "232 PSI"],
      ["Noise Level", "70 ± 2 dB(A)"],
      ["Tank", "105.7 Gallon air receiver"],
      ["Dimensions", "67.4 × 31.5 × 73.2 in (L×W×H)"],
      ["Includes", "Integrated refrigerated dryer"],
    ],
  },
  {
    id: "Automatic Loader",
    name: "Automatic Loader",
    subtitle: "Gantry Type Sheet Loading System",
    image: autoLoaderImg.url,
    specs: [
      ["Type", "Gantry type automatic sheet loading"],
      ["Function", "Loads new sheets onto the second pallet (table) automatically"],
      ["Compatibility", "Fits FLO w/2 tables / FLC / FLP models"],
      ["Operation", "Reduces manual handling & cycle time"],
      ["Control", "Synchronized with laser cutting cycle"],
    ],
  },
];

export default function Quotations() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [selectedAccessories, setSelectedAccessories] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const toggleMachine = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAccessory = (id: string) => {
    setSelectedAccessories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleRequestQuote = () => {
    // Route to the summary page with all selected machines + accessories.
    const slugs = Array.from(selected)
      .map((id) => machines.find((m) => m.id === id)?.slug)
      .filter(Boolean) as string[];
    if (slugs.length === 0) return;
    const params = new URLSearchParams();
    params.set("machines", slugs.join(","));
    const acc = Array.from(selectedAccessories);
    if (acc.length) params.set("accessories", acc.join(", "));
    navigate(`/quotations/summary?${params.toString()}`);
  };

  const selectedMachines = Array.from(selected).join(", ");
  const selectedAccessoriesText = Array.from(selectedAccessories).join(", ");

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container">
          <nav className="flex items-center flex-wrap gap-1 text-xs text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Quotations</span>
          </nav>
          <p className="section-label mb-3 text-primary">Pricing</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
            Quotations
          </h1>
          <p className="text-white/70 max-w-2xl text-lg">
            Select the machine you are interested in.
          </p>
        </div>
      </section>

      {/* Machine Selection */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <p className="section-label mb-3 text-primary">Select Machines</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              Choose Your Configuration
            </h2>
            <p className="text-muted-foreground text-lg mt-3">
              Click on the boxes below to select the model you want quoted.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {machines.map((m) => {
              const isSelected = selected.has(m.id);
              return (
                <button
                  key={m.id}
                  onClick={() => toggleMachine(m.id)}
                  className={`relative text-left border rounded-lg overflow-hidden transition-all group flex flex-col ${
                    isSelected
                      ? "border-primary ring-2 ring-primary/30 shadow-lg"
                      : "border-border hover:border-primary/50 hover:shadow-md"
                  }`}
                >
                  {/* Check badge */}
                  <div
                    className={`absolute top-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                      isSelected ? "bg-primary text-primary-foreground" : "bg-white/90 text-muted-foreground"
                    }`}
                  >
                    <Check className="h-4 w-4" />
                  </div>

                  {/* Image */}
                  <div className="aspect-[4/3] bg-white overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-4 flex-1 flex flex-col bg-card">
                    <h3 className="text-base font-black text-foreground leading-tight">
                      {m.name}
                    </h3>
                    <p className="text-xs text-primary font-semibold mt-1">
                      {m.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Accessories */}
          <div className="mt-16">
            <div className="max-w-3xl mb-8">
              <p className="section-label mb-3 text-primary">Recommended Optional Accessories</p>
              <h2 className="text-2xl md:text-3xl font-black text-foreground">
                Enhance Your Setup
              </h2>
              <p className="text-muted-foreground text-lg mt-3">
                Add optional accessories to complete your configuration.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 max-w-4xl">
              {accessories.map((a) => {
                const isSelected = selectedAccessories.has(a.id);
                return (
                  <button
                    key={a.id}
                    onClick={() => toggleAccessory(a.id)}
                    className={`relative text-left border rounded-lg overflow-hidden transition-all group flex flex-col ${
                      isSelected
                        ? "border-primary ring-2 ring-primary/30 shadow-lg"
                        : "border-border hover:border-primary/50 hover:shadow-md"
                    }`}
                  >
                    <div
                      className={`absolute top-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                        isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Check className="h-4 w-4" />
                    </div>
                    <div className="aspect-[4/3] bg-white overflow-hidden flex items-center justify-center p-6">
                      <img
                        src={a.image}
                        alt={a.name}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col bg-card">
                      <h3 className="text-lg font-black text-foreground leading-tight">
                        {a.name}
                      </h3>
                      <p className="text-xs text-primary font-semibold mt-1 uppercase tracking-wide">
                        {a.subtitle}
                      </p>
                      <dl className="mt-4 space-y-1.5 text-sm">
                        {a.specs.map(([k, v]) => (
                          <div key={k} className="flex gap-2">
                            <dt className="font-semibold text-foreground/80 min-w-[110px]">{k}:</dt>
                            <dd className="text-muted-foreground">{v}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selection summary + CTA */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-card border border-border rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">
                {selected.size === 0
                  ? "No machines selected"
                  : `${selected.size} machine${selected.size > 1 ? "s" : ""} selected`}
              </p>
              {selected.size > 0 && (
                <p className="text-sm font-semibold text-foreground mt-1">
                  {selectedMachines}
                </p>
              )}
              {selectedAccessories.size > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  Accessories: <span className="font-semibold text-foreground">{selectedAccessoriesText}</span>
                </p>
              )}
              {(() => {
                const hasFLO = Array.from(selected).some((id) => {
                  const slug = machines.find((m) => m.id === id)?.slug || "";
                  return slug.startsWith("flo-");
                });
                const hasAutoLoader = selectedAccessories.has("Automatic Loader");
                if (hasFLO && hasAutoLoader) {
                  return (
                    <p className="text-xs text-destructive mt-2 max-w-md">
                      AUTOMATIC LOADER SYSTEM IS NOT AVAILABLE WITH THIS MODEL. AUTOMATIC LOADER IS AVAILABLE WITH FLC MODELS ONLY
                    </p>
                  );
                }
                return null;
              })()}
            </div>
            <Button
              size="lg"
              className="font-bold px-8"
              disabled={selected.size === 0}
              onClick={handleRequestQuote}
            >
              Request Quote
            </Button>
          </div>
        </div>
      </section>

    </Layout>
  );
}
