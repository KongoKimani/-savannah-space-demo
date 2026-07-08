# Needs review — nulls, ambiguities and judgment calls from extraction

Items to confirm with the client (or resolve in a later phase). Data in `products.json`
is recorded **exactly as printed** wherever the PDFs are unambiguous; everything below is
either missing, contradictory, or required a documented judgment call.

## Suspected content errors in the PDFs (recorded as printed, NOT fixed)

1. **8-seater priced below 6-seater** on four dining tables — sizes and prices may be
   swapped in the catalogue:
   - Live Edge Dining Table: 8 seater Ksh 240,000 vs 6 seater Ksh 278,000
   - Nemali Dining Table: 8 seater Ksh 239,000 vs 6 seater Ksh 277,000
   - Block Dining Table: 8 seater Ksh 269,000 vs 6 seater Ksh 291,000
   - The Swala Dining Table: 8 seater Ksh 161,000 vs 6 seater Ksh 193,000
2. **Diani Dining Table**: 4 seater (Ksh 245,000) is priced above the 6 seater
   (Ksh 213,000) — same suspicion as above.
3. **The Kio Dining Table** (Dining p9): two prices (Ksh 273,000 / Ksh 327,000) and two
   sizes are printed without explicit pairing. Paired by layout order as
   6 seater → 273,000, 8 seater → 327,000. **Inferred — confirm.**
4. **The Asili Sofa** (Sofas p6): "Total Height: 205cm" is implausible for a sofa, and
   "Inside Length: 238cm" exceeds "Total Length: 175cm". Recorded as printed.
5. **The Sericho Sofa**: "Height with Pillows: 89cm" equals "Total Height: 89cm".
   Recorded as printed.
6. **Pierre Jeanneret Chair**: appears in both Armchairs (pp6-7) and Dining (pp18-19)
   catalogues. The Dining Mvule page gives Total Height **85cm**; the Armchairs pages give
   **88cm**. 88cm kept top-level. Wood lists also differ (Armchairs omits Duom Palm);
   the union of both lists is used.
7. **Woven Rugs p2**: the visible "Important Information" layer says turnaround
   **5–14 weeks**; a hidden text layer underneath (old Canva layer) says 6–10 weeks and
   gives the old email (savannahspacekenya@gmail.com). The visible 5–14 is used.
8. **Beds catalogue pp3-4** still lists the old ordering email
   (savannahspacekenya@gmail.com); all other catalogues use hello@savannahspace.com.

## Missing data (null / empty in products.json)

9. **The Nafula Rocking Chair** (Armchairs p17): no dimensions printed → `dimensions: null`.
10. **The Nakor Chair** (Dining p23): no dimensions printed → `dimensions: null`.
11. **The Kipron Chair** (Dining p22): no depth printed (height, seat height, length only).
12. **The Diani Bed** (Beds p6): pictured size "4x6ft" has no cm equivalent printed →
    `dimensions: null`, size variants carry the prices.
13. **Rugs**: no materials are stated anywhere in the rug catalogue → `materials:
    ["Handwoven"]` only. Fibre (wool/cotton?) to confirm with client.
