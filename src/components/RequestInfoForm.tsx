import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle } from "lucide-react";

const EMAILJS_SERVICE_ID    = "service_oiwu4ak";
const EMAILJS_TEAM_TEMPLATE = "template_dsbjz8n";
const EMAILJS_REPLY_TEMPLATE = "template_8ghnppm";
const EMAILJS_PUBLIC_KEY    = "auMQyoP8IUFm3ImJd";

const HUBSPOT_ENDPOINT =
  "https://api.hsforms.com/submissions/v3/integration/submit/245894690/d661f94a-3786-425d-a13a-91a74ed980c1";

const priorityOptions = [
  "Immediate",
  "Within 3 Months",
  "Budgeting / Information Request",
];

const machineOptions = [
  "FLO-1530 Open Type Fiber Laser",
  "FLC-1530 Closed Type Fiber Laser",
  "FLO-P 1530 Pallet Changer Laser",
  "Tube & Profile Laser",
  "Press Brake",
  "Gun Drill",
  "Multiple / Not sure yet",
] as const;

const accessoryOptions = [
  "Dust / Smoke Collector",
  "Screw Type Air Compressor (30HP with Refrigerated Dryer)",
  "Automatic Loader",
] as const;

function detectMachineFromPath(pathname: string): string {
  const p = pathname.toLowerCase();
  if (p.includes("flc-p") || p.includes("flo-p") || p.includes("pallet")) return "FLO-P 1530 Pallet Changer Laser";
  if (p.includes("open-type") || p.includes("flo-1530")) return "FLO-1530 Open Type Fiber Laser";
  if (p.includes("closed-type") || p.includes("flc-1530")) return "FLC-1530 Closed Type Fiber Laser";
  if (p.includes("tube") || p.includes("profile") || p.includes("covered-pipe")) return "Tube & Profile Laser";
  if (p.includes("press-brake")) return "Press Brake";
  if (p.includes("gun-drill") || p.includes("bta-deep")) return "Gun Drill";
  return "";
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Props {
  machine?: string;
}

export default function RequestInfoForm({ machine: machineProp }: Props) {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const queryMachine = searchParams.get("machine") || "";
  const resolveMachine = () => machineProp || queryMachine || "General Inquiry";

  const resolveMachineOfInterest = (): string => {
    const fromQuery = (searchParams.get("machine") || "").trim();
    if (fromQuery && (machineOptions as readonly string[]).includes(fromQuery)) return fromQuery;
    const fromRoute = detectMachineFromPath(location.pathname);
    if (fromRoute) return fromRoute;
    if (machineProp && (machineOptions as readonly string[]).includes(machineProp)) return machineProp;
    return "";
  };

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    address: "",
    machine: resolveMachine(),
    priority: "",
    message: "",
  });
  const [machineOfInterest, setMachineOfInterest] = useState<string>(resolveMachineOfInterest());
  const [accessories, setAccessories] = useState<string[]>([]);
  const [machineError, setMachineError] = useState("");

  useEffect(() => {
    setFormData((p) => ({ ...p, machine: resolveMachine() }));
    setMachineOfInterest((prev) => prev || resolveMachineOfInterest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [machineProp, queryMachine, location.pathname]);

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
    const separator = " + ";
    const machineValue = formData.machine;
    const splitIndex = machineValue.indexOf(separator);
    let parsedMachine: string;
    let accessoriesSelected: string;
    if (splitIndex !== -1) {
      parsedMachine = machineValue.slice(0, splitIndex);
      accessoriesSelected = machineValue.slice(splitIndex + separator.length);
    } else {
      parsedMachine = machineValue;
      accessoriesSelected = "None";
    }
    const map: Array<[string, string]> = [
      ["firstname", firstName],
      ["lastname", lastName],
      ["email", formData.email],
      ["phone", formData.phone],
      ["company", formData.companyName],
      ["address", formData.address],
      ["machine_of_interest", machineOfInterest],
      ["accessories_selected", accessoriesSelected],
      ["accessories_of_interest", accessories.join(", ")],
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
    if (!machineOfInterest) {
      setMachineError("Please select a machine of interest.");
      return;
    }
    setMachineError("");
    setIsLoading(true);
    setError("");

    const emailVars = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      companyName: formData.companyName,
      address: formData.address,
      machine: formData.machine,
      priority: formData.priority,
      message: formData.message,
      machine_of_interest: machineOfInterest,
      accessories_of_interest: accessories.join(", "),
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
          machine_of_interest: machineOfInterest,
          accessories_of_interest: accessories.join(", "),
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
        <p className="text-muted-foreground">
          Thanks — we'll be in touch shortly.
        </p>
      </div>
    );
  }

  const emailValid = EMAIL_REGEX.test(formData.email.trim());
  const submitDisabled = isLoading || !formData.name.trim() || !emailValid || !machineOfInterest;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Hidden Machine */}
      <input type="hidden" name="machine" value={formData.machine} />

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
          Email <span className="text-red-500">*</span>
        </Label>
        <Input id="email" name="email" type="email" placeholder="you@example.com" required value={formData.email} onChange={handleChange} className="bg-card border-border" />
      </div>

      {/* Phone */}
      <div>
        <Label htmlFor="phone" className="text-sm font-medium text-foreground mb-1.5 block">Phone</Label>
        <Input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+1 (555) 555-5555" value={formData.phone} onChange={handleChange} className="bg-card border-border" />
      </div>

      {/* Company */}
      <div>
        <Label htmlFor="companyName" className="text-sm font-medium text-foreground mb-1.5 block">Company Name</Label>
        <Input id="companyName" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className="bg-card border-border" />
      </div>

      {/* Address */}
      <div>
        <Label htmlFor="address" className="text-sm font-medium text-foreground mb-1.5 block">Address</Label>
        <Input id="address" name="address" placeholder="Street, City, State, Country" value={formData.address} onChange={handleChange} className="bg-card border-border" />
      </div>

      {/* Machine of Interest */}
      <div>
        <Label className="text-sm font-medium text-foreground mb-1.5 block">
          Machine of Interest <span className="text-red-500">*</span>
        </Label>
        <Select
          value={machineOfInterest}
          onValueChange={(v) => {
            setMachineOfInterest(v);
            if (v) setMachineError("");
          }}
        >
          <SelectTrigger className="bg-card border-border">
            <SelectValue placeholder="Select a machine" />
          </SelectTrigger>
          <SelectContent>
            {machineOptions.map((o) => (
              <SelectItem key={o} value={o}>{o}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {machineError && <p className="text-red-500 text-sm mt-1">{machineError}</p>}
      </div>

      {/* Accessories of Interest */}
      <div>
        <Label className="text-sm font-medium text-foreground mb-1.5 block">
          Accessories of Interest (optional)
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {accessoryOptions.map((opt) => {
            const checked = accessories.includes(opt);
            return (
              <label key={opt} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                <Checkbox
                  checked={checked}
                  onCheckedChange={(c) => {
                    setAccessories((prev) =>
                      c ? [...prev, opt] : prev.filter((a) => a !== opt),
                    );
                  }}
                />
                <span>{opt}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Priority of Interest */}
      <div>
        <Label className="text-sm font-medium text-foreground mb-1.5 block">Priority of Interest</Label>
        <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
          <SelectTrigger className="bg-card border-border">
            <SelectValue placeholder="Select a priority" />
          </SelectTrigger>
          <SelectContent>
            {priorityOptions.map((o) => (
              <SelectItem key={o} value={o}>{o}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Message */}
      <div>
        <Label htmlFor="message" className="text-sm font-medium text-foreground mb-1.5 block">Additional details or specifications</Label>
        <Textarea id="message" name="message" placeholder="Material, thickness, volume, application, timeline…" rows={5} value={formData.message} onChange={handleChange} className="bg-card border-border" />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" size="lg" disabled={submitDisabled} className="font-bold px-10 w-full sm:w-auto">
        {isLoading ? "Sending..." : "Request Information"}
      </Button>
    </form>
  );
}
