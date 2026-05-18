import { useState } from "react";
import emailjs from "@emailjs/browser";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, ArrowRight, CheckCircle, Wrench, DollarSign, Target } from "lucide-react";

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

      {/* Section B — KaiMec Commitment */}
      <section className="bg-[#F8F9FA] py-12 md:py-16">
        <div className="container max-w-[1100px]">
          <div className="text-center">
            <p className="section-label mb-3" style={{ color: "#F5A623", fontSize: "13px", letterSpacing: "2.5px" }}>OUR COMMITMENT</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] mb-6 leading-tight">
              Built for Real Shops. Not Showrooms.
            </h2>
            <p className="text-[#1a1a1a]/80 max-w-[760px] mx-auto leading-relaxed" style={{ fontSize: "1.1rem" }}>
              Every KaiMec machine is engineered for the floor — precision, consistency, and the throughput that real production demands. Fiber lasers. Press brakes. Panel benders. Tube and profile cutters. Gun drills. Backed by hands-on support from a team that's specified, installed, and stood behind these systems for decades. We pledge straight talk, fair pricing, and machines that earn their place in your shop.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mt-20">
            {[
              { Icon: Wrench, h: "140+ Years on the Floor", b: "Our team has spent decades running, repairing, and selling industrial equipment. You're not talking to a script — you're talking to people who've actually pulled chips and pierced steel." },
              { Icon: DollarSign, h: "Honest Pricing, No Markup Theater", b: "Real quotes built around your shop's actual needs. No bait-and-switch, no padded options, no fake discounts. The number we give you is the number." },
              { Icon: Target, h: "Right-Sized Recommendations", b: "We'll spec the machine you actually need, not the most expensive one we can sell. If 6kW gets the job done, we'll tell you so." },
            ].map(({ Icon, h, b }) => (
              <div key={h} className="bg-white rounded-xl border border-black/5 shadow-sm p-8">
                <Icon className="h-12 w-12 text-primary mb-5" strokeWidth={2} />
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-3 leading-tight">{h}</h3>
                <p className="text-[#1a1a1a]/70 leading-relaxed">{b}</p>
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
