import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Savannah Space was founded in Nairobi in 2018 by Cherie Kihato, starting with KSh 20,000 in savings. Today its own workshop of 13 carpenters and a guild of ~15 independent artisan partners build furniture to order in Kenya.",
};

/* Phase 2 stub — the full editorial treatment lands in Phase 3. */
export default function StoryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <p className="eyebrow text-terracotta">Since 2018</p>
      <h1 className="mt-3 font-display text-3xl uppercase tracking-[0.1em] text-chocolate sm:text-5xl">
        Our Story
      </h1>
      <div className="mt-8 space-y-5 text-sm leading-relaxed text-ink/80 sm:text-base">
        <p>
          Savannah Space was founded in Nairobi in 2018 by Cherie Kihato, who
          started the business with KSh 20,000 in savings. Today the brand runs
          its own workshop of thirteen carpenters — our fundis — and works with
          a curated guild of around fifteen independent artisan partners across
          Kenya: rug weavers, soapstone carvers, seagrass basket weavers,
          woodworkers and welders.
        </p>
        <p>
          Every piece in the catalogue is built to order, not shipped from a
          warehouse. Buy Kenya, Build Kenya.
        </p>
      </div>
      <div className="relative mt-10 aspect-[3/4] max-w-md overflow-hidden bg-blush">
        <Image
          src="/images/story/workshop-fundi.jpg"
          alt="A Savannah Space fundi shaping wood with a router in the Nairobi workshop"
          fill
          sizes="(max-width: 768px) 100vw, 28rem"
          className="object-cover"
        />
      </div>
    </div>
  );
}
