# Savannah Space — Demo Website Build Brief

This repo builds a demo website for **Savannah Space** (savannahspace.com / @savannahspacekenya), a made-in-Kenya furniture and home decor brand. The demo is a sales asset built by Oravio to pitch the brand owner. It replaces her current site, where every collection links out to a Google Drive PDF.

**Read this entire file before writing any code.** It is the single source of truth. When this brief and an assumption conflict, the brief wins. When the brief is silent, ask.

---

## 1. Brand facts (verified — do not alter)

- **Savannah Space™** — furniture & home decor, made in Kenya. Founded 2018 by Cherie Kihato.
- Own workshop of **13 carpenters (fundis)** plus a curated guild of **~15 independent artisan partners**: rug weavers, soapstone carvers, seagrass basket weavers, woodworkers, welders.
- **Showroom:** Lavington Green Mall, off James Gichuru Road, Nairobi (diagonally above Chandarana Supermarket). Open Mon–Sat, 10:30–17:30.
- **Contact:** WhatsApp/phone **+254 793 626 458** (primary), +254 769 51 51 53 (secondary). Email **hello@savannahspace.com**. Instagram **@savannahspacekenya**.
- **Tagline:** "Where African heritage lives in design."
- **Business model:** catalogue designs, each **built to order**. Customisable by wood type, colour, dimensions, and configuration (e.g. drawer layout). Fully custom designs only for bulk/commercial orders (10+ pieces).
- **Order process:** enquire via WhatsApp / IG DM / email → **70% deposit** starts the build (turnaround countdown begins at deposit) → order note emailed for confirmation → 7 days to change colour → balance due within 7 days of delivery. No returns/exchanges for size errors — customers must measure their space.
- **Turnaround:** roughly 5 weeks (small pieces) to 7–8 weeks (large chests), where stated per piece. Lead time is a **feature** ("built to order, not shipped from a warehouse"), never fine print.
- **Materials across the catalogue:** Mvule, Sudanese Teak, Mango wood, Camphor, Meru Oak, Muringa, Duom Palm, recycled Scandinavian pine, block board (painted pieces), Indian Teak end-grain tops, rattan, hessian, Tonga baskets, brass hardware.

## 2. Positioning & voice

**Warm craft-luxury atelier.** Not mass-market, not dark-noir luxury. The confidence comes from restraint, material honesty, and pacing — not exclamation marks. Copy is short, declarative, warm. No "Get the party started!" energy. Reference register: De La Espada, Fern NYC, Sarah Ellison.

Key narrative threads: the named pieces, the woods, the 13 fundis + the guild, slow made-to-order production, Buy Kenya Build Kenya.

## 3. Design system

### Palette (starting values — sample real hexes from the catalogue PDFs during setup and adjust)
```
--bone:      #F8F1EA   /* page canvas — the catalogue background */
--blush:     #F6E7DE   /* secondary panels, cards */
--chocolate: #5A452F   /* display type — the wordmark brown */
--ink:       #2B221B   /* body text */
--terracotta:#A85A38   /* secondary accent — from the rug photography */
--marigold:  #E8B33B   /* logo yellow — RARE accent, max ~3 uses sitewide */
--crimson:   #B23A2E   /* functional notes only (e.g. "expect grain variation") */
--charcoal:  #191410   /* the dark workshop band ONLY */
--line:      #E7D9CC   /* hairline borders */
```

### Typography
- **Display:** Cormorant Garamond (Google Fonts) — headlines, piece names, prices. Prices set in display serif exactly like the catalogues ("Ksh 234,000").
- **Eyebrow/labels:** uppercase, letter-spacing 0.18–0.25em, small sizes — this matches their house style ("M A D E  I N  K E N Y A").
- **Body & specs:** Manrope, light weights for spec columns.

### Motion (Framer Motion + Lenis)
- Lenis smooth scrolling, moderate lerp.
- Clip-path image reveals on scroll; staggered fade-ups; subtle parallax (≤8% translate).
- One **tonal journey** on the home page: light bone canvas → a **charcoal workshop band** mid-page → back to light. Background colour transitions on scroll.
- Respect `prefers-reduced-motion` everywhere. No scroll-jacking.

### Logo
Use a text wordmark: SAVANNAH SPACE in letterspaced small caps with "MADE IN KENYA" eyebrow. If a clean crop of the bird mark can be extracted from a PDF cover, save to `public/images/brand/` and use small in footer; otherwise text only. Do not redraw or AI-generate the mark.

## 4. Signature device — the Nameplate

Every piece is named (Mbura, Ngunia, Khadija, Diani, Lokori, Kahawa, Oromo, Zuri...). Render every product title as a museum-placard **Nameplate component**:

