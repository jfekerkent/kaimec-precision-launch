import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";

const EMAILJS_SERVICE_ID    = "service_oiwu4ak";
const EMAILJS_TEAM_TEMPLATE = "template_dsbjz8n";
const EMAILJS_REPLY_TEMPLATE = "template_8ghnppm";
const EMAILJS_PUBLIC_KEY    = "auMQyoP8IUFm3ImJd";

const HUBSPOT_ENDPOINT =
  "https://api.hsforms.com/submissions/v3/integration/submit/245894690/d661f94a-3786-425d-a13a-91a74ed980c1";

export const machineOptions = [
  "FLO-1530",
  "FLO-P 1530",
  "FLC-1530",
  "FLC-P 1530",
  "FLP-6020",
  "FLP-6035",
  "MKT-1560",
  "MKT-32135",
  "TSK-2150 × 3000mm",
  "Not Sure Yet",
];

const timelineOptions = [
  "ASAP",
  "Within 30 Days",
  "Within 3–6 Months",
  "Budgeting / Information Request",
];

interface Props {
  machine?: string;
}

export default function RequestInfoForm({ machine: machineProp }: Props) {
  const [searchParams] = useSearchParams();
  const queryMachine = searchParams.get("machine") || "";
  const resolveInitial = () => {
    const candidate = machineProp || queryMachine;
    return candidate && machineOptions.includes(candidate) ? candidate : "";
  };

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [wantCall, setWantCall] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    machine: resolveInitial(),
    phone: "",
    zip: "",
    timeline: "",
    message: "",
    location: "",
    industry: "",
  });

  useEffect(() => {
    const next = resolveInitial();
    if (next) setFormData((p) => ({ ...p, machine: next }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [machineProp, queryMachine]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "zip") {
      const digits = value.replace(/\D/g, "").slice(0, 5);
      setFormData({ ...formData, zip: digits });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const submitToHubspot = async () => {
    const location = formData.location.trim();
    let city = "";
    let state = "";
    if (location) {
      const idx = location.indexOf(",");
      if (idx === -1) {
        city = location;
      } else {
        city = location.slice(0, idx).trim();
        state = location.slice(idx + 1).trim();
      }
    }
    const map: Array<[string, string]> = [
      ["firstname", formData.firstName],
      ["lastname", formData.lastName],
      ["email", formData.email],
      ["company", formData.companyName],
      ["phone", wantCall ? formData.phone : ""],
      ["city", city],
      ["state", state],
      ["industry_or_application", formData.industry],
      ["machine_of_interest", formData.machine],
      ["message", formData.message],
    ];
    const fields = map
      .filter(([, v]) => v && v.trim() !== "")
      .map(([name, value]) => ({ objectTypeId: "0-1", name, value }));
    const payload = {
      submittedAt: String(Date.now()),
      fields,
      context: {
        pageUri: window.location.href,
        pageName: document.title,
      },
    };
    console.log("[HubSpot] starting submission");
    try {
      const res = await fetch(HUBSPOT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        console.log("[HubSpot] success", res);
      } else {
        const body = await res.text().catch(() => "");
        console.warn("[HubSpot] non-OK status:", res.status, body);
      }
    } catch (error) {
      console.warn("[HubSpot] failed:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const requestCallBack = wantCall ? "Yes" : "No";
    const emailVars = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      companyName: formData.companyName,
      email: formData.email,
      phone: wantCall ? formData.phone : "",
      location: formData.location,
      zipCode: formData.zip,
      industry: formData.industry,
      machine: formData.machine,
      timeline: formData.timeline,
      requestCallBack,
      message: formData.message,
    };

    const emailjsPromise = (async () => {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEAM_TEMPLATE, emailVars, EMAILJS_PUBLIC_KEY);
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_REPLY_TEMPLATE,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          machine: formData.machine,
        },
        EMAILJS_PUBLIC_KEY,
      );
    })();

    const hubspotPromise = submitToHubspot();

    try {
      const results = await Promise.allSettled([emailjsPromise, hubspotPromise]);
      const emailResult = results[0];
      if (emailResult.status === "rejected") {
        throw emailResult.reason;
      }
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please email us directly at sales@kaimec.com");
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-primary/30 bg-primary/5 p-10 text-center">
        <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-bold text-foreground mb-2">Thank You!</h3>
        <p className="text-muted-foreground">
          Thank you — a member of our team will be in touch shortly.
        </p>
      </div>
    );
  }

  const submitDisabled =
    isLoading ||
    !formData.firstName ||
    !formData.email ||
    !formData.machine ||
    !formData.location ||
    !formData.industry;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* First & Last Name */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="firstName" className="text-sm font-medium text-foreground mb-1.5 block">
            First Name <span className="text-red-500">*</span>
          </Label>
          <Input id="firstName" name="firstName" placeholder="First Name" required value={formData.firstName} onChange={handleChange} className="bg-card border-border" />
        </div>
        <div>
          <Label htmlFor="lastName" className="text-sm font-medium text-foreground mb-1.5 block">
            Last Name
          </Label>
          <Input id="lastName" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="bg-card border-border" />
        </div>
      </div>

      {/* Company */}
      <div>
        <Label htmlFor="companyName" className="text-sm font-medium text-foreground mb-1.5 block">Company Name</Label>
        <Input id="companyName" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className="bg-card border-border" />
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email" className="text-sm font-medium text-foreground mb-1.5 block">
          Email Address <span className="text-red-500">*</span>
        </Label>
        <Input id="email" name="email" type="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} className="bg-card border-border" />
      </div>

      {/* Location */}
      <div>
        <Label htmlFor="location" className="text-sm font-medium text-foreground mb-1.5 block">
          Your Location <span className="text-red-500">*</span>
        </Label>
        <Input id="location" name="location" placeholder="City, State" required value={formData.location} onChange={handleChange} className="bg-card border-border" />
      </div>

      {/* Industry (now required) */}
      <div>
        <Label htmlFor="industry" className="text-sm font-medium text-foreground mb-1.5 block">
          Industry or Application <span className="text-red-500">*</span>
        </Label>
        <Input id="industry" name="industry" placeholder="e.g. Sheet metal fab, HVAC, structural steel" required value={formData.industry} onChange={handleChange} className="bg-card border-border" />
      </div>

      {/* Machine */}
      <div>
        <Label className="text-sm font-medium text-foreground mb-1.5 block">
          Machine of Interest <span className="text-red-500">*</span>
        </Label>
        <Select required value={formData.machine} onValueChange={(value) => setFormData({ ...formData, machine: value })}>
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

      {/* ZIP */}
      <div>
        <Label htmlFor="zip" className="text-sm font-medium text-foreground mb-1.5 block">ZIP Code</Label>
        <Input id="zip" name="zip" placeholder="ZIP Code" value={formData.zip} onChange={handleChange} className="bg-card border-border" inputMode="numeric" maxLength={5} />
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
      <Button type="submit" size="lg" disabled={submitDisabled} className="font-bold px-10 w-full sm:w-auto">
        {isLoading ? "Sending..." : "Submit Request"}
      </Button>
    </form>
  );
}
