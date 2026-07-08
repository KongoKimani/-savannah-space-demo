# Savannah Space — Demo Website

Demo site for **Savannah Space** (savannahspace.com / @savannahspacekenya), a
made-in-Kenya furniture and home decor brand — built by Oravio as a pitch
asset. It replaces the current site's Google-Drive-PDF catalogue with a fully
crawlable, AI-answerable product site: **151 named designs, 547 variants,
371 photos**, every price and dimension server-rendered.

Stack: Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion
· Lenis · next/image. Fully static (SSG) — 168 pages, no server data needed.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (SSG, all 168 pages)
```

Requires Node 18+. No environment variables are needed for the demo;
`NEXT_PUBLIC_GA_ID` (optional) enables GA4 — without it, `enquiry_click`
events log to the console.

## Deploy to Vercel

1. Push this repository to GitHub (already at
   `github.com/KongoKimani/-savannah-space-demo`).
2. Go to [vercel.com/new](https://vercel.com/new), import the repository —
   Vercel auto-detects Next.js; no configuration is required.
3. (Optional) add the `NEXT_PUBLIC_GA_ID` environment variable
   (Project → Settings → Environment Variables) to enable GA4.
4. Deploy. Every push to `main` redeploys automatically; PRs get preview URLs.

Or from the CLI: `npx vercel` (preview) / `npx vercel --prod` (production).

After a custom domain is attached, update `SITE.url` in `lib/site.ts`
(currently `https://savannahspace.com`) so the sitemap, JSON-LD and llms.txt
emit the right absolute URLs.

## Where things live

| Path | Purpose |
|---|---|
| `data/products.json` | The database: 151 designs to the CLAUDE.md §6 schema |
| `data/corrections.md` / `data/needs-review.md` | Extraction log: typo fixes + items to confirm with the client |
| `lib/products.ts` | **The only module that reads products.json** — swap its internals for Supabase/Airtable without touching pages |
| `lib/site.ts` | Brand facts: contact, showroom, WhatsApp/email link builders |
| `app/llms.txt/route.ts` | llms.txt for AI assistants, generated from live data |
| `app/robots.ts` / `app/sitemap.ts` | AI-crawler-friendly robots + full sitemap |
| `scripts/generate-blur.mjs` | `npm run blur` — regenerates image blur placeholders after adding photos |
| `public/images/pieces/<slug>/` | Product photos extracted from the source PDFs |
| `source-pdfs/` | Read-only input: the original catalogue PDFs |

## AEO checklist (the pitch)

- Static HTML for every page — all prices, dimensions and copy server-rendered
- JSON-LD: `LocalBusiness` sitewide, `Product` + `Offer` (KES, MadeToOrder) on
  every piece, `BreadcrumbList` on collections/pieces, `FAQPage` on /how-to-order
- `/llms.txt`, `/robots.txt` (GPTBot, ClaudeBot, Claude-Web, PerplexityBot,
  Google-Extended explicitly allowed), `/sitemap.xml` (168 URLs)
- Per-page titles/descriptions written as direct answers; OG images throughout

## Data provenance

Everything traces to the brand's catalogue PDFs (Phase 1 extraction) or the
build brief — no invented prices, dimensions or meanings. Suspected catalogue
errors are recorded as printed and flagged in `data/needs-review.md`.
