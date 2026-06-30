import { Wrench, Truck, DollarSign, Shield, LucideIcon } from "lucide-react";

type Card = { icon: LucideIcon; title: string; body: string };

const CARDS: Card[] = [
  {
    icon: Wrench,
    title: "Custom Machinery Design",
    body: "Need something not in the catalog? Our engineering team designs custom solutions built around your exact application.",
  },
  {
    icon: Truck,
    title: "Fast & Reliable Shipping",
    body: "Your machine arrives on time and in working condition. We handle logistics across the U.S. and internationally.",
  },
  {
    icon: DollarSign,
    title: "Competitive Pricing",
    body: "Fair pricing on every machine. No padded options, no fake discounts, no markup theater.",
  },
  {
    icon: Shield,
    title: "Satisfaction Guaranteed",
    body: "We stand behind every machine we sell. Not satisfied? Contact us — we make it right.",
  },
];

export default function TrustSignals({ bg = "white" }: { bg?: "white" | "light" }) {
  const bgClass = bg === "light" ? "bg-[#f5f5f5]" : "bg-white";
  return (
    <section className={`${bgClass} py-12 md:py-16`}>
      <div className="container max-w-7xl">
        <div className="text-center mb-10 md:mb-12">
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#F5A623] mb-3">
            Why Kaimec
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Built to Last. Backed by Real Support.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {CARDS.map((c) => (
            <div
              key={c.title}
              className="flex flex-col items-start gap-4 bg-white rounded-xl border border-black/10 shadow-sm p-6 md:p-7 h-full"
            >
              <c.icon className="text-[#F5A623]" size={44} strokeWidth={1.75} />
              <h3 className="text-lg font-bold text-[#1a1a1a]">{c.title}</h3>
              <p className="text-sm md:text-[15px] text-neutral-600 leading-relaxed">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}