```
THE KAHAWA BAR
kahawa — Swahili: coffee          ← only if name_note exists
MERU OAK · RECYCLED SCANDINAVIAN PINE
Built to order · Ksh 205,000
```

**Approved name annotations — ship ONLY these four, all others stay null:**
- `kahawa` — Swahili: coffee
- `zuri` — Swahili: beautiful
- `diani` — a beach town on Kenya's south coast
- `tonga` — the handwoven basket of the BaTonga people (the piece incorporates one)

Never invent an annotation. Missing annotations are a deliberate pitch hook (the name index gets completed with the client).

## 5. Site map

```
/                        Editorial home (full motion treatment)
/collections             Index — 10 photographic tiles with piece counts
/collections/[slug]      Collection template (Bars gets an editorial intro)
/pieces/[slug]           ~75 product pages generated from data
/story                   Cherie, the workshop, the guild
/how-to-order            Process + FAQ (FAQPage schema)
```

Nav: Collections · Story · How to Order · WhatsApp button. Footer: contact, hours, showroom address, IG, mini nav.

### Collection slugs
`storage-media-units`, `console-tables-desks`, `armchairs-benches`, `coffee-tables`, `dining-tables-chairs`, `sofas`, `beds`, `woven-rugs`, `home-bars`, `drawer-chests-bedside-tables`

### Page specs (condensed)
- **Home:** full-bleed hero + tagline; wood index strip (small-caps list of the woods); 3 featured pieces (Oromo Bar, Khadija Drawer Chest, + strongest remaining image); charcoal workshop interlude (fundis + guild copy, link to /story); "How it works" 4-step strip (Enquire → 70% deposit → We build, 5–8 weeks → Delivery & balance); collections teaser grid; showroom block with hours + WhatsApp CTA.
- **Collection page:** 2–3 sentence server-rendered intro written to be quotable by AI assistants; card grid (image, nameplate-lite, price).
- **Piece page:** image gallery (all extracted photos); Nameplate; spec table (dimensions, materials); wood options as selectable chips that update the WhatsApp message (and price, when the variant has its own); price + price notes; turnaround; mini "how ordering works" block; WhatsApp + email CTAs; related pieces; Product JSON-LD.
- **Story:** founding story (2018, started with KSh 20,000 in savings), the workshop and 13 fundis, the guild of ~15 artisan partners, Buy Kenya Build Kenya. Modest, factual, warm. Use the workshop photo from the PDFs.
- **How to order:** the 5-step process; customisation explainer (wood / colour / dimensions / configuration; fully custom = 10+ piece orders); FAQ covering: how to place an order, deposit and turnaround rules, the 7-day colour window, measure-your-space / no size returns, commercial orders, custom rugs.

## 6. Data schema — `data/products.json`

Array of pieces. One entry per **design**; wood/colour/size versions of the same design are `variants`.

```json
{
  "slug": "ngunia-bedside-table",
  "name": "The Ngunia Bedside Table",
  "collection": "drawer-chests-bedside-tables",
  "name_note": null,
  "materials": ["Mango wood", "Plywood back"],
  "dimensions": { "height_cm": 56, "length_cm": 46, "width_cm": 32.5, "drawer_height_cm": 15, "leg_height_cm": 20 },
  "wood_options": ["Camphor", "Sudanese Teak", "Mango wood", "Meru Oak", "Muringa"],
  "price_ksh": 31000,
  "price_notes": ["Excluding delivery"],
  "turnaround_weeks": null,
  "notes": [],
  "featured": false,
  "images": ["/images/pieces/ngunia-bedside-table/01.jpg", "/images/pieces/ngunia-bedside-table/02.jpg"],
  "variants": [
    { "label": "Mango wood", "price_ksh": 31000 },
    { "label": "Camphor", "price_ksh": 34000, "notes": ["Camphor may appear lighter in person"] }
  ]
}
```

Rules:
- `dimensions` is an object of snake_case keys ending `_cm` — use whatever the PDF gives (height, length, width, depth, total_depth, radius, diameter, drawer_height, leg_height, shelf_height...). Numbers only.
- `price_ksh` integers, commas stripped. Top-level price = lowest variant price.
- `turnaround_weeks` is a string ("5", "7-8") or null — only when the PDF states it.
- `wood_options` per piece, exactly as its PDF page lists them.
- Examples of variant grouping: Khadija chest (Mango Ksh 167,000 / Mvule Ksh 226,000); Ngunia bedside (Mango 31k / Camphor 34k); Simona Bar (base / Teak interiors / Mango); Barcart (Mango Small 91k / Mango Large 97k / Mvule Small 114k / Mvule Large 122k — label variants "Mango · Small" etc.). Rugs may list multiple sizes → size variants.
- `name_note`: only the four approved annotations in §4; everything else null.

