import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import TrustSignals from "@/components/shared/TrustSignals";
import MachineGallery from "@/components/MachineGallery";
import { convertValue, type Unit } from "@/lib/unitConvert";
import UnitToggle from "@/components/UnitToggle";
import flp6035Front from "@/assets/machine-flp-6035-front.png";
import flp6035Side from "@/assets/machine-flp-6035-side.png";
import flp6020Front from "@/assets/machine-flp-6020-front.png";
import flp6020Side from "@/assets/machine-flp-6020-side.png";

const machines = [
  { id: "kflp-6020", model: "FLP-6020", description: "Tube & Profile Laser\nØ8.8\" Diameter x 20ft length capacity\nTube and profile cutting\n1, 3, 6, 12kW\nManual, semi-automatic, fully-automatic models", images: [flp6020Front, flp6020Side] },
  { id: "kflp-6035", model: "FLP-6035", description: "Tube & Profile Laser\nØ8.8\" Diameter x 20ft length capacity\nTube and profile cutting\n1, 3, 6, 12kW\nManual, semi-automatic, fully-automatic models", images: [flp6035Front, flp6035Side] },
];

const productDescription: string[] = [
  "Profiles from 15mm to 200mm in diameter, 6 meter full length cutting",
  "Special support frame prevents tube sagging and deforming, improves cutting accuracy and prolongs chuck service life",
  "Suitable for pipe, square profile, and rectangular cuts across agricultural machinery, construction equipment, defence, automotive, and industrial shelf sectors",
  "Available in 3, 6 or 12kW laser power",
  "Various tube cutting lengths and unloading lengths available",
  "Optional Automatic Loading",
  "Cuts H, P, I-U profiles and other special shaped pipes with high repeat accuracy",
  "Standard 6 meter cutting length, extendable to 9 meters",
  "Maximum pipe diameter: 350mm",
  "One-button chuck clamping and auto-centering",
  "Wireless remote control for blowing, cutting, pause, calibration and simulation",
  "Standard nesting software with flycut feature — no operator required for part preparation",
  "CE certified, European production standards",
  "Laser head with auto focus, Active Anti-collision Function and auto obstacle detection",
  "Cutting heads with automatic cooling",
];

const baseSpecs: [string, string][] = [
  ["Loading Capacity", "850 kg"],
  ["Z Axis Travel", "400mm"],
  ["X-Y-Z Axis Guideway", "4 Point Ball Caged"],
  ["X-Y Axis Drive System", "Rack"],
  ["Z Axis Drive System", "Ballscrew"],
  ["X-Y Axis Speed", "80 m/min"],
  ["Z Axis Speed", "30 m/min"],
  ["X-Y Position Accuracy", "0.05mm"],
  ["X-Y Repeatability Accuracy", "0.03mm"],
  ["Max. Profile Length", "6100mm"],
];

const tailSpecs: [string, string][] = [
  ["Laser Source", "3, 6 and 12kW"],
  ["Laser Source Output Power", "3000 / 6000 / 12000W"],
  ["CNC Control System", "Fscut"],
  ["Laser Cutting Head", "Raytools / BOCI / WSX"],
  ["Assist Gases", "Air / Oxygen / Nitrogen"],
  ["Cooling Type", "Water Cooling"],
  ["Machine Weight", "6800 kg"],
  ["Machine Dimensions (WxLxH)", "2000 x 10380 x 2660mm"],
  ["Graphic Format", "dwg / dxf / stp"],
  ["Voltage", "380V / 50Hz"],
  ["Certifications", "CE / ISO / FDA"],
  ["Warranty", "2 Years"],
];

const specs6020: [string, string][] = [
  ...baseSpecs,
  ["Max. Profile Dimensions", "Ø 220mm"],
  ...tailSpecs,
];

const specs6035: [string, string][] = [
  ...baseSpecs,
  ["Max. Profile Dimensions", "Ø 350mm"],
  ...tailSpecs,
];

function SpecTable({ title, rows, unit }: { title: string; rows: [string, string][]; unit: Unit }) {
  return (
    <div className="mb-8">
      <h4 className="text-sm font-bold text-secondary uppercase tracking-wider mb-3">{title}</h4>
      <div className="border border-border bg-white">
        <table className="w-full text-sm">
          <tbody>
            {rows.map(([k, v], i) => (
              <tr key={k} className={i % 2 === 0 ? "bg-white" : "bg-[#f8f8f8]"}>
                <td className="px-4 py-2 font-medium text-foreground border-b border-border w-1/2">{k}</td>
                <td className="px-4 py-2 text-muted-foreground border-b border-border">{convertValue(v, unit)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DescriptionList({ items }: { items: string[] }) {
  return (
    <div className="mb-8">
      <h4 className="text-sm font-bold text-secondary uppercase tracking-wider mb-3">Product Description</h4>
      <ul className="space-y-2 text-sm text-muted-foreground bg-white border border-border p-5">
        {items.map((it) => (
          <li key={it} className="flex gap-2">
            <span className="text-secondary mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-secondary" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TubeProfileLasers() {
  const [unit, setUnit] = useState<Unit>("metric");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, [location]);
  return (
    <Layout>
      <section className="py-20 bg-secondary">
        <div className="container max-w-3xl text-center">
          <br />
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 whitespace-pre-line">Tube & Profile{"\n"}Laser Cutting Machines</h1>
          <p className="text-lg text-white/80 whitespace-pre-line">
            Ø9" or 14" Diameter{"\n"}
            20ft length capacity (30ft optional){"\n"}
            Tube and profile cutting{"\n"}
            Nesting{"\n"}
            Nesting{"\n"}
            1, 3, 6, 12kW{"\n"}
            {"\n"}
            Manual, semi-automatic, fully-automatic models
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
            {machines.map((m) => (
              <div key={m.id} className="rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors">
                <MachineGallery images={m.images} model={m.model} background="light" fit="contain" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{m.model}</h3>
                  <p className="text-sm text-muted-foreground mb-4 whitespace-pre-line">{m.description}</p>
                  <Link to={`/quote?machine=${encodeURIComponent(m.model)}`}>
                    <Button className="w-full font-bold">Request Quote</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="specifications" className="py-20 bg-secondary scroll-mt-24">
        <div className="container max-w-6xl">
          <div className="max-w-3xl mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-white">Technical Specifications</h2>
            <p className="text-white/70 text-lg mt-3">Compare FLP-6020 and FLP-6035 side by side.</p>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            <div className="bg-white p-6">
              <h3 className="text-2xl font-black text-secondary mb-6">FLP-6020</h3>
              <DescriptionList items={productDescription} />
              <UnitToggle unit={unit} onChange={setUnit} variant="light" />
              <SpecTable title="Specifications" rows={specs6020} unit={unit} />
            </div>
            <div className="bg-white p-6">
              <h3 className="text-2xl font-black text-secondary mb-6">FLP-6035</h3>
              <DescriptionList items={productDescription} />
              <UnitToggle unit={unit} onChange={setUnit} variant="light" />
              <SpecTable title="Specifications" rows={specs6035} unit={unit} />
            </div>
          </div>
        </div>
      </section>
    <TrustSignals />
    </Layout>
  );
}
