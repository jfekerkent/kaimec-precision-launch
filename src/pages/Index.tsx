import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Wrench, Users, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-cnc.jpg";
import fiberLaserImg from "@/assets/machine-fiber-laser.jpg";
import pressBrakeImg from "@/assets/machine-press-brake.jpg";
import panelBenderImg from "@/assets/machine-panel-bender.jpg";
import facilityImg from "@/assets/facility.jpg";

const featuredMachines = [
  { tag: "Laser Cutting", name: "CNC Fiber Laser", desc: "High-speed precision cutting for sheet metal up to 40mm thick. IPG fiber source with automatic pallet changer.", image: fiberLaserImg, link: "/machines/cnc-fiber-lasers" },
  { tag: "Metal Forming", name: "CNC Press Brake", desc: "Hydraulic and electric press brakes from 110T to 400T, featuring DA-series CNC controllers.", image: pressBrakeImg, link: "/machines/press-brakes" },
  { tag: "Automation", name: "Panel Bender", desc: "Automated panel bending systems with cycle times under 8 seconds per bend for high-volume production.", image: panelBenderImg, link: "/machines/panel-benders" },
];

const stats = [
  { value: "50+", label: "Years Combined Experience" },
  { value: "500+", label: "Machines Installed" },
  { value: "2-Year", label: "Warranty Standard" },
];

const whyPoints = [
  "Machines not available at major distributors",
  "Factory-direct pricing",
  "In-house engineering support",
  "US-based service team",
];

export default function Index() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="CNC fiber laser cutting metal" width={1920} height={1080} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="container relative py-28 md:py-40">
          <div className="max-w-2xl">
            <p className="section-label mb-4">Precision Industrial Machinery</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] text-foreground mb-6 text-balance">
              Specialized Industrial Machinery. Built for Serious Fabricators.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
              KAIMEC offers precision CNC fiber lasers, press brakes, and panel benders not available through standard distributors. Serving manufacturers across the US.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/machines/cnc-fiber-lasers">
                <Button size="lg" className="font-bold text-base px-8">
                  Explore Machines <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/quote">
                <Button variant="outline" size="lg" className="font-bold text-base px-8 border-foreground/30 text-foreground hover:bg-foreground/10">
                  Request a Quote
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
            <h2 className="text-3xl md:text-4xl font-black text-foreground">Featured Machines</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {featuredMachines.map((m) => (
              <div key={m.name} className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={m.image} alt={m.name} loading="lazy" width={800} height={600} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
              <img src={facilityImg} alt="KAIMEC industrial facility" loading="lazy" width={800} height={600} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="section-label mb-3">About Us</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">Why KAIMEC?</h2>
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
                  Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
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
              Ready to Upgrade Your Production Line?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Talk to our engineers about the right machine for your application. We'll provide a custom quote within one business day.
            </p>
            <Link to="/quote">
              <Button size="lg" variant="secondary" className="font-bold text-base px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Get a Free Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
