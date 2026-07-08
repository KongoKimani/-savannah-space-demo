import Image from "next/image";
import Link from "next/link";
import TonalBand from "@/components/motion/TonalBand";
import { ClipReveal, Parallax, Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { COLLECTIONS, getAllPieces, getPiecesInCollection, priceInfo } from "@/lib/products";
import { SITE, formatKsh, whatsappLink } from "@/lib/site";

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

const WORKSHOP_FACTS = [
  ["13", "fundis in our own Nairobi workshop"],
  ["~15", "independent artisan partners in the guild"],
  ["5–8", "weeks to build each piece, from deposit"],
] as const;

export default function HomePage() {
  const featured = getAllPieces().filter((p) => p.featured);

  return (
    <div>
      {/* ---- Chapter 0 · Full-viewport statement hero ---- */}
      <section className="relative flex min-h-[100dvh] items-center overflow-hidden">
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
          className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/35 to-charcoal/20"
        />
        {/* hairline frame, inset like a plate mark */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-3 border border-bone/30 sm:inset-5"
        />
        <div className="relative mx-auto w-full max-w-6xl px-6 text-center sm:px-8">
          <Reveal>
            <p className="eyebrow text-bone/90">Made in Kenya · Since 2018</p>
            <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl leading-[1.15] text-bone sm:text-6xl lg:text-7xl">
              Where African heritage{" "}
              <span className="italic">lives in design.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-bone/80">
              Furniture built to order by thirteen fundis and a guild of Kenyan
              artisans — never shipped from a warehouse.
            </p>
          </Reveal>
        </div>
        <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-3 sm:bottom-10">
          <span className="eyebrow text-[0.5625rem] text-bone/70">Scroll</span>
          <span aria-hidden className="h-10 w-px bg-bone/50" />
        </div>
      </section>

      {/* ---- Statement interlude + wood index ---- */}
      <section className="px-6 py-20 text-center sm:py-28">
        <Reveal className="mx-auto max-w-3xl">
          <p className="font-display text-3xl leading-snug text-chocolate sm:text-5xl">
            Every piece has a name.
            <br />
            <span className="italic text-terracotta">Every name has a maker.</span>
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mx-auto mt-12 max-w-2xl border-y border-line py-6">
          <p className="eyebrow text-[0.625rem] leading-loose text-ink/70">
            {WOODS.map((wood, i) => (
              <span key={wood} className="inline-block whitespace-nowrap">
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

      {/* ---- Chapters 01–03 · Featured pieces as immersive scenes ---- */}
      {featured.map((piece, i) => {
        const { price, isFrom } = priceInfo(piece);
        return (
          <section key={piece.slug} className="relative">
            <Link href={`/pieces/${piece.slug}`} className="group block">
              <ClipReveal>
                <div className="relative h-[72dvh] overflow-hidden bg-blush sm:h-[88dvh]">
                  <Image
                    src={piece.images[0]}
                    alt={`${piece.name}, handcrafted in Kenya by Savannah Space`}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/60 to-charcoal/10"
                  />
                  <div className="absolute inset-x-0 bottom-0 px-6 pb-10 sm:px-10 sm:pb-14">
                    <div className="mx-auto max-w-6xl">
                      <p className="eyebrow text-[0.625rem] text-bone/90">
                        <span className="text-marigold">
                          {String(i + 1).padStart(2, "0")}
                        </span>{" "}
                        — The pieces
                      </p>
                      <h2 className="mt-3 font-display text-3xl uppercase tracking-[0.08em] text-bone sm:text-5xl">
                        {piece.name}
                      </h2>
                      {piece.name_note && (
                        <p className="mt-2 font-display text-base italic text-bone/80 sm:text-lg">
                          {piece.name_note}
                        </p>
                      )}
                      <p className="eyebrow mt-3 text-[0.5625rem] text-bone/70 sm:text-[0.625rem]">
                        {piece.materials.join(" · ")}
                      </p>
                      <p className="mt-4 font-display text-lg text-bone sm:text-xl">
                        Built to order · {isFrom && "from "}
                        {formatKsh(price)}
                      </p>
                      <span className="eyebrow mt-6 inline-block border-b border-bone/70 pb-1 text-bone transition-colors group-hover:border-bone">
                        View the piece
                      </span>
                    </div>
                  </div>
                </div>
              </ClipReveal>
            </Link>
          </section>
        );
      })}

      {/* ---- The workshop · charcoal tonal band ---- */}
      <TonalBand className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <Reveal className="max-w-3xl">
            <p className="eyebrow opacity-70">The workshop</p>
            <h2 className="mt-5 font-display text-3xl leading-snug sm:text-5xl">
              Nothing here is pulled from a shelf.{" "}
              <span className="italic opacity-90">It is made — for you.</span>
            </h2>
          </Reveal>
          <Stagger className="mt-14 grid gap-10 sm:grid-cols-3">
            {WORKSHOP_FACTS.map(([figure, caption]) => (
              <StaggerItem key={caption}>
                <p className="font-display text-5xl sm:text-6xl">{figure}</p>
                <p className="mt-3 max-w-[16rem] text-base leading-relaxed opacity-75">
                  {caption}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-14 grid items-center gap-10 sm:grid-cols-5 sm:gap-14">
            <Reveal className="sm:col-span-3">
              <p className="max-w-xl text-base leading-relaxed opacity-80">
                Rug weavers, soapstone carvers, seagrass basket weavers,
                woodworkers and welders — a curated guild of Kenyan craftsmen
                and women stands around our own workshop, and their hands carry
                every collection.
              </p>
              <Link
                href="/story"
                className="eyebrow mt-8 inline-block border-b border-current pb-1 transition-opacity hover:opacity-70"
              >
                Read our story
              </Link>
            </Reveal>
            <ClipReveal className="sm:col-span-2">
              <div className="relative aspect-[3/4] max-w-sm overflow-hidden">
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
        </div>
      </TonalBand>

      {/* ---- How it works · vertical rhythm on mobile ---- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <p className="eyebrow text-terracotta">Built to order</p>
            <h2 className="mt-3 font-display text-3xl text-chocolate sm:text-4xl">
              How it works
            </h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-0 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4">
            {HOW_IT_WORKS.map(([title, body], i) => (
              <StaggerItem key={title} className="border-t border-line py-6 lg:border-t-0 lg:py-0">
                <p className="font-display text-3xl text-terracotta">{i + 1}</p>
                <p className="mt-2 font-display text-xl text-chocolate">{title}</p>
                <p className="mt-2 text-base leading-relaxed text-ink/70">{body}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-10">
            <Link
              href="/how-to-order"
              className="eyebrow inline-block border-b border-chocolate pb-2 text-chocolate transition-colors hover:text-terracotta"
            >
              The full ordering guide
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---- Collections teaser ---- */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
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
                <Link href={`/collections/${c.slug}`} className="group block py-1">
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
                  <p className="mt-3 font-display text-base uppercase leading-tight tracking-[0.06em] text-chocolate">
                    {c.name}
                  </p>
                  <p className="eyebrow mt-1 text-[0.5625rem] text-ink/50">
                    {pieces.length} pieces
                  </p>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* ---- Closing statement + showroom ---- */}
      <section className="bg-blush">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center sm:px-8 sm:py-28">
          <Reveal>
            <p className="mx-auto max-w-2xl font-display text-3xl leading-snug text-chocolate sm:text-5xl">
              Built for your home.{" "}
              <span className="italic text-terracotta">Not for a warehouse.</span>
            </p>
            <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-ink/80">
              {SITE.showroom.name}, off James Gichuru Road, Nairobi —{" "}
              {SITE.showroom.note.toLowerCase()}. Open {SITE.showroom.hours}.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={whatsappLink("Hi Savannah Space, I'd like to make an enquiry.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-chocolate px-8 py-4 text-base font-medium tracking-wide text-bone transition-opacity hover:opacity-90 sm:w-auto"
            >
              WhatsApp {SITE.phonePrimary}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="w-full border border-chocolate px-8 py-4 text-base font-medium tracking-wide text-chocolate transition-colors hover:bg-bone sm:w-auto"
            >
              {SITE.email}
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
