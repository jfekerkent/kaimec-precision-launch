import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import TrustSignals from "@/components/shared/TrustSignals";
import MachineGallery from "@/components/MachineGallery";
import mkt1560Img from "@/assets/machine-mkt-1560.png";
import mkt32135Img from "@/assets/machine-mkt-32135.png";

const machines = [
  { id: "kmkt-1560", model: "MKT-1560", description: "Press Brake", images: [mkt1560Img] },
  { id: "kmkt-32135", model: "MKT-32135", description: "Press Brake", images: [mkt32135Img] },
];

const technicalParams1560: [string, string][] = [
  ["Model", "MKT 1560"],
  ["Bending Force", "600KN"],
  ["Bending Tonnage", "60T"],
  ["Power Supply", "3PH / 380V / 50HZ"],
  ["Bending Length", "1500mm"],
  ["Workbench Height", "900mm"],
  ["Column Spacing", "1000mm"],
  ["Throat Depth", "400mm"],
  ["Slide Stroke", "200mm"],
  ["Maximum Opening Height", "470mm"],
  ["Rapid Descent Speed", "180mm/s"],
  ["Return Speed", "140mm/s"],
  ["Working Speed", "10mm/s"],
  ["Rear Gear (X-axis) Stroke", "550mm"],
  ["Max X-axis Speed", "400mm/s"],
  ["X-axis Positioning Accuracy", "±0.05mm"],
  ["X-axis Repeat Positioning Accuracy", "±0.02mm"],
  ["Y-axis Positioning Accuracy", "±0.02mm"],
  ["Y-axis Repeat Positioning Accuracy", "±0.01mm"],
  ["R-axis Stroke", "150mm"],
  ["Max R-axis Speed", "100mm/s"],
  ["Working Accuracy", "Straight line ±0.2mm/m, Angle ±0.5°/m"],
  ["CNC Axes", "4+2"],
  ["Main Motor Power", "8.5KW"],
  ["Fuel Tank Capacity", "200L"],
  ["Machine Dimensions", "2000 x 1500 x 2650mm"],
  ["Machine Weight", "3500kg"],
];

const technicalParams32135: [string, string][] = [
  ["Model", "MKT 32135"],
  ["Bending Force", "1350KN"],
  ["Bending Tonnage", "135T"],
  ["Power Supply", "3PH / 380V / 50HZ"],
  ["Bending Length", "3200mm"],
  ["Workbench Height", "900mm"],
  ["Column Spacing", "2500mm"],
  ["Throat Depth", "400mm"],
  ["Slide Stroke", "200mm"],
  ["Maximum Opening Height", "470mm"],
  ["Rapid Descent Speed", "180mm/s"],
  ["Return Speed", "140mm/s"],
  ["Working Speed", "10mm/s"],
  ["Rear Gear (X-axis) Stroke", "550mm"],
  ["Max X-axis Speed", "400mm/s"],
  ["X-axis Positioning Accuracy", "±0.05mm"],
  ["X-axis Repeat Positioning Accuracy", "±0.02mm"],
  ["Y-axis Positioning Accuracy", "±0.02mm"],
  ["Y-axis Repeat Positioning Accuracy", "±0.01mm"],
  ["R-axis Stroke", "150mm"],
  ["Max R-axis Speed", "100mm/s"],
  ["Working Accuracy", "Straight line ±0.2mm/m, Angle ±0.5°/m"],
  ["CNC Axes", "4+2"],
  ["Main Motor Power", "11KW"],
  ["Fuel Tank Capacity", "200L"],
  ["Machine Dimensions", "4000 x 1750 x 2860mm"],
  ["Machine Weight", "8300kg"],
];

const mainConfig: [string, string][] = [
  ["Control System", "CT12"],
  ["Hydraulic Valve Group", "Rexroth"],
  ["Servo Motor", "Inovance"],
  ["Oil Pump", "First (U.S.)"],
  ["Oil Cylinders", "HY"],
  ["Main Motor", "Inovance"],
  ["Compensation Method", "DSP Protection"],
  ["Control Axes", "4 Axis"],
  ["Magnetic Grid Ruler", "Givi (Italy)"],
  ["X-axis Linear Guide", "HIWIN"],
  ["X-axis Linear Rod", "HIWIN"],
  ["Electrical Components", "Schneider"],
  ["Fixture", "Double Sided Quick Clamp"],
  ["Compensation Workbench", "SRJM"],
  ["Safety Light Curtain", "DSP/A200 (Italy)"],
  ["Protective Doors", "Installed"],
];

const standardConfig: [string, string][] = [
  ["CNC System", "1 set"],
  ["Positioning Gear Fingers", "4 pcs"],
  ["Standard Upper Molds", "1 set"],
  ["Standard Lower Mold", "1 set"],
  ["Pedal Switches", "1 set"],
  ["Toolboxes", "1 set"],
];

const optionalSpecs1560: string[] = [
  "Y1-Y2-X-R-Z1-Z2, 6 Axis",
  "Control Unit – CybTouch 12, CybTouch 15, Step Rock Series, ESA 6000 Series, ESA 8000 Series",
  "Quick Clamping Latch Mould Holder",
  "Manual Curved System",
  "Motorised Curved System",
  "Ergonomic Operator's Stand",
  "Ergonomic Operator's Chair",
  "Wila PRO and PREMIUM Upper and Lower Mould Holder",
  "Upper Mould Holder for Euro Type Moulds",
  "Manual Central Lubrication System",
  "Motorised Central Lubrication System",
  "Laser Bending Beam",
  "Additional Back Gauge Tongue",
  "Additional Back Gauge Tongue Group",
  "Custom Voltage",
];

function SpecTable({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div className="mb-8">
      <h4 className="text-sm font-bold text-secondary uppercase tracking-wider mb-3">{title}</h4>
      <div className="border border-border bg-white">
        <table className="w-full text-sm">
          <tbody>
            {rows.map(([k, v], i) => (
              <tr key={k} className={i % 2 === 0 ? "bg-white" : "bg-[#f8f8f8]"}>
                <td className="px-4 py-2 font-medium text-foreground border-b border-border w-1/2">{k}</td>
                <td className="px-4 py-2 text-muted-foreground border-b border-border">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function PressBrakes() {
  return (
    <Layout>
      <section className="py-20 bg-secondary">
        <div className="container max-w-3xl text-center">
          <p className="section-label mb-3">Machine Catalog</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Press Brakes</h1>
          <p className="text-lg text-white/80">CNC hydraulic and electric press brakes for precision metal bending.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            {machines.map((m) => (
              <div key={m.id} className="rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors">
                <MachineGallery images={m.images} model={m.model} />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{m.model}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{m.description}</p>
                  <Link to={`/quote?machine=${encodeURIComponent(m.model)}`}>
                    <Button className="w-full font-bold">Request Quote</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f8f8f8]">
        <div className="container">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-black text-secondary mb-6">MKT-1560</h3>
              <SpecTable title="Technical Parameters" rows={technicalParams1560} />
              <SpecTable title="Main Configuration" rows={mainConfig} />
              <SpecTable title="Standard Configuration" rows={standardConfig} />
              <div className="mb-8">
                <h4 className="text-sm font-bold text-secondary uppercase tracking-wider mb-3">Optional Specifications</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground bg-white border border-border p-4">
                  {optionalSpecs1560.map((opt) => (
                    <li key={opt}>{opt}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-secondary mb-6">MKT-32135</h3>
              <SpecTable title="Technical Parameters" rows={technicalParams32135} />
              <SpecTable title="Main Configuration" rows={mainConfig} />
              <SpecTable title="Standard Configuration" rows={standardConfig} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
