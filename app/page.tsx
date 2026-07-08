import Image from "next/image";
import Link from "next/link";
import Nameplate from "@/components/Nameplate";
import TonalBand from "@/components/motion/TonalBand";
import { ClipReveal, Parallax, Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { COLLECTIONS, getAllPieces, getPiecesInCollection } from "@/lib/products";
import { SITE, whatsappLink } from "@/lib/site";

const WOODS = [
  "Mvule",
  "Sudanese Teak",
  "Mango",
  "Camphor",
  "Meru Oak",
  "Muringa",
  "Duom Palm",
  "Indian Teak",
  "Recycled Scandinavian Pine",
];

const HOW_IT_WORKS = [
  ["Enquire", "WhatsApp, Instagram or email us with the piece you'd like."],
  ["70% deposit", "The deposit starts the build — and the countdown."],
  ["We build", "Five to eight weeks in our Nairobi workshop."],
  ["Delivery & balance", "The balance is due within 7 days of delivery."],
] as const;

export default function HomePage() {
  const featured = getAllPieces().filter((p) => p.featured);

  return (
    <div>
      {/* ---- Full-bleed hero ---- */}
      <section className="relative flex min-h-[88dvh] items-end overflow-hidden">
        <Parallax amount={5} className="absolute inset-0">
          <Image
            src="/images/editorial/hero.jpg"
            alt="Handwoven rugs on a display ladder beside African print baskets in the Savannah Space studio"
            fill
            priority
            sizes="100vw"
            className="scale-110 object-cover"
          />
        </Parallax>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent"
        />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-14 sm:pb-20">
          <Reveal>
            <p className="eyebrow text-marigold">Made in Kenya</p>
            <h1 className="mt-3 max-w-2xl font-display text-4xl uppercase leading-tight tracking-[0.1em] text-bone sm:text-6xl">
              Savannah Space
            </h1>
            <p className="mt-4 max-w-xl font-display text-xl italic text-bone/90 sm:text-2xl">
              {SITE.tagline}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- Wood index strip ---- */}
      <section className="border-b border-line">
        <Reveal className="mx-auto max-w-6xl px-4 py-8">
          <p className="eyebrow text-center text-[0.625rem] leading-loose text-ink/70">
            {WOODS.map((wood, i) => (
              <span key={wood}>
                {wood}
                {i < WOODS.length - 1 && (
                  <span aria-hidden className="mx-3 text-terracotta">
                    ·
                  </span>
                )}
              </span>
            ))}
          </p>
        </Reveal>
      </section>

      {/* ---- Featured pieces ---- */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <Reveal>
          <p className="eyebrow text-terracotta">The pieces</p>
          <h2 className="mt-3 font-display text-3xl text-chocolate sm:text-4xl">
            Every piece has a name.
          </h2>
        </Reveal>
        <div className="mt-12 space-y-16 sm:space-y-24">
          {featured.map((piece, i) => (
            <div
              key={piece.slug}
              className={`grid items-center gap-8 sm:grid-cols-2 sm:gap-12 ${
                i % 2 === 1 ? "sm:[&>*:first-child]:order-2" : ""
              }`}
            >
              <ClipReveal>
                <Link href={`/pieces/${piece.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-blush">
                    <Image
                      src={piece.images[0]}
                      alt={`${piece.name}, handcrafted in Kenya by Savannah Space`}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                </Link>
              </ClipReveal>
              <Reveal delay={0.15}>
                <Nameplate piece={piece} as="h3" />
                <Link
                  href={`/pieces/${piece.slug}`}
                  className="eyebrow mt-6 inline-block border-b border-chocolate pb-1 text-chocolate transition-colors hover:text-terracotta"
                >
                  View the piece
                </Link>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Charcoal workshop interlude (tonal journey) ---- */}
      <TonalBand className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:grid-cols-5 sm:gap-14">
          <div className="sm:col-span-3">
            <Reveal>
              <p className="eyebrow opacity-70">The workshop</p>
              <h2 className="mt-4 font-display text-3xl leading-snug sm:text-5xl">
                Thirteen fundis. One workshop. A guild of Kenyan artisans.
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-relaxed opacity-80 sm:text-base">
                Every Savannah Space piece is built to order in our own Nairobi
                workshop by a team of thirteen fundis. Around them stands a
                curated guild of some fifteen independent artisan partners —
                rug weavers, soapstone carvers, seagrass basket weavers,
                woodworkers and welders — whose hands carry every collection.
              </p>
              <Link
                href="/story"
                className="eyebrow mt-8 inline-block border-b border-current pb-1 transition-opacity hover:opacity-70"
              >
                Read our story
              </Link>
            </Reveal>
          </div>
          <ClipReveal className="sm:col-span-2">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/story/workshop-fundi.jpg"
                alt="A Savannah Space fundi shaping wood with a router in the Nairobi workshop"
                fill
                sizes="(max-width: 640px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </ClipReveal>
        </div>
      </TonalBand>

      {/* ---- How it works ---- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow text-terracotta">Built to order</p>
            <h2 className="mt-3 font-display text-3xl text-chocolate sm:text-4xl">
              How it works
            </h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map(([title, body], i) => (
              <StaggerItem key={title}>
                <p className="font-display text-3xl text-terracotta">{i + 1}</p>
                <p className="mt-2 font-display text-xl text-chocolate">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{body}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-8">
            <Link
              href="/how-to-order"
              className="eyebrow inline-block border-b border-chocolate pb-1 text-chocolate transition-colors hover:text-terracotta"
            >
              The full ordering guide
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---- Collections teaser ---- */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <Reveal>
          <p className="eyebrow text-terracotta">The catalogue</p>
          <h2 className="mt-3 font-display text-3xl text-chocolate sm:text-4xl">
            Ten collections
          </h2>
        </Reveal>
        <Stagger className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {COLLECTIONS.map((c) => {
            const pieces = getPiecesInCollection(c.slug);
            const cover = pieces.find((p) => p.featured) ?? pieces[0];
            return (
              <StaggerItem key={c.slug}>
                <Link href={`/collections/${c.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-blush">
                    {cover?.images[0] && (
                      <Image
                        src={cover.images[0]}
                        alt={`${c.name} by Savannah Space`}
                        fill
                        sizes="(max-width: 640px) 50vw, 20vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    )}
                  </div>
                  <p className="mt-2 font-display text-base uppercase tracking-[0.06em] text-chocolate">
                    {c.name}
                  </p>
                  <p className="eyebrow text-[0.5625rem] text-ink/50">
                    {pieces.length} pieces
                  </p>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* ---- Showroom block ---- */}
      <section className="bg-blush">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:grid-cols-2 sm:py-20">
          <Reveal>
            <p className="eyebrow text-terracotta">Visit us</p>
            <h2 className="mt-3 font-display text-3xl text-chocolate sm:text-4xl">
              The showroom
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ink/80 sm:text-base">
              {SITE.showroom.name}, off James Gichuru Road, Nairobi
              <br />
              {SITE.showroom.note}
            </p>
            <p className="mt-2 font-display text-lg text-ink">{SITE.showroom.hours}</p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col items-start justify-center gap-3">
            <a
              href={whatsappLink("Hi Savannah Space, I'd like to make an enquiry.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-chocolate px-8 py-3 text-sm font-medium tracking-wide text-bone transition-opacity hover:opacity-90"
            >
              WhatsApp {SITE.phonePrimary}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="border border-chocolate px-8 py-3 text-sm font-medium tracking-wide text-chocolate transition-colors hover:bg-bone"
            >
              {SITE.email}
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
