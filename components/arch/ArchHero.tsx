"use client";

/*
  The arch — an alternative homepage opening (/arch).

  A tall arch window sits on the bone canvas holding one piece. Scrolling
  opens it: the arch grows until its curve rises out of view and the piece
  fills the screen. On wide screens it is flanked by two more pieces; on
  phones, once open, the hero becomes a swipeable slideshow of all three
  that advances by itself until the visitor touches it.

  One scroll listener writes --t onto the stage and every transform is
  calc() off it. With reduced motion the listener never runs and the wrapper
  is one screen tall, so the resting composition is the whole hero.
*/

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ArchHeader from "./ArchHeader";
import styles from "./arch.module.css";

type Piece = { src: string; blurDataURL?: string; name: string };

type Props = {
  centre: Piece;
  left: Piece;
  right: Piece;
  materials: string;
};

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const ease = (v: number) => v * v * (3 - 2 * v);

/* Held closed for a beat, fully open before the stage releases. */
const OPEN_FROM = 0.06;
const OPEN_TO = 0.8;
const ADVANCE_MS = 4500;

const blur = (p: Piece) =>
  p.blurDataURL ? { placeholder: "blur" as const, blurDataURL: p.blurDataURL } : {};

export default function ArchHero({ centre, left, right, materials }: Props) {
  const wrapRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const [active, setActive] = useState(0);

  // Phone slideshow order: the arch opens on the centre piece.
  const slides = [centre, left, right];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!wrap || !stage) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const travel = wrap.offsetHeight - stage.offsetHeight;
      const p = travel > 0 ? clamp01(-wrap.getBoundingClientRect().top / travel) : 0;
      const t = ease(clamp01((p - OPEN_FROM) / (OPEN_TO - OPEN_FROM)));
      stage.style.setProperty("--t", t.toFixed(4));
      const open = t > 0.6 ? "true" : "false";
      if (stage.dataset.open !== open) stage.dataset.open = open;
      const done = t > 0.97 ? "true" : "false";
      if (stage.dataset.done !== done) stage.dataset.done = done;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = useCallback((i: number) => {
    const el = slidesRef.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  }, []);

  // Auto-advance on phones once open, until the visitor touches the slides.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      const stage = stageRef.current;
      const el = slidesRef.current;
      if (!stage || !el || touched.current) return;
      if (stage.dataset.done !== "true" || window.matchMedia("(min-width: 768px)").matches) return;
      const r = stage.getBoundingClientRect();
      if (r.bottom < window.innerHeight * 0.5 || r.top > window.innerHeight * 0.5) return;
      goTo((Math.round(el.scrollLeft / el.clientWidth) + 1) % slides.length);
    }, ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [goTo, slides.length]);

  const onSlidesScroll = () => {
    const el = slidesRef.current;
    if (!el || !el.clientWidth) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    setActive((prev) => (prev === i ? prev : i));
  };
  const stopAuto = () => {
    touched.current = true;
  };

  return (
    <section ref={wrapRef} className={styles.wrap} aria-label="Savannah Space">
      <div ref={stageRef} className={`${styles.stage} bg-bone`} data-open="false" data-done="false">
        <ArchHeader />

        {/* Above the arch on phones; a left column on wide screens. */}
        <div
          className={`${styles.intro} absolute inset-x-0 top-[6.9rem] z-10 px-6 text-center md:inset-x-auto md:left-[6vw] md:top-1/2 md:w-[26vw] md:-translate-y-1/2 md:px-0 md:text-left`}
        >
          <p className="eyebrow text-terracotta">Made in Kenya</p>
          <h1 className="mt-2 font-display text-[clamp(1.15rem,5.2vw,1.5rem)] leading-snug text-chocolate md:mt-4 md:text-[clamp(2.25rem,3.6vw,3.4rem)] md:leading-[1.08]">
            Where African heritage lives in design.
          </h1>
          <Link
            href="/collections"
            className="eyebrow mt-8 hidden border-b border-chocolate/60 pb-1 text-chocolate md:inline-block"
          >
            Explore the collections
          </Link>
        </div>

        {/* Wide screens: a small caption on the right while the arch is shut. */}
        <div
          className={`${styles.intro} absolute right-[6vw] top-1/2 z-10 hidden w-[20vw] -translate-y-1/2 text-right md:block`}
        >
          <p className="eyebrow text-[0.625rem] text-ink/60">Pictured</p>
          <p className="mt-2 font-display text-2xl uppercase tracking-[0.08em] text-chocolate">
            {centre.name}
          </p>
          <p className="eyebrow mt-2 text-[0.5625rem] text-ink/60">{materials}</p>
        </div>

        <div className={styles.arch}>
          <div className={styles.layer}>
            <div className={`${styles.side} ${styles.sideLeft}`}>
              <Image
                src={left.src}
                alt={`${left.name}, handcrafted in Kenya by Savannah Space`}
                fill
                sizes="34vw"
                className="object-cover object-[50%_60%]"
                {...blur(left)}
              />
            </div>
            <div className={styles.centre}>
              <Image
                src={centre.src}
                alt={`${centre.name}, handcrafted in Kenya by Savannah Space`}
                width={605}
                height={807}
                priority
                sizes="(min-width: 768px) 75dvh, 100vw"
                className={styles.centreImg}
                {...blur(centre)}
              />
            </div>
            <div className={`${styles.side} ${styles.sideRight}`}>
              <Image
                src={right.src}
                alt={`${right.name}, handcrafted in Kenya by Savannah Space`}
                fill
                sizes="34vw"
                className="object-cover object-[50%_60%]"
                {...blur(right)}
              />
            </div>
            <div aria-hidden className={styles.shade} />
          </div>
        </div>

        {/* Phones, once the arch is open: the three pieces as a slideshow.
            Its first slide is pixel-identical to the open arch, so the hand-off
            is a fade between two identical frames. */}
        <div
          ref={slidesRef}
          className={styles.slides}
          onScroll={onSlidesScroll}
          onTouchStart={stopAuto}
          onPointerDown={stopAuto}
          onWheel={stopAuto}
          aria-roledescription="carousel"
          aria-label="Featured pieces"
        >
          {slides.map((p, i) => (
            <div
              key={p.name}
              className={styles.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
            >
              {i === 0 ? (
                <Image
                  src={p.src}
                  alt={`${p.name}, handcrafted in Kenya by Savannah Space`}
                  width={605}
                  height={807}
                  sizes="100vw"
                  className={styles.slideFirst}
                  {...blur(p)}
                />
              ) : (
                <Image
                  src={p.src}
                  alt={`${p.name}, handcrafted in Kenya by Savannah Space`}
                  fill
                  sizes="100vw"
                  className="object-cover object-[50%_60%]"
                  {...blur(p)}
                />
              )}
              <div aria-hidden className={styles.slideShade} />
            </div>
          ))}
        </div>

        {/* The nameplate and the way in, arriving once the arch is open. */}
        <div
          className={`${styles.plate} absolute inset-x-0 bottom-0 z-10 px-6 pb-10 text-center text-bone md:pb-12`}
        >
          <div className="mb-5 flex items-center justify-center gap-1 md:hidden" role="group" aria-label="Choose a piece">
            {slides.map((p, i) => (
              <button
                key={p.name}
                type="button"
                aria-label={`Show ${p.name}`}
                aria-current={active === i}
                onClick={() => {
                  stopAuto();
                  goTo(i);
                }}
                className="flex h-8 w-8 items-center justify-center"
              >
                <span
                  className={`block h-1.5 rounded-full bg-bone transition-all duration-300 ${
                    active === i ? "w-6 opacity-100" : "w-1.5 opacity-50"
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="eyebrow text-[0.625rem] text-bone/85">
            <span className="text-marigold">{String(active + 1).padStart(2, "0")}</span> — The pieces
          </p>
          <h2 className="mt-3 font-display text-3xl uppercase tracking-[0.08em]" aria-live="polite">
            {slides[active]?.name ?? centre.name}
          </h2>
          <Link
            href="/collections"
            className="eyebrow mt-7 inline-block border-b border-bone/70 pb-1"
          >
            View collections
          </Link>
        </div>

        <p
          aria-hidden
          className={`${styles.intro} eyebrow absolute inset-x-0 bottom-[3.5dvh] z-10 text-center text-[0.5625rem] text-ink/50`}
        >
          Scroll to open
        </p>
      </div>
    </section>
  );
}
