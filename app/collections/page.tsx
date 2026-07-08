import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { COLLECTIONS, getPiecesInCollection } from "@/lib/products";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Ten collections of made-to-order furniture and decor handcrafted in Nairobi by Savannah Space: storage, consoles and desks, armchairs, coffee tables, dining, sofas, beds, woven rugs, home bars, and drawer chests.",
};

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <p className="eyebrow text-terracotta">Made in Kenya</p>
      <h1 className="mt-3 font-display text-3xl uppercase tracking-[0.1em] text-chocolate sm:text-5xl">
        Collections
      </h1>
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {COLLECTIONS.map((collection) => {
          const pieces = getPiecesInCollection(collection.slug);
          const cover = pieces.find((p) => p.featured) ?? pieces[0];
          return (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-blush">
                {cover?.images[0] && (
                  <Image
                    src={cover.images[0]}
                    alt={`${collection.name} — handcrafted in Kenya by Savannah Space`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                )}
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <h2 className="font-display text-xl uppercase tracking-[0.06em] text-chocolate">
                  {collection.name}
                </h2>
                <span className="eyebrow text-[0.625rem] text-ink/50">
                  {pieces.length} pieces
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
