import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";

const EMAILJS_SERVICE_ID    = "service_oiwu4ak";
const EMAILJS_TEAM_TEMPLATE = "template_dsbjz8n";
const EMAILJS_REPLY_TEMPLATE = "template_8ghnppm";
const EMAILJS_PUBLIC_KEY    = "auMQyoP8IUFm3ImJd";

const machineOptions = [
  "CNC Fiber Laser",
  "Tube / Profile Laser",
  "Press Brake",
  "Panel Bender",
  "Other",
];

export default function Quote() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    machine: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEAM_TEMPLATE,
        {
          fullName:    formData.fullName,
          companyName: formData.companyName,
          email:       formData.email,
          phone:       formData.phone,
          machine:     formData.machine,
          message:     formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_REPLY_TEMPLATE,
        {
          fullName: formData.fullName,
          email:    formData.email,
          machine:  formData.machine,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please email us directly at sales@kaimec.com");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <p className="section-label mb-3">Get Started</p>
              <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2">
                Get a Customized Quote
              </h1>
              <p className="text-muted-foreground mb-8">
                Our engineers will respond within 1 business day.
              </p>
              {submitted ? (
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-10 text-center">
                  <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">
                    We have received your request and will be in touch shortly regarding the {formData.machine || "machine"} you inquired about. Check your email for a confirmation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input name="fullName" placeholder="Full Name" required value={formData.fullName} onChange={handleChange} className="bg-card border-border" />
                    <Input name="companyName" placeholder="Company Name" required value={formData.companyName} onChange={handleChange} className="bg-card border-border" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input name="email" type="email" placeholder="Email" required value={formData.email} onChange={handleChange} className="bg-card border-border" />
                    <Input name="phone" type="tel" placeholder="Phone" value={formData.phone} onChange={handleChange} className="bg-card border-border" />
                  </div>
                  <Select onValueChange={(value) => setFormData({ ...formData, machine: value })}>
                    <SelectTrigger className="bg-card border-border">
                      <SelectValue placeholder="Machine of Interest" />
                    </SelectTrigger>
                    <SelectContent>
                      {machineOptions.map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Textarea name="message" placeholder="Message / Specifications" rows={5} value={formData.message} onChange={handleChange} className="bg-card border-border" />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button type="submit" size="lg" disabled={isLoading} className="font-bold px-10 w-full sm:w-auto">
                    {isLoading ? "Sending..." : "Submit Request"}
                  </Button>
                </form>
              )}
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-lg border border-border bg-card p-8">
                <h3 className="text-lg font-bold text-foreground mb-6">Contact Information</h3>
                <ul className="space-y-5">
                  <li className="flex gap-3 text-sm text-muted-foreground">
                    <MapPin className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <div className="font-semibold text-foreground">Address</div>
                      <span>1231 Edinger Ave, Tustin, CA</span>
                    </div>
                  </li>
                  <li className="flex gap-3 text-sm text-muted-foreground">
                    <Phone className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <div className="font-semibold text-foreground">Phone</div>
                      <a href="tel:7142588526" className="hover:text-primary transition-colors">(714) 258-8526</a>
                    </div>
                  </li>
                  <li className="flex gap-3 text-sm text-muted-foreground">
                    <Mail className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <div className="font-semibold text-foreground">Email</div>
                      <a href="mailto:sales@kaimec.com" className="hover:text-primary transition-colors">sales@kaimec.com</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
