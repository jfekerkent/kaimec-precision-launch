import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import TrustSignals from "@/components/shared/TrustSignals";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";
import btaHeroMachine from "@/assets/bta-hero-machine.png.asset.json";

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

const heroMachineImg = btaHeroMachine.url;
const btaHeadsImg =
  "https://img1.wsimg.com/isteam/ip/6f3ce8ef-345e-43cc-8fb2-64ddd3bab953/BTA%20HEADS.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:800,cg:true";
const btaSchematicImg =
  "https://img1.wsimg.com/isteam/ip/6f3ce8ef-345e-43cc-8fb2-64ddd3bab953/BTA%20DRILLING%20.jpg/:/cr=t:0.03%25,l:0%25,w:100%25,h:99.95%25/rs=w:800,cg:true";
const tsk2150Img =
  "https://img1.wsimg.com/isteam/ip/6f3ce8ef-345e-43cc-8fb2-64ddd3bab953/3-8319d91.jpg/:/rs=w:800,cg:true,m";

const tskSpecs = [
  { label: "Drilling Diameter", value: "Ø30 – Ø150 mm" },
  { label: "Boring Diameter", value: "Ø40 – Ø500 mm" },
  { label: "Max. Processing Depth", value: "3,000 mm" },
  { label: "Workpiece OD Range", value: "Ø100 – Ø700 mm" },
  { label: "Spindle Speed", value: "4 – 440 RPM" },
  { label: "Spindle Motor", value: "30 kW" },
  { label: "Max. Output Torque", value: "9,120 Nm" },
  { label: "Machine Weight", value: "~39 Tons" },
];

export default function BtaDeepHoleDrilling() {
  usePageMeta(
    "BTA Deep Hole Drilling Machines | Kaimec",
    "BTA deep hole drilling machines for solid drilling, trepanning, rough/fine boring, and burnishing — including the heavy-duty TSK 2150 x 3000 platform."
  );

  return (
    <Layout>
      <Seo
        title="BTA Deep Hole Drilling Machines | KAIMEC TSK 2150"
        description="KAIMEC BTA deep hole drilling machines for solid drilling, trepanning, boring and burnishing — including the TSK 2150 × 3000 platform."
        path="/gun-drills/bta-deep-hole-drilling"
        type="product"
      />
      {/* Hero */}
      <section className="bg-[#1a1a1a] py-14 md:py-20">
        <div className="container max-w-5xl">
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#F5A623] mb-4">
            BTA Deep Hole Drilling
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
            BTA Deep Hole Drilling Machines
          </h1>
          <p className="text-base md:text-lg font-medium text-white/90 max-w-[800px] leading-relaxed">
            Solid drilling, trepanning, rough boring (Ra 6.3 – 12.5) and fine boring (Ra 3.2 – 6.3) — one
            platform, multiple deep-hole machining methods.
          </p>
        </div>
      </section>

      {/* Overview with image */}
      <section className="bg-white py-14 md:py-20">
        <div className="container max-w-7xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="bg-[#f5f5f5] rounded-xl border border-black/5 p-6 flex items-center justify-center min-h-[400px]">
              <img src={heroMachineImg} alt="BTA deep hole drilling machine" className="max-h-[380px] w-auto object-contain" loading="lazy" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-[#1a1a1a] mb-4">
                One Machine, Every Deep-Hole Method
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                BTA (Boring and Trepanning Association) machines handle solid drilling, trepanning, and rough or
                fine boring with consistent precision. Swap tooling to switch processes without changing the
                machine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BTA Heads */}
      <section className="bg-[#f5f5f5] py-14 md:py-20">
        <div className="container max-w-7xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-[#1a1a1a] mb-4">BTA Drill Heads &amp; Tooling</h2>
              <ul className="space-y-3 text-neutral-700 leading-relaxed">
                <li>
                  <strong>BTA drill heads</strong> — high-efficiency deep hole drilling with internal coolant
                  delivery and chip evacuation through the tube, producing straight, accurate holes with
                  excellent surface finish.
                </li>
                <li>
                  <strong>Rough boring heads</strong> — fast bulk material removal after drilling.
                </li>
                <li>
                  <strong>Fine boring heads</strong> — precision adjustments for tight tolerances and improved
                  surface quality.
                </li>
                <li>
                  <strong>Trepanning heads</strong> — cut annular grooves leaving a solid core, reducing
                  material waste and cutting force for large-diameter holes.
                </li>
                <li>
                  <strong>Burnishing heads</strong> — final surface finishing by plastically deforming the
                  surface with rollers, delivering a mirror-like finish, improved hardness and fatigue
                  resistance, and better dimensional accuracy.
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-black/5 p-6 flex items-center justify-center min-h-[400px]">
              <img src={btaHeadsImg} alt="BTA drill heads" className="max-h-[380px] w-auto object-contain" loading="lazy" />
            </div>
          </div>
          <div className="mt-12 bg-white rounded-xl border border-black/5 p-6 flex flex-col items-center">
            <img src={btaSchematicImg} alt="Schematic of BTA drilling" className="max-h-[420px] w-auto object-contain" loading="lazy" />
            <p className="mt-4 text-sm uppercase tracking-wide font-bold text-neutral-500">
              Schematic of BTA Drilling
            </p>
          </div>
        </div>
      </section>

      {/* TSK 2150 */}
      <section className="bg-white py-14 md:py-20">
        <div className="container max-w-7xl">
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#F5A623] mb-3">
            Featured Machine
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] mb-10">
            Model: TSK 2150 × 3000
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="bg-[#f5f5f5] rounded-xl border border-black/5 p-6 flex items-center justify-center min-h-[420px]">
              <img src={tsk2150Img} alt="TSK 2150 x 3000 deep hole drilling and boring machine" className="max-h-[400px] w-auto object-contain" loading="lazy" />
            </div>
            <div>
              <p className="text-neutral-700 leading-relaxed mb-4">
                The TSK 2150 × 3000 mm is a heavy-duty deep hole drilling and boring machine purpose-built for
                processing cylindrical workpieces that require deep internal holes with high precision and
                consistent surface quality. The rigid machine bed delivers long-term accuracy retention even in
                demanding production environments.
              </p>
              <p className="text-neutral-700 leading-relaxed mb-6">
                Two sets of adjustable roller center rests and V-shaped workpiece carriers handle large-diameter
                workpieces. A wide-range spindle speed, AC servo-driven feed system, and servo-tightening oil
                pressure head adapt the machine to every major deep hole machining method — simply by changing
                the cutting tool.
              </p>
              <ul className="border-t border-black/10">
                {tskSpecs.map((s) => (
                  <li key={s.label} className="flex justify-between gap-4 py-3 border-b border-black/10 text-sm md:text-[15px]">
                    <span className="font-bold text-[#1a1a1a]">{s.label}</span>
                    <span className="text-neutral-700 text-right">{s.value}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link to={`/quote?machine=${encodeURIComponent("Gun Drill")}`}>
                  <Button size="lg" className="font-bold tracking-wide bg-[#F5A623] text-[#1a1a1a] hover:bg-[#f4b347] px-6">
                    REQUEST TSK QUOTE →
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
            Need a BTA solution for your shop?
          </h2>
          <p className="text-[#1a1a1a]/90 mb-8 text-lg">
            Send us your part drawing and target tolerances — we'll spec the right machine and tooling.
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