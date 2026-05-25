import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@/assets/kaimec-logo-nav.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "CNC Press Brakes", to: "/machines/press-brakes" },
  { label: "Gun & BTA Drilling Machines", to: "/gun-drills" },
  { label: "FAQ", to: "/faq" },
];

const laserCuttingLinks = [
  { label: "Open Type Fiber Laser", to: "/machines/laser-cutting/open-type-fiber-laser" },
  { label: "Closed Type Fiber Laser", to: "/machines/laser-cutting/closed-type-fiber-laser" },
  { label: "Combo lasers (sheet + pipe cutting)", to: "/machines/laser-cutting/covered-pipe-profile-fiber-laser" },
  { label: "Tube/Profile Cutters", to: "/machines/tube-profile-lasers" },
];

const moreLinks = [
  { label: "About Us", to: "/about" },
  { label: "Request for Info", to: "/quote" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [laserOpen, setLaserOpen] = useState(false);
  const [mobileLaserOpen, setMobileLaserOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-3 left-0 right-0 z-50 px-3">
      <div className="container max-w-7xl mx-auto bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="px-4 md:px-6 py-3 flex items-center justify-between gap-4">
          {/* Logo + primary nav */}
          <div className="flex items-center gap-8 min-w-0">
            <Link to="/" className="flex items-center shrink-0">
              <img
                src={logoImg}
                alt="KAIMEC Machines"
                className="h-12 md:h-14 w-auto object-contain"
              />
            </Link>

            <ul className="hidden lg:flex items-center gap-8">
              <li>
                <Link
                  to="/"
                  className={`text-sm font-semibold transition-colors ${
                    location.pathname === "/"
                      ? "text-primary"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
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
                  className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                    location.pathname.startsWith("/machines/laser-cutting/")
                      ? "text-primary"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
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
              {navLinks.filter((l) => l.to !== "/").map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`text-sm font-medium transition-colors whitespace-nowrap ${
                      location.pathname === link.to
                        ? "text-primary"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="relative">
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  More
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform ${
                      moreOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {moreOpen && (
                  <div className="absolute top-full right-0 pt-2 w-48 z-50">
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
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-5">
            <Link
              to="/consultation"
              className="hidden xl:inline-flex items-center justify-center px-4 py-2 border border-primary text-sm font-semibold text-primary hover:bg-primary/5 transition-colors rounded-md"
            >
              Talk to an Expert
            </Link>
            <a
              href="tel:5623502071"
              className="hidden md:flex items-center gap-2 text-slate-700 hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">(562) 350-2071</span>
            </a>
            <Link
              to="/quote"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold tracking-wide rounded-md shadow-lg shadow-primary/10 transition-all hover:-translate-y-0.5"
            >
              Request for Info
            </Link>
            <button
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white rounded-b-xl">
          <nav className="container py-4 flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 text-sm font-medium rounded-md ${
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
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
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
            {navLinks.filter((l) => l.to !== "/").map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 text-sm font-medium rounded-md ${
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
                className={`px-3 py-2 text-sm font-medium rounded-md ${
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
              className="mt-2 px-3 py-2 text-sm font-bold border-2 border-primary text-primary text-center"
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
