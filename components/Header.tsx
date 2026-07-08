import Link from "next/link";
import { whatsappLink } from "@/lib/site";

const NAV = [
  { href: "/collections", label: "Collections" },
  { href: "/story", label: "Story" },
  { href: "/how-to-order", label: "How to Order" },
];

export default function Header() {
  return (
    <header className="border-b border-line bg-bone">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-4 sm:flex-row sm:justify-between">
        <Link href="/" className="text-center sm:text-left">
          <span className="eyebrow block text-[0.5625rem] text-terracotta">
            Made in Kenya
          </span>
          <span className="font-display text-xl uppercase tracking-[0.28em] text-chocolate">
            Savannah Space
          </span>
        </Link>
        <nav className="flex items-center gap-5">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="eyebrow text-ink/80 transition-colors hover:text-chocolate"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={whatsappLink(`Hi Savannah Space, I'd like to make an enquiry.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-chocolate px-3 py-1.5 text-xs font-medium tracking-wide text-bone transition-opacity hover:opacity-90"
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
