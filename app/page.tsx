import Image from "next/image";
import Link from "next/link";
import CraftWalkthrough from "@/components/CraftWalkthrough";
import TonalBand from "@/components/motion/TonalBand";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { blurProps } from "@/lib/blur";
import {
  COLLECTIONS,
  collectionCover,
  getAllPieces,
  getPiecesInCollection,
  priceInfo,
} from "@/lib/products";
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

/* The hero is a piece, not a mood shot — the first thing a visitor sees is
   furniture with a name and a price. The photo's native 605px width is why
   desktop shows it as a framed plate instead of stretching it full-bleed. */
const HERO_SLUG = "oromo-bar";
const HERO_IMAGE = "/images/pieces/oromo-bar/01.jpg";

/* Curated home feature shots (index into piece.images): styled interiors
   only; the Oromo chapter uses its open-doors shot so it never repeats the
   hero photo. */
const FEATURE_IMAGE: Record<string, number> = {
  "oromo-bar": 1,
  "khadija-drawer-chest": 2,
};

/* Chapter order: the hero piece closes the run so its open-doors shot never
   sits back-to-back with the hero photo of the same piece. */
const FEATURED_ORDER = ["khadija-drawer-chest", "kahawa-bar", "oromo-bar"];

const HOW_IT_WORKS = [
  ["Enquire", "WhatsApp, Instagram or email us with the piece you'd like."],
  ["70% deposit", "The deposit starts the build — and the countdown."],
  ["We build", "Five to eight weeks in our Nairobi workshop."],
  ["Delivery & balance", "The balance is due within 7 days of delivery."],
] as const;

