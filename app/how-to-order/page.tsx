import type { Metadata } from "next";
import { SITE, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "How to Order",
  description:
    "How to order from Savannah Space: enquire by WhatsApp (+254 793 626 458), Instagram DM or email; pay a 70% deposit to start the build; change colours within 7 days; balance due within 7 days of delivery.",
};

const STEPS = [
  ["Enquire", "WhatsApp us on +254 793 626 458, send an Instagram DM to @savannahspacekenya, or email hello@savannahspace.com with the piece you'd like. Please measure the space it will go in first."],
  ["Pay the 70% deposit", "We require a 70% deposit to begin working on your order. The turnaround countdown begins once the deposit is received. Share your payment confirmation, email and physical address."],
  ["Confirm your order note", "We email you an order note with the details of your order for you to confirm."],
  ["Seven-day colour window", "You have seven days from your deposit payment to change details of your order, such as the colour."],
  ["Delivery & balance", "The balance is due within 7 days of receiving your piece. We don't take returns or exchanges for size issues — please measure carefully."],
] as const;

/* Phase 2 stub — full process page with FAQ + FAQPage schema lands in Phase 3/4. */
export default function HowToOrderPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <p className="eyebrow text-terracotta">Built to order</p>
      <h1 className="mt-3 font-display text-3xl uppercase tracking-[0.1em] text-chocolate sm:text-5xl">
        How to Order
      </h1>
      <ol className="mt-10 space-y-8">
        {STEPS.map(([title, body], i) => (
          <li key={title} className="flex gap-5">
            <span className="font-display text-3xl text-terracotta">{i + 1}</span>
            <div>
              <h2 className="font-display text-xl text-chocolate">{title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-ink/80">{body}</p>
            </div>
          </li>
        ))}
      </ol>
      <a
        href={whatsappLink("Hi Savannah Space, I'd like to make an enquiry.")}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-block bg-chocolate px-8 py-3 text-sm font-medium tracking-wide text-bone transition-opacity hover:opacity-90"
      >
        Start an enquiry on WhatsApp
      </a>
    </div>
  );
}
