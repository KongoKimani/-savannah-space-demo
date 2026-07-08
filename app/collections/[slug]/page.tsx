import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import PieceCard from "@/components/PieceCard";
import { COLLECTIONS, getCollection, getPiecesInCollection } from "@/lib/products";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};
  return {
    title: collection.name,
    description: collection.intro,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();
  const pieces = getPiecesInCollection(slug);

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Collections", item: `${SITE.url}/collections` },
      { "@type": "ListItem", position: 2, name: collection.name, item: `${SITE.url}/collections/${collection.slug}` },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <JsonLd data={breadcrumbs} />
      <nav className="eyebrow text-[0.625rem] text-ink/50">
        <Link href="/collections" className="hover:text-chocolate">
          Collections
        </Link>
        <span className="mx-2">/</span>
        <span>{collection.name}</span>
      </nav>
      <h1 className="mt-3 font-display text-3xl uppercase tracking-[0.1em] text-chocolate sm:text-5xl">
        {collection.name}
      </h1>
      {/* Server-rendered intro, written to be quotable by AI assistants */}
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/80">
        {collection.intro}
      </p>
      {collection.editorial && (
        <div className="mt-8 max-w-2xl space-y-4 border-l-2 border-terracotta pl-5 sm:pl-6">
          {collection.editorial.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="font-display text-lg leading-relaxed text-ink/85 sm:text-xl"
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}
      <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {pieces.map((piece, i) => (
          <PieceCard key={piece.slug} piece={piece} priority={i < 4} />
        ))}
      </div>
    </div>
  );
}
