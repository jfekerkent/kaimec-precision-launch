import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";

const machineOptions = ["CNC Fiber Laser", "Tube / Profile Laser", "Press Brake", "Panel Bender", "Other"];

export default function Quote() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [machine, setMachine] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("form-name", "quote-request");

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        throw new Error("Form submission failed");
      }
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
              <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2">Get a Customized Quote</h1>
              <p className="text-muted-foreground mb-8">Our engineers will respond within 1 business day.</p>

              {submitted ? (
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-10 text-center">
                  <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">
                    We've received your request and will be in touch shortly regarding the {machine || "machine"} you inquired about.
                  </p>
                </div>
              ) : (
                <form
                  name="quote-request"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <input type="hidden" name="form-name" value="quote-request" />
                  <input type="hidden" name="bot-field" />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input name="fullName" placeholder="Full Name" required className="bg-card border-border" />
                    <Input name="companyName" placeholder="Company Name" required className="bg-card border-border" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input name="email" type="email" placeholder="Email" required className="bg-card border-border" />
                    <Input name="phone" type="tel" placeholder="Phone" className="bg-card border-border" />
                  </div>
                  <Select name="machine" onValueChange={setMachine}>
                    <SelectTrigger className="bg-card border-border">
                      <SelectValue placeholder="Machine of Interest" />
                    </SelectTrigger>
                    <SelectContent>
                      {machineOptions.map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Textarea name="message" placeholder="Message / Specifications" rows={5} className="bg-card border-border" />

                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}

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
                      1231 Edinger Ave, Tustin, CA
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
