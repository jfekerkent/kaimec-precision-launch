import { useEffect } from "react";

const SITE_URL = "https://kaimec-industrial-hub.lovable.app";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "product";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

function upsertMeta(selector: string, create: () => HTMLElement, set: (el: HTMLElement) => void) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  set(el);
  return el;
}

export default function Seo({ title, description, path, type = "website", jsonLd }: SeoProps) {
  useEffect(() => {
    const url = SITE_URL + path;
    document.title = title;

    upsertMeta(
      'meta[name="description"]',
      () => Object.assign(document.createElement("meta"), { name: "description" }),
      (el) => el.setAttribute("content", description),
    );

    // Remove any extra canonicals, keep one
    const canonicals = document.head.querySelectorAll('link[rel="canonical"]');
    canonicals.forEach((c, i) => { if (i > 0) c.remove(); });
    upsertMeta(
      'link[rel="canonical"]',
      () => Object.assign(document.createElement("link"), { rel: "canonical" }),
      (el) => el.setAttribute("href", url),
    );

    const og: Record<string, string> = {
      "og:title": title,
      "og:description": description,
      "og:url": url,
      "og:type": type,
      "twitter:title": title,
      "twitter:description": description,
    };
    Object.entries(og).forEach(([prop, value]) => {
      const isName = prop.startsWith("twitter:");
      const selector = isName ? `meta[name="${prop}"]` : `meta[property="${prop}"]`;
      upsertMeta(
        selector,
        () => {
          const m = document.createElement("meta");
          if (isName) m.setAttribute("name", prop);
          else m.setAttribute("property", prop);
          return m;
        },
        (el) => el.setAttribute("content", value),
      );
    });

    let scriptEl: HTMLScriptElement | null = null;
    if (jsonLd) {
      scriptEl = document.createElement("script");
      scriptEl.type = "application/ld+json";
      scriptEl.dataset.seoPage = path;
      scriptEl.text = JSON.stringify(jsonLd);
      document.head.appendChild(scriptEl);
    }
    return () => {
      if (scriptEl) scriptEl.remove();
    };
  }, [title, description, path, type, jsonLd]);

  return null;
}