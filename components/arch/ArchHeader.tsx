import Image from "next/image";
import Link from "next/link";
import { NAV } from "@/components/Header";

/*
  The header for the arch hero. It lives inside the pinned stage, so it stays
  on screen while the arch opens and leaves with the hero, like the header on
  every other page.

  Its colour is a blend driven by the stage's --t (0 = arch shut on the bone
  canvas, 1 = open over the photograph): chocolate through to bone. The two
  bird marks cross-fade on the same number, and a soft dark strip fades in
  behind it so bone type stays legible over the bright ceiling in the Oromo
  photo and on every slide after it.
*/

const BLEND = (rest: string) =>
  `color-mix(in srgb, var(--color-bone) calc(var(--t) * 100%), var(${rest}))`;

export default function ArchHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-charcoal/60 to-transparent"
        style={{ opacity: "clamp(0, calc((var(--t) - 0.35) * 2.5), 1)" }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-3 sm:flex sm:items-center sm:justify-between sm:px-8 sm:py-4">
        <Link href="/" className="flex min-h-11 items-center gap-3">
          <span className="relative block h-8 w-[1.8rem] sm:h-9 sm:w-[2.05rem]">
            <Image
              src="/images/brand/bird-mark-chocolate.png"
              alt=""
              width={121}
              height={133}
              className="absolute inset-0 h-full w-full object-contain"
              style={{ opacity: "calc(1 - var(--t))" }}
            />
            <Image
              src="/images/brand/bird-mark-bone.png"
              alt=""
              width={121}
              height={133}
              className="absolute inset-0 h-full w-full object-contain"
              style={{ opacity: "var(--t)" }}
            />
          </span>
          <span
            className="font-display text-lg uppercase tracking-[0.24em] sm:text-xl sm:tracking-[0.3em]"
            style={{ color: BLEND("--color-chocolate") }}
          >
            Savannah Space
          </span>
        </Link>
        <nav className="-mx-1.5 mt-1 flex items-center sm:mx-0 sm:mt-0 sm:gap-2" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-11 items-center whitespace-nowrap px-[clamp(0.25rem,1.2vw,0.375rem)] text-[clamp(0.5rem,2.7vw,0.625rem)] font-medium uppercase tracking-[clamp(0.07em,0.55vw,0.16em)] sm:px-3 sm:text-[0.6875rem] sm:tracking-[0.22em]"
              style={{ color: BLEND("--color-ink") }}
            >
              <span className="sm:hidden">{item.short ?? item.label}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
