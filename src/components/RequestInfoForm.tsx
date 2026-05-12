import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  "Open Type Fiber Laser (FLO Series)",
  "FLO-1530",
  "FLO-P 1530",
  "FLC-P Series",
  "FLC-1530",
  "FLC-P 1530",
  "FLC-P 2040",
  "FLP-6020",
  "FLP-6035",
  "MKT-1560",
  "MKT-32135",
  "TSK-2150 × 3000mm",
  "Not Sure Yet",
];

const priorityOptions = [
  "Immediate",
  "Within 3 Months",
  "Budgeting / Information Request",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    address: "",
    machine: resolveInitial(),
    priority: "",
    message: "",
  });

  useEffect(() => {
    const next = resolveInitial();
    if (next) setFormData((p) => ({ ...p, machine: next }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [machineProp, queryMachine]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitToHubspot = async () => {
    const fullName = formData.name.trim();
    let firstName = fullName;
    let lastName = "";
    const spaceIdx = fullName.indexOf(" ");
    if (spaceIdx !== -1) {
      firstName = fullName.slice(0, spaceIdx).trim();
      lastName = fullName.slice(spaceIdx + 1).trim();
    }
    const map: Array<[string, string]> = [
      ["firstname", firstName],
      ["lastname", lastName],
      ["email", formData.email],
      ["company", formData.companyName],
      ["address", formData.address],
      ["machine_of_interest", formData.machine],
      ["priority_of_interest", formData.priority],
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

    const emailVars = {
      name: formData.name,
      email: formData.email,
      companyName: formData.companyName,
      address: formData.address,
      machine: formData.machine,
      priority: formData.priority,
      message: formData.message,
    };

    const emailjsPromise = (async () => {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEAM_TEMPLATE, emailVars, EMAILJS_PUBLIC_KEY);
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_REPLY_TEMPLATE,
        {
          name: formData.name,
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

  const emailValid = EMAIL_REGEX.test(formData.email.trim());
  const submitDisabled = isLoading || !formData.name.trim() || !emailValid;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <Label htmlFor="name" className="text-sm font-medium text-foreground mb-1.5 block">
          Name <span className="text-red-500">*</span>
        </Label>
        <Input id="name" name="name" placeholder="Name" required value={formData.name} onChange={handleChange} className="bg-card border-border" />
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email" className="text-sm font-medium text-foreground mb-1.5 block">
          Email Address <span className="text-red-500">*</span>
        </Label>
        <Input id="email" name="email" type="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} className="bg-card border-border" />
      </div>

      {/* Company */}
      <div>
        <Label htmlFor="companyName" className="text-sm font-medium text-foreground mb-1.5 block">Company Name</Label>
        <Input id="companyName" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className="bg-card border-border" />
      </div>

      {/* Address */}
      <div>
        <Label htmlFor="address" className="text-sm font-medium text-foreground mb-1.5 block">Address</Label>
        <Input id="address" name="address" placeholder="City, State or address" value={formData.address} onChange={handleChange} className="bg-card border-border" />
      </div>

      {/* Machine */}
      <div>
        <Label className="text-sm font-medium text-foreground mb-1.5 block">Machine of Interest</Label>
        <Select value={formData.machine} onValueChange={(value) => setFormData({ ...formData, machine: value })}>
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

      {/* Priority of Interest */}
      <div>
        <Label className="text-sm font-medium text-foreground mb-3 block">Priority of Interest</Label>
        <RadioGroup value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })} className="space-y-2">
          {priorityOptions.map((p) => (
            <div key={p} className="flex items-center space-x-2">
              <RadioGroupItem value={p} id={`priority-${p}`} />
              <Label htmlFor={`priority-${p}`} className="text-sm text-muted-foreground cursor-pointer">{p}</Label>
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
