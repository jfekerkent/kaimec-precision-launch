import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import TalkToExpertBanner from "@/components/TalkToExpertBanner";
import HeroLeadForm from "@/components/HeroLeadForm";
import Seo from "@/components/Seo";
import MobileHero from "@/components/MobileHero";
import { useIsMobile } from "@/hooks/use-mobile";
import kflc1530Img from "@/assets/machine-kflc-1530.png";
import kfloPrimaryImg from "@/assets/machine-kflo-primary.png";
import flp6035Img from "@/assets/machine-flp-6035-home.png";
import mkt1560Img from "@/assets/machine-mkt-1560.png";
import mkt32135Img from "@/assets/machine-mkt-32135.png";
import comboOnly1 from "@/assets/combo-only-1.jpg";
import comboOnly2 from "@/assets/combo-only-2.png";
import heroVideoSrc from "@/assets/hero-laser-cutting.mp4";
import heroVideoWebm from "@/assets/hero-laser-cutting.webm";


const facilitySlides = [
  new URL("../assets/slide-v2-flo-1530.png", import.meta.url).href,
  new URL("../assets/slide-v2-flc-1530.jpg", import.meta.url).href,
  new URL("../assets/slide-v2-flo-2060.jpg", import.meta.url).href,
  new URL("../assets/slide-v2-flc-p-1530.jpg", import.meta.url).href,
  new URL("../assets/slide-v2-mkt-1560.jpg", import.meta.url).href,
  new URL("../assets/slide-v2-mkt-32135.jpg", import.meta.url).href,
  new URL("../assets/slide-v2-flo-p-2040-1.png", import.meta.url).href,
  new URL("../assets/slide-v2-flo-p-2040-2.png", import.meta.url).href,
  new URL("../assets/slide-v2-flc-1530-4.png", import.meta.url).href,
];

const featuredMachines = [
  {
    tag: "CNC FIBER LASERS",
    name: "FLO-1530, FLO-2040, FLO 2060 models",
    image: kfloPrimaryImg,
    images: null,
    link: "/machines/laser-cutting/open-type-fiber-laser",
  },
  {
    tag: "Fully Enclosed Lasers",
    name: "FLC-1530, FLC 2040, FLC2060 models",
    image: kflc1530Img,
    images: null,
    link: "/machines/laser-cutting/closed-type-fiber-laser",
  },
  {
    tag: "Combo Lasers (open and enclosed types)",
    name: "FLO-P ( open, single table) / FLC-P (fully enclosed/2 tables)",
    image: null,
    images: [comboOnly1, comboOnly2],
    link: "/machines/laser-cutting/covered-pipe-profile-fiber-laser",
  },
  {
    tag: "Tube / Profile Cutting Lasers",
    name: "FLP 6035",
    image: flp6035Img,
    images: null,
    link: "/machines/tube-profile-lasers",
  },
];

const stats = [
  { value: "50+", label: "Years Combined Experience" },
  { value: "750+", label: "Machines Installed" },
  { value: "24/7 U.S.-Based", label: "Support & Parts Team" },
];

const whyPoints = [
  "Precision machines — In stock in CA",
  "Factory-direct pricing, no middleman markup",
  "In-house engineering support from our Tustin, CA team",
  "U.S. parts inventory — same-day support when your floor needs it",
];