14. **Rug names**: rugs are numbered (#1–#39), not named. Named-piece treatment
    (Nameplate annotations) does not apply.
15. **Jipe Bar Stool** (Dining p25): no seat-height printed (total height 70cm only).

## Structural judgment calls (per the brief's variant-grouping rule)

16. Grouped as **variants of one design** (wood/colour/size/configuration versions):
    Simona Bar (3), Barcart (4), Khadija (2), Ngunia Bedside (2), Block Coffee Table (2),
    Maimuna Desk (2), Oya Sideboard (4, incl. Mini), Simona Cabinet (2, incl. Mini),
    Midcentury Sideboard (2, incl. "with drawers"), Kuba Coffee Table (2, incl. glass top),
    Ladder Shelf (6), Ongoro Chair (2), Pierre Jeanneret Chair (2), Benga Dining Table (2),
    Spindle Bed (4), dining tables by seater count, rugs by size (10 each).
    Variants whose dimensions differ from the top-level entry carry their own
    `dimensions` object (schema extension).
17. **Top-level price = lowest variant** (per schema rule) makes two entries read oddly:
    Oya Sideboard shows Ksh 107,000 (the *Mini* price; full-size starts at 161,000) and
    Simona Cabinet shows Ksh 92,000 (the Mini). Worth a display rule in Phase 2
    ("From Ksh …").
18. **The Ngunia Peg Leg** kept as its own design (leg-style sibling of the Ngunia
    Bedside Table; the brief's Ngunia example lists only Mango/Camphor variants).
19. **The Half Moon Side Table** appears in both Coffee Tables (p20) and Drawer Chests
    (p14) catalogues with identical specs. One entry, filed under
    `drawer-chests-bedside-tables`; wood lists from the two pages differ, union used.
20. **Pierre Jeanneret Chair** filed under `armchairs-benches` (also sold as a dining
    chair — see #6).
21. **The Ladder Shelf** sizes are printed in feet (5x3ft…7x4ft); kept in variant labels.
    Only structured dimension is bottom-shelf depth 34cm.
22. **The Teak Trio** (set of 3 tables) and **The Swala Console/Dining** (2
    configurations) have their multi-part dimensions in `notes`, `dimensions: null`.
23. **Rug size list**: the shared price table (10 sizes incl. two runners) is applied to
    all 39 rugs, per "available in various colours and sizes (listed below)". Confirm
    every design is actually woven in every size.
24. **Bed sizes**: top-level `dimensions` = the pictured size in cm as printed; other
    size variants have no cm equivalents in the PDFs.

## Featured pieces

25. Brief wants 3 featured pieces: The Oromo Bar and The Khadija Drawer Chest are set
    (`featured: true`). The third ("strongest remaining image") is left for Phase 3 /
    client review — suggest The Kahawa Bar or The Asili Sofa.

## Image quality

26. All 371 photos extracted at original embedded resolution; typical size 605x807px
    (adequate for card grids; modest for full-bleed hero use).
27. **Low-res galleries** (smallest image under 380px on the short side — fine as
    secondary shots, avoid as primary): simona-bar, barcart, simona-cabinet,
    tonga-sideboard (232px), lokori-drawer-chest, inosi/zuri bedside, jua/mancala/
    teak-trio/block/infinity coffee tables, diani-console, saba-saba, bahari, zoya,
    shoma, ojuong, swala-dining-table, benga-dining-table, kipron-chair, jipe-bar-stool,
    diani-bed, brass-bar-bed (single 458x353 photo — weakest gallery in the catalogue),
    spindle-bed, kerubo-bed, asili-sofa, bora-sofa, matu-sofa, rug-01, rug-12.
28. **Jua Coffee Table** photos carry phone-gallery UI overlays ("1/5", "2/5") baked into
    the images in the PDF.
29. **Nakor Chair / Swala Dining Table** photos have rough cut-out backgrounds (black
    matte) as published in the PDF.

## Materials not listed in the brief's §1 catalogue-wide list (taken from PDFs)

30. Elgon Teak end grains (Twiga, Jua), Mahogany (Zoya, Nakor), Cypress frames (Kitur,
    Asili, Bora), Palm Wood (Kio), Metal & Ribbed Glass (Siri), Elastic webbing / high
    density foam / Dacron lining / spring pockets (upholstered pieces).

## Other

31. **Custom rugs** (Rugs p4): designs/sizes not in the catalogue are priced at
    Ksh 1,800 + VAT per sq ft (does not apply to colour customisations) — copy for
    /how-to-order in Phase 3.
32. Brand bird mark extracted cleanly from the rug-catalogue cover →
    `public/images/brand/bird-mark.png` (355x355, transparent). Workshop photo (fundi at
    router table) → `public/images/story/workshop-fundi.jpg`.
