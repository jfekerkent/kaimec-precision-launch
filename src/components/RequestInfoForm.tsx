import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { getQuotationLink } from "@/lib/quotationPdfs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

// Two-step flow: pick a category, then pick a specific model (when applicable).
// `machineOfInterest` is always set to the final model string so HubSpot
// receives the exact value (e.g. "FLO-2040 Open Type Fiber Laser").
const machineCategories = [
  {
    label: "Open Type Fiber Laser",
    models: [
      "FLO-1530 Open Type Fiber Laser",
      "FLO-2040 Open Type Fiber Laser",
      "FLO-2060 Open Type Fiber Laser",
    ],
  },
  {
    label: "Closed Type Fiber Laser",
    models: [
      "FLC-1530 Closed Type Fiber Laser",
      "FLC-2040 Closed Type Fiber Laser",
      "FLC-2060 Closed Type Fiber Laser",
    ],
  },
  {
    label: "Combo Lasers (Sheet + Pipe Cutting)",
    models: [
      "FLC-P 1530 Combo Laser",
      "FLC-P 2040 Combo Laser",
      "FLO-P 1530 Combo Laser",
      "FLO-P 2040 Combo Laser",
      "FLO-P 2060 Combo Laser",
    ],
  },
  {
    label: "Tube & Profile Laser",
    models: [
      "FLP-6020 Tube & Profile Laser",
      "FLP-6035 Tube & Profile Laser",
    ],
  },
  {
    label: "CNC Press Brakes",
    models: [
      "MKT-1560 CNC Press Brake",
      "MKT-32135 CNC Press Brake",
    ],
  },
  { label: "Gun / BTA Drilling", models: ["Gun & BTA Drilling Machine"] },
  { label: "Multiple / Not sure yet", models: ["Multiple / Not sure yet"] },
] as const;

const machineOptions = machineCategories.flatMap((c) => c.models) as readonly string[];

function findCategoryForModel(model: string): string {
  const found = machineCategories.find((c) => (c.models as readonly string[]).includes(model));
  return found ? found.label : "";
}

const accessoryOptions = [
  "Dust / Smoke Collector",
  "Screw Type Air Compressor (30HP with Refrigerated Dryer)",
  "Automatic Loader",
] as const;

