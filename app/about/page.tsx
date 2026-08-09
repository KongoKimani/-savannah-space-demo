import type { Metadata } from "next";
import Link from "next/link";
import TonalBand from "@/components/motion/TonalBand";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SITE, whatsappLink } from "@/lib/site";

/*
  About — the founder's page, told in her voice.

  /story is the company and the craft. This page is the person, and it is
  deliberately first person: a third-person profile reads like a press
  clipping, and a press clipping is not why anyone is on this page.

  COPY STATUS: draft. Every fact below is on the record — Cherie has given
  these figures in published interviews (Sinapis, Kua Ventures, Financial
  Fortune) — but the first-person phrasing is written FOR her and must be read
  and approved by her before this goes live. The pull quote is verbatim; do
  not paraphrase it and keep the attribution.
*/

export const metadata: Metadata = {
  title: "About",
  description:
    "Savannah Space was started in Nairobi in 2018 by Cherie Kihato with KSh 20,000 in savings. Two fundis became thirteen, and a single market stall became a guild of fifteen Kenyan artisan partners.",
};

const FIGURES = [
  ["2018", "Founded in Nairobi"],
  ["Ksh 20,000", "Starting capital"],
  ["13", "Fundis in our workshop"],
  ["15", "Artisan partner workshops"],
] as const;

const GUILD = [
  "Rug weavers",
  "Mkeka weavers",
  "Soapstone carvers",
  "Seagrass basket weavers",
  "Woodworkers",
  "Welders",
];

/* Moved here from the homepage: the woods belong with the people who choose
   them, not in a list under a statement. */
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

export default function AboutPage() {
  return (
    <div>
      {/* ---- Opening · her, first ---- */}
      <section className="mx-auto max-w-6xl px-6 pt-16 sm:px-8 sm:pt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-terracotta">The founder</p>
            <h1 className="mt-4 max-w-2xl font-display text-4xl leading-[1.12] text-chocolate sm:text-5xl xl:text-6xl">
              I started with twenty thousand shillings{" "}
              <span className="italic text-terracotta">and two fundis.</span>
            </h1>
            <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-ink/80 sm:text-lg">
              <p>
                I finished university and didn&rsquo;t find work. I wrote the
                idea down before I had anywhere to build it — furniture that was
                made here, in Kenya, by people I could stand next to.
              </p>
              <p>
                The first year was fairs. I would find someone making something
                beautiful with no way to reach a customer, and give them a
                table. That is still the whole business, only larger.
              </p>
              <p>
                Two fundis became thirteen. One stall became fifteen artisan
                workshops. The workshop is ours, the wood is chosen for your
                piece, and nothing here sits in a warehouse waiting for you.
              </p>
            </div>
          </Reveal>

          {/* Portrait. Awaiting a photograph Cherie is happy to publish —
              deliberately a marked slot rather than a stock stand-in, so it
              cannot be mistaken for the finished page. */}
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <div className="relative aspect-[3/4] w-full border border-line bg-blush">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
                <p className="eyebrow text-[0.5625rem] text-ink/45">
                  Portrait to come
                </p>
                <p className="font-display text-xl text-chocolate/70">
                  Cherie Kihato
                </p>
                <p className="text-xs leading-relaxed text-ink/50">
                  Awaiting a supplied photograph
                </p>
              </div>
            </div>
            <p className="eyebrow mt-4 text-[0.5625rem] text-ink/60">
              Founder · Savannah Space
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- The numbers ---- */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <Stagger className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-10 lg:grid-cols-4">
          {FIGURES.map(([figure, label]) => (
            <StaggerItem key={label}>
              <p className="font-display text-3xl text-chocolate sm:text-4xl">
                {figure}
              </p>
              <p className="eyebrow mt-2 text-[0.5625rem] text-ink/70">{label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ---- The quote · verbatim, keep it that way ---- */}
      <TonalBand className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center sm:px-8">
          <Reveal>
            <blockquote className="font-display text-3xl leading-snug sm:text-5xl">
              &ldquo;Start with what you have.&rdquo;
            </blockquote>
            <p className="eyebrow mt-8 opacity-70">Cherie Kihato · Founder</p>
          </Reveal>
        </div>
      </TonalBand>

      {/* ---- The guild ---- */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-terracotta">The guild</p>
            <h2 className="mt-3 font-display text-3xl leading-snug text-chocolate sm:text-4xl">
              Thirteen fundis in our workshop.{" "}
              <span className="italic text-terracotta">
                Fifteen more workshops beside it.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70">
              Our own carpenters build the frames. Everything woven, carved,
              welded or hammered comes from an independent Kenyan workshop we
              have worked with for years — and they are paid as partners, not
              suppliers of last resort.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-x-8 border-b border-line">
              {GUILD.map((trade) => (
                <li
                  key={trade}
                  className="eyebrow border-t border-line py-3.5 text-[0.6875rem] text-ink/80"
                >
                  {trade}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="eyebrow text-ink/70">The woods</p>
            <p className="mt-4 text-sm leading-relaxed text-ink/70">
              Chosen for your piece, subject to what the yard has that week.
            </p>
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

      {/* ---- Closing ---- */}
      <section className="bg-blush">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center sm:px-8 sm:py-28">
          <Reveal>
            <p className="mx-auto max-w-2xl font-display text-3xl leading-snug text-chocolate sm:text-5xl">
              Come and see it in person.
            </p>
            <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-ink/80">
              {SITE.showroom.name}, off James Gichuru Road, Nairobi —{" "}
              {SITE.showroom.note.toLowerCase()}. Open {SITE.showroom.hours}.
            </p>
          </Reveal>
          <Reveal
            delay={0.1}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <a
              href={whatsappLink("Hi Savannah Space, I'd like to make an enquiry.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-chocolate px-8 py-4 text-base font-medium tracking-wide text-bone transition-opacity hover:opacity-90 sm:w-auto"
            >
              WhatsApp {SITE.phonePrimary}
            </a>
            <Link
              href="/story"
              className="w-full border border-chocolate px-8 py-4 text-base font-medium tracking-wide text-chocolate transition-colors hover:bg-bone sm:w-auto"
            >
              How a piece is made
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
