import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@/assets/kaimec-logo-nav.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "CNC Press Brakes", to: "/machines/press-brakes" },
  { label: "Gun Drills", to: "/gun-drills" },
  { label: "FAQ", to: "/faq" },
];

const laserCuttingLinks = [
  { label: "Open Type Fiber Laser", to: "/machines/laser-cutting/open-type-fiber-laser" },
  { label: "Closed Type Fiber Laser", to: "/machines/laser-cutting/closed-type-fiber-laser" },
  { label: "Combo lasers (sheet + pipe cutting)", to: "/machines/laser-cutting/covered-pipe-profile-fiber-laser" },
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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-white shadow-sm">
      <div className="container flex h-24 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0 mr-2">
          <img
            src={logoImg}
            alt="KAIMEC Machines"
            className="h-14 sm:h-16 md:h-[72px] w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link
            to="/"
            className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
              location.pathname === "/"
                ? "text-primary"
                : "text-[#1A1A1A] hover:text-primary"
            }`}
          >
            Home
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setLaserOpen(true)}
            onMouseLeave={() => setLaserOpen(false)}
          >
            <button
              className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                location.pathname.startsWith("/machines/laser-cutting/")
                  ? "text-primary"
                  : "text-[#1A1A1A] hover:text-primary"
              }`}
            >
              Laser Cutting <ChevronDown className="h-3 w-3" />
            </button>
            {laserOpen && (
              <div className="absolute top-full left-0 mt-1 w-72 rounded-md border border-border bg-card shadow-lg py-1 z-50">
                {laserCuttingLinks.map((sub) => (
                  <Link
                    key={sub.to}
                    to={sub.to}
                    className="block px-4 py-2 text-sm text-[#1A1A1A] bg-white hover:bg-[#F4F5F7] hover:text-primary transition-colors"
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
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                location.pathname === link.to
                  ? "text-primary"
                  : "text-[#1A1A1A] hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#1A1A1A] hover:text-primary transition-colors rounded-md"
            >
              More <ChevronDown className="h-3 w-3" />
            </button>
            {moreOpen && (
              <div className="absolute top-full right-0 mt-1 w-48 rounded-md border border-border bg-card shadow-lg py-1">
                {moreLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMoreOpen(false)}
                    className="block px-4 py-2 text-sm text-[#1A1A1A] bg-white hover:bg-[#F4F5F7] hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/consultation"
            className="ml-2 px-3 py-2 text-sm font-bold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Talk to an Expert
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a
            href="tel:7142588526"
            className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="h-4 w-4" />
            (714) 258-8526
          </a>
          <Link to="/quote">
            <Button className="font-bold">Request for Info</Button>
          </Link>
          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background">
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
                Laser Cutting
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
    </header>
  );
}
