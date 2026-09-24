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
  const pieces = getAllPieces();
  const bySlug = (slug: string) => {
    const p = pieces.find((x) => x.slug === slug);
    if (!p) throw new Error(`${slug} missing from products.json`);
    return p;
  };
  const side = (slug: string) => {
    const p = bySlug(slug);
    return { src: p.images[0], blurDataURL: getBlur(p.images[0]), name: p.name };
  };
  const piece = bySlug("oromo-bar");
  const src = piece.images[0];
  const { price, isFrom } = priceInfo(piece);

  return (
    <HomePage
      hero={
        <ArchHero
          src={src}
          blurDataURL={getBlur(src)}
          left={side("aoro-bar")}
          right={side("kahawa-bar")}
          name={piece.name}
          materials={piece.materials.join(" · ")}
          priceLine={`Built to order · ${isFrom ? "from " : ""}${formatKsh(price)}`}
          href={`/pieces/${piece.slug}`}
        />
      }
    />
  );
}
