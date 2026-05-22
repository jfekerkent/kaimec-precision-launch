import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import shopFloorImg from "@/assets/about-shop-floor.jpg";
import machinesImg from "@/assets/about-machines.jpg";
import supportImg from "@/assets/about-support.jpg";
import serveImg from "@/assets/about-serve.jpg";

export default function About() {
  return (
    <Layout>
      {/* SECTION 1 — Page Header */}
      <section className="relative overflow-hidden bg-background py-24 md:py-32">
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
          aria-hidden="true"
        >
          <span className="text-[18vw] font-black tracking-tighter text-foreground/[0.05] leading-none">
            KAIMEC
          </span>
        </div>
        <div className="container relative">
          <p className="section-label mb-3">About Us</p>
          <h1 className="text-5xl md:text-7xl font-black uppercase text-foreground tracking-tight">
            About Us
          </h1>
        </div>
      </section>

      {/* SECTION 2 — Why Choose KAIMEC */}
      <section className="relative overflow-hidden">
        <img
          src={shopFloorImg}
          alt="CNC machine shop floor"
          loading="lazy"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-secondary/85" />
        <div className="container relative py-24 md:py-32">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-6 tracking-tight">
              Why Choose KAIMEC?
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              KAIMEC is a focused precision equipment company — not a catalog brand. Based in Tustin, CA, we supply specialized CNC fabrication machines that serious shops can't find through standard distributors. Every machine we carry is backed by our Southern California team, U.S. parts inventory, and direct technical support. No overseas tickets. No runaround.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Our Machines */}
      <section className="py-20 md:py-28 bg-card">
        <div className="container grid gap-12 lg:grid-cols-2 items-center">
          <div className="overflow-hidden">
            <img src={machinesImg} alt="Fiber laser cutting steel" loading="lazy" width={1280} height={960} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="section-label mb-3">Our Machines</p>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-foreground mb-6 tracking-tight">Our Machines</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We carry fiber lasers, press brakes, tube and profile lasers, and deep hole drilling machines — purpose-selected for production environments that demand precision and uptime. These are not catalog machines. Each model is vetted by our team and sold with full U.S. support behind it.
            </p>
            <Link to="/machines">
              <Button className="font-bold px-8 uppercase">
                View All Machines <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4 — U.S.-Based Support */}
      <section className="py-20 md:py-28">
        <div className="container grid gap-12 lg:grid-cols-2 items-center">
          <div className="lg:order-1 order-2">
            <p className="section-label mb-3">24/7 U.S.-Based Support</p>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-foreground mb-6 tracking-tight">24/7 U.S.-Based Support</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Every KAIMEC machine comes backed by our Tustin, CA team. We stock parts domestically, provide in-house engineering support, and show up when your floor needs us. Same-day support, no overseas tickets, no runaround — just direct access to people who know the machine.
            </p>
            <Link to="/quote">
              <Button className="font-bold px-8 uppercase">
                Contact Our Team <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="overflow-hidden lg:order-2 order-1">
            <img src={supportImg} alt="Technician operating CNC machine" loading="lazy" width={1280} height={960} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* SECTION 5 — Who We Serve */}
      <section className="py-20 md:py-28 bg-card">
        <div className="container grid gap-12 lg:grid-cols-2 items-center">
          <div className="overflow-hidden">
            <img src={serveImg} alt="Fabricated metal parts on shop floor" loading="lazy" width={1280} height={960} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="section-label mb-3">Who We Serve</p>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-foreground mb-6 tracking-tight">Who We Serve</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              From job shops running single shifts to high-volume production facilities, KAIMEC serves manufacturers across the U.S. who need reliable machines and a support team that treats their floor like our own. If precision and uptime matter to your operation, we're the right partner.
            </p>
            <Link to="/quote">
              <Button className="font-bold px-8 uppercase">
                Request a Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6 — Our Mission */}
      <section className="relative overflow-hidden bg-secondary py-24 md:py-32">
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
          aria-hidden="true"
        >
          <span className="text-[20vw] font-black tracking-tighter text-white/[0.04] leading-none">
            MISSION
          </span>
        </div>
        <div className="container relative max-w-4xl text-center">
          <p className="section-label mb-4">Our Mission</p>
          <p className="text-2xl md:text-4xl font-black uppercase text-white leading-tight tracking-tight">
            KAIMEC exists to put the right machine on your floor — and keep it running. We do that through honest pricing, machines we stand behind, and support that doesn't disappear after the sale.
          </p>
        </div>
      </section>
    </Layout>
  );
}
