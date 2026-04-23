import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";

const EMAILJS_SERVICE_ID    = "service_oiwu4ak";
const EMAILJS_TEAM_TEMPLATE = "template_dsbjz8n";
const EMAILJS_REPLY_TEMPLATE = "template_8ghnppm";
const EMAILJS_PUBLIC_KEY    = "auMQyoP8IUFm3ImJd";

const machineOptions = [
  "FLO-1530",
  "FLO-P 1530",
  "FLC-1530",
  "FLC-P 1530",
  "FLP-6020",
  "FLP-6035",
  "MKT-1560",
  "MKT-32135",
  "MKJ-32220",
  "Gun Drilling Machine",
  "Deep Hole Drilling Machine",
  "Not Sure Yet",
];

const usStates = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia",
  "Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland",
  "Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey",
  "New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina",
  "South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming",
];

const timelineOptions = [
  "ASAP",
  "Within 30 Days",
  "Within 3–6 Months",
  "Budgeting / Information Request",
];

export default function Quote() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [wantCall, setWantCall] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    machine: "",
    phone: "",
    state: "",
    zip: "",
    timeline: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "zip") {
      const digits = value.replace(/\D/g, "").slice(0, 5);
      setFormData({ ...formData, zip: digits });
      return;
    }
    setFormData({ ...formData, [name]: value });
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
          fullName: formData.fullName,
          companyName: formData.companyName || "N/A",
          email: formData.email,
          phone: wantCall ? formData.phone : "N/A",
          machine: formData.machine,
          state: formData.state || "N/A",
          zipCode: formData.zip || "N/A",
          timeline: formData.timeline || "N/A",
          message: formData.message || "N/A",
        },
        EMAILJS_PUBLIC_KEY
      );
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_REPLY_TEMPLATE,
        {
          fullName: formData.fullName,
          email: formData.email,
          machine: formData.machine,
          state: formData.state || "N/A",
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
                    Thank you — a member of our team will be in touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name * */}
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-medium text-foreground mb-1.5 block">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input id="fullName" name="fullName" placeholder="Full Name" required value={formData.fullName} onChange={handleChange} className="bg-card border-border" />
                  </div>

                  {/* Company Name */}
                  <div>
                    <Label htmlFor="companyName" className="text-sm font-medium text-foreground mb-1.5 block">
                      Company Name
                    </Label>
                    <Input id="companyName" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className="bg-card border-border" />
                  </div>

                  {/* Email * */}
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-foreground mb-1.5 block">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input id="email" name="email" type="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} className="bg-card border-border" />
                  </div>

                  {/* Machine * */}
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-1.5 block">
                      Machine of Interest <span className="text-red-500">*</span>
                    </Label>
                    <Select required onValueChange={(value) => setFormData({ ...formData, machine: value })}>
                      <SelectTrigger className="bg-card border-border">
                        <SelectValue placeholder="Select a Machine" />
                      </SelectTrigger>
                      <SelectContent>
                        {machineOptions.map((o) => (
                          <SelectItem key={o} value={o}>{o}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Have someone call me */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="wantCall" checked={wantCall} onCheckedChange={(checked) => setWantCall(checked === true)} />
                      <Label htmlFor="wantCall" className="text-sm text-foreground cursor-pointer">Have someone call me</Label>
                    </div>
                    {wantCall && (
                      <Input name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="bg-card border-border" />
                    )}
                  </div>

                  {/* State & ZIP */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label className="text-sm font-medium text-foreground mb-1.5 block">State</Label>
                      <Select onValueChange={(value) => setFormData({ ...formData, state: value })}>
                        <SelectTrigger className="bg-card border-border">
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          {usStates.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zip" className="text-sm font-medium text-foreground mb-1.5 block">ZIP Code</Label>
                      <Input id="zip" name="zip" placeholder="ZIP Code" value={formData.zip} onChange={handleChange} className="bg-card border-border" inputMode="numeric" maxLength={5} />
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-3 block">Timeline</Label>
                    <RadioGroup onValueChange={(value) => setFormData({ ...formData, timeline: value })} className="space-y-2">
                      {timelineOptions.map((t) => (
                        <div key={t} className="flex items-center space-x-2">
                          <RadioGroupItem value={t} id={`timeline-${t}`} />
                          <Label htmlFor={`timeline-${t}`} className="text-sm text-muted-foreground cursor-pointer">{t}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Message */}
                  <Textarea name="message" placeholder="Additional details or specifications" rows={4} value={formData.message} onChange={handleChange} className="bg-card border-border" />

                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button type="submit" size="lg" disabled={isLoading || !formData.fullName || !formData.email || !formData.machine} className="font-bold px-10 w-full sm:w-auto">
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
