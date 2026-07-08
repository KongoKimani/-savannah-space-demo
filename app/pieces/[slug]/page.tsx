import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import JsonLd from "@/components/JsonLd";
import { getBlur } from "@/lib/blur";
import Nameplate from "@/components/Nameplate";
import OrderPanel from "@/components/OrderPanel";
import PieceCard from "@/components/PieceCard";
import {
  dimensionLabel,
  getAllPieces,
  getCollection,
  getPiece,
  getRelatedPieces,
  pieceAlt,
  priceInfo,
} from "@/lib/products";
import { SITE, formatKsh } from "@/lib/site";

export function generateStaticParams() {
  return getAllPieces().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const piece = getPiece(slug);
  if (!piece) return {};
  const { price, isFrom } = priceInfo(piece);
  const description = `${piece.name} — handcrafted in ${piece.materials
    .join(", ")
    .toLowerCase()}, made to order in Nairobi by Savannah Space. ${
    isFrom ? "From " : ""
  }${formatKsh(price)} (excluding delivery).`;
  return {
    title: piece.name,
    description,
    openGraph: { images: piece.images.slice(0, 1) },
  };
}

const ORDER_STEPS = [
  ["Enquire", "WhatsApp, Instagram DM or email us with the piece you'd like."],
  ["70% deposit", "The build starts — and the turnaround countdown begins — once the deposit is received."],
  ["We build", "Your piece is made by hand in our Nairobi workshop. You have 7 days to change the colour."],
  ["Delivery & balance", "The balance is due within 7 days of delivery. Please measure your space first — sizes can't be returned."],
] as const;

export default async function PiecePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const piece = getPiece(slug);
  if (!piece) notFound();

  const collection = getCollection(piece.collection);
  const related = getRelatedPieces(piece, 3);
  const { price, isFrom } = priceInfo(piece);
  const alts = piece.images.map((_, i) => pieceAlt(piece, i));
  const blurs = piece.images.map((src) => getBlur(src));

  const prices = piece.variants.length
    ? piece.variants.map((v) => v.price_ksh)
    : [piece.price_ksh];
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: piece.name,
    description: `${piece.name} by Savannah Space — handcrafted to order in Nairobi, Kenya. Materials: ${piece.materials.join(", ")}.`,
    image: piece.images.map((src) => `${SITE.url}${src}`),
    brand: { "@type": "Brand", name: "Savannah Space" },
    material: piece.materials.join(", "),
    url: `${SITE.url}/pieces/${piece.slug}`,
    offers:
      new Set(prices).size > 1
        ? {
            "@type": "AggregateOffer",
            priceCurrency: "KES",
            lowPrice: Math.min(...prices),
            highPrice: Math.max(...prices),
            offerCount: prices.length,
            availability: "https://schema.org/MadeToOrder",
          }
        : {
            "@type": "Offer",
            priceCurrency: "KES",
            price: prices[0],
            availability: "https://schema.org/MadeToOrder",
          },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Collections", item: `${SITE.url}/collections` },
      { "@type": "ListItem", position: 2, name: collection?.name ?? piece.collection, item: `${SITE.url}/collections/${piece.collection}` },
      { "@type": "ListItem", position: 3, name: piece.name, item: `${SITE.url}/pieces/${piece.slug}` },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbs} />

      <nav className="eyebrow text-[0.625rem] text-ink/50">
        <Link href="/collections" className="hover:text-chocolate">Collections</Link>
        <span className="mx-2">/</span>
        <Link href={`/collections/${piece.collection}`} className="hover:text-chocolate">
          {collection?.name ?? piece.collection}
        </Link>
        <span className="mx-2">/</span>
        <span>{piece.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <Gallery images={piece.images} alts={alts} blurs={blurs} />

        <div>
          <Nameplate piece={piece} />

          <div className="mt-8">
            <OrderPanel piece={piece} />
          </div>

          {/* Spec table */}
          <div className="mt-10 border-t border-line pt-6">
            <p className="eyebrow text-ink/70">Details</p>
            <dl className="mt-3 divide-y divide-line text-sm">
              <div className="flex justify-between gap-6 py-2">
                <dt className="text-ink/60">Materials</dt>
                <dd className="text-right">{piece.materials.join(", ")}</dd>
              </div>
              {piece.dimensions &&
                Object.entries(piece.dimensions).map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-6 py-2">
                    <dt className="text-ink/60">{dimensionLabel(key)}</dt>
                    <dd className="text-right">{value} cm</dd>
                  </div>
                ))}
              {piece.variants.some((v) => v.dimensions) &&
                piece.variants
                  .filter((v) => v.dimensions)
                  .map((v) => (
                    <div key={v.label} className="flex justify-between gap-6 py-2">
                      <dt className="text-ink/60">{v.label}</dt>
                      <dd className="text-right">
                        {Object.entries(v.dimensions!)
                          .map(([k, val]) => `${dimensionLabel(k)} ${val} cm`)
                          .join(" · ")}
                      </dd>
                    </div>
                  ))}
              <div className="flex justify-between gap-6 py-2">
                <dt className="text-ink/60">Turnaround</dt>
                <dd className="text-right">
                  {piece.turnaround_weeks
                    ? `About ${piece.turnaround_weeks.replace("-", "–")} weeks from deposit`
                    : "Built to order — most pieces take about 5–8 weeks from deposit"}
                </dd>
              </div>
            </dl>
          </div>

          {piece.notes.length > 0 && (
            <div className="mt-8">
              <p className="eyebrow text-ink/70">Please note</p>
              <ul className="mt-3 space-y-2 text-base leading-relaxed text-ink/80">
                {piece.notes.map((note) => (
                  <li key={note} className="flex gap-2">
                    <span aria-hidden className="text-terracotta">·</span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mini "how ordering works" */}
      <section className="mt-16 border-t border-line pt-10">
        <p className="eyebrow text-ink/70">How ordering works</p>
        <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ORDER_STEPS.map(([title, body], i) => (
            <li key={title}>
              <p className="font-display text-2xl text-terracotta">{i + 1}</p>
              <p className="mt-1 font-display text-lg text-chocolate">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink/70">{body}</p>
            </li>
          ))}
        </ol>
        <Link href="/how-to-order" className="eyebrow mt-6 inline-block text-chocolate hover:text-terracotta">
          Full ordering guide →
        </Link>
      </section>

      {related.length > 0 && (
        <section className="mt-16 border-t border-line pt-10">
          <p className="eyebrow text-ink/70">More from {collection?.name}</p>
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
            {related.map((p) => (
              <PieceCard key={p.slug} piece={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
