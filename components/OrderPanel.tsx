"use client";

import { useState } from "react";
import { Piece, Variant } from "@/lib/products";
import { emailLink, formatKsh, whatsappLink } from "@/lib/site";
import { trackEnquiryClick } from "@/lib/analytics";

function firstWord(s: string): string {
  return s.split(/[\s·]+/)[0].toLowerCase();
}

/** Conservative wood -> variant match: first words must agree ("Mango wood" -> "Mango · Small"). */
function variantForWood(variants: Variant[], wood: string): Variant | undefined {
  return variants.find((v) => firstWord(v.label) === firstWord(wood));
}

export default function OrderPanel({ piece }: { piece: Piece }) {
  const hasVariants = piece.variants.length > 0;
  const defaultVariant = hasVariants
    ? piece.variants.reduce((a, b) => (b.price_ksh < a.price_ksh ? b : a))
    : null;

  const [variant, setVariant] = useState<Variant | null>(defaultVariant);
  const [wood, setWood] = useState<string | null>(null);

  const price = variant ? variant.price_ksh : piece.price_ksh;

  function selectWood(w: string) {
    const next = wood === w ? null : w;
    setWood(next);
    if (next && hasVariants) {
      const match = variantForWood(piece.variants, next);
      if (match) setVariant(match);
    }
  }

  const woodShownInVariant = wood && variant && firstWord(variant.label) === firstWord(wood);
  const detail =
    (variant ? ` — ${variant.label}` : "") +
    (wood && !woodShownInVariant ? ` in ${wood}` : "");
  const message = `Hi Savannah Space, I'd like to enquire about ${piece.name}${detail} (${formatKsh(price)}).`;

  const activeNotes = variant?.notes ?? [];

  return (
    <div className="border-t border-line pt-6">
      {hasVariants && (
        <div>
          <p className="eyebrow text-ink/70">Options</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {piece.variants.map((v) => (
              <button
                key={v.label}
                type="button"
                onClick={() => setVariant(v)}
                className={`min-h-11 border px-4 py-2 text-sm transition-colors ${
                  variant?.label === v.label
                    ? "border-chocolate bg-chocolate text-bone"
                    : "border-line bg-transparent text-ink hover:border-chocolate"
                }`}
              >
                {v.label} · {formatKsh(v.price_ksh)}
              </button>
            ))}
          </div>
        </div>
      )}

      {piece.wood_options.length > 0 && (
        <div className={hasVariants ? "mt-5" : ""}>
          <p className="eyebrow text-ink/70">Wood</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {piece.wood_options.map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => selectWood(w)}
                className={`min-h-11 border px-4 py-2 text-sm transition-colors ${
                  wood === w
                    ? "border-chocolate bg-chocolate text-bone"
                    : "border-line bg-transparent text-ink hover:border-chocolate"
                }`}
              >
                {w}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-crimson">
            Alternative woods are subject to availability — the price will vary.
          </p>
        </div>
      )}

      <div className="mt-6">
        <p className="font-display text-2xl text-ink">{formatKsh(price)}</p>
        {piece.price_notes.map((n) => (
          <p key={n} className="text-xs text-ink/70">
            {n}
          </p>
        ))}
        {activeNotes.map((n) => (
          <p key={n} className="mt-1 text-xs text-crimson">
            {n}
          </p>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEnquiryClick(piece.name, wood, "whatsapp")}
          className="bg-chocolate px-6 py-4 text-center text-base font-medium tracking-wide text-bone transition-opacity hover:opacity-90"
        >
          Enquire on WhatsApp
        </a>
        <a
          href={emailLink(piece.name)}
          onClick={() => trackEnquiryClick(piece.name, wood, "email")}
          className="border border-chocolate px-6 py-4 text-center text-base font-medium tracking-wide text-chocolate transition-colors hover:bg-blush"
        >
          Enquire by email
        </a>
      </div>
    </div>
  );
}
