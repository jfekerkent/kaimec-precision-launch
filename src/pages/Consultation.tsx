import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import RequestInfoForm from "@/components/RequestInfoForm";
import Seo from "@/components/Seo";
import { Calendar, Wrench, DollarSign, Target } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/jfeker-kentusa/kaimec-consultation";

export default function Consultation() {
  return (
    <Layout>
      <Seo
        title="Book a Consultation | KAIMEC CNC Machine Experts"
        description="Schedule a free 20-minute consult with KAIMEC's CNC fiber laser and press brake experts. Get real answers and a quote built for your shop."
        path="/consultation"
      />
      {/* Section A — Hero */}
      <section className="bg-[#1a1a1a] py-20 md:py-28">
        <div className="container max-w-4xl text-center">
          <p className="section-label mb-3" style={{ color: "#F5A623", fontSize: "13px", letterSpacing: "2.5px" }}>CONSULTATION</p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.05]">
            Talk to a Real Expert. Get Real Answers.
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Our team brings 140+ years of combined fabrication experience. Schedule a 20-minute consult and walk away with a real quote built around your shop.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="font-bold text-base px-8">
                <Calendar className="mr-2 h-4 w-4" /> BOOK A 20-MIN CONSULT
              </Button>
            </a>
            <a href="#contact-form">
              <Button size="lg" variant="outline" className="font-bold text-base px-8 border-primary text-primary bg-transparent hover:bg-primary/10">
                OR SEND A MESSAGE BELOW
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Section B — Kaimec Commitment */}
      <section className="bg-[#F8F9FA] py-12 md:py-16">
        <div className="container max-w-[1100px]">
          <div className="text-center">
            <p className="section-label mb-3" style={{ color: "#F5A623", fontSize: "13px", letterSpacing: "2.5px" }}>OUR COMMITMENT</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] leading-tight text-gray-900 mb-4">
              Built for Real Shops. Not Showrooms.
            </h2>
            <p className="text-[#1a1a1a]/80 max-w-[760px] mx-auto leading-relaxed" style={{ fontSize: "1.1rem" }}>
              Every Kaimec machine is engineered for the floor — precision, consistency, and the throughput that real production demands. Fiber lasers. Press brakes. Panel benders. Tube and profile cutters. Gun & BTA Drilling Machines. Backed by hands-on support from a team that's specified, installed, and stood behind these systems for decades. We pledge straight talk, fair pricing, and machines that earn their place in your shop.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mt-20">
            {[
              { Icon: Wrench, h: "140+ Years on the Floor", b: "Our team has spent decades running, repairing, and selling industrial equipment. You're not talking to a script — you're talking to people who've actually pulled chips and pierced steel." },
              { Icon: DollarSign, h: "Honest Pricing, No Markup Theater", b: "Real quotes built around your shop's actual needs. No bait-and-switch, no padded options, no fake discounts. The number we give you is the number." },
              { Icon: Target, h: "Right-Sized Recommendations", b: "We'll spec the machine you actually need, not the most expensive one we can sell. If 6kW gets the job done, we'll tell you so." },
            ].map(({ Icon, h, b }) => (
              <div key={h} className="bg-white rounded-xl border border-black/5 shadow-sm p-8">
                <Icon className="h-12 w-12 text-primary mb-5" strokeWidth={2} />
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-3 leading-tight">{h}</h3>
                <p className="text-[#1a1a1a]/70 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section C — Form */}
      <section id="contact-form" className="bg-white py-20">
        <div className="container max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] text-center text-gray-900 mb-4">Send a Message</h2>
          <p className="text-muted-foreground text-center mb-10">Only name and email are required. The more you share, the better we can help.</p>

          <RequestInfoForm />
        </div>
      </section>

      {/* Section D — Closing CTA */}
      <section className="bg-[#1a1a1a] py-20">
        <div className="container max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Prefer to Just Call?</h2>
          <p className="text-white/80 text-lg mb-2">
            Phone: <a href="tel:5623502071" className="text-primary font-semibold">562-350-2071</a> — Mon–Fri 9am–5pm Pacific
          </p>
          <p className="text-white/80 text-lg">
            Email: <a href="mailto:sales@kaimec.com" className="text-primary font-semibold">sales@kaimec.com</a>
          </p>
        </div>
      </section>
    </Layout>
  );
}
