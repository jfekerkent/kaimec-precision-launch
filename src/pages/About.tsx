import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Target, Lightbulb, Headphones, CheckCircle, MapPin, Phone, Mail } from "lucide-react";
import Layout from "@/components/Layout";

const values = [
  { icon: Target, title: "Our Mission", desc: "To provide US manufacturers with advanced fabrication machinery that's typically unavailable through standard distribution channels, backed by expert support." },
  { icon: Lightbulb, title: "Our Expertise", desc: "With 50+ years of combined industry experience, our team understands the demands of modern sheet metal fabrication and CNC machining." },
  { icon: Headphones, title: "Our Support", desc: "From initial consultation through installation and ongoing maintenance, our US-based service team is with you every step of the way." },
];

const reasons = [
  "Specialized machines not found at standard distributors",
  "Factory-direct pricing — no middleman markup",
  "In-house engineering and applications support",
  "US-based installation and service teams",
  "2-year standard warranty on all machines",
  "Over 500 machines successfully installed",
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container max-w-3xl text-center">
          <p className="section-label mb-3">About Us</p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-6">About KAIMEC Machines</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            KAIMEC is a specialized division offering advanced CNC fabrication machinery beyond standard catalogs. Backed by 50+ years of combined industry experience, we connect US manufacturers with precision equipment that delivers real production advantages.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-lg border border-border bg-card p-8">
                <v.icon className="h-10 w-10 text-primary mb-5" />
                <h3 className="text-xl font-bold text-foreground mb-3">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary">
        <div className="container max-w-2xl">
          <h2 className="text-3xl font-black text-foreground text-center mb-10">Why Choose KAIMEC?</h2>
          <ul className="space-y-4">
            {reasons.map((r) => (
              <li key={r} className="flex gap-3 items-start">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact Block */}
      <section className="py-20">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl font-black text-foreground mb-8">Get in Touch</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-8 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> 1231 Edinger Ave, Tustin, CA</div>
            <a href="tel:7142588526" className="flex items-center gap-2 hover:text-primary transition-colors"><Phone className="h-4 w-4 text-primary" /> (714) 258-8526</a>
            <a href="mailto:sales@kaimec.com" className="flex items-center gap-2 hover:text-primary transition-colors"><Mail className="h-4 w-4 text-primary" /> sales@kaimec.com</a>
          </div>
          <Link to="/quote">
            <Button className="font-bold px-8">Request a Quote</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