export default function HomePage() {
  const pieces = getAllPieces();
  const chapter = (slug: string) => {
    const i = FEATURED_ORDER.indexOf(slug);
    return i === -1 ? FEATURED_ORDER.length : i;
  };
  const featured = pieces
    .filter((p) => p.featured)
    .sort((a, b) => chapter(a.slug) - chapter(b.slug));
  const hero = pieces.find((p) => p.slug === HERO_SLUG);
  const heroPrice = hero ? priceInfo(hero) : null;

  return (
    <div>
      {/* ---- Chapter 0 · Statement hero, led by a piece.
              Mobile: full-bleed immersive scene, statement anchored low.
              Desktop: charcoal canvas, statement left, the photo at its
              natural 3:4 as a hairline-framed plate. ---- */}
      <section className="relative overflow-hidden bg-charcoal text-bone">
        <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col justify-end px-6 pb-16 pt-28 sm:px-8 lg:grid lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-32">
          <div className="absolute inset-0 lg:relative lg:inset-auto lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:aspect-[3/4]">
            {/* No entrance animation here: the hero is the LCP element, and
                an opacity-0 initial state defers LCP by seconds on mobile. */}
            <Image
              src={HERO_IMAGE}
              alt="The Oromo Bar — a circular hand-carved drinks cabinet by Savannah Space, styled in a Nairobi interior"
              fill
              priority
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
              {...blurProps(HERO_IMAGE)}
            />
            {/* mobile scene gradients: statement legibility + transparent header */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/35 to-charcoal/25 lg:hidden"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-charcoal/60 to-transparent lg:hidden"
            />
            {/* desktop plate mark */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 hidden border border-bone/30 lg:block"
            />
          </div>
          <div className="relative lg:col-span-6 lg:col-start-1 lg:row-start-1">
            <p className="eyebrow tracking-[0.3em] text-bone/90">
              Made in Kenya · Since 2018
            </p>
            <h1 className="mt-6 max-w-xl font-display text-[2.75rem] leading-[1.12] sm:text-6xl xl:text-7xl">
              Where African heritage{" "}
              <span className="italic">lives in design.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-bone/80">
              Furniture built to order in our Nairobi workshop by thirteen
              fundis and a guild of Kenyan artisans — never shipped from a
              warehouse.
            </p>
            {hero && heroPrice && (
              <Link
                href={`/pieces/${hero.slug}`}
                className="group mt-10 inline-block"
              >
                <span className="eyebrow block text-[0.5625rem] text-bone/60">
                  Pictured
                </span>
                <span className="mt-1 block font-display text-lg">
                  {hero.name} · {heroPrice.isFrom && "from "}
                  {formatKsh(heroPrice.price)}
                </span>
                <span className="eyebrow mt-3 inline-block border-b border-bone/70 pb-1 transition-opacity group-hover:opacity-70">
                  View the piece
                </span>
              </Link>
            )}
          </div>
        </div>
        {/* hairline frame, inset like a plate mark (mobile scene only) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-3 border border-bone/30 sm:inset-5 lg:hidden"
        />
      </section>

      {/* ---- Chapters 01–03 · Featured pieces (proof, straight after the
              statement). Mobile: immersive full-bleed scenes (portrait photos
              fill a phone naturally). Desktop: alternating editorial gallery
              rows — the portrait photo at its natural 3:4, uncropped. ---- */}
      <section className="pb-6 pt-16 sm:pt-20 lg:pb-14">
        <Reveal className="mx-auto max-w-6xl px-6 pb-10 sm:px-8 lg:pb-4">
          <p className="eyebrow text-terracotta">Featured</p>
          <h2 className="mt-3 font-display text-3xl text-chocolate sm:text-5xl">
            The pieces
          </h2>
        </Reveal>
        {featured.map((piece, i) => {
          const { price, isFrom } = priceInfo(piece);
          // curated home shots: styled interiors only (galleries keep page order)
          const img = piece.images[FEATURE_IMAGE[piece.slug] ?? 0];
          return (
            <article key={piece.slug}>
              {/* Mobile scene — image always visible, only the caption animates */}
              <Link
                href={`/pieces/${piece.slug}`}
                className="group block lg:hidden"
              >
                <div className="relative h-[72dvh] overflow-hidden bg-blush">
                  <Image
                    src={img}
                    alt={`${piece.name}, handcrafted in Kenya by Savannah Space`}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    {...blurProps(img)}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/60 to-charcoal/10"
                  />
                  <div className="absolute inset-x-0 bottom-0 px-6 pb-10">
                    <Reveal>
                      <p className="eyebrow text-[0.625rem] text-bone/90">
                        <span className="text-marigold">
                          {String(i + 1).padStart(2, "0")}
                        </span>{" "}
                        — The pieces
                      </p>
                      <h2 className="mt-3 font-display text-3xl uppercase tracking-[0.08em] text-bone">
                        {piece.name}
                      </h2>
                      {piece.name_note && (
                        <p className="mt-2 font-display text-base italic text-bone/80">
                          {piece.name_note}
                        </p>
                      )}
                      <p className="eyebrow mt-3 text-[0.5625rem] text-bone/70">
                        {piece.materials.join(" · ")}
                      </p>
                      <p className="mt-4 font-display text-lg text-bone">
                        Built to order · {isFrom && "from "}
                        {formatKsh(price)}
                      </p>
                      <span className="eyebrow mt-6 inline-block border-b border-bone/70 pb-1 text-bone">
                        View the piece
                      </span>
                    </Reveal>
                  </div>
                </div>
              </Link>

              {/* Desktop gallery row */}
              <div
                className={`mx-auto hidden max-w-6xl grid-cols-2 items-center gap-x-20 px-8 py-14 lg:grid ${
                  i % 2 === 1 ? "[&>*:first-child]:order-2" : ""
                }`}
              >
                <Link href={`/pieces/${piece.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-blush">
                    <Image
                      src={img}
                      alt={`${piece.name}, handcrafted in Kenya by Savannah Space`}
                      fill
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      {...blurProps(img)}
                    />
                  </div>
                </Link>
                <Reveal>
                  {/* terracotta numeral here — marigold fails contrast on bone */}
                  <p className="eyebrow text-[0.625rem] text-ink/70">
                    <span className="text-terracotta">
                      {String(i + 1).padStart(2, "0")}
                    </span>{" "}
                    — The pieces
                  </p>
                  <h2 className="mt-4 font-display text-4xl uppercase tracking-[0.08em] text-chocolate xl:text-5xl">
                    {piece.name}
                  </h2>
                  {piece.name_note && (
                    <p className="mt-3 font-display text-lg italic text-terracotta">
                      {piece.name_note}
                    </p>
                  )}
                  <p className="eyebrow mt-4 text-[0.625rem] text-ink/70">
                    {piece.materials.join(" · ")}
                  </p>
                  <p className="mt-5 font-display text-xl text-ink">
                    Built to order · {isFrom && "from "}
                    {formatKsh(price)}
                  </p>
                  <Link
                    href={`/pieces/${piece.slug}`}
                    className="eyebrow mt-8 inline-block border-b border-chocolate pb-1 text-chocolate transition-colors hover:text-terracotta"
                  >
                    View the piece
                  </Link>
                </Reveal>
              </div>
            </article>
          );
        })}
      </section>

      {/* ---- Collections teaser · the shop window, before the story ---- */}
      <section className="mx-auto max-w-6xl border-t border-line px-6 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <p className="eyebrow text-terracotta">The catalogue</p>
          <h2 className="mt-3 font-display text-3xl text-chocolate sm:text-5xl">
            Ten collections
          </h2>
        </Reveal>
        <Stagger className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {COLLECTIONS.map((c) => {
            const cover = collectionCover(c);
            return (
              <StaggerItem key={c.slug}>
                <Link href={`/collections/${c.slug}`} className="group block py-1">
                  <div className="relative aspect-[3/4] overflow-hidden bg-blush">
                    {cover && (
                      <Image
                        src={cover}
                        alt={`${c.name} by Savannah Space`}
                        fill
                        sizes="(max-width: 640px) 50vw, 20vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        {...blurProps(cover)}
                      />
                    )}
                  </div>
                  <p className="mt-3 font-display text-base uppercase leading-tight tracking-[0.06em] text-chocolate">
                    {c.name}
                  </p>
                  <p className="eyebrow mt-1 text-[0.5625rem] text-ink/70">
                    {getPiecesInCollection(c.slug).length} pieces
                  </p>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* ---- Statement + woods index · asymmetric editorial spread ---- */}
      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-terracotta">The atelier</p>
            <p className="mt-6 font-display text-4xl leading-[1.15] text-chocolate sm:text-5xl lg:text-6xl">
              Every piece has a name.
              <br />
              <span className="italic text-terracotta">
                Every name has a maker.
              </span>
            </p>
            <p className="mt-8 max-w-md text-base leading-relaxed text-ink/70">
              Mbura, Ngunia, Khadija, Diani, Kahawa — a catalogue of named
              designs, each built to order in the wood you choose.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="eyebrow text-ink/70">The woods</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-8 border-b border-line lg:grid-cols-1 lg:gap-x-0">
              {WOODS.map((wood) => (
                <li
                  key={wood}
                  className="eyebrow border-t border-line py-3.5 text-[0.6875rem] text-ink/80"
                >
                  {wood}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---- The build · charcoal tonal band with craft walkthrough ---- */}
      <TonalBand className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <Reveal className="max-w-3xl">
            <p className="eyebrow opacity-70">The workshop</p>
            <h2 className="mt-5 font-display text-3xl leading-snug sm:text-5xl lg:text-6xl">
              Nothing here is pulled from a shelf.{" "}
              <span className="italic opacity-90">Watch it become yours.</span>
            </h2>
          </Reveal>
          <div className="mt-16 lg:mt-8">
            <CraftWalkthrough />
          </div>
          <Reveal className="mt-16 border-t border-bone/20 pt-10 lg:mt-8">
            <p className="max-w-2xl font-display text-xl leading-relaxed sm:text-2xl">
              Thirteen fundis. A guild of some fifteen artisan partners —
              weavers, carvers, welders. Five to eight weeks, made for you.
            </p>
            <Link
              href="/story"
              className="eyebrow mt-8 inline-block border-b border-current pb-1 transition-opacity hover:opacity-70"
            >
              Read our story
            </Link>
          </Reveal>
        </div>
      </TonalBand>

      {/* ---- How it works · vertical rhythm on mobile ---- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <p className="eyebrow text-terracotta">Built to order</p>
            <h2 className="mt-3 font-display text-3xl text-chocolate sm:text-5xl">
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

      {/* ---- Closing statement + showroom ---- */}
      <section className="bg-blush">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center sm:px-8 sm:py-28">
          <Reveal>
            <p className="mx-auto max-w-2xl font-display text-3xl leading-snug text-chocolate sm:text-6xl">
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
