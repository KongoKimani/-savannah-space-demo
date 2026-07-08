import Link from "next/link";
import { SITE, whatsappLink } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-blush">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="eyebrow block text-[0.5625rem] text-chocolate">Made in Kenya</span>
          <span className="font-display text-lg uppercase tracking-[0.24em] text-chocolate">
            Savannah Space
          </span>
          {/* Bird mark omitted: the only extractable asset is the dark badge
              lockup, not a clean crop — brief §3 says text-only in that case. */}
          <p className="mt-3 max-w-xs text-sm text-ink/70">{SITE.tagline}</p>
        </div>
        <div>
          <p className="eyebrow text-ink/70">Showroom</p>
          <p className="mt-3 text-sm leading-relaxed text-ink/80">
            {SITE.showroom.name}
            <br />
            Off James Gichuru Road, Nairobi
            <br />
            {SITE.showroom.note}
          </p>
          <p className="mt-2 text-sm text-ink/80">{SITE.showroom.hours}</p>
        </div>
        <div>
          <p className="eyebrow text-ink/70">Contact</p>
          <ul className="mt-3 space-y-1 text-sm text-ink/80">
            <li>
              <a href={whatsappLink("Hi Savannah Space, I'd like to make an enquiry.")} className="hover:text-chocolate" target="_blank" rel="noopener noreferrer">
                WhatsApp {SITE.phonePrimary}
              </a>
            </li>
            <li>{SITE.phoneSecondary}</li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-chocolate">
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-chocolate">
                {SITE.instagram}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-ink/70">Browse</p>
          <ul className="mt-3 space-y-1 text-sm text-ink/80">
            <li><Link href="/collections" className="hover:text-chocolate">Collections</Link></li>
            <li><Link href="/story" className="hover:text-chocolate">Story</Link></li>
            <li><Link href="/how-to-order" className="hover:text-chocolate">How to Order</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-4">
        <p className="eyebrow text-center text-[0.5625rem] text-ink/70">
          Savannah Space™ · Furniture &amp; home decor, made in Kenya since 2018
        </p>
      </div>
    </footer>
  );
}
