import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@/assets/kaimec-logo-nav-v4.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "FAQ", to: "/faq" },
];

const pressBrakesLink = { label: "CNC Press Brakes", to: "/machines/press-brakes" };

const laserCuttingLinks = [
  { label: "Open Type Fiber Laser", to: "/machines/laser-cutting/open-type-fiber-laser" },
  { label: "Closed Type Fiber Laser", to: "/machines/laser-cutting/closed-type-fiber-laser" },
  { label: "Combo lasers (sheet + pipe cutting)", to: "/machines/laser-cutting/covered-pipe-profile-fiber-laser" },
  { label: "Tube/Profile Cutters", to: "/machines/tube-profile-lasers" },
];

const gunDrillLinks = [
  { label: "Gun Drilling Machines", to: "/gun-drills/gun-drilling-machines" },
  { label: "BTA Deep Hole Drilling Machines", to: "/gun-drills/bta-deep-hole-drilling" },
];

const moreLinks = [
  { label: "About Us", to: "/about" },
  { label: "Request for Info", to: "/quote" },
  { label: "eblast 1", to: "/eblast-1" },
  { label: "Dealers", to: "/dealers" },
];


export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [laserOpen, setLaserOpen] = useState(false);
  const [mobileLaserOpen, setMobileLaserOpen] = useState(false);
  const [drillOpen, setDrillOpen] = useState(false);
  const [mobileDrillOpen, setMobileDrillOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="w-full">
        <div className="px-4 md:px-6 py-2 flex items-center justify-between gap-3">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={logoImg}
              alt="KAIMEC Machines"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>

          {/* All nav + actions in one line */}
          <div className="hidden lg:flex items-center justify-end flex-1 gap-4 xl:gap-6">
            <ul className="flex items-center gap-3 xl:gap-5">
              <li>
                <Link
                  to="/"
                  className="inline-flex items-center text-xs font-bold whitespace-nowrap animate-nav-flash"
                >
                  Home
                </Link>
              </li>
              <li
                className="group relative"
                onMouseEnter={() => setLaserOpen(true)}
                onMouseLeave={() => setLaserOpen(false)}
              >
                <button
                  className="flex items-center gap-1 text-xs font-bold whitespace-nowrap animate-nav-flash"

                >
                  Laser Cutting machines
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform ${
                      laserOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {laserOpen && (
                  <div className="absolute top-full left-0 pt-2 w-72 z-50">
                    <div className="rounded-md border border-border bg-card shadow-lg py-1">
                      {laserCuttingLinks.map((sub) => (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
              <li>
                <Link
                  to={pressBrakesLink.to}
                  className="inline-flex items-center text-xs font-bold whitespace-nowrap animate-nav-flash"
                >
                  {pressBrakesLink.label}
                </Link>
              </li>
              <li>
                <Link
                  to="/quotations"
                  className="inline-flex items-center text-xs font-bold whitespace-nowrap animate-nav-flash"
                >
                  Quotations
                </Link>
              </li>
              <li
                className="group relative"
                onMouseEnter={() => setDrillOpen(true)}
                onMouseLeave={() => setDrillOpen(false)}
              >
                <button
                  className="flex items-center gap-1 text-xs font-bold whitespace-nowrap animate-nav-flash"

                >
                  Gun & BTA Drilling Machines
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform ${
                      drillOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {drillOpen && (
                  <div className="absolute top-full left-0 pt-2 w-72 z-50">
                    <div className="rounded-md border border-border bg-card shadow-lg py-1">
                      {gunDrillLinks.map((sub) => (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
              {navLinks.filter((l) => l.to !== "/").map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex items-center text-xs font-bold whitespace-nowrap animate-nav-flash"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="relative">
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className="flex items-center gap-1 text-xs font-bold whitespace-nowrap animate-nav-flash"

                >
                  More
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform ${
                      moreOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {moreOpen && (
                  <div className="absolute top-full right-0 pt-2 w-56 z-50">
                    <div className="rounded-md border border-border bg-card shadow-lg py-1">
                      {moreLinks.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          onClick={() => setMoreOpen(false)}
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            </ul>

            <div className="flex items-center gap-2 xl:gap-3 shrink-0">
              <a
                href="tel:+19495431508"
                className="hidden xl:flex items-center gap-2 text-slate-700 hover:text-primary transition-colors whitespace-nowrap"
              >
                <Phone className="h-4 w-4" />
                <span className="text-xs font-medium">(949) 543-1508</span>
              </a>
              <Link
                to="/consultation"
                className="inline-flex items-center justify-center px-3 py-1.5 border border-primary text-xs font-semibold text-primary hover:bg-primary/5 transition-colors rounded-md whitespace-nowrap"
              >
                Talk to an Expert
              </Link>
              <Link
                to="/quote"
                className="inline-flex items-center justify-center px-3 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold tracking-wide rounded-md shadow-lg shadow-primary/10 transition-all hover:-translate-y-0.5 whitespace-nowrap"
              >
                Request Info
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md ml-auto"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <nav className="container py-4 flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 text-xs font-medium rounded-md ${
                location.pathname === "/"
                  ? "text-primary bg-muted"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              Home
            </Link>
            <div>
              <button
                onClick={() => setMobileLaserOpen(!mobileLaserOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
              >
                Laser Cutting machines
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${mobileLaserOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileLaserOpen && (
                <div className="pl-4">
                  {laserCuttingLinks.map((sub) => (
                    <Link
                      key={sub.to}
                      to={sub.to}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              to={pressBrakesLink.to}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 text-xs font-medium rounded-md ${
                location.pathname === pressBrakesLink.to
                  ? "text-primary bg-muted"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {pressBrakesLink.label}
            </Link>
            <Link
              to="/quotations"
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 text-xs font-medium rounded-md ${
                location.pathname === "/quotations"
                  ? "text-primary bg-muted"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              Quotations
            </Link>
            <div>
              <button
                onClick={() => setMobileDrillOpen(!mobileDrillOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
              >
                Gun & BTA Drilling Machines
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${mobileDrillOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileDrillOpen && (
                <div className="pl-4">
                  {gunDrillLinks.map((sub) => (
                    <Link
                      key={sub.to}
                      to={sub.to}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {navLinks.filter((l) => l.to !== "/").map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 text-xs font-medium rounded-md ${
                  location.pathname === link.to
                    ? "text-primary bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {moreLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 text-xs font-medium rounded-md ${
                  location.pathname === link.to
                    ? "text-primary bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/consultation"
              onClick={() => setMobileOpen(false)}
              className="mt-2 px-3 py-2 text-xs font-bold border-2 border-primary text-primary text-center"
            >
              Talk to an Expert
            </Link>
          </nav>
        </div>
      )}
      </div>
    </header>
  );
}
