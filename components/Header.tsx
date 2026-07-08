import Link from "next/link";
import { whatsappLink } from "@/lib/site";

const NAV = [
  { href: "/collections", label: "Collections" },
  { href: "/story", label: "Story" },
  { href: "/how-to-order", label: "How to Order" },
];

/* Mobile-first: wordmark + WhatsApp on the first row, nav on its own row
   with >=44px touch targets; single row from sm up. */
export default function Header() {
  return (
    <header className="border-b border-line bg-bone">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:flex sm:items-center sm:justify-between sm:px-8 sm:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="block py-1">
            <span className="eyebrow block text-[0.5625rem] text-terracotta">
              Made in Kenya
            </span>
            <span className="font-display text-lg uppercase tracking-[0.24em] text-chocolate sm:text-xl sm:tracking-[0.28em]">
              Savannah Space
            </span>
          </Link>
          <a
            href={whatsappLink(`Hi Savannah Space, I'd like to make an enquiry.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center bg-chocolate px-4 text-xs font-medium tracking-wide text-bone transition-opacity hover:opacity-90 sm:hidden"
          >
            WhatsApp
          </a>
        </div>
        <nav className="-mx-2 mt-1 flex items-center sm:mx-0 sm:mt-0 sm:gap-2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="eyebrow flex min-h-11 items-center px-2 text-[0.625rem] text-ink/80 transition-colors hover:text-chocolate sm:px-3 sm:text-[0.6875rem]"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={whatsappLink(`Hi Savannah Space, I'd like to make an enquiry.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center bg-chocolate px-4 text-xs font-medium tracking-wide text-bone transition-opacity hover:opacity-90 sm:flex"
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
