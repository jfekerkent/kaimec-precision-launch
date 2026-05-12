import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import tskMain from "@/assets/tsk-2150-main.png";
import tsk3d from "@/assets/tsk-2150-3d.png";
import tskViews from "@/assets/tsk-2150-views.png";

const quoteHref = "/quote?machine=" + encodeURIComponent("TSK-2150 × 3000mm");

const keySpecs: [string, string][] = [
  ["Drilling Diameter", "Ø30 – Ø150 mm"],
  ["Boring Diameter", "Ø40 – Ø500 mm"],
  ["Max Processing Depth", "3,000 mm"],
  ["Workpiece OD Range", "Ø100 – Ø700 mm"],
  ["Spindle Motor", "30 kW"],
  ["Machine Weight", "~39 Tons"],
];

const capabilities = [
  { name: "Solid Drilling", desc: "Drills a full hole into solid bar stock using a BTA drill head. Standard production method for most deep hole applications." },
  { name: "Trepanning", desc: "Produces a hole while simultaneously yielding a solid core. Preferred when workpiece material is high-value and core recovery is required. (Optional)" },
  { name: "Rough Boring", desc: "Expands existing holes using a rough boring head. Achieves surface roughness Ra 6.3 – Ra 12.5." },
  { name: "Fine Boring", desc: "Improves inner hole finish using a fine boring head. Achieves surface roughness Ra 3.2 – Ra 6.3." },
  { name: "Burnishing", desc: "Final surface finishing of the inner hole. Achieves superior roughness Ra 0.2 – Ra 0.8." },
];

