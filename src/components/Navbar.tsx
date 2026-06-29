import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoImg from "@/assets/kaimec-logo-nav-v4.png";

const logoOval = logoImg;

const desktopLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Machines", to: "/machines" },
  { label: "Get Quote", to: "/quotations" },
  { label: "Consultation", to: "/consultation" },
];

const mobileLinks = [
  ...desktopLinks,
  { label: "FAQ", to: "/faq" },
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
            <nav className="hidden lg:flex items-center justify-center flex-1 gap-8">
              {desktopLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive(link.to)
                      ? "text-blue-600"
                      : "text-slate-700 hover:text-blue-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
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
