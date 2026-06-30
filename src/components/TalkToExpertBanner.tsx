import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import machineImg from "@/assets/machine-kflo-primary.png";

export default function TalkToExpertBanner() {
  return (
    <section className="bg-[#1a1a1a] py-12 md:py-16">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div>
            <p className="section-label mb-3" style={{ color: "#F5A623", fontSize: "13px", letterSpacing: "2.5px" }}>{"\n"}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-[1.05] mb-4">
              TALK TO AN&nbsp; EXPERT
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-lg leading-relaxed">
              50+ years of combined fabrication expertise. Real specs, real pricing, no fluff.
            </p>
            <Link to="/consultation">
              <Button size="lg" className="font-bold text-base px-8">
                SEND A MESSAGE <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="order-first md:order-last">
            <img src={machineImg} alt="Kaimec fiber laser" loading="lazy" className="w-full h-auto object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}
