import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Wrench, Users, CheckCircle, Play } from "lucide-react";
import Layout from "@/components/Layout";
import TalkToExpertBanner from "@/components/TalkToExpertBanner";
import HeroLeadForm from "@/components/HeroLeadForm";
import kflc1530Img from "@/assets/machine-kflc-1530.png";
import kfloPrimaryImg from "@/assets/machine-kflo-primary.png";
import kfloSecondaryImg from "@/assets/machine-kflo-secondary.png";
import flcP1530Img from "@/assets/flc-p-1530-1.png";
import flp6035Img from "@/assets/machine-flp-6035-front.png";
import mkt1560Img from "@/assets/machine-mkt-1560.png";
import mkt32135Img from "@/assets/machine-mkt-32135.png";
import facilityImg from "@/assets/flc-p-2040.png";
import slideFlo1530New from "@/assets/slide-flo-1530-6kw.png.asset.json";
import slideFlc1530New from "@/assets/slide-flc-1530-6kw.jpg.asset.json";
import slideFlo2060New from "@/assets/slide-flo-2060.avif.asset.json";
import slideMkt1560 from "@/assets/slide-mkt-1560.jpg.asset.json";
import slideFlp6020New from "@/assets/slide-flp-6020.png.asset.json";
import slideFlc15304 from "@/assets/slide-flc-1530-4.png.asset.json";
import slideFlo2040New from "@/assets/slide-flo-2040.png.asset.json";
import laserCuttingVideo from "@/assets/laser-cutting.mp4.asset.json";
import mekotekVideo from "@/assets/mekotek-flc-p-1530.mp4.asset.json";

const facilitySlides = [
  slideFlo1530New.url,
  slideFlc1530New.url,
  slideFlo2060New.url,
  slideMkt1560.url,
  slideFlp6020New.url,
  slideFlc15304.url,
  slideFlo2040New.url,
];

const featuredMachines = [
  { tag: "CNC FIBER LASERS", name: "FLO-1530, FLO-2040, FLO 2060 models", image: kfloPrimaryImg, images: null, link: "/machines/laser-cutting/open-type-fiber-laser" },
  { tag: "Fully Enclosed Lasers", name: "FLC-1530, FLC 2040, FLC2060 models", image: kflc1530Img, images: null, link: "/machines/laser-cutting/closed-type-fiber-laser" },
  { tag: "Combo Lasers", name: "FLO-P ( open, single table) / FLC-P (fully enclosed/2 tables)", image: null, images: [kfloSecondaryImg, flcP1530Img], link: "/machines/laser-cutting/covered-pipe-profile-fiber-laser" },
  { tag: "Tube / Profile Cutting Lasers", name: "FLP 6035", image: flp6035Img, images: null, link: "/machines/tube-profile-lasers" },
];

const stats = [
  { value: "50+", label: "Years Combined Experience" },
  { value: "750+", label: "Machines Installed" },
  { value: "24/7 U.S.-Based", label: "Support & Parts Team" },
];

const whyPoints = [
  "Precision machines —In stock in CA",
  "Factory-direct pricing, no middleman markup",
  "In-house engineering support from our Tustin, CA team",
  "U.S. parts inventory — same-day support when your floor needs it",
];

