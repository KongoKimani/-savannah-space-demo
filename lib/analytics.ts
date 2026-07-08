// GA4 enquiry_click — CLAUDE.md §7. When NEXT_PUBLIC_GA_ID is unset the event
// is logged to the console instead so the demo still shows the wiring.

type EnquiryChannel = "whatsapp" | "email";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEnquiryClick(piece: string, wood: string | null, channel: EnquiryChannel) {
  const params = { piece, wood: wood ?? "", channel };
  if (process.env.NEXT_PUBLIC_GA_ID && typeof window.gtag === "function") {
    window.gtag("event", "enquiry_click", params);
  } else {
    console.log("[analytics] enquiry_click", params);
  }
}
