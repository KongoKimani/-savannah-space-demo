"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackEnquiryClick } from "@/lib/analytics";
import { SITE, whatsappLink } from "@/lib/site";

/*
  Site-wide floating enquiry buttons, bottom-right: WhatsApp (primary) and
  email. On-palette chocolate per design review; inline SVG glyphs; >=48px
  targets; safe-area aware.

  The WhatsApp button opens a small quick-start panel. WhatsApp itself cannot
  be embedded in a page, so each option hands off to WhatsApp with a written
  message. On a piece page the enquiry names that piece. Without JavaScript
  the button is still a plain link to WhatsApp.
*/

const BUTTON =
  "flex h-12 w-12 items-center justify-center rounded-full bg-chocolate text-bone shadow-lg shadow-charcoal/25 transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chocolate sm:h-13 sm:w-13";

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function MailGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m2.5 7 9.5 6.5L21.5 7" />
    </svg>
  );
}

function CloseGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="h-5 w-5" aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

const ITEM =
  "flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border border-line bg-white/60 px-4 py-3 text-left text-[0.9375rem] text-ink transition-colors hover:border-chocolate/40 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chocolate";

export default function FloatingActions() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [piece, setPiece] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    if (!open) {
      // Piece pages set their title to "The Name — Savannah Space".
      const onPiece = pathname.startsWith("/pieces/");
      const name = onPiece ? document.title.split(" — ")[0].trim() : "";
      setPiece(name || null);
    }
    setOpen((o) => !o);
  };

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const options: { label: string; message: string }[] = [
    {
      label: piece ? `Enquire about ${piece}` : "Enquire about a piece",
      message: piece
        ? `Hi Savannah Space, I'd like to enquire about ${piece}.`
        : "Hi Savannah Space, I'd like to enquire about a piece.",
    },
    {
      label: "How ordering works",
      message: "Hi Savannah Space, could you walk me through how ordering works?",
    },
    {
      label: "Visit the showroom",
      message: "Hi Savannah Space, I'd like to visit the showroom at Lavington Green Mall.",
    },
    {
      label: "Something else",
      message: "Hi Savannah Space, I'd like to make an enquiry.",
    },
  ];

  return (
    <div
      ref={rootRef}
      className="fixed right-4 z-40 flex flex-col gap-3 sm:right-6"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <div
        role="dialog"
        aria-label="Chat with Savannah Space"
        aria-hidden={!open}
        className={`absolute bottom-[calc(100%+0.75rem)] right-0 w-[min(22rem,calc(100vw-2rem))] origin-bottom-right overflow-hidden rounded-2xl border border-line bg-bone shadow-2xl shadow-charcoal/30 transition duration-200 motion-reduce:transition-none ${
          open ? "scale-100 opacity-100" : "pointer-events-none invisible scale-95 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between gap-3 bg-chocolate px-5 py-4 text-bone">
          <div>
            <p className="font-display text-xl uppercase tracking-[0.14em]">Savannah Space</p>
            <p className="eyebrow mt-1 text-[0.5625rem] text-bone/80">Chat on WhatsApp</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-bone/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-bone"
          >
            <CloseGlyph />
          </button>
        </div>
        <div className="px-5 pb-5 pt-4">
          <p className="rounded-2xl rounded-tl-sm bg-white/70 px-4 py-3 text-[0.9375rem] leading-relaxed text-ink">
            Hello, welcome to Savannah Space. What can we help with?
          </p>
          <ul className="mt-4 space-y-2">
            {options.map((o) => (
              <li key={o.label}>
                <a
                  href={whatsappLink(o.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEnquiryClick(piece ?? "floating", null, "whatsapp");
                    setOpen(false);
                  }}
                  className={ITEM}
                >
                  <span>{o.label}</span>
                  <span aria-hidden className="text-chocolate">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.8125rem] leading-relaxed text-ink/70">
            Showroom: {SITE.showroom.name}, {SITE.showroom.hours}.{" "}
            <Link href="/how-to-order" className="underline underline-offset-2 hover:text-chocolate">
              Read how ordering works
            </Link>
          </p>
        </div>
      </div>

      <a
        href={`mailto:${SITE.email}?subject=${encodeURIComponent("Enquiry — Savannah Space")}`}
        aria-label="Enquire by email"
        title="Enquire by email"
        onClick={() => trackEnquiryClick("floating", null, "email")}
        className={BUTTON}
      >
        <MailGlyph />
      </a>
      <a
        href={whatsappLink("Hi Savannah Space, I'd like to make an enquiry.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat on WhatsApp, ${SITE.phonePrimary}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        title="Chat on WhatsApp"
        onClick={(e) => {
          e.preventDefault();
          toggle();
        }}
        className={BUTTON}
      >
        <WhatsAppGlyph />
      </a>
    </div>
  );
}
