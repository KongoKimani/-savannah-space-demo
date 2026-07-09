# Design decisions — divergences from the build brief

Logged so the brief (CLAUDE.md) stays auditable. Client-facing rationale in
parentheses.

## 2026-07-09 — Commerce-first home + header simplification (branch `commerce-first-home`)

1. **Nav WhatsApp button removed** — brief §5 specifies a WhatsApp button in
   the nav. Removed at the owner's direction to declutter the header. The
   floating enquiry buttons (`components/FloatingActions.tsx`) are now the
   **only** persistent WhatsApp entry point — do not remove them without
   restoring a header CTA.
2. **"Made in Kenya" header eyebrow removed** — it duplicated the hero's
   first line ("Made in Kenya · Since 2018") two inches below and made the
   390px header row cramped.
3. **Bird mark added to the header** — cropped (not redrawn) from
   `public/images/brand/bird-mark.png`, which has a solid black background.
   Generated single-colour transparent tints:
   `bird-mark-chocolate.png` (bone header) and `bird-mark-bone.png`
   (transparent home header). Regenerate with a real vector/hi-res mark from
   the client in the paid engagement.
4. **Home page reordered commerce-first** — hero → featured pieces →
   collections grid → atelier statement/woods → charcoal workshop band →
   how it works → showroom. (Instagram-mobile visitors see furniture and
   prices before the brand narrative; the tonal journey to charcoal still
   lands mid-page.)
5. **Hero photo swapped** from the rugs/baskets editorial shot
   (`/images/editorial/hero.jpg`, kept on disk) to the Oromo Bar
   (`/images/pieces/oromo-bar/01.jpg`). The site now opens on furniture.
   The photo's native resolution is 605×807 (no larger version exists in the
   source PDFs), so desktop presents it as a framed 3:4 plate on charcoal
   instead of stretching it full-bleed; mobile keeps the full-bleed scene.
