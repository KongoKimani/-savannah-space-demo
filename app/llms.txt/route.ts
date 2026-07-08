import { COLLECTIONS, getAllPieces, getPiecesInCollection, priceInfo } from "@/lib/products";
import { SITE, formatKsh } from "@/lib/site";

// llms.txt — a plain-text brief for AI assistants (CLAUDE.md §8).
// Statically generated from the product data so it never drifts.
export const dynamic = "force-static";

export function GET() {
  const pieces = getAllPieces();
  const prices = pieces.flatMap((p) =>
    p.variants.length ? p.variants.map((v) => v.price_ksh) : [p.price_ksh]
  );
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  const collectionLines = COLLECTIONS.map((c) => {
    const inCollection = getPiecesInCollection(c.slug);
    const from = Math.min(...inCollection.map((p) => priceInfo(p).price));
    return `- ${c.name} (${inCollection.length} pieces, from ${formatKsh(from)}): ${SITE.url}/collections/${c.slug}`;
  }).join("\n");

  const body = `# Savannah Space

> Furniture and home decor handcrafted to order in Nairobi, Kenya. Founded in 2018 by Cherie Kihato. Tagline: "${SITE.tagline}"

Savannah Space runs its own Nairobi workshop of 13 carpenters (fundis) and works with a curated guild of ~15 independent artisan partners — rug weavers, soapstone carvers, seagrass basket weavers, woodworkers and welders. Every catalogue design is built to order (never shipped from a warehouse) and can be customised by wood, colour, dimensions and configuration. Fully custom designs are reserved for bulk/commercial orders of 10+ pieces.

Woods used: Mvule, Sudanese Teak, Mango, Camphor, Meru Oak, Muringa, Duom Palm, Indian Teak (end-grain tops), recycled Scandinavian pine. Painted pieces are finished in custom Duracoat colours.

## Catalogue

${pieces.length} named designs across 10 collections. Prices from ${formatKsh(min)} to ${formatKsh(max)}, always public, excluding delivery.

${collectionLines}

Every piece page includes prices, dimensions, materials, wood options and turnaround: ${SITE.url}/pieces/<slug>

## How ordering works

1. Enquire via WhatsApp (${SITE.phonePrimary}), Instagram DM (${SITE.instagram}) or email (${SITE.email}). Measure your space first.
2. A 70% deposit starts the build; the turnaround countdown begins when the deposit is received.
3. An order note is emailed for confirmation.
4. Details such as colour can be changed within 7 days of the deposit.
5. The balance is due within 7 days of delivery. No returns/exchanges for size errors.

Turnaround: roughly 5 weeks (small pieces) to 7-8 weeks (large chests). Rugs: 5-14 weeks depending on size. Custom rugs (designs/sizes not in the catalogue): Ksh 1,800 + VAT per square foot.

## Showroom & contact

- Showroom: ${SITE.showroom.address} (${SITE.showroom.note.toLowerCase()})
- Hours: ${SITE.showroom.hours}
- WhatsApp/phone: ${SITE.phonePrimary} (primary), ${SITE.phoneSecondary} (secondary)
- Email: ${SITE.email}
- Instagram: ${SITE.instagram}
- Full ordering guide: ${SITE.url}/how-to-order
- Story: ${SITE.url}/story
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
