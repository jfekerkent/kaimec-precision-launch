import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/kaimec-logo-dark.png";
import flc1530 from "@/assets/flc-1530-2.png";
import flc1530a from "@/assets/flc-1530-6kw.jpg";
import flc1530b from "@/assets/flc-1530-4-alt.png";
import flo1530 from "@/assets/flo-1530-1.png";
import flo1530a from "@/assets/flo-1530-6kw.png";
import flo1530b from "@/assets/flo-1530-3-alt.png";

const sharedSpecsFLC = [
  "2 Tables (exchange tables)",
  "Fully enclosed",
  "Travels: 5x10ft (1,524x3,048mm)",
  "Cutting capacity — Mild steel: 7/8\u201D, SS: 1/2\u201D, Al: 3/8\u201D",
  "Anti-collision function",
  "Automatic Nesting",
  "Automatic Sheet Position detection",
  "Auto Focus",
  "Built-in cutting library",
  "Drawing formats: dwg, dxf, stp",
  "Wi-Fi ready",
  "24/7 online service / programming help-line",
  "220/480 power input",
  "25ft x 8 ft foot print",
];

const sharedSpecsFLO = [
  "Single Table",
  "Travels: 5x10ft (1,524x3,048mm)",
  "Cutting capacity — Mild steel: 7/8\u201D, SS: 1/2\u201D, Al: 3/8\u201D",
  "Anti-collision function",
  "Automatic Nesting",
  "Automatic Sheet Position detection",
  "Auto Focus",
  "Built-in cutting library",
  "Drawing formats: dwg, dxf, stp",
  "Wi-Fi ready",
  "24/7 online service / programming help-line",
  "220/480 power input",
  "14ft x 7 ft foot print",
];

function SpecsList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((s) => (
        <li key={s} className="flex gap-3 text-sm text-slate-700">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span>{s}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Eblast1() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Header / Logo */}
        <header className="flex flex-col items-center text-center border-b border-slate-200 pb-8">
          <Link to="/">
            <img src={logo} alt="KAIMEC Machines" className="h-36 w-auto object-contain" />
          </Link>
          <p className="mt-4 uppercase tracking-[0.3em] text-primary text-2xl font-extrabold my-[10px]">
            FIBER LASER CUTTING MACHINES
            <br /><br /><br />
            IN STOCK IN CALIFORNIA.
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">
            European. Precision. Power. Productivity.
          </h1>
        </header>

        {/* FLC-1530 */}
        <section className="mt-12">
          <div className="grid grid-cols-1 gap-3">
            <div className="rounded-lg overflow-hidden bg-slate-50 border border-slate-200">
              <img src={flc1530} alt="FLC-1530 x 6kW view" className="w-full h-auto object-contain" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg overflow-hidden bg-slate-50 border border-slate-200">
                <img src={flc1530a} alt="FLC-1530 x 6kW exterior" className="w-full h-auto object-contain" />
              </div>
              <div className="rounded-lg overflow-hidden bg-slate-50 border border-slate-200">
                <img src={flc1530b} alt="FLC-1530 x 6kW with exchange table" className="w-full h-auto object-contain" />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">FLC-1530 x 6kW</h2>
            <p className="mt-1 text-sm uppercase tracking-wider text-slate-500">
              Fully Enclosed Fiber Laser
            </p>
            <div className="mt-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">Specs</h3>
              <SpecsList items={sharedSpecsFLC} />
            </div>
          </div>
        </section>

        <div className="my-12 h-px bg-slate-200" />

        {/* FLO-1530 */}
        <section>
          <div className="grid grid-cols-1 gap-3">
            <div className="rounded-lg overflow-hidden bg-slate-50 border border-slate-200">
              <img src={flo1530} alt="FLO-1530 x 6kW view" className="w-full h-auto object-contain" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg overflow-hidden bg-slate-50 border border-slate-200">
                <img src={flo1530a} alt="FLO-1530 x 6kW front view" className="w-full h-auto object-contain" />
              </div>
              <div className="rounded-lg overflow-hidden bg-slate-50 border border-slate-200">
                <img src={flo1530b} alt="FLO-1530 x 6kW side view" className="w-full h-auto object-contain" />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">FLO-1530 x 6kW</h2>
            <p className="mt-1 text-sm uppercase tracking-wider text-slate-500">
              Open Type Fiber Laser
            </p>
            <div className="mt-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">Specs</h3>
              <SpecsList items={sharedSpecsFLO} />
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/quote"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold tracking-wide rounded-md shadow"
          >
            Request a Quote
          </Link>
          <Link
            to="/consultation"
            className="inline-flex items-center justify-center px-6 py-3 border border-primary text-sm font-semibold text-primary hover:bg-primary/5 rounded-md"
          >
            Talk to an Expert
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-16 border-t border-slate-200 pt-8 text-center">
          <img src={logo} alt="KAIMEC Machines" className="mx-auto h-12 w-auto object-contain opacity-80" />
          <div className="mt-4 flex flex-col items-center gap-2 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              1231 Edinger Ave, Tustin, CA
            </div>
            <a href="tel:5623502071" className="flex items-center gap-2 hover:text-primary">
              <Phone className="h-4 w-4 text-primary" />
              (562) 350-2071
            </a>
            <a href="mailto:sales@kaimec.com" className="flex items-center gap-2 hover:text-primary">
              <Mail className="h-4 w-4 text-primary" />
              sales@kaimec.com
            </a>
          </div>
          <p className="mt-6 text-xs text-slate-400">
            © {new Date().getFullYear()} KAIMEC Machines. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}