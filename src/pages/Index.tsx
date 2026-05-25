import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Wrench, Users, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import TalkToExpertBanner from "@/components/TalkToExpertBanner";
import heroVideo from "@/assets/hero-compressed.mp4";
import kflc1530Img from "@/assets/machine-kflc-1530.png";
import kfloPrimaryImg from "@/assets/machine-kflo-primary.png";
import kfloSecondaryImg from "@/assets/machine-kflo-secondary.png";
import flcP1530Img from "@/assets/flc-p-1530-1.png";
import flp6035Img from "@/assets/machine-flp-6035-front.png";
import mkt1560Img from "@/assets/machine-mkt-1560.png";
import mkt32135Img from "@/assets/machine-mkt-32135.png";
import facilityImg from "@/assets/flc-p-2040.png";

const featuredMachines = [
  { tag: "CNC FIBER LASERS", name: "FLO-1530", image: kfloPrimaryImg, images: null, link: "/machines/open-type-fiber-laser" },
  { tag: "Fully Enclosed Lasers", name: "FLC-1530", image: kflc1530Img, images: null, link: "/machines/closed-type-fiber-laser" },
  { tag: "Combo Lasers", name: "FLO-P 1530 / FLC-P 1530", image: null, images: [kfloSecondaryImg, flcP1530Img], link: "/machines/covered-pipe-profile-fiber-laser" },
  { tag: "Tube / Profile Cutting Lasers", name: "FLP 6035", image: flp6035Img, images: null, link: "/machines/covered-pipe-profile-fiber-laser" },
];

const stats = [
  { value: "50+", label: "Years Combined Experience" },
  { value: "750+", label: "Machines Installed" },
  { value: "24/7 U.S.-Based", label: "Support & Parts Team" },
];

const whyPoints = [
  "Mekotek precision machines —In stock in CA",
  "Factory-direct pricing, no middleman markup",
  "In-house engineering support from our Tustin, CA team",
  "U.S. parts inventory — same-day support when your floor needs it",
];

export default function Index() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const tryPlay = () => {
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible" && video.paused) {
        tryPlay();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", tryPlay);
    tryPlay();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", tryPlay);
    };
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <video
            ref={heroVideoRef}
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            onEnded={(e) => {
              const v = e.currentTarget;
              const p = v.play();
              if (p && typeof p.catch === "function") p.catch(() => {});
            }}
            className="absolute left-0 top-0 z-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.05) 100%)" }}
          />
        </div>
        <div className="container relative py-28 md:py-40">
          <div className="max-w-2xl">
            <p className="section-label mb-4" style={{ fontSize: "13px", letterSpacing: "2.5px", color: "rgba(255,255,255,0.85)" }}>Precision CNC Equipment. Factory-Direct to Your Floor.</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 text-balance" style={{ color: "#FFFFFF" }}>
              European Made, high-speed fiber machines and press brakes
            </h1>
            <p className="leading-relaxed mb-8 max-w-xl" style={{ fontSize: "17px", color: "rgba(255,255,255,0.80)" }}>
              KAIMEC offers CNC fiber lasers, CNC press brakes, and CNC Gun & BTA Drilling Machines — backed by US-based engineers and California inventory.
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


      {/* Open Type Fiber Laser Video */}
      <section className="py-16 md:py-20 bg-[#f8f8f8]">
        <div className="container max-w-5xl">
          <div className="text-center mb-10">
            <p className="section-label mb-3">LASER MACHINES</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">See It in Action</h2>
          </div>
          <div className="aspect-video w-full overflow-hidden rounded-lg border border-border shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/USZ4uyD315s?autoplay=1&mute=1&loop=1&playlist=USZ4uyD315s&controls=0&modestbranding=1&playsinline=1&rel=0"
              title="Open Type Fiber Laser in action"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Featured Machines */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-foreground">Laser Machines</h2>
            <p className="mt-3 text-sm text-muted-foreground font-bold border-4 rounded-lg shadow-lg font-sans md:text-3xl text-center">Available Table sizes 5x10ft / 6.5x13ft / 6.5x20ft&nbsp;</p>
            <p className="mt-3 text-sm text-muted-foreground font-bold border-4 rounded-lg shadow-lg font-sans md:text-3xl text-center">Laser Powers : 3, 6, 12, 20, 50 kW</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredMachines.map((m) => (
              <div key={m.name} className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors">
                <div className="aspect-[4/3] overflow-hidden bg-white flex items-center justify-center">
                  {m.images ? (
                    <div className="relative w-full h-full">
                      {m.images.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`${m.name} ${i + 1}`}
                          loading="lazy"
                          className={`absolute w-3/5 h-3/5 object-contain p-1 group-hover:scale-105 transition-transform duration-500 ${i === 0 ? "top-0 left-0" : "bottom-0 right-0"}`}
                        />
                      ))}
                    </div>
                  ) : (
                    <img src={m.image!} alt={m.name} loading="lazy" width={800} height={600} className="h-full w-full object-contain p-2 group-hover:scale-105 transition-transform duration-500" />
                  )}
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">{m.tag}</span>
                  <h3 className="text-xl font-bold text-foreground mt-2 mb-2">{m.name}</h3>
                  <Link to={m.link} className="inline-flex items-center text-sm font-semibold text-primary hover:underline">
                    View Specifications <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CNC Press Brakes */}
      <section className="py-20 md:py-28 bg-[#f8f8f8]">
        <div className="container">
          <div className="text-center mb-14">
            <p className="section-label mb-3">{"\n"}</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">CNC Press Brakes</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">High-precision CNC press brakes engineered for accurate, repeatable bending across a wide range of sheet sizes and tonnages.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            {[
              { tag: "CNC Press Brake", name: "MKT 1560", desc: "5 ft / 60 ton capacity", image: mkt1560Img },
              { tag: "CNC Press Brake", name: "MKT 32135", desc: "12 ft x 135ton capacity", image: mkt32135Img },
            ].map((m) => (
              <div key={m.name} className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors">
                <div className="aspect-[4/3] overflow-hidden bg-white flex items-center justify-center">
                  <img src={m.image} alt={m.name} loading="lazy" width={800} height={600} className="h-full w-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">{m.tag}</span>
                  <h3 className="text-xl font-bold text-foreground mt-2 mb-1">{m.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{m.desc}</p>
                  <Link to="/machines/press-brakes" className="inline-flex items-center text-sm font-semibold text-primary hover:underline">
                    View Specifications <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Talk to an Expert banner */}
      <TalkToExpertBanner />

      {/* Why KAIMEC */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="rounded-lg overflow-hidden">
              <img src={facilityImg} alt="KAIMEC facility — Tustin, CA" loading="lazy" width={800} height={600} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="section-label mb-3">Why KAIMEC</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">The machines your shop needs. The support your floor demands.</h2>
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
