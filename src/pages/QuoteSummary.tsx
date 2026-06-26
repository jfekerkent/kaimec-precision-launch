import { Link, useSearchParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import RequestInfoForm from "@/components/RequestInfoForm";
import { quoteMachines, type QuoteSlug } from "./QuoteMachine";
import dustCollectorImg from "@/assets/dust-collector-todc-4l.png";
import airCompressorImg from "@/assets/screw-air-compressor.png";
import autoLoaderImg from "@/assets/auto-loader.png";

const accessoryPrices: { match: RegExp; label: string; price: number; image: string }[] = [
  { match: /dust|smoke/i, label: "Dust collector", price: 22000, image: dustCollectorImg },
  { match: /air\s*compressor|screw/i, label: "Screw special air compressor", price: 22000, image: airCompressorImg },
  { match: /automatic\s*loader/i, label: "Automatic loader", price: 25000, image: autoLoaderImg },
];

const includedBlurb =
  "5x10ft travels, Auto nesting, Auto collision protection, Edge finding, Fly cutting, Yaskawa servo motors, 24/7 online USA support, Installation and training, heater/chiller, 220 or 480 volt regulating transformer";

export default function QuoteSummary() {
  const [searchParams] = useSearchParams();
  const slugParam = searchParams.get("machines") || "";
  const accessories = searchParams.get("accessories") || "";

  const slugs = slugParam.split(",").map((s) => s.trim()).filter(Boolean) as QuoteSlug[];
  const selected = slugs
    .map((s) => ({ slug: s, ...quoteMachines[s] }))
    .filter((m): m is { slug: QuoteSlug } & (typeof quoteMachines)[QuoteSlug] => Boolean(m.name));

  const selectedAccessories = accessoryPrices.filter((a) => a.match.test(accessories));
  const hasFLO = slugs.some((s) => s.startsWith("flo-"));
  const autoLoaderExcluded = (label: string) => hasFLO && /automatic\s*loader/i.test(label);
  const machinesTotal = selected.reduce((sum, m) => sum + (m.price ?? 0), 0);
  const accessoriesTotal = selectedAccessories.reduce(
    (sum, a) => sum + (autoLoaderExcluded(a.label) ? 0 : a.price),
    0
  );
  const total = machinesTotal + accessoriesTotal;

  if (selected.length === 0) {
    return (
      <Layout>
        <section className="py-20 container">
          <h1 className="text-2xl font-black mb-3">No machines selected</h1>
          <Link to="/quotations" className="text-primary underline">Back to Quotations</Link>
        </section>
      </Layout>
    );
  }

  const machineNames = selected.map((m) => m.name).join(", ");

  return (
    <Layout>
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container">
          <nav className="flex items-center flex-wrap gap-1 text-xs text-muted-foreground mb-6">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/quotations" className="hover:text-white">Quotations</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">Your Selection</span>
          </nav>
          <p className="section-label mb-3 text-primary">Quote Request</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3">
            The laser cutting machine and accessories selected
          </h1>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            {/* Machines side by side */}
            <div
              className={`grid gap-4 ${
                selected.length === 1 ? "grid-cols-1" : "grid-cols-2"
              }`}
            >
              {selected.map((m) => (
                <div
                  key={m.slug}
                  className="bg-white border border-border rounded-lg p-4 flex flex-col overflow-hidden"
                >
                  <div className="relative w-full aspect-[4/3] bg-white flex items-center justify-center">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="absolute inset-0 w-full h-full object-contain p-3"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing breakdown */}
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="section-label mb-3 text-primary">Indicative Pricing</p>
              <ul className="space-y-2 text-foreground">
                {selected.map((m) =>
                  m.price != null ? (
                    <li key={m.slug} className="flex justify-between gap-4">
                      <span className="font-semibold">{m.name}</span>
                      <span>${m.price.toLocaleString()} FOB Tustin, CA</span>
                    </li>
                  ) : null
                )}
                <li className="text-sm text-muted-foreground pl-2">
                  <span className="font-semibold text-foreground">Included: </span>
                  {includedBlurb}
                </li>
                {selectedAccessories.map((a) => {
                  const excluded = autoLoaderExcluded(a.label);
                  return (
                    <li key={a.label} className="flex flex-col gap-1">
                      <div className="flex justify-between gap-4 items-center">
                        <span className="flex items-center gap-2">
                          <img
                            src={a.image}
                            alt={a.label}
                            className="w-8 h-8 object-contain rounded border border-border/40 bg-white p-0.5"
                          />
                          + {a.label}
                        </span>
                        <span>{excluded ? "N/A" : `$${a.price.toLocaleString()}`}</span>
                      </div>
                      {excluded && (
                        <span className="text-xs text-destructive">
                          AUTOMATIC LOADER SYSTEM IS NOT AVAILABLE WITH THIS MODEL. AUTOMATIC LOADER IS AVAILABLE WITH FLC MODELS ONLY
                        </span>
                      )}
                    </li>
                  );
                })}
                <li className="flex justify-between gap-4 border-t border-border pt-3 mt-2 font-bold">
                  <span>Total</span>
                  <span>${total.toLocaleString()} FOB Tustin, CA</span>
                </li>
              </ul>
              <p className="text-xs text-muted-foreground mt-4">
                Fill in information on the box on the right hand side to get an official detailed quote
              </p>
            </div>
          </div>

          <div id="quote-form" className="bg-card border border-border rounded-lg p-6 md:p-8 scroll-mt-24 self-start">
            <p className="section-label mb-3 text-primary">Get Pricing</p>
            <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">
              Request Quote
            </h2>
            <p className="text-muted-foreground mb-2">
              Pricing for: <span className="font-semibold text-foreground">{machineNames}</span>
            </p>
            {accessories && (
              <p className="text-muted-foreground mb-6">
                Accessories: <span className="font-semibold text-foreground">{accessories}</span>
              </p>
            )}
            <RequestInfoForm
              machine={accessories ? `${machineNames} + ${accessories}` : machineNames}
              source="Quotation"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}