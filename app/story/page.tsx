import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import TonalBand from "@/components/motion/TonalBand";
import { ClipReveal, Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Savannah Space was founded in Nairobi in 2018 by Cherie Kihato, starting with KSh 20,000 in savings. Today its own workshop of 13 carpenters (fundis) and a curated guild of ~15 independent artisan partners build furniture to order in Kenya.",
};

const GUILD = [
  "Rug weavers",
  "Soapstone carvers",
  "Seagrass basket weavers",
  "Woodworkers",
  "Welders",
];

export default function StoryPage() {
  return (
    <div>
      {/* Opening */}
      <section className="mx-auto max-w-6xl px-4 pt-16 sm:pt-24">
        <Reveal>
          <p className="eyebrow text-terracotta">Since 2018</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl uppercase leading-tight tracking-[0.08em] text-chocolate sm:text-6xl">
            Where African heritage lives in design
          </h1>
        </Reveal>
        <Reveal delay={0.15} className="mt-8 max-w-2xl">
          <p className="text-base leading-relaxed text-ink/80 sm:text-lg">
            Savannah Space was founded in Nairobi in 2018 by Cherie Kihato, who
            started the business with KSh 20,000 in savings. What began as a
            single idea — furniture that celebrates the vibrancy and beauty of
            Kenya — has grown into a catalogue of named pieces, each one built
            to order rather than pulled from a warehouse shelf.
          </p>
        </Reveal>
      </section>

      {/* Workshop photo + fundis */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:grid-cols-2 sm:gap-14 sm:py-24">
        <ClipReveal>
          <div className="relative aspect-[3/4] overflow-hidden bg-blush">
            <Image
              src="/images/story/workshop-fundi.jpg"
              alt="A Savannah Space fundi shaping wood with a router in the Nairobi workshop"
              fill
              priority
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </ClipReveal>
        <Reveal delay={0.15}>
          <p className="eyebrow text-terracotta">The workshop</p>
          <h2 className="mt-4 font-display text-3xl leading-snug text-chocolate sm:text-4xl">
            Thirteen fundis
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/80">
            Our own workshop in Nairobi is home to thirteen carpenters — our
            fundis. They shape Mvule, Sudanese Teak, Mango, Camphor, Meru Oak
            and Muringa into the pieces in every catalogue, and they build each
            one only after it is ordered. That is why a Savannah Space piece
            takes five to eight weeks: it is being made, by hand, for you.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink/80">
            Nothing here is mass-produced. Grain varies. End-grain tops repeat
            no pattern twice. We think that is the point.
          </p>
        </Reveal>
      </section>

      {/* The guild */}
      <section className="border-y border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow text-terracotta">The guild</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl leading-snug text-chocolate sm:text-4xl">
              Around the workshop, a guild of some fifteen independent artisan
              partners
            </h2>
          </Reveal>
          <Stagger className="mt-10 flex flex-wrap gap-x-3 gap-y-4">
            {GUILD.map((craft) => (
              <StaggerItem key={craft}>
                <span className="eyebrow inline-block border border-line px-4 py-2 text-ink/80">
                  {craft}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-8 max-w-2xl">
            <p className="text-base leading-relaxed text-ink/80">
              The handwoven rugs, the Tonga baskets set into side tables, the
              woven seats and metal legs — these come from a curated circle of
              craftsmen and women around Kenya. Every purchase has a trickle-down
              effect on the lives of our artisans and their families.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Buy Kenya Build Kenya band */}
      <TonalBand className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <Reveal>
            <p className="eyebrow opacity-70">Our promise</p>
            <p className="mx-auto mt-5 max-w-3xl font-display text-3xl italic leading-snug sm:text-5xl">
              Buy Kenya. Build Kenya.
            </p>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed opacity-80 sm:text-base">
              Kenyan woods, Kenyan hands, a Kenyan home for every piece we make.
            </p>
          </Reveal>
        </div>
      </TonalBand>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:py-20">
        <Reveal>
          <h2 className="font-display text-2xl text-chocolate sm:text-3xl">
            See what the workshop is building
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/collections"
              className="bg-chocolate px-8 py-3 text-sm font-medium tracking-wide text-bone transition-opacity hover:opacity-90"
            >
              Browse the collections
            </Link>
            <Link
              href="/how-to-order"
              className="border border-chocolate px-8 py-3 text-sm font-medium tracking-wide text-chocolate transition-colors hover:bg-blush"
            >
              How to order
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
