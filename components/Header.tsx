"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { whatsappLink } from "@/lib/site";

const NAV = [
  { href: "/collections", label: "Collections" },
  { href: "/story", label: "Story" },
  { href: "/how-to-order", label: "How to Order" },
];

/*
  On the home page the header floats transparent over the full-viewport hero
  (bone type on the image, no bar) — the single loudest "template" tell was
  the solid bar sitting on the hero. Everywhere else it is the solid bone bar.
  Mobile-first: wordmark + WhatsApp row, nav row, >=44px targets throughout.
*/
export default function Header() {
  const isHome = usePathname() === "/";

  const shell = isHome
    ? "absolute inset-x-0 top-0 z-30"
    : "border-b border-line bg-bone";
  const wordmark = isHome ? "text-bone" : "text-chocolate";
  const eyebrowTone = isHome ? "text-bone/80" : "text-terracotta";
  const linkTone = isHome
    ? "text-bone/90 hover:text-bone"
    : "text-ink/80 hover:text-chocolate";
  const whatsapp = isHome
    ? "border border-bone/70 text-bone hover:bg-bone/10"
    : "bg-chocolate text-bone hover:opacity-90";

  return (
    <header className={shell}>
      <div className="mx-auto max-w-6xl px-4 py-3 sm:flex sm:items-center sm:justify-between sm:px-8 sm:py-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="block py-1">
            <span className={`eyebrow block text-[0.5625rem] ${eyebrowTone}`}>
              Made in Kenya
            </span>
            <span
              className={`font-display text-lg uppercase tracking-[0.24em] sm:text-xl sm:tracking-[0.3em] ${wordmark}`}
            >
              Savannah Space
            </span>
          </Link>
          <a
            href={whatsappLink(`Hi Savannah Space, I'd like to make an enquiry.`)}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex min-h-11 items-center px-4 text-xs font-medium tracking-wide transition-colors sm:hidden ${whatsapp}`}
          >
            WhatsApp
          </a>
        </div>
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
          <a
            href={whatsappLink(`Hi Savannah Space, I'd like to make an enquiry.`)}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden min-h-11 items-center px-5 text-xs font-medium tracking-wide transition-colors sm:flex ${whatsapp}`}
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