export default function Index() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    video.controls = false;
    video.muted = true;
    video.play().catch(() => undefined);
  }, [isMobile]);

  // FIX 3: slowed from 1000ms to 3500ms
  useEffect(() => {
    const id = setInterval(() => {
      setSlideIdx((i) => (i + 1) % facilitySlides.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <Layout>
      <Seo
        title="Kaimec Fabrication — Fiber Lasers & CNC Machines"
        description="Kaimec Fabrication: fiber lasers, CNC press brakes & deep-hole drilling machines. Factory-direct with US engineering and parts support from Tustin, CA."
        path="/"
      />

      {isMobile ? (
        <MobileHero />
      ) : (
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0b0b0c] via-[#141416] to-[#1c1c1f] md:bg-none">
        <div className="absolute inset-0 overflow-hidden">
          {/* Tablet/Desktop: autoplay video */}
          <video
            ref={heroVideoRef}
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden="true"
            tabIndex={-1}
            preload="metadata"
            poster="/hero-laser-cutting-poster.jpg"
            className="hero-background-video"
            onContextMenu={(event) => event.preventDefault()}
            onLoadedMetadata={(event) => {
              event.currentTarget.controls = false;
              event.currentTarget.play().catch(() => undefined);
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 30%",
              pointerEvents: "none",
              border: 0,
              zIndex: 0,
            }}
          >
            <source src={heroVideoWebm} type="video/webm" />
            <source src={heroVideoSrc} type="video/mp4" />
          </video>
          {/* Left-to-right overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.05) 100%)",
              zIndex: 1,
            }}
          />
          {/* FIX 2: bottom fade so hero blends into the page instead of hard-cutting */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.55) 100%)",
              zIndex: 1,
            }}
          />
        </div>
        <div className="container relative z-10 py-16 md:py-40">
          <div className="max-w-2xl">
            <p
              className="section-label mb-4"
              style={{ fontSize: "13px", letterSpacing: "2.5px", color: "rgba(255,255,255,0.85)" }}
            >
              Precision Fabrication Machines... From Factory-Direct to Your Floor.
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl leading-[1.1] mb-6 text-balance lg:text-5xl font-bold text-[#f6f5ef] break-words">
              European high-speed laser cutting machines and CNC press brakes
            </h1>
            <p className="leading-relaxed mb-8 max-w-xl" style={{ fontSize: "17px", color: "rgba(255,255,255,0.80)" }}>
              KAIMEC offers CNC fiber lasers, CNC press brakes, and CNC Gun & BTA Drilling Machines — backed by US-based
              engineers and California inventory.
            </p>
            <HeroLeadForm />
          </div>
        </div>
      </section>
      )}

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

      {/* About Kaimec — branded SEO block */}
      <section className="bg-white py-12 md:py-16 border-b border-border">
        <div className="container max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            About KAIMEC
          </h2>
          <ul className="text-base md:text-lg text-foreground/80 leading-relaxed text-left space-y-3 list-disc pl-6">
            <li>
              <strong>Factory-Direct CNC Solutions:</strong> CNC fiber laser cutting
              machines, CNC press brakes, and deep-hole drilling systems.
            </li>
            <li>
              <strong>U.S. Headquarters &amp; Support:</strong> Based in Tustin,
              California, providing sales, service, parts, and engineering support.
            </li>
            <li>
              <strong>Advanced Fiber Laser Technology:</strong> High-performance FLO
              open-type and FLC enclosed fiber laser cutting systems.
            </li>
            <li>
              <strong>European-Quality Performance:</strong> Precision-engineered for
              reliability, productivity, and accuracy.
            </li>
            <li>
              <strong>Complete Customer Support:</strong> Applications assistance,
              installation, training, technical support, and spare parts coverage.
            </li>
            <li>
              <strong>Serving North America:</strong> Supporting manufacturers across
              the United States, Canada, and Mexico.
            </li>
          </ul>
        </div>
      </section>

      {/* Featured Machines */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="flex justify-center px-0">
          <div className="w-full max-w-6xl px-4 md:px-6">
            <div className="text-center mb-14">
              <div className="relative flex items-center justify-center gap-3 overflow-hidden">
                <span
                  aria-hidden
                  className="hidden sm:flex flex-1 items-center justify-end gap-2 animate-laser-left origin-right"
                >
                  <span className="flex-1 h-1 rounded-full animate-laser-dot" />
                  <span className="block h-4 w-4 rounded-full animate-laser-dot shadow-[0_0_20px_6px_currentColor]" />
                </span>
                <h2 className="text-2xl md:text-3xl font-bold animate-flash text-center text-gray-900 mb-4">
                  Laser Cutting Machines
                </h2>
                <span
                  aria-hidden
                  className="hidden sm:flex flex-1 items-center justify-start gap-2 animate-laser-right origin-left"
                >
                  <span className="block h-4 w-4 rounded-full animate-laser-dot shadow-[0_0_20px_6px_currentColor]" />
                  <span className="flex-1 h-1 rounded-full animate-laser-dot" />
                </span>
              </div>
              <p className="mt-3 text-sm sm:text-base md:text-3xl text-black font-bold border-2 md:border-4 rounded-lg shadow-lg font-sans text-center px-2 py-1">
                Available Table sizes : 5x10ft / 6.5x13ft / 6.5x20ft&nbsp;
              </p>
              <p className="mt-3 text-sm sm:text-base md:text-3xl text-black font-bold border-2 md:border-4 rounded-lg shadow-lg font-sans text-center px-2 py-1">
                Laser Powers : 3, 6, 12, 20, 50 kW
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredMachines.map((m) => (
                <div
                  key={m.name}
                  className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors shadow-lg"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-white flex items-center justify-center">
                    {m.images ? (
                      <div className="relative w-full h-full">
                        {m.images.map((src, i) => (
                          <img
                            key={i}
                            src={src}
                            alt={`${m.name} ${i + 1}`}
                            loading="lazy"
                            // FIX 1: removed spin animation
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
                        // FIX 1: removed spin animation, replaced with subtle hover scale
                        className="h-3/4 w-3/4 object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="p-6 text-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary text-center">{m.tag}</span>
                    <h3 className="font-bold text-foreground mt-2 mb-2 text-sm">{m.name}</h3>
                    <Link
                      to={m.link}
                      className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
                    >
                      View Details <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kaimec Machines in Action Video */}
      {/* CNC Press Brakes */}
      <section className="pt-8 md:pt-12 pb-20 md:pb-28 bg-[#f8f8f8]">
        <div className="container">
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <h2 className="text-2xl md:text-3xl font-bold inline-block text-gray-900 mb-4">
                CNC Press Brakes
              </h2>
              <div
                aria-hidden
                className="relative mt-2 mx-auto w-[110%] h-2 flex items-stretch"
              >
                <div className="w-1/2 h-full bg-gradient-to-r from-slate-400 via-slate-200 to-slate-100 rounded-l-sm shadow-sm" />
                <div className="w-1/2 h-full bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 rounded-r-sm shadow-sm origin-left animate-sheet-bend motion-reduce:animate-none" />
                <span className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[2px] bg-slate-700" />
                <span
                  aria-hidden
                  className="absolute left-1/2 -translate-x-1/2 -top-1 h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_10px_3px_#fbbf24] animate-bend-spark motion-reduce:hidden"
                />
              </div>
            </div>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              High-precision CNC press brakes engineered for accurate, repeatable bending across a wide range of sheet
              sizes and tonnages.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            {[
              { tag: "CNC Press Brake", name: "MKT 1560", desc: "5 ft / 60 ton capacity", image: mkt1560Img },
              { tag: "CNC Press Brake", name: "MKT 32135", desc: "12 ft x 135ton capacity", image: mkt32135Img },
            ].map((m) => (
              <div
                key={m.name}
                className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors"
              >
                <div className="aspect-[4/3] overflow-hidden bg-white flex items-center justify-center">
                  <img
                    src={m.image}
                    alt={m.name}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="h-full w-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary text-center">{m.tag}</span>
                  <h3 className="text-xl font-bold text-foreground mt-2 mb-1">{m.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{m.desc}</p>
                  <Link
                    to="/machines/press-brakes"
                    className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
                  >
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
              {facilitySlides.map((src, i) => {
                const nextIdx = (slideIdx + 1) % facilitySlides.length;
                if (i !== slideIdx && i !== nextIdx) return null;
                return (
                  <img
                    key={i}
                    src={src}
                    alt={`KAIMEC machine ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ${
                      i === slideIdx ? "opacity-100" : "opacity-0"
                    }`}
                  />
                );
              })}
            </div>
            <div>
              <p className="section-label mb-3">Why KAIMEC</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                The machines your shop needs. The support your floor demands.
              </h2>
              <div className="space-y-4 text-gray-600 mb-6 leading-relaxed">
                <p>
                  Kaimec machines are manufactured in Europe using premium-quality international components and
                  supported by USA-based service personnel. Many low-cost machines focus primarily on initial purchase
                  price, while Kaimec focuses on long-term reliability, precision, safety, productivity, and customer
                  support.
                </p>
                <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">
                  What advantages does Kaimec offer over low-cost Chinese machines?
                </h3>
                <p>
                  Kaimec offers free installation, free training, 24/7 online support, premium international components,
                  detailed manuals, spare parts availability, FDA compliance, CE-certified manufacturing, and
                  English-speaking support personnel.
                </p>
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
      <section className="w-full py-16 md:py-24 bg-gray-900">
        <div className="flex justify-center px-0">
          <div className="w-full max-w-6xl px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              Contact us for a quote or consultation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/quotations" className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                Get Quote
              </a>
              <a href="/contact" className="px-8 py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
