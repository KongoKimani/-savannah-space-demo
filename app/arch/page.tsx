import type { Metadata } from "next";
import ArchHero from "@/components/arch/ArchHero";
import HomePage from "@/components/home/HomePage";
import { getBlur } from "@/lib/blur";
import { getAllPieces, priceInfo } from "@/lib/products";
import { formatKsh } from "@/lib/site";

// A preview of the alternative opening — kept out of search results.
export const metadata: Metadata = {
  title: "Home (arch opening)",
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

export default function ArchHomePage() {
  const piece = getAllPieces().find((p) => p.slug === "oromo-bar");
  if (!piece) throw new Error("oromo-bar missing from products.json");
  const src = piece.images[0];
  const { price, isFrom } = priceInfo(piece);

  return (
    <HomePage
      hero={
        <ArchHero
          src={src}
          blurDataURL={getBlur(src)}
          name={piece.name}
          materials={piece.materials.join(" · ")}
          priceLine={`Built to order · ${isFrom ? "from " : ""}${formatKsh(price)}`}
          href={`/pieces/${piece.slug}`}
        />
      }
    />
  );
}
