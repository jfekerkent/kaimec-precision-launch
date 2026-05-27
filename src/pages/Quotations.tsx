import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import RequestInfoForm from "@/components/RequestInfoForm";

import flo1530_3kw from "@/assets/machine-kflo-1530.png";
import flo1530_6kw from "@/assets/flo-1530-6kw.png";
import floP1530_3kw from "@/assets/machine-kflo-p-1530.jpg";
import floP1530_6kw from "@/assets/flo-p-1530-2.png";
import flc1530_6kw from "@/assets/flc-1530-6kw.jpg";
import flc1530_12kw from "@/assets/flc-1530-2.png";
import flcP1530_6kw from "@/assets/flc-p-1530-1.png";
import flcP1530_12kw from "@/assets/flc-p-1530-eu-1.jpg";

const machines = [
  { id: "FLO-1530 x 3kW", name: "FLO-1530 x 3kW", subtitle: "Open Type Fiber Laser", image: flo1530_3kw },
  { id: "FLO-1530 x 6kW", name: "FLO-1530 x 6kW", subtitle: "Open Type Fiber Laser", image: flo1530_6kw },
  { id: "FLO-P 1530 x 3kW", name: "FLO-P 1530 x 3kW", subtitle: "Open Type Sheet + Pipe", image: floP1530_3kw },
  { id: "FLO-P 1530 x 6kW", name: "FLO-P 1530 x 6kW", subtitle: "Open Type Sheet + Pipe", image: floP1530_6kw },
  { id: "FLC-1530 x 6kW", name: "FLC-1530 x 6kW", subtitle: "Fully Enclosed Fiber Laser", image: flc1530_6kw },
  { id: "FLC-1530 x 12kW", name: "FLC-1530 x 12kW", subtitle: "Fully Enclosed Fiber Laser", image: flc1530_12kw },
  { id: "FLC-P 1530 x 6kW", name: "FLC-P 1530 x 6kW", subtitle: "Fully Enclosed Sheet + Pipe", image: flcP1530_6kw },
  { id: "FLC-P 1530 x 12kW", name: "FLC-P 1530 x 12kW", subtitle: "Fully Enclosed Sheet + Pipe", image: flcP1530_12kw },
];

export default function Quotations() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showForm, setShowForm] = useState(false);

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

  const handleRequestQuote = () => {
    setShowForm(true);
    setTimeout(() => {
      const el = document.getElementById("quote-form");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const selectedMachines = Array.from(selected).join(", ");

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
            Select the machines you are interested in and request a detailed quotation.
            Our sales team will provide competitive pricing and flexible financing options tailored
            to your production needs.
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
              Click on the machines below to select the models you want quoted.
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

      {/* Quote Form */}
      {showForm && (
        <section id="quote-form" className="py-20 bg-[#f8f8f8]">
          <div className="container max-w-2xl">
            <div className="bg-white border border-border rounded-lg p-8 md:p-10">
              <div className="mb-8">
                <p className="section-label mb-3 text-primary">Get Pricing</p>
                <h2 className="text-2xl md:text-3xl font-black text-foreground">
                  Request Your Quotation
                </h2>
                <p className="text-muted-foreground mt-2">
                  Machines selected: <span className="font-semibold text-foreground">{selectedMachines}</span>
                </p>
              </div>
              <RequestInfoForm machine={selectedMachines} />
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