const specGroups: { title: string; rows: [string, string][] }[] = [
  { title: "Working Capacity", rows: [
    ["Drilling Diameter", "Ø30 – Ø150 mm"],
    ["Boring Diameter", "Ø40 – Ø500 mm"],
    ["Max Processing Depth", "3,000 mm"],
    ["Workpiece OD", "Ø100 – Ø700 mm"],
    ["Workpiece Length", "0.5 m – 3,000 mm"],
  ]},
  { title: "Z1 Axis (Infeed Carriage)", rows: [
    ["Infeed Speed", "0.5 – 1,000 mm/min stepless"],
    ["Rapid Traverse", "1,500 mm/min"],
    ["Servo Motor", "36 Nm / 5.2 kW"],
    ["Max Feeding Force", "60 kN"],
  ]},
  { title: "Z2 Axis (Oil Pressure Head)", rows: [
    ["Rapid Traverse", "3 m/min"],
    ["Servo Motor", "27 Nm / 4.3 kW"],
  ]},
  { title: "Headstock", rows: [
    ["Rotary Speed", "4 – 440 RPM"],
    ["Motor Power", "30 kW"],
    ["Chuck", "Ø800 mm 4-Jaw"],
    ["Spindle Bore", "Ø130 mm"],
    ["Spindle Taper", "Metric 140"],
    ["Max Output Torque", "9,120 Nm"],
  ]},
  { title: "Drilling Box", rows: [
    ["Rotary Speed", "40 – 500 RPM"],
    ["Motor Power", "30 kW"],
  ]},
  { title: "General", rows: [
    ["Center Height", "625 mm"],
    ["Total Power", "138 kW"],
    ["Loading Capacity", "10 Tons"],
    ["Floor Space", "29 m × 3.8 m"],
    ["Machine Weight", "~39 Tons"],
    ["Max Rotary Diameter Over Bed", "Ø1,250 mm"],
    ["Center Rest Clamping", "Ø100 – 750 mm"],
  ]},
  { title: "Cooling System", rows: [
    ["Max Pressure", "2.5 MPa"],
    ["Max Flow Rate", "800 L/min"],
    ["Oil Tank", "~7,700 L"],
    ["Coolant Pumps", "7.5 kW × 3 + 11 kW × 1"],
    ["Flow Selectable", "200 / 500 / 800 L/min"],
  ]},
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

export default function GunDrills() {
  return (
    <Layout>
      {/* Header */}
      <section className="py-20 bg-secondary">
        <div className="container max-w-3xl text-center">
          <p className="section-label mb-3">Machine Catalog</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Gun Drills</h1>
          <p className="text-lg text-white/80">Deep hole drilling machines for precision boring in demanding industrial applications.</p>
        </div>
      </section>

      {/* Product card */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto rounded-lg border border-border bg-card overflow-hidden">
            <div className="aspect-[16/9] bg-white/5 border-white/10 overflow-hidden flex items-center justify-center p-6 rounded-lg border">
              <img src={tskMain} alt="TSK-2150 × 3000mm" className="w-full h-full object-contain bg-white" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-1">TSK-2150 × 3000mm</h2>
              <p className="text-sm text-muted-foreground mb-5">Deep Hole Drilling & Boring Machine</p>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-6">
                {keySpecs.slice(0, 5).map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm border-b border-border py-1.5">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium text-foreground">{v}</span>
                  </div>
                ))}
              </div>
              <Link to={quoteHref}>
                <Button className="w-full sm:w-auto font-bold px-10">Request Quote</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key specs callout */}
      <section className="py-12 bg-secondary">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {keySpecs.map(([k, v]) => (
              <div key={k}>
                <div className="text-primary text-lg font-black">{v}</div>
                <div className="text-xs uppercase tracking-wider text-white/70 mt-1">{k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h3 className="text-2xl font-black text-secondary mb-4">Product Overview</h3>
          <p className="text-muted-foreground leading-relaxed">
            The TSK-2150 × 3000mm is a heavy-duty deep hole drilling and boring machine purpose-built for processing cylindrical workpieces requiring deep internal holes with high precision and consistent surface quality. The machine bed offers exceptional rigidity and long-term accuracy retention, built for demanding production environments. Equipped with two sets of adjustable roller center rests and V-shaped workpiece carriers, the TSK-2150 accommodates large-diameter workpieces with ease. The wide-range spindle speed, AC servo-driven feed system, and servo-tightening oil pressure head make this machine adaptable to all major deep hole machining methods — simply by changing the cutting tool.
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 bg-[#f8f8f8]">
        <div className="container max-w-5xl">
          <h3 className="text-2xl font-black text-secondary mb-2">Machining Capabilities</h3>
          <p className="text-sm text-muted-foreground italic mb-8">All capabilities are achieved by tool change only — no machine reconfiguration required.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {capabilities.map((c) => (
              <div key={c.name} className="border border-border bg-white p-5 rounded">
                <h4 className="font-bold text-foreground mb-2">{c.name}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Layout diagrams */}
      <section className="py-16">
        <div className="container max-w-5xl">
          <h3 className="text-2xl font-black text-secondary mb-8">Machine Layout</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="bg-white border border-border overflow-hidden">
                <img src={tsk3d} alt="TSK-2150 3D layout" className="w-full h-auto object-contain" />
              </div>
              <p className="text-sm text-muted-foreground text-center mt-2">Machine Layout (3D View)</p>
            </div>
            <div>
              <div className="bg-white border border-border overflow-hidden">
                <img src={tskViews} alt="TSK-2150 top and side view" className="w-full h-auto object-contain" />
              </div>
              <p className="text-sm text-muted-foreground text-center mt-2">Machine Layout (Top & Side View)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Full specs */}
      <section className="py-16 bg-[#f8f8f8]">
        <div className="container max-w-5xl">
          <h3 className="text-2xl font-black text-secondary mb-8">Full Technical Specifications</h3>
          <div className="grid md:grid-cols-2 gap-x-8">
            {specGroups.map((g) => (
              <SpecTable key={g.title} title={g.title} rows={g.rows} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container text-center">
          <h3 className="text-2xl font-black text-foreground mb-4">Ready to spec the TSK-2150?</h3>
          <Link to={quoteHref}>
            <Button size="lg" className="font-bold px-10">Request a Quote</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
