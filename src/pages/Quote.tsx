import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

const machineOptions = ["CNC Fiber Laser", "Tube / Profile Laser", "Press Brake", "Panel Bender", "Other"];

export default function Quote() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    toast({ title: "Quote request submitted!", description: "Our engineers will respond within 1 business day." });
  };

  return (
    <Layout>
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <p className="section-label mb-3">Get Started</p>
              <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2">Get a Customized Quote</h1>
              <p className="text-muted-foreground mb-8">Our engineers will respond within 1 business day.</p>

              {submitted ? (
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-10 text-center">
                  <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">We've received your request and will be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input placeholder="Full Name" required className="bg-card border-border" />
                    <Input placeholder="Company Name" required className="bg-card border-border" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input type="email" placeholder="Email" required className="bg-card border-border" />
                    <Input type="tel" placeholder="Phone" className="bg-card border-border" />
                  </div>
                  <Select>
                    <SelectTrigger className="bg-card border-border">
                      <SelectValue placeholder="Machine of Interest" />
                    </SelectTrigger>
                    <SelectContent>
                      {machineOptions.map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Textarea placeholder="Message / Specifications" rows={5} className="bg-card border-border" />
                  <Button type="submit" size="lg" className="font-bold px-10 w-full sm:w-auto">
                    Submit Request
                  </Button>
                </form>
              )}
            </div>

            {/* Sidebar */}
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
