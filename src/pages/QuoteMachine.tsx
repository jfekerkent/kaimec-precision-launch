import { Link, useParams, useSearchParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
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

export const quoteMachines = {
  "flo-1530-3kw":   { name: "FLO-1530 x 3kW",   subtitle: "Open Type Fiber Laser",        image: flo1530_3kw,   price: 75000 },
  "flo-1530-6kw":   { name: "FLO-1530 x 6kW",   subtitle: "Open Type Fiber Laser",        image: flo1530_6kw,   price: 116000 },
  "flo-p-1530-3kw": { name: "FLO-P 1530 x 3kW", subtitle: "Open Type Sheet + Pipe",       image: floP1530_3kw,  price: 131000 },
  "flo-p-1530-6kw": { name: "FLO-P 1530 x 6kW", subtitle: "Open Type Sheet + Pipe",       image: floP1530_6kw,  price: 154000 },
  "flc-1530-6kw":   { name: "FLC-1530 x 6kW",   subtitle: "Fully Enclosed Fiber Laser",   image: flc1530_6kw,   price: 144000 },
  "flc-1530-12kw":  { name: "FLC-1530 x 12kW",  subtitle: "Fully Enclosed Fiber Laser",   image: flc1530_12kw,  price: 188000 },
  "flc-p-1530-6kw": { name: "FLC-P 1530 x 6kW", subtitle: "Fully Enclosed Sheet + Pipe",  image: flcP1530_6kw,  price: 180000 },
  "flc-p-1530-12kw":{ name: "FLC-P 1530 x 12kW",subtitle: "Fully Enclosed Sheet + Pipe",  image: flcP1530_12kw, price: 235000 },
} as const;

const accessoryPrices: { match: RegExp; label: string; price: number }[] = [
  { match: /dust|smoke/i,           label: "Dust collector",                price: 22000 },
  { match: /air\s*compressor|screw/i, label: "Screw special air compressor", price: 22000 },
];

export type QuoteSlug = keyof typeof quoteMachines;

export default function QuoteMachine() {
  const { slug } = useParams<{ slug: QuoteSlug }>();
  const machine = slug ? quoteMachines[slug] : undefined;
  const [searchParams] = useSearchParams();
  const accessories = searchParams.get("accessories") || "";

  if (!machine) {
    return (
      <Layout>
        <section className="py-20 container">
          <h1 className="text-2xl font-black">Quote not found</h1>
          <Link to="/quotations" className="text-primary underline">Back to Quotations</Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container">
          <nav className="flex items-center flex-wrap gap-1 text-xs text-muted-foreground mb-6">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/quotations" className="hover:text-white">Quotations</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">{machine.name}</span>
          </nav>
          <p className="section-label mb-3 text-primary">Quote Request</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3">
            {machine.name}
          </h1>
          <p className="text-white/70 text-lg">{machine.subtitle}</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div className="bg-white border border-border rounded-lg p-6 flex items-center justify-center">
              <img
                src={machine.image}
                alt={machine.name}
                className="w-full h-auto max-h-[480px] object-contain"
              />
            </div>
            {machine && (
              (() => {
                const selectedAccessories = accessoryPrices.filter((a) => a.match.test(accessories));
                const accessoriesTotal = selectedAccessories.reduce((sum, a) => sum + a.price, 0);
                const total = (machine.price ?? 0) + accessoriesTotal;
                return (
                  <div className="bg-card border border-border rounded-lg p-6">
                    <p className="section-label mb-3 text-primary">Indicative Pricing</p>
                    <ul className="space-y-2 text-foreground">
                      {machine.price != null && (
                        <li className="flex justify-between gap-4">
                          <span className="font-semibold">{machine.name}</span>
                          <span>${machine.price.toLocaleString()} FOB Tustin, CA</span>
                        </li>
                      )}
                      <li className="text-sm text-muted-foreground pl-2">
                        <span className="font-semibold text-foreground">Included: </span>
                        5x10ft travels, Auto nesting, Auto collision protection, Edge finding, Fly cutting, Yaskawa servo motors, 24/7 online USA support, Installation and training, heater/chiller, 220 or 480 volt regulating transformer
                      </li>
                      {selectedAccessories.map((a) => (
                        <li key={a.label} className="flex justify-between gap-4">
                          <span>+ {a.label}</span>
                          <span>${a.price.toLocaleString()}</span>
                        </li>
                      ))}
                      <li className="flex justify-between gap-4 border-t border-border pt-3 mt-2 font-bold">
                        <span>Total</span>
                        <span>${total.toLocaleString()} FOB Tustin, CA</span>
                      </li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-4">
                      Fill in information on the box on the right hand side to get an official detailed quote
                    </p>
                  </div>
                );
              })()
            )}
          </div>

          <div id="quote-form" className="bg-card border border-border rounded-lg p-6 md:p-8 scroll-mt-24">
            <p className="section-label mb-3 text-primary">Get Pricing</p>
            <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">
              Request Quote
            </h2>
            <p className="text-muted-foreground mb-6">
              Pricing for: <span className="font-semibold text-foreground">{machine.name}</span>
            </p>
            {accessories && (
              <p className="text-muted-foreground mb-6 -mt-4">
                Accessories: <span className="font-semibold text-foreground">{accessories}</span>
              </p>
            )}
            <RequestInfoForm
              machine={accessories ? `${machine.name} + ${accessories}` : machine.name}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}