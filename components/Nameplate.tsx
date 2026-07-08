import { Piece, priceInfo } from "@/lib/products";
import { formatKsh } from "@/lib/site";

/*
  The museum-placard nameplate — CLAUDE.md §4:

    THE KAHAWA BAR
    kahawa — Swahili: coffee            (only if name_note exists)
    MERU OAK · RECYCLED SCANDINAVIAN PINE
    Built to order · Ksh 205,000
*/
export default function Nameplate({
  piece,
  as: Heading = "h1",
}: {
  piece: Piece;
  as?: "h1" | "h2" | "h3";
}) {
  const { price, isFrom } = priceInfo(piece);
  return (
    <div>
      <Heading className="font-display text-3xl uppercase tracking-[0.08em] text-chocolate sm:text-4xl">
        {piece.name}
      </Heading>
      {piece.name_note && (
        <p className="mt-2 font-display text-base italic text-terracotta">
          {piece.name_note}
        </p>
      )}
      <p className="eyebrow mt-3 text-ink/70">{piece.materials.join(" · ")}</p>
      <p className="mt-3 font-display text-xl text-ink">
        Built to order · {isFrom && <span>from </span>}
        {formatKsh(price)}
      </p>
    </div>
  );
}
