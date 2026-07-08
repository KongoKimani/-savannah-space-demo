// Brand facts — CLAUDE.md §1. Single source for contact + showroom data.

export const SITE = {
  name: "Savannah Space",
  tagline: "Where African heritage lives in design.",
  url: "https://savannahspace.com",
  phonePrimary: "+254 793 626 458",
  phoneSecondary: "+254 769 51 51 53",
  whatsappNumber: "254793626458",
  email: "hello@savannahspace.com",
  instagram: "@savannahspacekenya",
  instagramUrl: "https://www.instagram.com/savannahspacekenya",
  showroom: {
    name: "Lavington Green Mall",
    address: "Lavington Green Mall, off James Gichuru Road, Nairobi",
    note: "Diagonally above Chandarana Supermarket",
    hours: "Mon–Sat, 10:30–17:30",
  },
};

export function formatKsh(amount: number): string {
  return `Ksh ${amount.toLocaleString("en-KE")}`;
}

export function enquiryMessage(pieceName: string, wood?: string | null, priceKsh?: number | null): string {
  const woodPart = wood ? ` in ${wood}` : "";
  const pricePart = priceKsh ? ` (${formatKsh(priceKsh)})` : "";
  return `Hi Savannah Space, I'd like to enquire about ${pieceName}${woodPart}${pricePart}.`;
}

export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function emailLink(pieceName: string): string {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(`Enquiry — ${pieceName}`)}`;
}
