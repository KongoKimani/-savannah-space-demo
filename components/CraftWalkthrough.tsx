"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/*
  "The Build" — a five-stage visual walkthrough of a piece being made,
  assembled entirely from catalogue photos shot in the workshop (brief rule
  9.1: no stock, no AI imagery).

  Desktop: stage texts scroll past a sticky, crossfading image panel.
  Mobile: the image panel pins to the top of the viewport and crossfades
  while the stage texts scroll beneath it — same feel, phone-shaped.
  Reduced motion: static stacked scenes.
  Every claim below traces to the catalogue PDFs or CLAUDE.md §1.
*/

const STAGES = [
  {
    title: "The timber",
    body: "It starts as wood with a name — Mvule, Mango, Camphor, Meru Oak, Muringa — chosen for your piece, subject only to availability.",
    image: "/images/pieces/benga-dining-table/04.jpg",
    alt: "The Benga dining table photographed against stacked raw timber in the Savannah Space workshop",
  },
  {
    title: "The frame",
    body: "Your 70% deposit starts the build. The frame goes together first — solid wood, or block board with plywood backs for painted pieces.",
    image: "/images/pieces/spindle-bed/01.jpg",
    alt: "A bare Spindle Bed frame mid-build outside the Savannah Space workshop",
  },
  {
    title: "The hand",
    body: "Thirteen fundis shape every joint, flute and curve by hand in our own Nairobi workshop. Grain varies. No two pieces repeat.",
    image: "/images/story/workshop-fundi.jpg",
    alt: "A Savannah Space fundi shaping wood with a router in the Nairobi workshop",
  },
  {
    title: "The finish",
    body: "Painted pieces take custom Duracoat colours — Pond Moss, Mocha Bisque, Aqua Electra. You have seven days from deposit to change yours.",
    image: "/images/pieces/swala-console-dining/02.jpg",
    alt: "A maker carrying the freshly finished Swala console table across the workshop floor",
  },
  {
    title: "Home",
    body: "Five to eight weeks after your deposit, the piece arrives. The balance is due within seven days of delivery — and it's yours.",
    image: "/images/pieces/kitur-sofa/06.jpg",
    alt: "The finished Kitur sofa styled in a living room with a dark coffee table",
  },
];

/* Active stage = the text block currently crossing a thin band of the
   viewport, tracked with a plain IntersectionObserver so it is
   deterministic in both scroll directions. */
function useActiveStage(band: string) {
  const [active, setActive] = useState(0);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.stage));
          }
        }
      },
      { rootMargin: band }
    );
    blocksRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [band]);

  return { active, blocksRef };
}

function StageMarker({ index }: { index: number }) {
  return (
    // bone, not marigold — the marigold budget (~3 uses) is spent on the
    // featured-chapter numerals
    <p className="eyebrow text-[0.625rem]">
      <span>Stage {String(index + 1).padStart(2, "0")}</span>
      <span aria-hidden className="mx-3 opacity-50">
        —
      </span>
      <span className="opacity-70">The build</span>
    </p>
  );
}

/* The crossfading image stack with the NN/05 counter. Solid charcoal ground
   so scrolling text never shows through while images load. */
function ImageStack({ active, sizes }: { active: number; sizes: string }) {
  return (
    <div className="relative h-full overflow-hidden bg-charcoal">
      {STAGES.map((stage, i) => (
        <Image
          key={stage.image}
          src={stage.image}
          alt={i === active ? stage.alt : ""}
          fill
          sizes={sizes}
          quality={60}
          className="object-cover transition-opacity duration-700 ease-out"
          style={{ opacity: i === active ? 1 : 0 }}
        />
      ))}
      <p className="eyebrow absolute bottom-4 right-4 text-[0.625rem] text-bone/80 sm:bottom-5 sm:right-5">
        {String(active + 1).padStart(2, "0")} / {String(STAGES.length).padStart(2, "0")}
      </p>
    </div>
  );
}

/* Reduced-motion fallback: static stacked scenes. */
function StackedStages() {
  return (
    <div className="space-y-14">
      {STAGES.map((stage, i) => (
        <div key={stage.title}>
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[3/2]">
            <Image
              src={stage.image}
              alt={stage.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="mt-5">
            <StageMarker index={i} />
            <h3 className="mt-3 font-display text-2xl sm:text-3xl">{stage.title}</h3>
            <p className="mt-2 max-w-md text-base leading-relaxed opacity-80">
              {stage.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* Mobile: image panel pinned to the top of the viewport, stages scroll
   beneath it. The active band sits in the lower half of the screen —
   the part not covered by the pinned image. */
function MobileStickyStages() {
  const { active, blocksRef } = useActiveStage("-55% 0px -20% 0px");
  return (
    <div>
      <div className="sticky top-0 z-10 h-[46dvh]">
        <ImageStack active={active} sizes="100vw" />
      </div>
      <div>
        {STAGES.map((stage, i) => (
          <div
            key={stage.title}
            ref={(el) => {
              blocksRef.current[i] = el;
            }}
            data-stage={i}
            className="flex min-h-[44dvh] flex-col justify-center py-8"
          >
            <StageMarker index={i} />
            <h3 className="mt-3 font-display text-3xl">{stage.title}</h3>
            <p className="mt-3 max-w-md text-base leading-relaxed opacity-80">
              {stage.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Desktop: scrolling stage texts + sticky crossfading image panel. */
function DesktopStickyStages() {
  const { active, blocksRef } = useActiveStage("-45% 0px -45% 0px");
  return (
    <div className="grid grid-cols-2 gap-16">
      <div>
        {STAGES.map((stage, i) => (
          <div
            key={stage.title}
            ref={(el) => {
              blocksRef.current[i] = el;
            }}
            data-stage={i}
            className="flex min-h-[80vh] flex-col justify-center"
          >
            <StageMarker index={i} />
            <h3 className="mt-4 font-display text-4xl xl:text-5xl">{stage.title}</h3>
            <p className="mt-4 max-w-md text-base leading-relaxed opacity-80 xl:text-lg">
              {stage.body}
            </p>
          </div>
        ))}
      </div>
      <div className="sticky top-0 h-dvh py-10">
        <ImageStack active={active} sizes="50vw" />
      </div>
    </div>
  );
}

export default function CraftWalkthrough() {
  const reduce = useReducedMotion();
  if (reduce) return <StackedStages />;
  return (
    <>
      <div className="lg:hidden">
        <MobileStickyStages />
      </div>
      <div className="hidden lg:block">
        <DesktopStickyStages />
      </div>
    </>
  );
}
