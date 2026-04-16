import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import MachineGallery from "@/components/MachineGallery";
import pressBrakeImg from "@/assets/machine-press-brake.jpg";

const machines = [
  { id: "kmkt-1560", model: "KMKT-1560", description: "Press Brake", images: [pressBrakeImg, "placeholder:2", "placeholder:3", "placeholder:4"] },
  { id: "kmkt-32135", model: "KMKT-32135", description: "Press Brake", images: [pressBrakeImg, "placeholder:2", "placeholder:3", "placeholder:4"] },
  { id: "kmkj-32220", model: "KMKJ-32220", description: "Press Brake", images: [pressBrakeImg, "placeholder:2", "placeholder:3", "placeholder:4"] },
];

export default function PressBrakes() {
  return (
    <Layout>
      <section className="py-20 bg-secondary">
        <div className="container max-w-3xl text-center">
          <p className="section-label mb-3">Machine Catalog</p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">Press Brakes</h1>
          <p className="text-lg text-muted-foreground">CNC hydraulic and electric press brakes for precision metal bending.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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

          <div className="mt-16 rounded-lg border border-border bg-card p-10 text-center max-w-3xl mx-auto">
            <p className="text-muted-foreground text-lg mb-6">
              Full specifications coming soon — contact us at{" "}
              <a href="mailto:sales@kaimec.com" className="text-primary hover:underline">sales@kaimec.com</a>{" "}
              for details.
            </p>
            <Link to="/quote">
              <Button size="lg" className="font-bold px-10">Request a Quote</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
