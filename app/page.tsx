import Link from "next/link";
import PieceCard from "@/components/PieceCard";
import { COLLECTIONS, getAllPieces, getPiecesInCollection } from "@/lib/products";
import { SITE } from "@/lib/site";

/*
  Phase 2 placeholder home — plain but complete. The full editorial treatment
  (motion, charcoal workshop band, tonal journey) lands in Phase 3.
*/
export default function HomePage() {
  const featured = getAllPieces().filter((p) => p.featured);

  return (
    <div className="mx-auto max-w-6xl px-4">
      <section className="py-20 text-center sm:py-28">
        <p className="eyebrow text-terracotta">Made in Kenya</p>
        <h1 className="mt-4 font-display text-4xl uppercase tracking-[0.18em] text-chocolate sm:text-6xl">
          Savannah Space
        </h1>
        <p className="mt-5 font-display text-xl italic text-ink/80 sm:text-2xl">
          {SITE.tagline}
        </p>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-ink/70">
          Furniture and home decor handcrafted to order in Nairobi since 2018 —
          by our own workshop of thirteen fundis and a guild of independent
          Kenyan artisans.
        </p>
        <Link
          href="/collections"
          className="mt-8 inline-block bg-chocolate px-8 py-3 text-sm font-medium tracking-wide text-bone transition-opacity hover:opacity-90"
        >
          Browse the collections
        </Link>
      </section>

      {featured.length > 0 && (
        <section className="border-t border-line py-14">
          <p className="eyebrow text-ink/70">Featured pieces</p>
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
            {featured.map((piece) => (
              <PieceCard key={piece.slug} piece={piece} priority />
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-line py-14">
        <p className="eyebrow text-ink/70">Collections</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
          {COLLECTIONS.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="font-display text-lg text-chocolate transition-colors hover:text-terracotta"
            >
              {c.name}
              <span className="ml-2 text-sm text-ink/50">
                {getPiecesInCollection(c.slug).length}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
