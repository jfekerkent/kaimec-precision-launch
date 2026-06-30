import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { MapPin, Phone, Smartphone, Globe, User } from "lucide-react";
import etgiLogo from "@/assets/etgi-logo.png";
import dhmLogo from "@/assets/dhm-logo.png";

export default function Dealers() {
  return (
    <Layout>
      <Seo
        title="Authorized KAIMEC Dealers | North America Network"
        description="Find an authorized KAIMEC dealer for CNC fiber laser cutters and press brakes across the US and Canada."
        path="/dealers"
      />
      {/* Header */}
      <section className="relative overflow-hidden bg-background py-24 md:py-32">
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
          aria-hidden="true"
        >
          <span className="text-[18vw] font-black tracking-tighter text-foreground/[0.05] leading-none">
            DEALERS
          </span>
        </div>
        <div className="container relative">
          <p className="section-label mb-3">Authorized Dealers</p>
          <h1 className="text-5xl md:text-7xl font-black uppercase text-foreground tracking-tight">
            Dealers
          </h1>
        </div>
      </section>

      {/* Dealers list */}
      <section className="py-20 md:py-28 bg-card">
        <div className="container">
          <p className="section-label mb-3">Our Network</p>
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-gray-900 mb-4">
            Authorized Dealers
          </h2>

          <div className="grid gap-8 md:grid-cols-2 items-start">
            <article className="rounded-lg border border-border bg-background p-8 shadow-sm">
              <p className="section-label mb-3">Canada</p>
              <div className="mb-6 flex items-center justify-center rounded-md bg-black p-6 h-40">
                <img
                  src={etgiLogo}
                  alt="Executive Technologies Group Inc. (ETGI) logo"
                  className="h-full w-auto max-w-[200px] object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-black uppercase text-foreground tracking-tight mb-2">
                Executive Technologies Group Inc.
              </h3>
              <p className="text-sm font-semibold text-primary mb-6">
                Authorized KAIMEC Dealer — Canada
              </p>

              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <User className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  <span>
                    <span className="font-semibold text-foreground">Marco Franchitto</span> — President
                  </span>
                </li>
                <li className="flex gap-3">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  <span>
                    7-1455 Britannia Rd E.<br />
                    Mississauga, Ontario L4W 1C7<br />
                    Canada
                  </span>
                </li>
                <li>
                  <a href="tel:+12892123844" className="flex gap-3 hover:text-primary transition-colors">
                    <Phone className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                    <span>Office: 289-212-ETGI (3844)</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+14169517800" className="flex gap-3 hover:text-primary transition-colors">
                    <Smartphone className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                    <span>Mobile: 416-951-7800</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.etgi.ca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-3 hover:text-primary transition-colors"
                  >
                    <Globe className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                    <span>www.etgi.ca</span>
                  </a>
                </li>
              </ul>
            </article>

            <article className="rounded-lg border border-border bg-background p-8 shadow-sm">
              <p className="section-label mb-3">Mexico</p>
              <div className="mb-6 flex items-center justify-center rounded-md bg-secondary p-6 h-40">
                <img
                  src={dhmLogo}
                  alt="DHM Tools logo"
                  className="h-full w-auto max-w-[200px] object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-black uppercase text-foreground tracking-tight mb-2">
                DHM Tools
              </h3>
              <p className="text-sm font-semibold text-primary mb-6">
                Authorized KAIMEC Dealer — Mexico
              </p>

              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <User className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  <span>
                    <span className="font-semibold text-foreground">Luis Dominguez</span> — Director General
                  </span>
                </li>
                <li className="flex gap-3">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  <span>
                    Av. Nicolas Gogol #11342 Bodega 34<br />
                    Compleja Industrial Chihuahua<br />
                    C.P 31136, Chihuahua, Mexico
                  </span>
                </li>
                <li>
                  <a href="tel:+526142054617" className="flex gap-3 hover:text-primary transition-colors">
                    <Phone className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                    <span>Tel: 614 205 4617</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.dhmtools.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-3 hover:text-primary transition-colors"
                  >
                    <Globe className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                    <span>www.dhmtools.com</span>
                  </a>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </Layout>
  );
}