import { useState } from "react";
import emailjs from "@emailjs/browser";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, ArrowRight, CheckCircle, User } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/jfeker-kentusa/kaimec-consultation";
const EMAILJS_SERVICE_ID = "service_oiwu4ak";
const EMAILJS_TEAM_TEMPLATE = "template_dsbjz8n";
const EMAILJS_REPLY_TEMPLATE = "template_8ghnppm";
const EMAILJS_PUBLIC_KEY = "auMQyoP8IUFm3ImJd";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const machineOpts = ["Fiber Laser", "Press Brake", "Panel Bender", "Tube/Pipe Laser", "Gun Drill", "Other"];
const timelineOpts = ["ASAP", "30 days", "60-90 days", "6 months", "Just researching"];

export default function Consultation() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", machine_of_interest: "", timeline: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fireHubspot = () => {
    try {
      const w = window as unknown as { _hsq?: unknown[][] };
      if (w._hsq && typeof w._hsq.push === "function") {
        w._hsq.push(["identify", { email: form.email, firstname: form.name }]);
        w._hsq.push(["trackPageView"]);
      }
    } catch (e) { console.warn("HubSpot identify skipped", e); }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");

    const teamParams = {
      name: form.name,
      email: form.email,
      company: "",
      address: "",
      machine: form.machine_of_interest || "(not specified)",
      priority: form.timeline || "(not specified)",
      additional_details: `Phone: ${form.phone || "n/a"}\nMessage: ${form.message || "n/a"}\n\nSource: Consultation Page Form`,
    };

    const replyPromise = emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_REPLY_TEMPLATE,
        { name: form.name, email: form.email, machine: form.machine_of_interest || "(not specified)" },
        EMAILJS_PUBLIC_KEY)
      .catch((err) => console.warn("EmailJS auto-reply failed", err));

    fireHubspot();

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEAM_TEMPLATE, teamParams, EMAILJS_PUBLIC_KEY);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please email us at sales@kaimec.com or call 714-258-8526.");
    } finally {
      setLoading(false);
      replyPromise;
    }
  };

  const emailValid = EMAIL_REGEX.test(form.email.trim());
  const disabled = loading || !form.name.trim() || !emailValid;

  return (
    <Layout>
      {/* Section A — Hero */}
      <section className="bg-[#1a1a1a] py-20 md:py-28">
        <div className="container max-w-4xl text-center">
          <p className="section-label mb-3" style={{ color: "#F5A623", fontSize: "13px", letterSpacing: "2.5px" }}>CONSULTATION</p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.05]">
            Talk to a Real Expert. Get Real Answers.
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Our team brings 140+ years of combined fabrication experience. Schedule a 20-minute consult and walk away with a real quote built around your shop.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="font-bold text-base px-8">
                <Calendar className="mr-2 h-4 w-4" /> BOOK A 20-MIN CONSULT
              </Button>
            </a>
            <a href="#contact-form">
              <Button size="lg" variant="outline" className="font-bold text-base px-8 border-primary text-primary bg-transparent hover:bg-primary/10">
                OR SEND A MESSAGE BELOW
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Section B — Osman */}
      <section className="bg-[#F4F5F7] py-20">
        <div className="container max-w-5xl">
          <div className="grid gap-10 md:grid-cols-[260px_1fr] items-center">
            {/* TODO: Replace placeholder with actual photo of Osman when uploaded */}
            <div className="mx-auto md:mx-0 h-60 w-60 rounded-full bg-[#1a1a1a] flex items-center justify-center">
              <User className="h-28 w-28 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] mb-4">
                Meet Osman — Our Lead Sales Engineer
              </h2>
              <p className="text-[#1a1a1a]/80 leading-relaxed text-lg">
                Osman brings 40+ years of hands-on experience with fabrication equipment — from CNC fiber lasers to press brakes to panel benders. He'll spec the right machine for your shop, not the most expensive one. Most of our consults end with a clear recommendation, real numbers, and zero pressure.
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3 mt-12">
            {["40+ years on the floor", "Honest pricing, no markup theater", "Right-sized recommendations"].map((b) => (
              <div key={b} className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <span className="text-[#1a1a1a] font-semibold">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section C — Form */}
      <section id="contact-form" className="bg-white py-20">
        <div className="container max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] mb-3 text-center">Send a Message</h2>
          <p className="text-muted-foreground text-center mb-10">Only name and email are required. The more you share, the better we can help.</p>

          {submitted ? (
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-10 text-center">
              <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Thanks — we got your note.</h3>
              <p className="text-muted-foreground">
                Osman or someone from the team will reach out within one business day. In a hurry? Call <a href="tel:7142588526" className="text-primary font-semibold">714-258-8526</a>.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <Label htmlFor="name" className="text-sm font-medium mb-1.5 block">Name <span className="text-red-500">*</span></Label>
                <Input id="name" name="name" required value={form.name} onChange={handle} />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium mb-1.5 block">Email <span className="text-red-500">*</span></Label>
                <Input id="email" name="email" type="email" required value={form.email} onChange={handle} />
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm font-medium mb-1.5 block">Phone</Label>
                <Input id="phone" name="phone" value={form.phone} onChange={handle} />
              </div>
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Machine of Interest</Label>
                <Select value={form.machine_of_interest} onValueChange={(v) => setForm({ ...form, machine_of_interest: v })}>
                  <SelectTrigger><SelectValue placeholder="Select a machine" /></SelectTrigger>
                  <SelectContent>
                    {machineOpts.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Timeline</Label>
                <Select value={form.timeline} onValueChange={(v) => setForm({ ...form, timeline: v })}>
                  <SelectTrigger><SelectValue placeholder="Select a timeline" /></SelectTrigger>
                  <SelectContent>
                    {timelineOpts.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="message" className="text-sm font-medium mb-1.5 block">Message</Label>
                <Textarea id="message" name="message" rows={4} value={form.message}
                  onChange={handle}
                  placeholder="Tell us what you're working on — material, thickness, volume, application" />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" size="lg" disabled={disabled} className="font-bold w-full sm:w-auto px-10">
                {loading ? "Sending..." : "SEND MESSAGE"} {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* Section D — Closing CTA */}
      <section className="bg-[#1a1a1a] py-20">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Prefer to Just Call?</h2>
          <p className="text-white/80 text-lg mb-2">
            Phone: <a href="tel:7142588526" className="text-primary font-semibold">714-258-8526</a> — Mon–Fri 9am–5pm Pacific
          </p>
          <p className="text-white/80 text-lg">
            Email: <a href="mailto:sales@kaimec.com" className="text-primary font-semibold">sales@kaimec.com</a>
          </p>
        </div>
      </section>
    </Layout>
  );
}
