"use client";

/*
  The cabinet — the homepage opening.

  A single carved face that irises open from the centre. The rings unwind as
  it goes: each one turns at its own rate and drifts outward, so the carving
  spirals apart rather than simply parting.

  Everything here is DOM and CSS. There is no canvas, no texture to download
  and no loading state: the shut face is in the server-rendered HTML and
  paints with the first frame. The only client work is writing one number
  (`--open`, 0 to 1) onto the stage each frame; every transform below is a
  `calc()` off that number, so React never re-renders while you scroll.

  The carving is vector line work, not a photograph of the Oromo Bar — the
  piece's turned rings abstracted, so it reads as Savannah's without
  pretending to be a photo of anything.
*/

import { useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";
import styles from "./cabinet.module.css";

/* Scroll budget. The sticky stage holds for (SECTION_VH - 100) viewport
   heights, which is the whole opening — about eight wheel ticks. */
const SECTION_VH = 220;

/* Held shut at the start so the still frame gets a beat before anything
   moves, and fully clear before the stage releases. */
const OPEN_FROM = 0.12;
const OPEN_TO = 0.82;

const RINGS = 15;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/*
  The carving.

  Each ring is a near-closed arc, not a circle. That matters: a circle
  rotated about its own centre is indistinguishable from itself, so
  concentric circles spinning would look completely static no matter how fast
  they turned. The break in each ring is what gives the rotation something to
  show, and staggering those breaks around the face puts a spiral into the
  shut state before anything has moved.
*/
function Carving() {
  const rings = [];
  for (let i = 0; i < RINGS; i++) {
    // Tighter in the middle, opening out — the way the real piece is turned.
    const r = 6 + Math.pow(i / (RINGS - 1), 0.82) * 44;
    const circumference = 2 * Math.PI * r;
    const gap = 0.055;
    const dash = `${circumference * (1 - gap)} ${circumference * gap}`;
    // Golden-ish stagger so the breaks never line up into a straight seam.
    const offset = i * 37;

    const style = {
      // Inner rings turn furthest — a vortex accelerates toward its centre.
      "--spin": `${8 + (RINGS - i) * 7}deg`,
      // Outer rings travel furthest — they have the least distance to leave.
      "--push": 0.05 + i * 0.03,
    } as CSSProperties;

    rings.push(
      <g key={i} className={styles.ring} style={style}>
        {/* carved shadow, then the lit lip a hair above it */}
        <circle
          className={styles.ringShadow}
          cx="50"
          cy="50"
          r={r}
          strokeDasharray={dash}
          transform={`rotate(${offset} 50 50)`}
        />
        <circle
          className={styles.ringLight}
          cx="50"
          cy="49.72"
          r={r}
          strokeDasharray={dash}
          transform={`rotate(${offset} 50 49.72)`}
        />
      </g>
    );
  }

  return (
    <svg
      className={styles.carving}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      {rings}
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

    // Reduced motion: the face is already open, and scrolling does nothing.
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

      // Weighted easing: slow to start, then away. A heavy carved face does
      // not open linearly, and linear is what makes CSS motion feel plastic.
      const eased = open * open * (3 - 2 * open);

      // A small lerp on top so a hard flick still feels like mass moving.
      current += (eased - current) * 0.18;
      if (Math.abs(eased - current) < 0.0005) current = eased;

      stage.style.setProperty("--open", current.toFixed(4));

      /* The aperture gets its own curve, biased late.

         Driving the hole straight off --open grows it from the very first
         pixel of scroll, which punches through the wordmark while the
         wordmark is still at full opacity. Raising it to a power keeps the
         opening a pinprick until the face has had time to clear its copy,
         then lets it run. Done here rather than with a CSS pow() so it does
         not depend on browser support for the maths. */
      stage.style.setProperty("--ap", Math.pow(current, 1.7).toFixed(4));

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
        {/* ---- Inside the cabinet. Server-rendered underneath the face, so
                the reveal is a real element being uncovered. ---- */}
        <div className={styles.interior}>
          <div className={styles.interiorGlow} aria-hidden="true" />
          <div className={styles.interiorContent}>
            <p className={`eyebrow ${styles.interiorEyebrow}`}>
              Made in Kenya · Since 2018
            </p>
            {/* Deliberately not a repeat of the copy on the shut face —
                saying the same line twice in ten seconds is weak. The face
                greets; the inside makes the argument. */}
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

        {/* ---- The carved face. The aperture eats it from the centre out. ---- */}
        <div className={styles.face} aria-hidden="true">
          <Carving />

          {/* Brass at the centre. The palette allows roughly three marigold
              moments sitewide; this is one of them. */}
          <span className={styles.boss} />

          <div className={styles.wordmark}>
            {/* Two words, not one string: on a phone the mark stacks rather
                than shrinking to something illegible or running off the
                edge. */}
            <span className={styles.wordmarkInner}>
              <span className={styles.word}>Savannah</span>
              <span className={styles.word}>Space</span>
            </span>
          </div>
        </div>

        {/* Warm light at the lip of the aperture — the opening is lit from
            inside, so the edge is where the spill is brightest. */}
        <div className={styles.rim} aria-hidden="true" />

        {/* ---- Standing copy, on the face while it is shut ---- */}
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
          <p className={styles.chromeShowroom}>{SITE.showroom.name}, Nairobi</p>
        </div>
      </div>
    </section>
  );
}