export default function Index() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    video.controls = false;
    video.muted = true;
    video.play().catch(() => undefined);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setSlideIdx((i) => (i + 1) % facilitySlides.length);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={heroVideoRef}
            src={laserCuttingVideo.url}
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden="true"
            tabIndex={-1}
            preload="auto"
            className="hero-background-video"
            onContextMenu={(event) => event.preventDefault()}
            onLoadedMetadata={(event) => {
              event.currentTarget.controls = false;
              event.currentTarget.play().catch(() => undefined);
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "177.78vh",
              minWidth: "100%",
              height: "56.25vw",
              minHeight: "100%",
              objectFit: "cover",
              pointerEvents: "none",
              border: 0,
              zIndex: 0,
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.05) 100%)", zIndex: 1 }}
          />
        </div>
        <div className="container relative z-10 py-28 md:py-40">
          <div className="max-w-2xl">
            <p className="section-label mb-4" style={{ fontSize: "13px", letterSpacing: "2.5px", color: "rgba(255,255,255,0.85)" }}>Precision Fabrication Machines... From Factory-Direct to Your Floor.</p>
            <h1 className="text-4xl md:text-5xl leading-[1.1] mb-6 text-balance lg:text-5xl font-bold text-[#f6f5ef]">
              European high-speed laser cutting machines and CNC press brakes
            </h1>
            <p className="leading-relaxed mb-8 max-w-xl" style={{ fontSize: "17px", color: "rgba(255,255,255,0.80)" }}>
              KAIMEC offers CNC fiber lasers, CNC press brakes, and CNC Gun & BTA Drilling Machines — backed by US-based engineers and California inventory.
            </p>
            {/* <Link to="/machines">
              <Button size="lg" className="font-bold text-base px-8">
                Explore Machines <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link> */}
            <HeroLeadForm />
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
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#f5f5f5] to-[#e8e8e8]">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-foreground">Laser Cutting Machines</h2>
            <p className="mt-3 text-sm text-black font-bold border-4 rounded-lg shadow-lg font-sans md:text-3xl text-center">Available Table sizes : 5x10ft / 6.5x13ft / 6.5x20ft&nbsp;</p>
            <p className="mt-3 text-sm text-black font-bold border-4 rounded-lg shadow-lg font-sans md:text-3xl text-center">Laser Powers : 3, 6, 12, 20, 50 kW</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredMachines.map((m) => (
              <div key={m.name} className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors shadow-lg">
                <div className="aspect-[4/3] overflow-hidden bg-white flex items-center justify-center">
                  {m.images ? (
                    <div className="relative w-full h-full">
                      {m.images.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`${m.name} ${i + 1}`}
                          loading="lazy"
                          style={{ animation: "spin 8s linear infinite" }}
                          className={`absolute w-3/5 h-3/5 object-contain p-1 ${i === 0 ? "top-0 left-0" : "bottom-0 right-0"}`}
                        />
                      ))}
                    </div>
                  ) : (
                    <img
                      src={m.image!}
                      alt={m.name}
                      loading="lazy"
                      width={800}
                      height={600}
                      style={{ animation: "spin 8s linear infinite" }}
                      className="h-3/4 w-3/4 object-contain p-2"
                    />
                  )}
                </div>
                <div className="p-6 text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary text-center">{m.tag}</span>
                  <h3 className="font-bold text-foreground mt-2 mb-2 text-sm">{m.name}</h3>
                  <Link to={m.link} className="inline-flex items-center text-sm font-semibold text-primary hover:underline">
                    View Details <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Type Fiber Laser Video */}
      <section className="py-16 md:py-20 bg-[#f8f8f8]">
        <div className="container max-w-5xl">
          <div className="text-center mb-10">
            <p className="section-label mb-3 text-3xl">KAIMEC LASER CUTTING MACHINES IN ACTION</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">{"\n"}</h2>
          </div>
          <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/5 bg-black">
            <video
              id="kaimec-action-video"
              src={mekotekVideo.url}
              autoPlay
              muted
              loop
              playsInline
              controls
              aria-label="KAIMEC Laser Cutting Machines in Action"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none" />
          </div>
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Video Chapters</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { time: 0, stamp: "0:00", end: "0:25", title: "Fly Cutting", desc: "High-speed sheet metal cutting" },
                { time: 55, stamp: "0:55", end: null, title: "Finished Result", desc: "Clean, precise cut parts" },
                { time: 70, stamp: "1:10", end: null, title: "Pipe Cutting", desc: "FLP pipe-cutting attachment" },
              ].map((c, i) => (
                <button
                  key={c.time}
                  type="button"
                  onClick={() => {
                    const v = document.getElementById("kaimec-action-video") as HTMLVideoElement | null;
                    if (v) {
                      v.currentTime = c.time;
                      v.play().catch(() => {});
                    }
                  }}
                  className="group relative text-left rounded-xl border border-border bg-white p-5 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground font-bold text-sm shadow-sm">
                      <Play className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="block text-lg font-black text-foreground leading-none">
                        {c.stamp}{c.end ? ` – ${c.end}` : ""}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-primary mt-0.5 block">
                        Chapter {i + 1}
                      </span>
                    </div>
                  </div>
                  <p className="font-bold text-foreground text-[15px] leading-snug mb-1">{c.title}</p>
                  <p className="text-sm text-muted-foreground leading-snug">{c.desc}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-xl" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CNC Press Brakes */}
      <section className="pt-8 md:pt-12 pb-20 md:pb-28 bg-[#f8f8f8]">
        <div className="container">
          <div className="text-center mb-8">
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
                <div className="p-6 text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary text-center">{m.tag}</span>
                  <h3 className="text-xl font-bold text-foreground mt-2 mb-1">{m.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{m.desc}</p>
                  <Link to="/machines/press-brakes" className="inline-flex items-center text-sm font-semibold text-primary hover:underline">
                    View Details <ArrowRight className="ml-1 h-3 w-3" />
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
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="rounded-lg overflow-hidden relative aspect-[4/3] bg-white">
              {facilitySlides.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`KAIMEC machine ${i + 1}`}
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${i === slideIdx ? "opacity-100" : "opacity-0"}`}
                />
              ))}
            </div>
            <div>
              <p className="section-label mb-3">Why KAIMEC</p>
              <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">The machines your shop needs. The support your floor demands.</h2>
              <div className="space-y-4 text-gray-600 mb-6 leading-relaxed">
                <p>Kaimec machines are manufactured in Europe using premium-quality international components and supported by USA-based service personnel. Many low-cost machines focus primarily on initial purchase price, while Kaimec focuses on long-term reliability, precision, safety, productivity, and customer support.</p>

                <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">What advantages does Kaimec offer over low-cost Chinese machines?</h3>

                <p>Kaimec offers free installation, free training, 24/7 online support, premium international components, detailed manuals, spare parts availability, FDA compliance, CE-certified manufacturing, and English-speaking support personnel.</p>
              </div>
              <ul className="space-y-4 mb-8">
                {whyPoints.map((p) => (
                  <li key={p} className="flex gap-3 items-start">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-gray-800">{p}</span>
                  </li>
                ))}
              </ul>
              <Link to="/about">
                <Button variant="outline" className="font-bold border-gray-800/30 text-gray-800 hover:bg-gray-800/10">
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
