"use client";

import Image from "next/image";
import { useState } from "react";

export default function Gallery({
  images,
  alts,
}: {
  images: string[];
  alts: string[];
}) {
  const [active, setActive] = useState(0);
  if (images.length === 0) return null;
  return (
    <div>
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-blush">
        <Image
          src={images[active]}
          alt={alts[active]}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-6 gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1}`}
              className={`relative aspect-square overflow-hidden bg-blush ${
                i === active ? "outline outline-2 outline-chocolate" : "opacity-80 hover:opacity-100"
              }`}
            >
              <Image src={src} alt={alts[i]} fill sizes="10vw" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
