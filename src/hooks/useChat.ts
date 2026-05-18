import { useCallback, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { supabase } from "@/integrations/supabase/client";
import type { ChatMessage, ChatResponse, ToolCall } from "@/agent/types";

const SESSION_KEY = "kaimec_chat_session_id";
const HISTORY_KEY = "kaimec_chat_history";

const EMAILJS_SERVICE_ID = "service_oiwu4ak";
const EMAILJS_TEAM_TEMPLATE = "template_dsbjz8n";
const EMAILJS_REPLY_TEMPLATE = "template_8ghnppm";
const EMAILJS_PUBLIC_KEY = "auMQyoP8IUFm3ImJd";

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Hey — I'm the Kaimec product expert. Tell me what you're looking to cut, bend, or punch and I'll help find the right machine. What's the application?",
};

function uuid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = uuid();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function loadHistory(): ChatMessage[] {
  if (typeof window === "undefined") return [GREETING];
  try {
    const raw = sessionStorage.getItem(HISTORY_KEY);
    if (!raw) return [GREETING];
    const parsed = JSON.parse(raw) as ChatMessage[];
    return Array.isArray(parsed) && parsed.length ? parsed : [GREETING];
  } catch {
    return [GREETING];
  }
}

function fireLeadEmail(input: Record<string, unknown>) {
  const name = String(input.name ?? "");
  const email = String(input.email ?? "");
  const machine = String(input.machine_of_interest ?? "") || "(not specified)";
  const priority = String(input.timeline ?? "") || "(not specified)";
  const application = String(input.application ?? "");
  const notes = String(input.notes ?? "");

  const teamParams = {
    name,
    email,
    company: "(captured via AI Chat Agent)",
    address: "",
    machine,
    priority,
    additional_details:
      "Application: " + application + "\nNotes: " + notes + "\n\nSource: AI Chat Agent",
  };

  emailjs
    .send(EMAILJS_SERVICE_ID, EMAILJS_TEAM_TEMPLATE, teamParams, EMAILJS_PUBLIC_KEY)
    .then(() => {
      // Fire-and-forget auto-reply to the visitor
      emailjs
        .send(
          EMAILJS_SERVICE_ID,
          EMAILJS_REPLY_TEMPLATE,
          { name, email, machine },
          EMAILJS_PUBLIC_KEY,
        )
        .catch((err) => console.warn("EmailJS auto-reply failed", err));
    })
    .catch((err) => console.warn("EmailJS lead notify failed", err));
}

export function useKaimecChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadHistory());
  const [loading, setLoading] = useState(false);
  const sessionIdRef = useRef<string>("");

  useEffect(() => {
    sessionIdRef.current = getSessionId();
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(HISTORY_KEY, JSON.stringify(messages));
    } catch { /* ignore quota */ }
  }, [messages]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke<ChatResponse>("chat", {
        body: {
          sessionId: sessionIdRef.current || getSessionId(),
          messages: next.map(({ role, content }) => ({ role, content })),
        },
      });

      if (error || !data) {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: "Connection hiccup. Try again, or call 714-258-8526." },
        ]);
        return;
      }

      const toolCalls: ToolCall[] = (data.toolCalls ?? []) as ToolCall[];

      // Fire EmailJS notification for any captured leads
      const leadCall = toolCalls.find((t) => t.name === "capture_lead");
      if (leadCall) fireLeadEmail(leadCall.input);

      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply, toolCalls },
      ]);
    } catch (e) {
      console.error(e);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Connection hiccup. Try again, or call 714-258-8526." },
      ]);
    } finally {
      setLoading(false);
    }
  }, [messages, loading]);

  const reset = useCallback(() => {
    setMessages([GREETING]);
    sessionStorage.removeItem(HISTORY_KEY);
    const id = uuid();
    sessionStorage.setItem(SESSION_KEY, id);
    sessionIdRef.current = id;
  }, []);

  return { messages, loading, sendMessage, reset };
}