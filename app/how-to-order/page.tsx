import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SITE, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "How to Order",
  description:
    "How to order from Savannah Space: enquire by WhatsApp (+254 793 626 458), Instagram DM or email; pay a 70% deposit to start the build; change colours within 7 days; balance due within 7 days of delivery. Turnarounds run 5–8 weeks.",
};

const STEPS = [
  [
    "Enquire",
    "WhatsApp us on +254 793 626 458, send an Instagram DM to @savannahspacekenya, or email hello@savannahspace.com with the piece you'd like. Please measure the space it will go in first.",
  ],
  [
    "Pay the 70% deposit",
    "We require a 70% deposit to begin working on your order. The turnaround countdown begins once the deposit is received. Share your payment confirmation, email and physical address.",
  ],
  [
    "Confirm your order note",
    "We email you an order note with the details of your order for you to confirm.",
  ],
  [
    "Your seven-day window",
    "You have seven days from your deposit payment to change details of your order, such as the colour.",
  ],
  [
    "Delivery & balance",
    "The balance is due within 7 days of receiving your piece. We don't take returns or exchanges for size issues — please measure carefully.",
  ],
] as const;

const CUSTOMISATION = [
  ["Wood", "Most designs can be built in Camphor, Sudanese Teak, Mango, Meru Oak, Muringa or Mvule — subject to availability; the price varies with the wood."],
  ["Colour", "Painted pieces come in custom Duracoat colours. You have seven days from deposit to change your colour."],
  ["Dimensions", "Many designs can be sized to your space — tell us your measurements when you enquire."],
  ["Configuration", "Details like drawer layouts, leg styles and interiors can be adapted on many pieces."],
] as const;

const FAQ = [
  [
    "How do I place an order?",
    `WhatsApp ${SITE.phonePrimary}, send an Instagram DM to ${SITE.instagram}, or email ${SITE.email} with the piece you'd like. A 70% deposit starts the build; we then email an order note for you to confirm.`,
  ],
  [
    "How long will my piece take?",
    "Each piece is built to order. Most take about five weeks for smaller pieces and seven to eight weeks for large ones like chests. The countdown begins once your 70% deposit is received.",
  ],
  [
    "Can I change my order after paying the deposit?",
    "You have seven days from your deposit payment to change details such as the colour. For rugs, colour and design cannot be changed once the order is placed.",
  ],
  [
    "What if the piece doesn't fit my space?",
    "Please measure your space carefully before ordering. We don't take returns or exchanges for size issues, and the full balance is payable once the item is delivered.",
  ],
  [
    "When is the balance due?",
    "The remaining 30% is due within seven days of receiving your furniture.",
  ],
  [
    "Do you make fully custom designs?",
    "Catalogue designs can be customised by wood, colour, dimensions and configuration. Fully custom, from-scratch designs are reserved for bulk and commercial orders of ten or more pieces.",
  ],
  [
    "Can I order a custom rug?",
    "Yes — custom rugs (designs and sizes not in our catalogue) are priced at Ksh 1,800 + VAT per square foot. Colour customisation of an existing catalogue design isn't charged as custom.",
  ],
  [
    "Where can I see the pieces in person?",
    `Our showroom is at ${SITE.showroom.name}, off James Gichuru Road, Nairobi (${SITE.showroom.note.toLowerCase()}), open ${SITE.showroom.hours}.`,
  ],
] as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function HowToOrderPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
      <JsonLd data={faqJsonLd} />

      <Reveal>
        <p className="eyebrow text-terracotta">Built to order</p>
        <h1 className="mt-4 font-display text-4xl uppercase tracking-[0.08em] text-chocolate sm:text-6xl">
          How to Order
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink/80 sm:text-lg">
          Nothing we make sits in a warehouse. You choose a piece, we take a
          70% deposit, and our fundis begin. Five to eight weeks later it
          arrives — made for you.
        </p>
      </Reveal>

      {/* The five steps */}
      <section className="mt-16">
        <Reveal>
          <h2 className="eyebrow text-ink/70">The process</h2>
        </Reveal>
        <Stagger className="mt-8 grid gap-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {STEPS.map(([title, body], i) => (
            <StaggerItem key={title}>
              <p className="font-display text-4xl text-terracotta">{i + 1}</p>
              <h3 className="mt-3 font-display text-xl text-chocolate">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Customisation */}
      <section className="mt-20 border-t border-line pt-12">
        <Reveal>
          <p className="eyebrow text-terracotta">Make it yours</p>
          <h2 className="mt-3 font-display text-3xl text-chocolate sm:text-4xl">
            Customisation
          </h2>
        </Reveal>
        <Stagger className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {CUSTOMISATION.map(([axis, body]) => (
            <StaggerItem key={axis}>
              <h3 className="eyebrow text-chocolate">{axis}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{body}</p>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-8">
          <p className="max-w-2xl text-sm leading-relaxed text-ink/80">
            Fully custom designs — pieces drawn from scratch rather than adapted
            from the catalogue — are reserved for bulk and commercial orders of
            ten or more pieces.
          </p>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mt-20 border-t border-line pt-12">
        <Reveal>
          <p className="eyebrow text-terracotta">Questions</p>
          <h2 className="mt-3 font-display text-3xl text-chocolate sm:text-4xl">
            Frequently asked
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {FAQ.map(([question, answer]) => (
            <Reveal key={question}>
              <h3 className="font-display text-xl text-chocolate">{question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{answer}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-20 border-t border-line pt-12 text-center">
        <Reveal>
          <h2 className="font-display text-2xl text-chocolate sm:text-3xl">
            Ready when you are
          </h2>
          <a
            href={whatsappLink("Hi Savannah Space, I'd like to make an enquiry.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block bg-chocolate px-8 py-3 text-sm font-medium tracking-wide text-bone transition-opacity hover:opacity-90"
          >
            Start an enquiry on WhatsApp
          </a>
        </Reveal>
      </section>
    </div>
  );
}
