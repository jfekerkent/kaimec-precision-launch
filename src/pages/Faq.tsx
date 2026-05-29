import { useEffect, useMemo, useRef, useState } from "react";
import { Search, ArrowUp, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS, FAQ_CATEGORIES, type FaqCategory } from "@/data/faq";

const slugify = (c: string) =>
  "cat-" + c.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function Faq() {
  const [query, setQuery] = useState("");
  const [showTop, setShowTop] = useState(false);
  const [activeCat, setActiveCat] = useState<FaqCategory>(FAQ_CATEGORIES[0]);
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    document.title = "FAQ | Kaimec Fiber Lasers & CNC Press Brakes";
    const desc =
      "Answers about Kaimec fiber laser cutting machines, CNC press brakes, components, software, support, and service.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.origin + "/faq");

    // JSON-LD FAQPage
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.id = "faq-jsonld";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            f.answer +
            (f.bullets ? " " + f.bullets.join("; ") : "") +
            (f.closing ? " " + f.closing : ""),
        },
      })),
    });
    document.getElementById("faq-jsonld")?.remove();
    document.head.appendChild(ld);
    return () => {
      document.getElementById("faq-jsonld")?.remove();
    };
  }, []);

  // Scroll listener for back-to-top
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Deep link via hash (e.g. #q-11)
  useEffect(() => {
    const hash = window.location.hash;
    const m = hash.match(/^#q-(\d+)$/);
    if (!m) return;
    const id = `q-${m[1]}`;
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setOpenItem(id);
      }
    }, 200);
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!q) return FAQS;
    return FAQS.filter((f) => {
      const hay = (
        f.question +
        " " +
        f.answer +
        " " +
        (f.bullets?.join(" ") ?? "") +
        " " +
        (f.closing ?? "")
      ).toLowerCase();
      return hay.includes(q);
    });
  }, [q]);

  const byCategory = useMemo(() => {
    const map: Record<string, typeof FAQS> = {};
    for (const c of FAQ_CATEGORIES) map[c] = [];
    for (const f of filtered) map[f.category].push(f);
    return map;
  }, [filtered]);

  const scrollToCategory = (c: FaqCategory) => {
    setActiveCat(c);
    const el = sectionRefs.current[c];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 180;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <Layout>
      {/* Compact hero */}
      <section className="bg-[#1a1a1a] py-12 md:py-16">
        <div className="container">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
            Frequently Asked <span className="text-[#F5A623]">Questions</span>
          </h1>
          <p className="mt-3 max-w-3xl text-sm md:text-base text-white/70">
            Everything you need to know about Kaimec fiber laser cutting machines, CNC press brakes,
            support, and service.
          </p>
        </div>
      </section>

      {/* Sticky search + filter bar */}
      <div className="sticky top-20 z-30 border-b border-border bg-[#111] shadow-md">
        <div className="container py-3 space-y-3">
          <div className="relative max-w-2xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full rounded-md border border-white/10 bg-[#1a1a1a] py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/40 focus:border-[#F5A623] focus:outline-none"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {FAQ_CATEGORIES.map((c) => {
              const count = byCategory[c]?.length ?? 0;
              const isActive = activeCat === c;
              return (
                <button
                  key={c}
                  onClick={() => scrollToCategory(c)}
                  disabled={count === 0}
                  className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-[#F5A623] border-[#F5A623] text-[#1a1a1a]"
                      : "bg-transparent border-white/20 text-white/80 hover:border-[#F5A623] hover:text-[#F5A623]"
                  } ${count === 0 ? "opacity-30 cursor-not-allowed" : ""}`}
                >
                  {c} <span className="opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAQ sections */}
      <section className="bg-background py-12">
        <div className="container max-w-4xl space-y-12">
          {FAQ_CATEGORIES.map((c) => {
            const items = byCategory[c];
            if (!items || items.length === 0) return null;
            return (
              <section
                key={c}
                id={slugify(c)}
                ref={(el) => (sectionRefs.current[c] = el)}
              >
                <h2 className="mb-6 inline-block border-b-4 border-[#F5A623] pb-1 text-2xl md:text-3xl font-black uppercase tracking-tight text-foreground">
                  {c}
                </h2>
                <Accordion
                  type="single"
                  collapsible
                  value={openItem}
                  onValueChange={setOpenItem}
                  className="space-y-2"
                >
                  {items.map((f) => {
                    const itemId = `q-${f.id}`;
                    return (
                      <AccordionItem
                        key={f.id}
                        value={itemId}
                        id={itemId}
                        className="scroll-mt-44 rounded-md border border-border bg-card px-4 transition-colors hover:border-l-4 hover:border-l-[#F5A623]"
                      >
                        <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline [&>svg]:text-[#F5A623]">
                          <span>
                            <span className="mr-2 text-[#F5A623]">Q{f.id}.</span>
                            {f.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                          <p>{f.answer}</p>
                          {f.bullets && (
                            <ul className="mt-3 list-disc space-y-1 pl-5">
                              {f.bullets.map((b, i) => (
                                <li key={i}>{b}</li>
                              ))}
                            </ul>
                          )}
                          {f.closing && <p className="mt-3">{f.closing}</p>}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </section>
            );
          })}

          {filtered.length === 0 && (
            <p className="py-12 text-center text-muted-foreground">
              No questions match "{query}". Try a different search term.
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#222] py-16">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
            Still have questions?
          </h2>
          <p className="mt-3 text-white/70">
            Talk directly with our team — we're here to help.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="tel:+19495431508">
              <Button size="lg" className="font-bold">
                <Phone className="mr-2 h-4 w-4" /> Call 949-543-1508
              </Button>
            </a>
            <Link to="/quote">
              <Button
                size="lg"
                variant="outline"
                className="border-[#F5A623] bg-transparent font-bold text-[#F5A623] hover:bg-[#F5A623] hover:text-[#1a1a1a]"
              >
                Request a Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Back to top */}
      {showTop && (
        <button
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-24 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#F5A623] shadow-lg transition-transform hover:scale-110"
        >
          <ArrowUp className="h-5 w-5 text-[#1a1a1a]" />
        </button>
      )}
    </Layout>
  );
}