function detectMachineFromPath(pathname: string): string {
  const p = pathname.toLowerCase();
  if (p.includes("flc-p")) return "FLC-P 1530 Combo Laser";
  if (p.includes("flo-p") || p.includes("pallet") || p.includes("combo")) return "FLO-P 1530 Combo Laser";
  if (p.includes("open-type") || p.includes("flo-1530")) return "FLO-1530 Open Type Fiber Laser";
  if (p.includes("closed-type") || p.includes("flc-1530")) return "FLC-1530 Closed Type Fiber Laser";
  if (p.includes("tube") || p.includes("profile") || p.includes("covered-pipe")) return "FLP-6020 Tube & Profile Laser";
  if (p.includes("press-brake")) return "MKT-1560 CNC Press Brake";
  if (p.includes("gun-drill") || p.includes("bta")) return "Gun & BTA Drilling Machine";
  return "";
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Props {
  machine?: string;
  source?: string;
  hideMachineSelector?: boolean;
}

const LASER_CATEGORIES = new Set<string>([
  "Open Type Fiber Laser",
  "Closed Type Fiber Laser",
  "Combo Lasers (Sheet + Pipe Cutting)",
  "Tube & Profile Laser",
]);
const KW_OPTIONS = ["3 kW", "6 kW", "12 kW"] as const;

export default function RequestInfoForm({ machine: machineProp, source = "Request Info", hideMachineSelector = false }: Props) {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const queryMachine = searchParams.get("machine") || "";
  const resolveMachine = () => machineProp || queryMachine || "General Inquiry";

  const resolveMachineOfInterest = (): string => {
    const fromQuery = (searchParams.get("machine") || "").trim();
    if (fromQuery && machineOptions.includes(fromQuery)) return fromQuery;
    const fromRoute = detectMachineFromPath(location.pathname);
    if (fromRoute) return fromRoute;
    if (machineProp && machineOptions.includes(machineProp)) return machineProp;
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
  const [machineCategory, setMachineCategory] = useState<string>(() =>
    findCategoryForModel(resolveMachineOfInterest()),
  );
  const [powerKw, setPowerKw] = useState<string>("");
  const [accessories, setAccessories] = useState<string[]>([]);
  const [machineError, setMachineError] = useState("");

  useEffect(() => {
    setFormData((p) => ({ ...p, machine: resolveMachine() }));
    setMachineOfInterest((prev) => {
      const next = prev || resolveMachineOfInterest();
      setMachineCategory((c) => c || findCategoryForModel(next));
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [machineProp, queryMachine, location.pathname]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitToHubspot = async (finalMachineOfInterest: string) => {
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
      ["machine_of_interest", finalMachineOfInterest],
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
    if (!hideMachineSelector) {
      if (!machineOfInterest) {
        setMachineError("Please select a machine of interest.");
        return;
      }
      if (LASER_CATEGORIES.has(machineCategory) && !powerKw) {
        setMachineError("Please select a power (kW).");
        return;
      }
    }
    setMachineError("");
    setIsLoading(true);
    setError("");

    const finalMachineOfInterest = hideMachineSelector
      ? (machineProp || machineOfInterest || resolveMachine())
      : (powerKw && LASER_CATEGORIES.has(machineCategory)
          ? `${machineOfInterest} — ${powerKw}`
          : machineOfInterest);

    const emailVars = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      companyName: formData.companyName,
      address: formData.address,
      machine: formData.machine,
      priority: formData.priority,
      message: formData.message,
      machine_of_interest: finalMachineOfInterest,
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
          machine_of_interest: finalMachineOfInterest,
          accessories_of_interest: accessories.join(", "),
          quotation_link: getQuotationLink(finalMachineOfInterest),
        },
        EMAILJS_PUBLIC_KEY,
      );
    })();

    const hubspotPromise = submitToHubspot(finalMachineOfInterest);

    // Upsert into HubSpot CRM via Lovable connector gateway
    supabase.functions
      .invoke("hubspot-upsert-contact", {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          company: formData.companyName || undefined,
          machine_of_interest: finalMachineOfInterest || undefined,
          source,
        },
      })
      .catch((err) => console.error("HubSpot upsert error:", err));

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
  const needsKw = !hideMachineSelector && LASER_CATEGORIES.has(machineCategory) && !powerKw;
  const submitDisabled =
    isLoading ||
    !formData.name.trim() ||
    !emailValid ||
    (!hideMachineSelector && !machineOfInterest) ||
    needsKw;

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

      {/* Machine of Interest — two-step: category, then specific model */}
      {!hideMachineSelector && (
      <div>
        <Label className="text-sm font-medium text-foreground mb-1.5 block">
          Machine of Interest <span className="text-red-500">*</span>
        </Label>
        <Select
          value={machineCategory}
          onValueChange={(v) => {
            setMachineCategory(v);
            const cat = machineCategories.find((c) => c.label === v);
            // Auto-select when the category has a single model; otherwise clear
            // so the user picks a specific model in the second dropdown.
            if (cat && cat.models.length === 1) {
              setMachineOfInterest(cat.models[0]);
              setMachineError("");
            } else {
              setMachineOfInterest("");
            }
            setPowerKw("");
          }}
        >
          <SelectTrigger className="bg-card border-border">
            <SelectValue placeholder="Select a machine type" />
          </SelectTrigger>
          <SelectContent>
            {machineCategories.map((c) => (
              <SelectItem key={c.label} value={c.label}>{c.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {(() => {
          const cat = machineCategories.find((c) => c.label === machineCategory);
          if (!cat || cat.models.length <= 1) return null;
          return (
            <div className="mt-3">
              <Label className="text-sm font-medium text-foreground mb-1.5 block">
                Specific Model <span className="text-red-500">*</span>
              </Label>
              <Select
                value={machineOfInterest}
                onValueChange={(v) => {
                  setMachineOfInterest(v);
                  if (v) setMachineError("");
                }}
              >
                <SelectTrigger className="bg-card border-border">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {cat.models.map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        })()}

        {LASER_CATEGORIES.has(machineCategory) && (
          <div className="mt-3">
            <Label className="text-sm font-medium text-foreground mb-1.5 block">
              Power (kW) <span className="text-red-500">*</span>
            </Label>
            <Select
              value={powerKw}
              onValueChange={(v) => {
                setPowerKw(v);
                if (v) setMachineError("");
              }}
            >
              <SelectTrigger className="bg-card border-border">
                <SelectValue placeholder="Select laser power" />
              </SelectTrigger>
              <SelectContent>
                {KW_OPTIONS.map((k) => (
                  <SelectItem key={k} value={k}>{k}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {machineError && <p className="text-red-500 text-sm mt-1">{machineError}</p>}
      </div>
      )}

      {/* Accessories of Interest */}
      {!hideMachineSelector && (
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
      )}

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
        <Textarea id="message" name="message" placeholder="Material, thickness, volume, application, timeline, kW preference…" rows={5} value={formData.message} onChange={handleChange} className="bg-card border-border" />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" size="lg" disabled={submitDisabled} className="font-bold px-10 w-full sm:w-auto">
        {isLoading ? "Sending..." : "Request Information"}
      </Button>
    </form>
  );
}
