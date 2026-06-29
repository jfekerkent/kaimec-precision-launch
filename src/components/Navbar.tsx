import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import logoImg from "@/assets/kaimec-logo-nav-v4.png";

const logoOval = logoImg;

const fiberLaserItems = [
  { label: "Cutting / Closed-Type Fiber Laser", to: "/machines/laser-cutting/closed-type-fiber-laser" },
  { label: "Cutting / Open-Type Fiber Laser", to: "/machines/laser-cutting/open-type-fiber-laser" },
  { label: "Tube Profile Laser", to: "/machines/tube-profile-lasers" },
  { label: "Pipe Cutting Combo Laser", to: "/machines/laser-cutting/covered-pipe-profile-fiber-laser" },
];

const machinesItems = [
  { label: "All Machines", to: "/machines" },
  { label: "CNC Press Brakes", to: "/machines/press-brakes" },
  { label: "Gun Drilling", to: "/gun-drills/gun-drilling-machines" },
  { label: "BTA Deep Hole Drilling", to: "/gun-drills/bta-deep-hole-drilling" },
];

const moreItems = [
  { label: "Dealers", to: "/dealers" },
  { label: "Contact", to: "/request-info" },
  { label: "FAQ", to: "/faq" },
  { label: "Eblast 1", to: "/eblast-1" },
  { label: "Request Info", to: "/request-info" },
];

const mobileLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "All Machines", to: "/machines" },
  ...fiberLaserItems,
  { label: "CNC Press Brakes", to: "/machines/press-brakes" },
  { label: "Gun Drilling", to: "/gun-drills/gun-drilling-machines" },
  { label: "BTA Deep Hole Drilling", to: "/gun-drills/bta-deep-hole-drilling" },
  { label: "Quotations", to: "/quotations" },
  { label: "Consultation", to: "/consultation" },
  ...moreItems,
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // On the homepage mobile hero, the navbar floats transparently over the
  // full-bleed laser photo with a white logo + white hamburger. Once the
  // mobile menu opens, switch back to the solid white chrome so the menu
  // panel is readable.
  const transparentMobile = location.pathname === "/" && !mobileOpen;

  const isActive = (path: string) => location.pathname === path;
  const linkCls = (active: boolean) =>
    `text-sm font-medium transition-colors whitespace-nowrap ${
      active ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors ${
        transparentMobile
          ? "bg-transparent lg:bg-white lg:border-b lg:border-gray-200 lg:shadow-sm"
          : "bg-white border-b border-gray-200 shadow-sm"
      }`}
    >
      <div className="flex justify-center px-0">
        <div className="w-full max-w-6xl px-4 md:px-6">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <img
                src={logoOval}
                alt="KAIMEC Machines"
                className={`lg:hidden w-auto object-contain h-12 ${
                  transparentMobile ? "drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]" : ""
                }`}
              />
              <img
                src={logoImg}
                alt="KAIMEC Machines"
                className="hidden lg:block h-14 w-auto object-contain"
              />
            </Link>

            {/* Desktop menu */}
            <nav className="hidden lg:flex items-center justify-center flex-1 gap-7">
              <Link to="/" className={linkCls(isActive("/"))}>Home</Link>
              <Link to="/about" className={linkCls(isActive("/about"))}>About</Link>

              {/* Machines dropdown */}
              <div className="relative group">
                <Link
                  to="/machines"
                  className={`${linkCls(location.pathname.startsWith("/machines") || location.pathname.startsWith("/gun-drills"))} inline-flex items-center gap-1`}
                >
                  Machines <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-50">
                  <div className="w-64 bg-white border border-gray-200 rounded-md shadow-lg py-2">
                    <Link to="/machines" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">All Machines</Link>

                    {/* CNC Fiber Lasers submenu */}
                    <div className="relative group/sub">
                      <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                        CNC Fiber Lasers
                        <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
                      </button>
                      <div className="absolute left-full top-0 pl-1 hidden group-hover/sub:block">
                        <div className="w-72 bg-white border border-gray-200 rounded-md shadow-lg py-2">
                          {fiberLaserItems.map((it) => (
                            <Link key={it.to + it.label} to={it.to} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                              {it.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    {machinesItems.slice(1).map((it) => (
                      <Link key={it.to} to={it.to} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                        {it.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link to="/quotations" className={linkCls(isActive("/quotations"))}>Quotations</Link>
              <Link to="/consultation" className={linkCls(isActive("/consultation"))}>Consultation</Link>

              {/* More dropdown */}
              <div className="relative group">
                <button className={`${linkCls(false)} inline-flex items-center gap-1`}>
                  More <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <div className="absolute right-0 top-full pt-2 hidden group-hover:block z-50">
                  <div className="w-52 bg-white border border-gray-200 rounded-md shadow-lg py-2">
                    {moreItems.map((it) => (
                      <Link key={it.label} to={it.to} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                        {it.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center shrink-0">
              <Link
                to="/quotations"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className={`lg:hidden p-2 rounded-md ${
                transparentMobile
                  ? "text-white hover:bg-white/10"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="w-full max-w-6xl mx-auto px-4 md:px-6 py-4 flex flex-col gap-1">
            {mobileLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.to)
                    ? "text-blue-600 bg-slate-50"
                    : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/quotations"
              onClick={() => setMobileOpen(false)}
              className="mt-3 w-full text-center px-4 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
