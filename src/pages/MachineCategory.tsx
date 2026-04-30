import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { getMachinesByCategory, getCategoryBySlug } from "@/data/machines";
import fiberLaserImg from "@/assets/machine-fiber-laser.jpg";
import tubeLaserImg from "@/assets/machine-tube-laser.jpg";
import pressBrakeImg from "@/assets/machine-press-brake.jpg";
import panelBenderImg from "@/assets/machine-panel-bender.jpg";
import gunDrillImg from "@/assets/machine-gun-drill.jpg";
import kflo1530Img from "@/assets/machine-kflo-1530.png";
import kfloP1530Img from "@/assets/machine-kflo-p-1530.jpg";

const imageMap: Record<string, string> = {
  "fiber-laser": fiberLaserImg,
  "tube-laser": tubeLaserImg,
  "press-brake": pressBrakeImg,
  "panel-bender": panelBenderImg,
  "gun-drill": gunDrillImg,
  "kflo-1530": kflo1530Img,
  "kflo-p-1530": kfloP1530Img,
};

export default function MachineCategory() {
  const { slug } = useParams<{ slug: string }>();
  const category = getCategoryBySlug(slug || "");
  const machines = getMachinesByCategory(slug || "");

  if (!category) {
    return (
      <Layout>
        <div className="container py-28 text-center">
          <h1 className="text-3xl font-black text-foreground">Category not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="py-20 bg-secondary">
        <div className="container max-w-3xl text-center">
          <p className="section-label mb-3">Machine Catalog</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{category.name}</h1>
          <p className="text-lg text-white/80">{category.description}</p>
        </div>
      </section>

      {/* Machine Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {machines.map((m) => (
              <div key={m.id} className="rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={imageMap[m.image]}
                    alt={m.model}
                    loading="lazy"
                    width={800}
                    height={600}
                    className={`h-full w-full object-cover ${m.image === "kflo-1530" || m.image === "kflo-p-1530" ? "bg-white object-contain p-2" : ""}`}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{m.model}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{m.description}</p>
                  <div className="space-y-2 mb-6">
                    {Object.entries(m.specs).map(([key, val]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{key}</span>
                        <span className="font-medium text-foreground">{val}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/quote">
                    <Button className="w-full font-bold">Request Quote</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
