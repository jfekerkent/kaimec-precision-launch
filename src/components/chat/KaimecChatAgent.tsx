import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, RotateCcw } from "lucide-react";
import { useKaimecChat } from "@/hooks/useChat";
import ConsultCTA from "./ConsultCTA";

const CALENDLY_FALLBACK = "https://calendly.com/kaimec/consult";

export default function KaimecChatAgent() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const { messages, loading, sendMessage, reset } = useKaimecChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, loading]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim() || loading) return;
    sendMessage(draft);
    setDraft("");
  };

  return (
    <>
      {!open && (
        <button
          aria-label="Open KaiMec chat"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#F5A623] shadow-lg transition-transform hover:scale-105"
        >
          <MessageCircle className="h-6 w-6" color="#1a1a1a" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-[60] flex h-[560px] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#1a1a1a] text-white shadow-2xl">
          <header className="flex items-center justify-between border-b border-white/10 bg-[#111] px-4 py-3">
            <div>
              <div className="text-sm font-semibold text-[#F5A623]">KaiMec Product Expert</div>
              <div className="text-xs text-white/60">Typically replies instantly</div>
            </div>
            <div className="flex items-center gap-1">
              <button
                aria-label="Reset chat"
                onClick={reset}
                className="rounded p-1.5 text-white/60 hover:bg-white/10 hover:text-white"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="rounded p-1.5 text-white/60 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-[#F5A623] text-[#1a1a1a]"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {m.content}
                  {m.toolCalls?.some((t) => t.name === "offer_consultation") && (
                    <div className="mt-2">
                      <ConsultCTA
                        url={
                          (m.toolCalls.find((t) => t.name === "offer_consultation")?.input
                            ?.url as string) || CALENDLY_FALLBACK
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-lg bg-white/10 px-3 py-2 text-sm text-white/70">…</div>
              </div>
            )}
          </div>

          <form onSubmit={submit} className="flex items-center gap-2 border-t border-white/10 bg-[#111] p-3">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type your message…"
              className="flex-1 rounded-md border border-white/10 bg-[#1a1a1a] px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-[#F5A623] focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !draft.trim()}
              aria-label="Send message"
              className="flex h-9 w-9 items-center justify-center rounded-md bg-[#F5A623] text-[#1a1a1a] transition-opacity disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}