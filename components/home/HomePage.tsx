import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
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

export default function HomePage({ hero }: { hero: ReactNode }) {
  const pieces = getAllPieces();
  const chapter = (slug: string) => {
    const i = FEATURED_ORDER.indexOf(slug);
    return i === -1 ? FEATURED_ORDER.length : i;
  };
  const featured = pieces
    .filter((p) => p.featured)
    .sort((a, b) => chapter(a.slug) - chapter(b.slug));

  return (
    <div>
      {/* ---- The cabinet · the opening. Two doors carrying the wordmark
              swing apart onto the collection. DOM and CSS only: it is in the
              server-rendered HTML, so there is nothing to download and no
              loading state before the first paint. ---- */}
      {hero}

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

      {/* ---- About · the person, in one paragraph. The full page carries
              the founding, the guild and the woods. ---- */}
      <TonalBand className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <Reveal className="max-w-3xl">
            <p className="eyebrow opacity-70">About</p>
            <h2 className="mt-5 font-display text-3xl leading-snug sm:text-5xl lg:text-6xl">
              Cherie Kihato started this with twenty thousand shillings{" "}
              <span className="italic opacity-90">and two fundis.</span>
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed opacity-80">
              Two became thirteen. One market stall became a guild of fifteen
              artisan workshops. The workshop is ours, the wood is chosen for
              your piece, and nothing here waits in a warehouse.
            </p>
            <Link
              href="/about"
              className="eyebrow mt-8 inline-block border-b border-current pb-1 transition-opacity hover:opacity-70"
            >
              About Savannah Space
            </Link>
          </Reveal>
        </div>
      </TonalBand>

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
