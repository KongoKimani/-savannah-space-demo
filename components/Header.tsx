"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/collections", label: "Collections" },
  { href: "/how-to-order", label: "How to Order" },
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
  const isHome = usePathname() === "/";

  const shell = isHome
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
        <nav className="-mx-2 mt-1 flex items-center sm:mx-0 sm:mt-0 sm:gap-2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`eyebrow flex min-h-11 items-center px-2 text-[0.625rem] transition-colors sm:px-3 sm:text-[0.6875rem] ${linkTone}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
