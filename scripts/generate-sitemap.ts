import { writeFileSync } from "fs"
import { resolve } from "path"

const BASE_URL = "https://kaimec.com"

interface SitemapEntry {
  path: string
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority?: string
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/quote", changefreq: "monthly", priority: "0.8" },
  { path: "/request-info", changefreq: "monthly", priority: "0.6" },
  { path: "/consultation", changefreq: "monthly", priority: "0.7" },
  { path: "/faq", changefreq: "monthly", priority: "0.6" },
  { path: "/quotations", changefreq: "monthly", priority: "0.6" },
  { path: "/dealers", changefreq: "monthly", priority: "0.5" },
  { path: "/machines", changefreq: "monthly", priority: "0.8" },
  { path: "/machines/cnc-fiber-lasers", changefreq: "monthly", priority: "0.8" },
  { path: "/machines/tube-profile-lasers", changefreq: "monthly", priority: "0.8" },
  { path: "/machines/press-brakes", changefreq: "monthly", priority: "0.8" },
  { path: "/machines/gun-drills", changefreq: "monthly", priority: "0.7" },
  { path: "/fiber-lasers", changefreq: "monthly", priority: "0.7" },
  { path: "/tube-profile-lasers", changefreq: "monthly", priority: "0.7" },
  { path: "/press-brakes", changefreq: "monthly", priority: "0.7" },
  { path: "/gun-drills", changefreq: "monthly", priority: "0.7" },
  { path: "/machines/laser-cutting/open-type-fiber-laser", changefreq: "monthly", priority: "0.8" },
  { path: "/machines/laser-cutting/closed-type-fiber-laser", changefreq: "monthly", priority: "0.8" },
  { path: "/machines/laser-cutting/covered-pipe-profile-fiber-laser", changefreq: "monthly", priority: "0.8" },
  { path: "/machines/cnc-fiber-lasers/flc-p-1530", changefreq: "monthly", priority: "0.7" },
  { path: "/gun-drills/gun-drilling-machines", changefreq: "monthly", priority: "0.7" },
  { path: "/gun-drills/bta-deep-hole-drilling", changefreq: "monthly", priority: "0.7" },
]

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  )

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n")
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries))
console.log(`sitemap.xml written (${entries.length} entries)`)