import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import TrustSignals from "@/components/shared/TrustSignals";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";

const CALENDLY_URL = "https://calendly.com/jfeker-kentusa/kaimec-consultation";

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.name = "description";
      document.head.appendChild(tag);
    }
    tag.content = description;
  }, [title, description]);
}

const dualSpindleImg =
  "https://img1.wsimg.com/isteam/ip/6f3ce8ef-345e-43cc-8fb2-64ddd3bab953/blob-74a1832.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:800,cg:true";
const insideViewImg =
  "https://img1.wsimg.com/isteam/ip/6f3ce8ef-345e-43cc-8fb2-64ddd3bab953/2-b77dec6.jpg/:/rs=w:800,cg:true,m";
const gunDrillingImg =
  "https://img1.wsimg.com/isteam/ip/6f3ce8ef-345e-43cc-8fb2-64ddd3bab953/GUN%20DRILLING%20.jpg/:/cr=t:0%25,l:14.93%25,w:70.15%25,h:70.15%25/rs=w:800,cg:true,m";
const threePartImg =
  "https://img1.wsimg.com/isteam/ip/6f3ce8ef-345e-43cc-8fb2-64ddd3bab953/3%20PART.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25";

function Card({ src, alt, title, children }: { src: string; alt: string; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-black/5 overflow-hidden shadow-sm flex flex-col">
      <div className="bg-[#f5f5f5] flex items-center justify-center p-6 min-h-[280px]">
        <img src={src} alt={alt} className="max-h-[260px] w-auto object-contain" loading="lazy" />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-[#1a1a1a] mb-3">{title}</h3>
        <div className="text-neutral-700 text-sm leading-relaxed space-y-2">{children}</div>
      </div>
    </div>
  );
}

export default function GunDrillingMachines() {
  usePageMeta(
    "CNC Single and Dual Spindle Gun Drilling Machines | Kaimec",
    "CNC gun drilling machines for deep, straight, high-precision holes — single and dual spindle configurations for automotive, aerospace, oil & gas, and mold making."
  );

  return (
    <Layout>
      <Seo
        title="CNC Gun Drilling Machines | KAIMEC Deep Hole Drills"
        description="KAIMEC CNC gun drilling machines — single and dual spindle configurations for deep, straight, high-precision holes in aerospace, automotive, oil & gas, and mold making."
        path="/gun-drills/gun-drilling-machines"
        type="product"
      />
      {/* Hero */}
      <section className="bg-[#1a1a1a] py-14 md:py-20">
        <div className="container max-w-5xl">
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#F5A623] mb-4">
            Gun Drilling Machines
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
            CNC Single and Dual Spindle Gun Drilling Machines
          </h1>
          <p className="text-base md:text-lg font-medium text-white/90 max-w-[800px] leading-relaxed">
            Gun drilling produces precise holes from 1–50 mm (0.04–2.00 in) and maintains accuracy at high
            depth-to-diameter ratios. Internal coolant delivery with chip evacuation through a tool groove
            keeps cuts clean and accurate.
          </p>
        </div>
      </section>

      {/* Machine cards */}
      <section className="bg-white py-14 md:py-20">
        <div className="container max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card src={dualSpindleImg} alt="Dual spindle gun drilling machine" title="Dual Spindle Gun Drilling Machine">
              <p>Dual spindle configuration</p>
              <p>Drilling diameter range: Ø3.0 – Ø32 mm (0.12 – 1.26 in)</p>
              <p>Drill depth: 1,000 mm (40.0 in)</p>
              <p>Whip guides included</p>
              <p>Max. workpiece length: 1,000 mm (40.0 in)</p>
            </Card>
            <Card src={insideViewImg} alt="Inside view of 2 spindle gun drilling machine" title="Inside View — 2 Spindle Machine">
              <p>
                Capable of simultaneously processing two workpieces — well suited for machining coaxial holes
                on shaft parts.
              </p>
            </Card>
            <Card src={gunDrillingImg} alt="Gun drilling process" title="Gun Drilling Process">
              <p>
                Gun drilling is widely used in automotive, aerospace, oil &amp; gas, and mold making to produce
                deep, straight, high-precision holes in crankshafts, fuel injectors, hydraulic cylinders, and
                molds — wherever tight tolerances and smooth surface finishes are required.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Single spindle section */}
      <section className="bg-[#f5f5f5] py-14 md:py-20">
        <div className="container max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] mb-10 text-center">
            Single Spindle Gun Drilling Machine
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="bg-white rounded-xl border border-black/5 p-6 flex items-center justify-center min-h-[360px]">
              <img src={threePartImg} alt="Single spindle gun drilling machine" className="max-h-[340px] w-auto object-contain" loading="lazy" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">General View &amp; Specs</h3>
              <ul className="space-y-2 text-neutral-700">
                <li><strong>CNC Control:</strong> Fanuc</li>
                <li><strong>Surface Roughness:</strong> Ra 1.6 – 6.3 µm</li>
                <li><strong>Length-to-Diameter Ratio:</strong> 100:1</li>
                <li><strong>Spindle Speed:</strong> 6,000 rpm</li>
                <li><strong>Drilling Diameter Range:</strong> Ø3.0 – Ø30 mm (Ø0.118" – Ø1.181")</li>
                <li><strong>Drilling Depth:</strong> 500 mm (20.0 in)</li>
              </ul>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link to={`/quote?machine=${encodeURIComponent("Gun Drill")}`}>
                  <Button size="lg" className="font-bold tracking-wide bg-[#F5A623] text-[#1a1a1a] hover:bg-[#f4b347] px-6">
                    REQUEST QUOTE →
                  </Button>
                </Link>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="font-bold tracking-wide border-2 border-[#F5A623] text-[#1a1a1a] bg-transparent hover:bg-[#F5A623] px-6">
                    📅 BOOK A CONSULT
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustSignals />

      <section className="py-16 md:py-20 bg-[#F5A623]">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] mb-4">
            Ready to spec your gun drilling solution?
          </h2>
          <p className="text-[#1a1a1a]/90 mb-8 text-lg">
            Tell us your hole diameter, depth, and material — we'll come back with the right machine.
          </p>
          <Link to={`/quote?machine=${encodeURIComponent("Gun Drill")}`}>
            <Button size="lg" className="font-bold tracking-wide bg-[#1a1a1a] text-white hover:bg-[#1a1a1a]/90 px-8">
              REQUEST FOR INFO →
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}