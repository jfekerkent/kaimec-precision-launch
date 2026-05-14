import Anthropic from "npm:@anthropic-ai/sdk@0.32.1";
import { createClient } from "npm:@supabase/supabase-js@2";
import { SYSTEM_PROMPT } from "./system-prompt.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY")!;
const ANTHROPIC_MODEL = Deno.env.get("ANTHROPIC_MODEL") ?? "claude-sonnet-4-5";
const CALENDLY_URL = Deno.env.get("CALENDLY_URL") ?? "https://calendly.com/kaimec/20min";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const TURN_CAP = 40;
const RATE_PER_HOUR = 30;
const MAX_USER_CHARS = 2000;

// In-memory rate limiter per IP
const rateMap = new Map<string, { count: number; resetAt: number }>();
function checkRate(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateMap.set(ip, { count: 1, resetAt: now + 3600_000 });
    return true;
  }
  if (entry.count >= RATE_PER_HOUR) return false;
  entry.count++;
  return true;
}

const tools: Anthropic.Tool[] = [
  {
    name: "capture_lead",
    description: "Capture a qualified sales lead. Fire when you have name + email plus at least one of (machine, application, timeline).",
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        machine_of_interest: { type: "string" },
        application: { type: "string" },
        timeline: { type: "string" },
        notes: { type: "string" },
      },
      required: ["name", "email"],
    },
  },
  {
    name: "offer_consultation",
    description: "Offer a 20-minute consultation. Returns a Calendly URL the UI will render as a CTA button.",
    input_schema: {
      type: "object",
      properties: { reason: { type: "string" } },
      required: ["reason"],
    },
  },
  {
    name: "escalate_to_human",
    description: "Escalate to a human sales rep. Use for service issues, anger, or explicit human requests.",
    input_schema: {
      type: "object",
      properties: {
        summary: { type: "string" },
        urgency: { type: "string", enum: ["now", "today", "this_week"] },
      },
      required: ["summary", "urgency"],
    },
  },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    if (!checkRate(ip)) {
      return Response.json({
        reply: "Let's take a breather — you've sent a lot of messages. Try again in a bit, or call us at 714-258-8526.",
        toolCalls: [],
        rateLimited: true,
      }, { headers: corsHeaders });
    }

    const { sessionId, messages } = await req.json() as {
      sessionId: string;
      messages: Array<{ role: "user" | "assistant"; content: string }>;
    };

    if (!sessionId || !Array.isArray(messages)) {
      return Response.json({ error: "Bad request" }, { status: 400, headers: corsHeaders });
    }

    const last = messages[messages.length - 1];
    if (last?.role === "user" && last.content.length > MAX_USER_CHARS) {
      return Response.json({
        reply: "That's a lot to digest in one shot — can you trim it down or break it into a couple of messages?",
        toolCalls: [],
      }, { headers: corsHeaders });
    }

    if (messages.length > TURN_CAP) {
      const toolCalls = [{
        name: "offer_consultation" as const,
        input: { reason: "Conversation cap reached" },
        output: { url: CALENDLY_URL, message: "Booking link ready" },
      }];
      return Response.json({
        reply: "We've covered a lot here. Let me get you 20 minutes with our team to lock in the details.",
        toolCalls,
        capped: true,
      }, { headers: corsHeaders });
    }

    const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

    // Anthropic message loop with tool execution
    const apiMessages: Anthropic.MessageParam[] = messages.map(m => ({
      role: m.role,
      content: m.content,
    }));

    const collectedToolCalls: Array<{ name: string; input: Record<string, unknown>; output?: Record<string, unknown> }> = [];
    let finalText = "";

    for (let step = 0; step < 5; step++) {
      const resp = await anthropic.messages.create({
        model: ANTHROPIC_MODEL,
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        tools,
        messages: apiMessages,
      });

      const toolUses = resp.content.filter(b => b.type === "tool_use") as Anthropic.ToolUseBlock[];
      const textBlocks = resp.content.filter(b => b.type === "text") as Anthropic.TextBlock[];
      finalText = textBlocks.map(b => b.text).join("\n").trim();

      if (toolUses.length === 0) break;

      // Execute tools
      const toolResults: Anthropic.ToolResultBlockParam[] = [];
      for (const tu of toolUses) {
        const input = tu.input as Record<string, unknown>;
        let output: Record<string, unknown> = { ok: true };

        if (tu.name === "offer_consultation") {
          output = { url: CALENDLY_URL, message: "Booking link ready" };
        } else if (tu.name === "capture_lead") {
          const sb = createClient(SUPABASE_URL, SERVICE_ROLE);
          const { data, error } = await sb.from("chat_leads").insert({
            session_id: sessionId,
            name: String(input.name ?? ""),
            email: String(input.email ?? ""),
            machine_of_interest: input.machine_of_interest as string | null ?? null,
            application: input.application as string | null ?? null,
            timeline: input.timeline as string | null ?? null,
            notes: input.notes as string | null ?? null,
          }).select("id").single();
          if (error) console.error("lead insert error", error);
          output = { ok: !error, lead_id: data?.id ?? null };
        } else if (tu.name === "escalate_to_human") {
          const sb = createClient(SUPABASE_URL, SERVICE_ROLE);
          const { error } = await sb.from("chat_escalations").insert({
            session_id: sessionId,
            summary: String(input.summary ?? ""),
            urgency: String(input.urgency ?? "this_week"),
          });
          if (error) console.error("escalation insert error", error);
          output = { ok: !error };
        }

        collectedToolCalls.push({ name: tu.name, input, output });
        toolResults.push({
          type: "tool_result",
          tool_use_id: tu.id,
          content: JSON.stringify(output),
        });
      }

      apiMessages.push({ role: "assistant", content: resp.content });
      apiMessages.push({ role: "user", content: toolResults });

      if (resp.stop_reason !== "tool_use") break;
    }

    // Persist conversation log (full overwrite per turn)
    try {
      const sb = createClient(SUPABASE_URL, SERVICE_ROLE);
      const fullHistory = [...messages, { role: "assistant", content: finalText }];
      await sb.from("chat_logs").upsert({
        session_id: sessionId,
        history: fullHistory,
        turn_count: fullHistory.length,
        updated_at: new Date().toISOString(),
      });
    } catch (e) {
      console.error("log upsert failed", e);
    }

    return Response.json({
      reply: finalText || "(no response)",
      toolCalls: collectedToolCalls,
    }, { headers: corsHeaders });
  } catch (e) {
    console.error("chat error", e);
    return Response.json(
      { error: e instanceof Error ? e.message : "Internal error" },
      { status: 500, headers: corsHeaders },
    );
  }
});