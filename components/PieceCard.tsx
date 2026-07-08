import Image from "next/image";
import Link from "next/link";
import { Piece, pieceAlt, priceInfo } from "@/lib/products";
import { formatKsh } from "@/lib/site";

/* Card grid item: image + nameplate-lite (name, materials, price). */
export default function PieceCard({ piece, priority = false }: { piece: Piece; priority?: boolean }) {
  const { price, isFrom } = priceInfo(piece);
  return (
    <Link href={`/pieces/${piece.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-blush">
        {piece.images[0] && (
          <Image
            src={piece.images[0]}
            alt={pieceAlt(piece, 0)}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="mt-3">
        <h3 className="font-display text-lg uppercase tracking-[0.06em] text-chocolate">
          {piece.name}
        </h3>
        <p className="eyebrow mt-1 text-[0.625rem] text-ink/60">
          {piece.materials.slice(0, 2).join(" · ")}
        </p>
        <p className="mt-1 font-display text-base text-ink">
          {isFrom && "from "}
          {formatKsh(price)}
        </p>
      </div>
    </Link>
  );
}
