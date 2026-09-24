"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* `short` is the phone label. Four full labels measure 353px against a 340px
   nav at 360px wide, and the only ways to close that gap are shrinking the
   type to 9px or shortening a word — the word is the cheaper loss. */
const NAV = [
  { href: "/collections", label: "Collections" },
  { href: "/how-to-order", label: "How to Order", short: "Ordering" },
  { href: "/story", label: "Story" },
  { href: "/about", label: "About" },
];

/*
  On the home page the header floats transparent over the full-viewport hero
  (bone type on the image, no bar) — the single loudest "template" tell was
  the solid bar sitting on the hero. Everywhere else it is the solid bone bar.

  One job per element: bird mark + wordmark for identity, three links for
  navigation. No eyebrow (the hero already says "Made in Kenya") and no
  WhatsApp button — the floating actions (FloatingActions.tsx) are the
  persistent enquiry entry point on every page; do not remove them without
  restoring a header CTA. Mobile-first: >=44px targets throughout.
*/
export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isArch = pathname === "/arch";

  const shell = isHome || isArch
    ? "absolute inset-x-0 top-0 z-30"
    : "border-b border-line bg-bone";
  const wordmark = isHome ? "text-bone" : "text-chocolate";
  const linkTone = isHome
    ? "text-bone/90 hover:text-bone"
    : "text-ink/80 hover:text-chocolate";
  const mark = isHome
    ? "/images/brand/bird-mark-bone.png"
    : "/images/brand/bird-mark-chocolate.png";

  return (
    <header className={shell}>
      <div className="mx-auto max-w-6xl px-4 py-3 sm:flex sm:items-center sm:justify-between sm:px-8 sm:py-4">
        <Link href="/" className="flex min-h-11 items-center gap-3">
          <Image
            src={mark}
            alt=""
            width={121}
            height={133}
            className="h-8 w-auto sm:h-9"
          />
          <span
            className={`font-display text-lg uppercase tracking-[0.24em] sm:text-xl sm:tracking-[0.3em] ${wordmark}`}
          >
            Savannah Space
          </span>
        </Link>
        {/* whitespace-nowrap and the tighter mobile tracking are what keep a
            four-item nav on one line at 360px — without them "How to Order"
            breaks across two lines and drags the row out of alignment. */}
        <nav className="-mx-1.5 mt-1 flex items-center sm:mx-0 sm:mt-0 sm:gap-2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              /* Size and tracking scale with the viewport rather than
                 stepping at a breakpoint: four items fit 360px exactly, so a
                 fixed size overflows every phone narrower than that.

                 Not using .eyebrow here — it is declared after Tailwind's
                 utilities in globals.css, so its font-size and letter-spacing
                 win on source order and silently override the clamps. The two
                 properties it would contribute are set explicitly instead. */
              className={`flex min-h-11 items-center whitespace-nowrap font-medium uppercase px-[clamp(0.25rem,1.2vw,0.375rem)] text-[clamp(0.5rem,2.7vw,0.625rem)] tracking-[clamp(0.07em,0.55vw,0.16em)] transition-colors sm:px-3 sm:text-[0.6875rem] sm:tracking-[0.22em] ${linkTone}`}
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
