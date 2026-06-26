import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/hubspot";
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const HUBSPOT_API_KEY = Deno.env.get("HUBSPOT_API_KEY");

type Body = {
  email?: string;
  name?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  company?: string;
  machine_of_interest?: string;
  source?: string;
};

function splitName(name?: string): { firstname: string; lastname: string } {
  if (!name) return { firstname: "", lastname: "" };
  const trimmed = name.trim();
  const idx = trimmed.indexOf(" ");
  if (idx === -1) return { firstname: trimmed, lastname: "" };
  return { firstname: trimmed.slice(0, idx).trim(), lastname: trimmed.slice(idx + 1).trim() };
}

function gatewayHeaders() {
  return {
    Authorization: `Bearer ${LOVABLE_API_KEY}`,
    "X-Connection-Api-Key": HUBSPOT_API_KEY!,
    "Content-Type": "application/json",
  };
}

async function findContactIdByEmail(email: string): Promise<string | null> {
  const res = await fetch(`${GATEWAY_URL}/crm/v3/objects/contacts/search`, {
    method: "POST",
    headers: gatewayHeaders(),
    body: JSON.stringify({
      filterGroups: [{ filters: [{ propertyName: "email", operator: "EQ", value: email }] }],
      properties: ["email"],
      limit: 1,
    }),
  });
  if (!res.ok) return null;
  const data = await res.json().catch(() => null);
  return data?.results?.[0]?.id ?? null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  if (!LOVABLE_API_KEY || !HUBSPOT_API_KEY) {
    return new Response(JSON.stringify({ ok: false, error: "HubSpot not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = (await req.json()) as Body;
    const email = (body.email ?? "").trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const split = body.firstname || body.lastname
      ? { firstname: body.firstname ?? "", lastname: body.lastname ?? "" }
      : splitName(body.name);

    const properties: Record<string, string> = { email };
    if (split.firstname) properties.firstname = split.firstname;
    if (split.lastname) properties.lastname = split.lastname;
    if (body.phone) properties.phone = body.phone;
    if (body.company) properties.company = body.company;
    if (body.machine_of_interest) properties.machine_of_interest = body.machine_of_interest;
    if (body.source) properties.hs_lead_source = body.source;

    // Try create
    let res = await fetch(`${GATEWAY_URL}/crm/v3/objects/contacts`, {
      method: "POST",
      headers: gatewayHeaders(),
      body: JSON.stringify({ properties }),
    });

    if (res.status === 409) {
      const id = await findContactIdByEmail(email);
      if (!id) {
        const text = await res.text().catch(() => "");
        return new Response(JSON.stringify({ ok: false, error: "Conflict but no id", detail: text }), {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      res = await fetch(`${GATEWAY_URL}/crm/v3/objects/contacts/${id}`, {
        method: "PATCH",
        headers: gatewayHeaders(),
        body: JSON.stringify({ properties }),
      });
    }

    const text = await res.text();
    let parsed: unknown = null;
    try { parsed = JSON.parse(text); } catch { /* ignore */ }

    if (!res.ok) {
      console.error("HubSpot upsert failed", res.status, text);
      return new Response(JSON.stringify({ ok: false, status: res.status, detail: parsed ?? text }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const contactId = (parsed as { id?: string } | null)?.id ?? null;
    return new Response(JSON.stringify({ ok: true, contactId }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("hubspot-upsert-contact error", e);
    return new Response(JSON.stringify({ ok: false, error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});