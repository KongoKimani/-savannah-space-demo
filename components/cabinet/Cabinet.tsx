"use client";

/*
  The cabinet — the homepage opening.

  Two doors, hinged at the outer edges, carrying the wordmark across a centre
  seam. Scrolling swings them open onto the collection.

  Everything here is DOM and CSS. There is no canvas, no texture to download
  and no loading state: the closed doors are in the server-rendered HTML and
  paint with the first frame. The only client work is writing one number
  (`--open`, 0 to 1) onto the stage each frame; every transform below is a
  `calc()` off that number, so React never re-renders while you scroll.

  The rings are vector, not a photograph of the Oromo Bar — the piece's
  carving abstracted to line work, so it reads as Savannah's without
  pretending to be a photo of anything.
*/

import { useEffect, useRef } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";
import styles from "./cabinet.module.css";

/* Scroll budget. The sticky stage holds for (SECTION_VH - 100) viewport
   heights, which is the whole opening — about eight wheel ticks. */
const SECTION_VH = 220;

/* Held closed at the start so the still frame gets a beat before anything
   moves, and fully clear before the stage releases. */
const OPEN_FROM = 0.12;
const OPEN_TO = 0.82;

const RINGS = 15;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Half of the carved disc. Centred on the seam by the CSS, so the two
    halves meet as whole circles. */
function Rings() {
  const circles = [];
  for (let i = 0; i < RINGS; i++) {
    // Tighter in the middle, opening out — the way the real piece is turned.
    const r = 6 + Math.pow(i / (RINGS - 1), 0.82) * 44;
    circles.push(
      <g key={i}>
        {/* carved shadow, then the lit lip a hair above it */}
        <circle cx="50" cy="50" r={r} className={styles.ringShadow} />
        <circle cx="50" cy="49.72" r={r} className={styles.ringLight} />
      </g>
    );
  }
  return (
    <svg
      className={styles.rings}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      {circles}
    </svg>
  );
}

/** The rotating microcopy ring around the OPEN control. */
function OpenControl({ onOpen }: { onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className={styles.openControl}>
      <svg className={styles.openRing} viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <path
            id="cabinet-open-ring"
            d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            fill="none"
          />
        </defs>
        <text className={styles.openRingText}>
          <textPath href="#cabinet-open-ring" startOffset="0">
            SCROLL TO OPEN · HANDCRAFTED IN NAIROBI · BUILT TO ORDER ·
          </textPath>
        </text>
      </svg>
      <span className={styles.openLabel}>Open</span>
    </button>
  );
}

export default function Cabinet() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    // Reduced motion: the doors are already open, and scrolling does nothing.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stage.style.setProperty("--open", "1");
      stage.dataset.state = "open";
      return;
    }

    let raf = 0;
    let current = 0;

    const frame = () => {
      const travel = section.offsetHeight - window.innerHeight;
      const t = travel > 0 ? clamp01(-section.getBoundingClientRect().top / travel) : 1;
      const open = clamp01((t - OPEN_FROM) / (OPEN_TO - OPEN_FROM));

      // Weighted easing: slow to start, then away. Heavy doors do not ease
      // linearly, and linear is what makes a CSS door feel like plastic.
      const eased = open * open * (3 - 2 * open);

      // A small lerp on top so a hard flick still feels like mass moving.
      current += (eased - current) * 0.18;
      if (Math.abs(eased - current) < 0.0005) current = eased;

      stage.style.setProperty("--open", current.toFixed(4));
      stage.dataset.state = current > 0.985 ? "open" : "closed";

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* The OPEN control is the keyboard and click path to the same place the
     scroll goes — the opening is never gesture-only. */
  const openCabinet = () => {
    const section = sectionRef.current;
    if (!section) return;
    const target = section.offsetTop + (section.offsetHeight - window.innerHeight);
    window.scrollTo({ top: target, behavior: "auto" });
  };

  return (
    <section ref={sectionRef} className={styles.section} style={{ height: `${SECTION_VH}vh` }}>
      <div ref={stageRef} className={styles.stage}>
        {/* ---- Inside the cabinet. Server-rendered underneath the doors, so
                the reveal is a real element being uncovered, not a fade. ---- */}
        <div className={styles.interior}>
          <div className={styles.interiorGlow} aria-hidden="true" />
          <div className={styles.interiorContent}>
            <p className={`eyebrow ${styles.interiorEyebrow}`}>
              Made in Kenya · Since 2018
            </p>
            {/* Deliberately not a repeat of the copy on the closed doors —
                saying the same line twice in ten seconds is weak. The doors
                greet; the inside makes the argument. */}
            <h1 className={styles.interiorHeading}>
              Furniture built to order.
              <span className={styles.interiorHeadingAccent}>
                Never from a warehouse.
              </span>
            </h1>
            <p className={styles.interiorBody}>
              Thirteen fundis and a guild of Kenyan artisans, in our own Nairobi
              workshop. Nine woods. Five to eight weeks.
            </p>
            <Link href="/collections" className={styles.interiorCta}>
              See the collections
            </Link>
          </div>
        </div>

        {/* ---- The doors ---- */}
        <div className={styles.doors} aria-hidden="true">
          <div className={`${styles.door} ${styles.doorLeft}`}>
            <div className={styles.doorFace}>
              <Rings />
              {/* Two words, not one string: on a phone the mark stacks
                  rather than shrinking to something illegible or running off
                  the edge. */}
              <div className={styles.wordmark}>
                <span className={styles.wordmarkInner}>
                  <span className={styles.word}>Savannah</span>
                  <span className={styles.word}>Space</span>
                </span>
              </div>
              <span className={styles.knob} />
            </div>
            <div className={styles.doorEdge} />
          </div>

          <div className={`${styles.door} ${styles.doorRight}`}>
            <div className={styles.doorFace}>
              <Rings />
              {/* Two words, not one string: on a phone the mark stacks
                  rather than shrinking to something illegible or running off
                  the edge. */}
              <div className={styles.wordmark}>
                <span className={styles.wordmarkInner}>
                  <span className={styles.word}>Savannah</span>
                  <span className={styles.word}>Space</span>
                </span>
              </div>
              <span className={styles.knob} />
            </div>
            <div className={styles.doorEdge} />
          </div>

          {/* Warm light in the crack — the detail that says there is something
              behind this, before anyone has touched it. */}
          <div className={styles.seam} />
        </div>

        {/* ---- Standing copy, on the doors while they are closed ---- */}
        <div className={styles.chrome}>
          <p className={`${styles.chromeLine} ${styles.chromeLeft}`}>
            Welcome to Savannah Space.
          </p>
          <p className={`${styles.chromeLine} ${styles.chromeRight}`}>
            This is our collection.
          </p>
          <p className={styles.chromeEdge}>The cabinet</p>
          <div className={styles.chromeControl}>
            <OpenControl onOpen={openCabinet} />
          </div>
          <p className={styles.chromeShowroom}>
            {SITE.showroom.name}, Nairobi
          </p>
        </div>
      </div>
    </section>
  );
}
