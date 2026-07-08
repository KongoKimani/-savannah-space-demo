import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import JsonLd from "@/components/JsonLd";
import LenisProvider from "@/components/motion/LenisProvider";
import { SITE } from "@/lib/site";
import "./globals.css";

// Only the weights actually used — every extra face is a preloaded file
// competing with the LCP text paint on mobile.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Savannah Space — Handcrafted furniture, made in Kenya",
    template: "%s — Savannah Space",
  },
  description:
    "Savannah Space makes furniture and home decor to order in Nairobi, Kenya — sideboards, dining tables, sofas, beds, home bars and handwoven rugs. Showroom at Lavington Green Mall. Where African heritage lives in design.",
  openGraph: {
    siteName: "Savannah Space",
    type: "website",
    locale: "en_KE",
    // default OG image — piece pages override with their own photo
    images: [
      {
        url: "/images/editorial/hero.jpg",
        width: 1512,
        height: 1134,
        alt: "Handwoven rugs and print baskets in the Savannah Space studio, Nairobi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

// LocalBusiness JSON-LD, sitewide — CLAUDE.md §8
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  name: "Savannah Space",
  description:
    "Furniture and home decor handcrafted to order in Nairobi, Kenya. Founded in 2018.",
  slogan: SITE.tagline,
  url: SITE.url,
  image: `${SITE.url}/images/editorial/hero.jpg`,
  priceRange: "Ksh 16,000 - Ksh 330,000",
  telephone: SITE.phonePrimary.replace(/\s/g, ""),
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lavington Green Mall, off James Gichuru Road",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  openingHours: "Mo-Sa 10:30-17:30",
  sameAs: [SITE.instagramUrl],
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="flex min-h-screen flex-col">
        {/* Manual font preloads: Next 15.5 builds preload-flagged (.p.woff2)
            font files but emits no <link> tags for them, so the LCP headline
            waits on the CSS->font chain. The hashes are content-hashes of the
            Google font data — stable across builds; if a font update ever
            changes them, the stale hint 404s harmlessly. React hoists these
            to <head>. Re-derive via: grep -o '/_next/static/media/[a-z0-9]*-s\.p\.woff2' .next/static/css/*.css */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          href="/_next/static/media/1ecca39927ee9e6f-s.p.woff2"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          href="/_next/static/media/ff4bfb11aeec83f5-s.p.woff2"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          href="/_next/static/media/4c9affa5bc8f420e-s.p.woff2"
        />
        <JsonLd data={localBusiness} />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
        <LenisProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingActions />
        </LenisProvider>
      </body>
    </html>
  );
}
