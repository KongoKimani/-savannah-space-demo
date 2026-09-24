"use client";

/*
  The arch — an alternative homepage opening (/arch).

  A tall arch window sits on the bone canvas holding one piece. Scrolling
  opens it: the window grows to the full height of the photograph, the
  arch's curve flattens, and the piece's nameplate arrives.

  Same technique as the cabinet: one scroll listener writes --t and --r onto
  the stage, and every transform is calc() off them. With reduced motion the
  listener never runs and the wrapper is one screen tall, so the resting
  composition is the whole hero.
*/

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./arch.module.css";

type Props = {
  src: string;
  blurDataURL?: string;
  name: string;
  materials: string;
  priceLine: string;
  href: string;
};

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const ease = (v: number) => v * v * (3 - 2 * v);

/* Held closed for a beat, fully open before the stage releases. */
const OPEN_FROM = 0.06;
const OPEN_TO = 0.8;

export default function ArchHero({ src, blurDataURL, name, materials, priceLine, href }: Props) {
  const wrapRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

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
      const r = clamp01((t - 0.72) / 0.28);
      stage.style.setProperty("--t", t.toFixed(4));
      stage.style.setProperty("--r", r.toFixed(4));
      const open = t > 0.6 ? "true" : "false";
      if (stage.dataset.open !== open) stage.dataset.open = open;
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

  return (
    <section ref={wrapRef} className={styles.wrap} aria-label="Savannah Space">
      <div ref={stageRef} className={`${styles.stage} bg-bone`} data-open="false">
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
            {name}
          </p>
          <p className="eyebrow mt-2 text-[0.5625rem] text-ink/60">{materials}</p>
        </div>

        <div className={styles.photo}>
          <Image
            src={src}
            alt={`${name}, handcrafted in Kenya by Savannah Space`}
            width={605}
            height={807}
            priority
            sizes="(min-width: 768px) 75dvh, 100vw"
            className={styles.photoImg}
            {...(blurDataURL ? { placeholder: "blur" as const, blurDataURL } : {})}
          />
          <div aria-hidden className={styles.shade} />
        </div>

        {/* The nameplate, arriving once the arch is open. */}
        <div
          className={`${styles.plate} absolute inset-x-0 bottom-0 z-10 px-6 pb-10 text-center text-bone md:pb-12`}
        >
          <p className="eyebrow text-[0.625rem] text-bone/85">
            <span className="text-marigold">01</span> — The piece
          </p>
          <h2 className="mt-3 font-display text-3xl uppercase tracking-[0.08em]">{name}</h2>
          <p className="eyebrow mt-3 text-[0.5625rem] text-bone/75">{materials}</p>
          <p className="mt-3 font-display text-lg">{priceLine}</p>
          <div className="mt-6 flex items-center justify-center gap-8">
            <Link href={href} className="eyebrow border-b border-bone/70 pb-1">
              View the piece
            </Link>
            <Link href="/collections" className="eyebrow border-b border-bone/70 pb-1">
              Collections
            </Link>
          </div>
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
