import type { MetadataRoute } from "next";
import { COLLECTIONS, getAllPieces } from "@/lib/products";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const statics = ["", "/collections", "/story", "/how-to-order"].map((path) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const collections = COLLECTIONS.map((c) => ({
    url: `${SITE.url}/collections/${c.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const pieces = getAllPieces().map((p) => ({
    url: `${SITE.url}/pieces/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...statics, ...collections, ...pieces];
}