## 7. Order CTAs & analytics

- **WhatsApp (primary):** `https://wa.me/254793626458?text=<encoded>` with text like: `Hi Savannah Space, I'd like to enquire about The Oromo Bar in Mvule (Ksh 234,000).` Piece name, selected wood chip, and price injected from page state.
- **Email (fallback):** `mailto:hello@savannahspace.com` with prefilled subject `Enquiry — The Oromo Bar`.
- **GA4:** fire an `enquiry_click` event on every CTA click with `{ piece, wood, channel: "whatsapp" | "email" }`. Read the measurement ID from `NEXT_PUBLIC_GA_ID`; when unset, log the event to console instead. No cookies banner needed for the demo.
- No cart, no checkout, no payment integration. Prices always public.

## 8. AEO requirements (core deliverable — not polish)

The pitch to the client is "AI assistants can't read your Google Drive PDFs; this site makes every piece answerable." Therefore:

- Static generation (SSG) for every page; all product data and copy present in server-rendered HTML. Nothing meaningful client-only.
- Per-page `<title>` + meta description written as direct answers ("The Oromo Bar — handcrafted mvule drinks cabinet, made to order in Nairobi by Savannah Space. Ksh 234,000.").
- **JSON-LD:** `LocalBusiness` sitewide (name, address: Lavington Green Mall, off James Gichuru Road, Nairobi; openingHours Mo–Sa 10:30–17:30; telephone; sameAs → Instagram); `Product` + `Offer` (price, priceCurrency "KES", brand, material) on every piece page; `BreadcrumbList` on collection + piece pages; `FAQPage` on /how-to-order.
- `llms.txt` at the root: brand summary, collections, how ordering works, showroom, contact.
- `robots.txt` explicitly allowing major AI crawlers (GPTBot, ClaudeBot, Claude-Web, PerplexityBot, Google-Extended) + `sitemap.xml`.
- Descriptive alt text on every image ("The Kahawa Bar open, showing wine rack and Mocha Bisque interior").
- Open Graph tags + a default OG image.

## 9. Hard rules

1. **No AI-generated or stock product imagery.** Photos come from the PDFs only (plus brand-supplied images added later).
2. **No invented data.** Every price, dimension, material, turnaround, and name meaning must trace to the PDFs or this brief. Missing/unreadable → `null` + a line in `data/needs-review.md`.
3. Correct obvious typos ("Half Mood" → "Half Moon", "Murings" → "Muringa") but log every correction in `data/corrections.md`.
4. No custom cursors, no horizontal-scroll sections, no WebGL, no autoplaying sound.
5. Mobile-first. Most visitors arrive from Instagram on phones.
6. `source-pdfs/` is read-only input. Never modify or delete it.
7. Keep components in one coherent system — this must feel like one brand, not a template kit.

## 10. Tech stack

Next.js 15 (App Router) · Tailwind CSS · Framer Motion · Lenis · next/image · deployed on Vercel. TypeScript. No CMS for the demo — `data/products.json` is the database (the paid-engagement upgrade path is swapping it for Supabase/Airtable; keep the data loader isolated in one module so that swap is clean).

## 11. Build phases — execute ONE phase per instruction, commit at the end of each, then STOP for review

### Phase 1 — Extraction (stop for review before any site code)
1. Parse every PDF in `source-pdfs/` (Canva exports; text layer is clean).
2. Extract product photos with PyMuPDF (`fitz`) — pull the embedded JPEGs at original resolution; if a photo is fragmented, render that page region at 2x zoom instead. Save to `public/images/pieces/<slug>/01.jpg, 02.jpg...` in page order.
3. Skip cover/logo pages, "Important Information" pages, and "Get In Touch" pages — but save the workshop/artisan photo once to `public/images/story/`.
4. Build `data/products.json` to the §6 schema, grouping wood/colour/size versions as variants.
5. Write `data/corrections.md` (typos fixed) and `data/needs-review.md` (nulls, ambiguities, low-res images).
6. Finish with a summary table: collection · designs · variants · images extracted · price range · items needing review.

### Phase 2 — Scaffold
Next.js app with tokens, fonts, layout, nav/footer, data loader, `/collections`, the collection template, and the piece template (gallery, Nameplate, spec table, wood chips, CTAs, JSON-LD). Plain but complete and responsive. Reviewable on localhost.

### Phase 3 — Editorial layer
Home, Story, and How to Order with the full motion treatment (Lenis, clip-path reveals, the charcoal workshop band, staggered type). Bars collection gets its editorial intro.

### Phase 4 — AEO, polish, deploy prep
Metadata + JSON-LD audit, llms.txt, robots.txt, sitemap, alt-text pass, image optimisation, Lighthouse pass (target 90+ performance mobile), README with Vercel deploy steps.
