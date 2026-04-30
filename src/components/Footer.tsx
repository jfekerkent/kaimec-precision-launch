import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from "lucide-react";
import logoImg from "@/assets/kaimec-logo-dark.png";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary text-secondary-foreground">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img
                src={logoImg}
                alt="KAIMEC Machines"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Leading manufacturer of high-precision fiber laser cutting machines, press brakes, and panel benders for modern industrial fabrication.
            </p>
            <div className="flex gap-3 mt-5">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[{ label: "Home", to: "/" }, { label: "About Us", to: "/about" }, { label: "Request a Quote", to: "/quote" }].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Machines */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-foreground mb-4">Our Machines</h4>
            <ul className="space-y-2">
              {[
                { label: "CNC Fiber Lasers", to: "/machines/cnc-fiber-lasers" },
                { label: "Tube & Profile Lasers", to: "/machines/tube-profile-lasers" },
                { label: "Press Brakes", to: "/machines/press-brakes" },
                { label: "Panel Benders", to: "/machines/panel-benders" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-foreground mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                1231 Edinger Ave, Tustin, CA
              </li>
              <li>
                <a href="tel:7142588526" className="flex gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  (714) 258-8526
                </a>
              </li>
              <li>
                <a href="mailto:sales@kaimec.com" className="flex gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  sales@kaimec.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">© 2026 KAIMEC Machines. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
