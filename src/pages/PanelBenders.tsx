import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import Layout from "@/components/Layout";
import MachineGallery from "@/components/MachineGallery";

const machines = [
  {
    id: "kmkj-32220",
    model: "MKJ-32220",
    description: "Panel Bender",
    images: ["placeholder:1", "placeholder:2", "placeholder:3", "placeholder:4"],
  },
  {
    id: "kmkt-1560",
    model: "MKT-1560",
    description: "Panel Bender",
    images: ["placeholder:1", "placeholder:2", "placeholder:3", "placeholder:4"],
  },
];

const specRows = [
  { label: "Bending Length", values: ['2,200 mm (86.6")', '1,560 mm (61.4")'] },
  { label: "Max Sheet Width", values: ['3,200 mm (126")', '2,500 mm (98.4")'] },
  { label: "Material Thickness", values: ["Up to 3 mm mild steel / 2 mm stainless", "Up to 2.5 mm mild steel"] },
  { label: "Control", values: ["CNC Proprietary", "CNC Proprietary"] },
];

export default function PanelBenders() {
  return (
    <Layout>
      {/* Header */}
      <section className="py-20 bg-secondary">
        <div className="container max-w-3xl text-center">
          <p className="section-label mb-3">Machine Catalog</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Panel Benders</h1>
          <p className="text-lg text-white/80">CNC panel bending machines for high-speed, automated sheet metal forming.</p>
        </div>
      </section>

      {/* Machine Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
            {machines.map((m) => (
              <div key={m.id} className="rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors">
                <MachineGallery images={m.images} model={m.model} />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{m.model}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{m.description}</p>
                  <Link to="/quote">
                    <Button className="w-full font-bold">Request Quote</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specification Table */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-black text-foreground mb-10 text-center">Specification Comparison</h2>
          <div className="rounded-lg border border-border bg-card overflow-hidden max-w-3xl mx-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/10">
                  <TableHead className="font-bold text-foreground min-w-[180px]">Specification</TableHead>
                  <TableHead className="font-bold text-foreground text-center">MKJ-32220</TableHead>
                  <TableHead className="font-bold text-foreground text-center">MKT-1560</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {specRows.map((row, i) => (
                  <TableRow key={row.label} className={i % 2 === 0 ? "bg-muted/30" : ""}>
                    <TableCell className="font-medium text-foreground">{row.label}</TableCell>
                    {row.values.map((val, j) => (
                      <TableCell key={j} className="text-center text-muted-foreground">{val}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container text-center">
          <Link to="/quote">
            <Button size="lg" className="font-bold px-10">Request a Quote</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
