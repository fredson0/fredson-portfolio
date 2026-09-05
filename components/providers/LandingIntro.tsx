"use client";

import { useRef, useState } from "react";
import { useLenis } from "lenis/react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/page-transition";

const NAME = "fredson";

/** Resets on F5; survives client-side navigations so the intro only plays on real loads of `/`. */
let landingIntroPlayed = false;

function IntroWord() {
  return (
    <>
      {NAME.split("").map((letter, index) => (
        <span key={`${letter}-${index}`} className="inline-block">
          {letter}
        </span>
      ))}
    </>
  );
}

export default function LandingIntro({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const nameWrapRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLParagraphElement | null>(null);
  const waitRef = useRef<HTMLParagraphElement | null>(null);
  const helloRef = useRef<HTMLParagraphElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  const [visible, setVisible] = useState(() => !landingIntroPlayed);

  lenisRef.current = lenis;

  useGSAP(
    () => {
      if (landingIntroPlayed || prefersReducedMotion()) {
        landingIntroPlayed = true;
        setVisible(false);
        gsap.set(contentRef.current, { clearProps: "transform" });
        if (contentRef.current) {
          contentRef.current.style.willChange = "auto";
        }
        return;
      }

      const overlay = overlayRef.current;
      const nameWrap = nameWrapRef.current;
      const fill = fillRef.current;
      const wait = waitRef.current;
      const hello = helloRef.current;
      const content = contentRef.current;
      if (!overlay || !nameWrap || !fill || !wait || !hello || !content) return;

      lenisRef.current?.stop();
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      gsap.set(overlay, { yPercent: 0 });
      gsap.set(content, { y: 48, willChange: "transform" });
      gsap.set(nameWrap, { opacity: 0 });
      gsap.set(fill, { clipPath: "inset(0% 100% 0% 0%)" });
      gsap.set(wait, { y: 10, opacity: 0 });
      gsap.set(hello, { y: 10, opacity: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          landingIntroPlayed = true;
          document.documentElement.style.overflow = "";
          document.body.style.overflow = "";
          gsap.set(content, { clearProps: "transform" });
          content.style.willChange = "auto";
          lenisRef.current?.start();
          ScrollTrigger.refresh();
          setVisible(false);
        },
      });

      tl.to(nameWrap, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
      tl.to(
        wait,
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
        },
        "<0.08"
      );
      tl.to(
        fill,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 2.05,
          ease: "power1.inOut",
        },
        "-=0.05"
      );
      tl.to(wait, {
        y: -8,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      });
      tl.to(
        hello,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.12"
      );
      tl.to({}, { duration: 0.42 });
      tl.addLabel("reveal");
      tl.to(
        overlay,
        {
          yPercent: -100,
          duration: 1.15,
          ease: "power4.inOut",
        },
        "reveal"
      );
      tl.to(
        content,
        {
          y: 0,
          duration: 1.15,
          ease: "power4.inOut",
        },
        "reveal"
      );
    },
    { dependencies: [] }
  );

  return (
    <>
      {visible ? (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[50000] flex flex-col items-center justify-center bg-[#050505] text-white"
          aria-hidden="true"
        >
          <div
            ref={nameWrapRef}
            className="relative inline-flex opacity-0"
          >
            <p className="flex items-baseline text-[clamp(2.75rem,8vw,5.5rem)] font-medium leading-none tracking-[-0.04em] text-[#3c3c3c]">
              <IntroWord />
            </p>
            <p
              ref={fillRef}
              className="absolute inset-0 flex items-baseline text-[clamp(2.75rem,8vw,5.5rem)] font-medium leading-none tracking-[-0.04em] text-white"
              style={{ clipPath: "inset(0% 100% 0% 0%)" }}
            >
              <IntroWord />
            </p>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center sm:bottom-10">
            <div className="relative flex h-6 min-w-[18rem] items-center justify-center">
              <p
                ref={waitRef}
                className="absolute font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-white opacity-0 will-change-transform sm:text-xs"
              >
                Espere um pouco
              </p>
              <p
                ref={helloRef}
                className="absolute font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-white opacity-0 will-change-transform sm:text-xs"
              >
                Olá
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div ref={contentRef}>
        {children}
      </div>
    </>
  );
}
