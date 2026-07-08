// Data loader — the only module that touches data/products.json.
// (Upgrade path: swap this file's internals for Supabase/Airtable without
// changing any page or component.)

import raw from "@/data/products.json";

export interface Variant {
  label: string;
  price_ksh: number;
  notes?: string[];
  dimensions?: Record<string, number>;
}

export interface Piece {
  slug: string;
  name: string;
  collection: string;
  name_note: string | null;
  materials: string[];
  dimensions: Record<string, number> | null;
  wood_options: string[];
  price_ksh: number;
  price_notes: string[];
  turnaround_weeks: string | null;
  notes: string[];
  featured: boolean;
  images: string[];
  variants: Variant[];
}

export interface Collection {
  slug: string;
  name: string;
  intro: string;
  /** Longer editorial treatment, rendered between intro and grid (Bars only for now). */
  editorial?: string[];
}

const pieces = raw as unknown as Piece[];

// Order here is the display order on /collections.
export const COLLECTIONS: Collection[] = [
  {
    slug: "storage-media-units",
    name: "Storage & Media Units",
    intro:
      "Sideboards, TV stands, cabinets and shelving, handcrafted to order in Savannah Space's Nairobi workshop from woods like Mvule, Sudanese Teak, Mango and Camphor. Every unit can be customised by wood, colour and dimensions, with prices from Ksh 41,000.",
  },
  {
    slug: "console-tables-desks",
    name: "Console Tables & Desks",
    intro:
      "Consoles and writing desks made to order in Nairobi, from the rattan-fronted Maimuna Desk to the Swala console that converts into a dining table. Built in Mvule, Meru Oak, Mango wood and other Kenyan-workshop hardwoods, from Ksh 68,000.",
  },
  {
    slug: "armchairs-benches",
    name: "Armchairs & Benches",
    intro:
      "Lounge chairs, accent chairs, rocking chairs and benches handmade in Kenya, upholstered in the fabric of your choice over frames of recycled Scandinavian pine, Mvule and Camphor. Each piece is built to order, from Ksh 35,000.",
  },
  {
    slug: "coffee-tables",
    name: "Coffee Tables",
    intro:
      "Coffee and side tables handcrafted in Nairobi — end-grain tops, glass-topped sculptural bases and solid slab designs in Mvule, Mango, Sudanese Teak and Indian Teak. Made to order and customisable by wood, from Ksh 44,000.",
  },
  {
    slug: "dining-tables-chairs",
    name: "Dining Tables & Chairs",
    intro:
      "Six- and eight-seater dining tables, chairs and bar stools built to order by Savannah Space's Nairobi fundis, including live-edge and irregular-edge mango slab tables where no two pieces are the same. Dining chairs start at Ksh 30,000.",
  },
  {
    slug: "sofas",
    name: "Sofas",
    intro:
      "Nine sofa designs handmade in Nairobi on cypress and recycled Scandinavian pine frames, with high-density foam, spring pockets and Dacron lining. Upholstered in the fabric of your choice and built to order, from Ksh 123,200.",
  },
  {
    slug: "beds",
    name: "Beds",
    intro:
      "Handcrafted beds in Mvule, Muringa, Mango and Camphor — spindle, rattan-arch and upholstered designs, each made to order in 4x6ft, 5x6ft and 6x6ft sizes. From Ksh 102,000, built in Savannah Space's Nairobi workshop.",
  },
  {
    slug: "woven-rugs",
    name: "Woven Rugs",
    intro:
      "Thirty-nine handwoven rug designs made to order by Savannah Space's partner weavers in Kenya, in ten sizes from 2x4ft (Ksh 16,000) to 8x10ft (Ksh 158,000), including runners. Expect slight colour variation — every rug is handmade.",
  },
  {
    slug: "home-bars",
    name: "Home Bars",
    intro:
      "Drinks cabinets and bar carts handcrafted to order in Nairobi — from the Mvule Oromo Bar to the Kahawa Bar in Meru Oak with recycled Scandinavian pine interiors. Customisable by wood and colour, from Ksh 91,000.",
    editorial: [
      "Every bar here is named — Oromo, Simona, Braided, Oya, Kuba, Kahawa (Swahili for coffee), Aoro, Ambo — and every one is built only after it is ordered. Cabinets come in solid Mvule, Mango and Meru Oak, or in painted block board finished in Duracoat colours like Pond Moss and Aqua Electra over interiors of recycled Scandinavian pine.",
      "Doors open onto fitted wine racks and stemware rails; metal legs can be added to most designs for Ksh 2,500. Choose your wood, choose your colour, and allow five to eight weeks from deposit — a bar made for you, not shipped from a warehouse.",
    ],
  },
  {
    slug: "drawer-chests-bedside-tables",
    name: "Drawer Chests & Bedside Tables",
    intro:
      "Drawer chests, bedside tables and side tables made to order in Kenya, in Mango, Mvule, Sudanese Teak and Camphor with details like rattan fronts, hessian drawers, brass knobs and handwoven Tonga baskets. From Ksh 30,000.",
  },
];

export function getAllPieces(): Piece[] {
  return pieces;
}

export function getPiece(slug: string): Piece | undefined {
  return pieces.find((p) => p.slug === slug);
}

export function getCollection(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}

export function getPiecesInCollection(slug: string): Piece[] {
  return pieces.filter((p) => p.collection === slug);
}

export function getRelatedPieces(piece: Piece, count = 3): Piece[] {
  const siblings = pieces.filter(
    (p) => p.collection === piece.collection && p.slug !== piece.slug
  );
  // Deterministic but varied: start after the piece's own position.
  const idx = siblings.findIndex((p) => p.slug > piece.slug);
  const start = idx === -1 ? 0 : idx;
  return [...siblings.slice(start), ...siblings.slice(0, start)].slice(0, count);
}

/** Lowest price plus whether higher-priced variants exist ("From Ksh …"). */
export function priceInfo(piece: Piece): { price: number; isFrom: boolean } {
  if (piece.variants.length > 0) {
    const prices = piece.variants.map((v) => v.price_ksh);
    return { price: Math.min(...prices), isFrom: new Set(prices).size > 1 };
  }
  return { price: piece.price_ksh, isFrom: false };
}

/** "total_depth_cm" -> "Total depth" */
export function dimensionLabel(key: string): string {
  const words = key.replace(/_cm$/, "").replace(/_/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export function pieceAlt(piece: Piece, index: number): string {
  const material = piece.materials[0] ? ` in ${piece.materials[0].toLowerCase()}` : "";
  const view = piece.images.length > 1 ? ` — view ${index + 1} of ${piece.images.length}` : "";
  return `${piece.name}${material}, handcrafted in Kenya by Savannah Space${view}`;
}
