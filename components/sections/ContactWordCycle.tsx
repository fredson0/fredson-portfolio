"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

const WORDS = ["VAMOS", "JUNTOS", "CONTATE"] as const;

const SLOT_COUNT = Math.max(...WORDS.map((word) => word.length));

function padWord(word: string) {
  const leftover = SLOT_COUNT - word.length;
  const left = Math.floor(leftover / 2);
  return `${" ".repeat(left)}${word}${" ".repeat(SLOT_COUNT - word.length - left)}`;
}

/** Odds of the outgoing word first (A, O in VAMOS), then the rest. */
function slotDelay(index: number, outgoingPadded: string) {
  if (outgoingPadded[index] === " ") {
    return 0.22;
  }

  const first = Math.max(0, outgoingPadded.search(/\S/));
  const local = index - first;
  const group = Math.floor(local / 2);
  return (local % 2 === 1 ? 0 : 0.16) + group * 0.055;
}

export default function ContactWordCycle() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const slots = Array.from(
        root.querySelectorAll<HTMLElement>("[data-slot]")
      );
      if (slots.length === 0) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      let currentWord: string = WORDS[0];
      let wordIndex = 0;
      let inView = true;
      let timeline: gsap.core.Timeline | null = null;

      const letterNodes = () =>
        root.querySelectorAll<HTMLElement>("[data-letter]");

      const layersOf = (slot: HTMLElement) => {
        const layers = slot.querySelectorAll<HTMLElement>("[data-letter]");
        return {
          front: layers[0],
          back: layers[1],
        };
      };

      const kill = () => {
        timeline?.kill();
        timeline = null;
        gsap.killTweensOf(letterNodes());
      };

      const paint = (word: string) => {
        const padded = padWord(word);

        slots.forEach((slot, index) => {
          const { front, back } = layersOf(slot);
          const next = padded[index] ?? " ";
          const display = next === " " ? "\u00A0" : next;
          const opacity = next === " " ? 0 : 1;

          if (front) {
            front.textContent = display;
            gsap.set(front, { yPercent: 0, opacity });
          }
          if (back) {
            back.textContent = display;
            gsap.set(back, { yPercent: -115, opacity: 0 });
          }
        });

        currentWord = word;
      };

      const setWord = (word: string, immediate = false) => {
        kill();

        if (immediate || reducedMotion || !inView) {
          paint(word);
          return;
        }

        const padded = padWord(word);
        const outgoingPadded = padWord(currentWord);

        timeline = gsap.timeline({
          onComplete: () => {
            paint(word);
            timeline = null;
          },
        });

        slots.forEach((slot, index) => {
          const { front, back } = layersOf(slot);
          if (!front || !back) return;

          const next = padded[index] ?? " ";
          const display = next === " " ? "\u00A0" : next;
          const delay = slotDelay(index, outgoingPadded);

          back.textContent = display;
          gsap.set(back, {
            yPercent: -115,
            opacity: next === " " ? 0 : 0.35,
          });

          timeline?.to(
            front,
            {
              yPercent: 115,
              opacity: 0,
              duration: 0.9,
              ease: "power3.inOut",
            },
            delay
          );
          timeline?.to(
            back,
            {
              yPercent: 0,
              opacity: next === " " ? 0 : 1,
              duration: 0.9,
              ease: "power3.inOut",
            },
            delay
          );
        });

        currentWord = word;
      };

      paint(WORDS[0]);

      if (reducedMotion) {
        return () => kill();
      }

      const playNext = () => {
        if (document.hidden || !inView) return;
        wordIndex = (wordIndex + 1) % WORDS.length;
        setWord(WORDS[wordIndex]);
      };

      const intervalId = window.setInterval(playNext, 2600);

      const observer = new IntersectionObserver(
        ([entry]) => {
          inView = Boolean(entry?.isIntersecting);
          if (!inView) {
            kill();
            paint(currentWord);
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(root);

      const freeze = () => {
        kill();
        paint(currentWord);
      };

      const onVisibility = () => {
        if (document.hidden) freeze();
      };

      const onPageShow = (event: PageTransitionEvent) => {
        if (event.persisted) freeze();
      };

      document.addEventListener("visibilitychange", onVisibility);
      window.addEventListener("pageshow", onPageShow);

      return () => {
        window.clearInterval(intervalId);
        observer.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("pageshow", onPageShow);
        freeze();
      };
    },
    { scope: rootRef, dependencies: [] }
  );

  const initial = padWord(WORDS[0]);

  return (
    <div
      ref={rootRef}
      className="flex items-center justify-center"
      aria-hidden="true"
    >
      {Array.from({ length: SLOT_COUNT }, (_, index) => (
        <span
          key={index}
          data-slot
          className="relative inline-block h-[1em] w-[0.68em] overflow-hidden sm:w-[0.7em]"
        >
          <span
            data-letter
            className="absolute inset-0 flex items-center justify-center will-change-transform"
          >
            {initial[index] === " " ? "\u00A0" : initial[index]}
          </span>
          <span
            data-letter
            className="absolute inset-0 flex items-center justify-center will-change-transform"
          >
            {initial[index] === " " ? "\u00A0" : initial[index]}
          </span>
        </span>
      ))}
    </div>
  );
}
