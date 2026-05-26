import { useState } from "react";
import emailjs from "@emailjs/browser";
import { ChevronDown } from "lucide-react";

const EMAILJS_SERVICE_ID = "service_oiwu4ak";
const EMAILJS_TEAM_TEMPLATE = "template_dsbjz8n";
const EMAILJS_REPLY_TEMPLATE = "template_8ghnppm";
const EMAILJS_PUBLIC_KEY = "auMQyoP8IUFm3ImJd";

const MACHINE_OPTIONS = [
  "Fiber Laser Cutting Machine",
  "CNC Press Brake",
  "Gun & BTA Drilling Machine",
  "Mekotek Machine",
  "Kent Machine",
  "Not sure yet",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function HeroLeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [machine, setMachine] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !EMAIL_REGEX.test(email)) return;
    setLoading(true);

    const machineVal = machine || "(not specified)";
    const teamVars = {
      name,
      email,
      company: "",
      address: "",
      phone: phone || "(not provided)",
      machine: machineVal,
      priority: "(not specified)",
      additional_details: "Source: Homepage Hero Form",
    };

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEAM_TEMPLATE, teamVars, EMAILJS_PUBLIC_KEY)
      .catch((err) => console.error("EmailJS team error:", err));

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_REPLY_TEMPLATE,
        { to_email: email, to_name: name },
        EMAILJS_PUBLIC_KEY,
      )
      .catch((err) => console.error("EmailJS reply error:", err));

    try {
      const hsq = (window as unknown as { _hsq?: unknown[] })._hsq;
      if (hsq) {
        hsq.push(["identify", { email, firstname: name }]);
        hsq.push(["trackPageView"]);
      }
    } catch (err) {
      console.error("HubSpot error:", err);
    }

    setSubmitted(true);
    setLoading(false);
  };

  const inputBase =
    "w-full h-11 px-3 rounded-md bg-white/[0.08] text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-[rgba(245,166,35,0.7)] text-sm transition-colors";

  if (submitted) {
    return (
      <div className="w-full max-w-xl rounded-xl bg-black/[0.55] backdrop-blur-[8px] border border-white/[0.12] p-5 md:py-6 md:px-6">
        <p className="text-white font-medium text-base text-center">
          ✓ Got it — we'll be in touch shortly. Check your email for a confirmation.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl">
      <p className="text-white/85 italic text-sm mb-3">
        Tell us what you need — we'll get back to you within one business day.
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-xl bg-black/[0.55] backdrop-blur-[8px] border border-white/[0.12] p-5 md:py-6 md:px-6 space-y-3"
      >
        <input
          type="text"
          required
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputBase}
        />
        <input
          type="email"
          required
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputBase}
        />
        <input
          type="tel"
          placeholder="Phone number (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputBase}
        />
        <div className="relative">
          <select
            value={machine}
            onChange={(e) => setMachine(e.target.value)}
            className={`${inputBase} appearance-none pr-8`}
          >
            <option value="" className="bg-gray-900 text-white">
              What are you looking for?
            </option>
            {MACHINE_OPTIONS.map((m) => (
              <option key={m} value={m} className="bg-gray-900 text-white">
                {m}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50 pointer-events-none" />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-md font-bold text-white text-sm transition-colors hover:bg-[#d4891a] disabled:opacity-60 mt-1"
          style={{ backgroundColor: "#F5A623" }}
        >
          {loading ? "SENDING..." : "GET INFO →"}
        </button>
      </form>
    </div>
  );
}
