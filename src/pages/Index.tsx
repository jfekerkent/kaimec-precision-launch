import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Wrench, Users, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import heroImg from "@/assets/hero-main.png";
import kflc1530Img from "@/assets/machine-kflc-1530.png";
import kfloPrimaryImg from "@/assets/machine-kflo-primary.png";
import pressBrakeImg from "@/assets/machine-press-brake.jpg";
import panelBenderImg from "@/assets/machine-panel-bender.jpg";
import gunDrillImg from "@/assets/machine-gun-drill.jpg";
import facilityImg from "@/assets/facility.jpg";

const featuredMachines = [
  { tag: "Fiber Laser Cutting", name: "FLO-P 1530", desc: "Open-frame fiber laser built for high-throughput sheet cutting. Steel, stainless, aluminum, brass — production speed, sub-0.1mm tolerance.", image: kfloPrimaryImg, link: "/machines/cnc-fiber-lasers", isProductShot: true },
  { tag: "Fiber Laser Cutting", name: "FLC-1530", desc: "Enclosed fiber laser for shops that demand cleaner environments and safer high-power cutting. Full enclosure, same precision.", image: kflc1530Img, link: "/machines/cnc-fiber-lasers", isProductShot: true },
  { tag: "Tube & Profile Laser", name: "FLC-P 1530", desc: "Cut round tube, square tube, angle iron, and custom profiles in one setup. No secondary ops. No fixturing headaches.", image: kflc1530Img, link: "/machines/cnc-fiber-lasers", isProductShot: true },
];

const stats = [
  { value: "50+", label: "Years Combined Experience" },
  { value: "500+", label: "Machines Installed" },
  { value: "U.S.-Based", label: "Support & Parts Team" },
];

const whyPoints = [
  "Mekotek precision machines — not available through standard distributors",
  "Factory-direct pricing, no middleman markup",
  "In-house engineering support from our Tustin, CA team",
  "U.S. parts inventory — same-day support when your floor needs it",
];

export default function Index() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="CNC fiber laser cutting metal"
            width={1920}
            height={1080}
            className="absolute left-0 top-0 z-0 h-full w-full object-cover object-[center_right]"
            style={{ opacity: 1, filter: "none" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.05) 100%)" }}
          />
        </div>
        <div className="container relative py-28 md:py-40">
          <div className="max-w-2xl">
            <p className="section-label mb-4 text-white">Precision CNC Equipment. Factory-Direct to Your Floor.</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 text-balance" style={{ color: "#FFFFFF" }}>
              Cut Faster. Cut Cleaner. Built for Your Production Floor.
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
              KAIMEC offers CNC fiber lasers, press brakes, and panel benders not available through standard distributors — backed by US-based engineers and California inventory.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/machines">
                <Button size="lg" className="font-bold text-base px-8">
                  Explore Machines <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/quote">
                <Button variant="outline" size="lg" className="font-bold text-base px-8 border-white/30 bg-transparent text-white hover:bg-white/10">
                  Talk to a Specialist
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="gradient-gold">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-black text-primary-foreground">{s.value}</div>
                <div className="text-sm font-semibold text-primary-foreground/80 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Machines */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Our Equipment</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">Machines Built for Metal</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Steel, stainless, aluminum, brass, copper, titanium. Aerospace, automotive, HVAC, fabrication. If it runs on your floor, we have the machine for it.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {featuredMachines.map((m) => (
              <div key={m.name} className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={m.image} alt={m.name} loading="lazy" width={800} height={600} className={`h-full w-full group-hover:scale-105 transition-transform duration-500 ${m.isProductShot ? "object-contain bg-white p-2" : "object-cover"}`} />
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">{m.tag}</span>
                  <h3 className="text-xl font-bold text-foreground mt-2 mb-2">{m.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{m.desc}</p>
                  <Link to={m.link} className="inline-flex items-center text-sm font-semibold text-primary hover:underline">
                    View Specifications <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why KAIMEC */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="rounded-lg overflow-hidden">
              <img src={facilityImg} alt="KAIMEC facility — Tustin, CA" loading="lazy" width={800} height={600} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="section-label mb-3">Why KAIMEC</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">The machines your shop needs. The support your floor demands.</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">We're a focused precision equipment company — not a catalog brand. We carry Mekotek machines because they're what we'd put in our own shop. Every unit comes backed by our Southern California team, U.S. parts inventory, and direct technical support. No overseas tickets. No runaround.</p>
              <ul className="space-y-4 mb-8">
                {whyPoints.map((p) => (
                  <li key={p} className="flex gap-3 items-start">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{p}</span>
                  </li>
                ))}
              </ul>
              <Link to="/about">
                <Button variant="outline" className="font-bold border-foreground/30 text-foreground hover:bg-foreground/10">
                  About KAIMEC <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="rounded-xl gradient-gold p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-primary-foreground mb-4">
              Ready to spec your machine?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Tell us what you're cutting and we'll find the right configuration. Same-day response from our Tustin, CA team.
            </p>
            <Link to="/quote">
              <Button size="lg" variant="secondary" className="font-bold text-base px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Talk to a Specialist
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
