import { useState } from "react";
import emailjs from "@emailjs/browser";

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

  if (submitted) {
    return (
      <p className="text-white font-medium text-base md:text-lg">
        ✓ Got it — we'll be in touch shortly. Check your email for a confirmation.
      </p>
    );
  }

  return (
    <div className="max-w-3xl">
      <p className="text-white/85 italic text-sm mb-3">
        Tell us what you need — we'll get back to you within one business day.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-2 p-3 rounded-md bg-black/40 backdrop-blur-sm border border-white/10"
      >
        <input
          type="text"
          required
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 h-11 px-3 rounded-md bg-white text-foreground placeholder:text-muted-foreground border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        />
        <input
          type="email"
          required
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 h-11 px-3 rounded-md bg-white text-foreground placeholder:text-muted-foreground border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        />
        <select
          value={machine}
          onChange={(e) => setMachine(e.target.value)}
          className="flex-1 h-11 px-3 rounded-md bg-white text-foreground border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        >
          <option value="">What are you looking for?</option>
          {MACHINE_OPTIONS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={loading}
          className="h-11 px-6 rounded-md font-bold text-white text-sm whitespace-nowrap transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ backgroundColor: "#F5A623" }}
        >
          {loading ? "SENDING..." : "GET INFO →"}
        </button>
      </form>
    </div>
  );
}