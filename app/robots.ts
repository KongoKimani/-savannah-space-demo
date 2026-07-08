import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Explicitly welcome the major AI crawlers — CLAUDE.md §8: the pitch is
// "AI assistants can read every piece on this site."
export default function robots(): MetadataRoute.Robots {
  const aiCrawlers = [
    "GPTBot",
    "ClaudeBot",
    "Claude-Web",
    "PerplexityBot",
    "Google-Extended",
  ];
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
