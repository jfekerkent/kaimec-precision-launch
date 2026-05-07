import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { categories, getMachinesByCategory } from "@/data/machines";
import kflo1530Img from "@/assets/machine-kflo-primary.png";
import kfloTertiaryImg from "@/assets/machine-kflo-tertiary.png";
import kflc1530Img from "@/assets/machine-kflc-1530.png";
import flcP1530Img from "@/assets/flc-p-1530-1.png";
import flp6020Front from "@/assets/machine-flp-6020-front.png";
import flp6035Front from "@/assets/machine-flp-6035-front.png";
import mkt1560Img from "@/assets/machine-mkt-1560.png";
import mkt32135Img from "@/assets/machine-mkt-32135.png";
import tskMain from "@/assets/tsk-2150-main.png";

const machineImages: Record<string, string> = {
  "kflo-1530": kflo1530Img,
  "kflo-p-1530": kfloTertiaryImg,
  "kflc-1530": kflc1530Img,
  "kflc-p-1530": flcP1530Img,
  "kflp-6020": flp6020Front,
  "kflp-6035": flp6035Front,
  "kmkt-1560": mkt1560Img,
  "kmkt-32135": mkt32135Img,
  "gun-drilling-machine": tskMain,
};

export default function Machines() {
  return (
    <Layout>
      <section className="py-20 bg-secondary">
        <div className="container max-w-3xl text-center">
          <p className="section-label mb-3">Full Catalog</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Our Machines</h1>
          <p className="text-lg text-white/80">Browse our complete range of precision industrial machinery by category.</p>
        </div>
      </section>

      {categories.map((cat) => {
        const machines = getMachinesByCategory(cat.slug);
        return (
          <section key={cat.slug} className="py-16 border-b border-border last:border-0">
            <div className="container">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="section-label mb-2">{cat.name}</p>
                  <p className="text-muted-foreground max-w-xl">{cat.description}</p>
                </div>
                <Link to={`/machines/${cat.slug}`} className="hidden md:inline-flex items-center text-sm font-semibold text-primary hover:underline shrink-0">
                  View All {cat.name} <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {machines.map((m) => (
                  <div key={m.id} className="rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors">
                    <div className="aspect-[4/3] overflow-hidden bg-white">
                      <img src={machineImages[m.id]} alt={m.model} loading="lazy" width={800} height={600} className="h-full w-full object-contain p-2" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-foreground mb-1">{m.model}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{m.description}</p>
                      <div className="space-y-1.5 mb-4">
                        {Object.entries(m.specs).slice(0, 3).map(([key, val]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{key}</span>
                            <span className="font-medium text-foreground">{val}</span>
                          </div>
                        ))}
                      </div>
                      <Link to={`/quote?machine=${encodeURIComponent(m.model)}`}>
                        <Button size="sm" className="w-full font-bold">Request Quote</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <Link to={`/machines/${cat.slug}`} className="md:hidden inline-flex items-center text-sm font-semibold text-primary hover:underline mt-6">
                View All {cat.name} <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </section>
        );
      })}
    </Layout>
  );
}
