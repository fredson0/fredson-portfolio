"use client";

import { useRef, useState } from "react";
import { useLenis } from "lenis/react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/page-transition";

const NAME = "fredson";

/** Resets on F5; survives client-side navigations so the intro only plays on real loads of `/`. */
let landingIntroPlayed = false;

export default function LandingIntro({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLParagraphElement | null>(null);
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
        gsap.set(contentRef.current, { y: 0 });
        return;
      }

      const overlay = overlayRef.current;
      const name = nameRef.current;
      const content = contentRef.current;
      if (!overlay || !name || !content) return;

      const letters = name.querySelectorAll<HTMLElement>("[data-letter]");

      lenisRef.current?.stop();
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      gsap.set(overlay, { yPercent: 0 });
      gsap.set(content, { y: 48 });
      gsap.set(letters, { y: 28, opacity: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          landingIntroPlayed = true;
          document.documentElement.style.overflow = "";
          document.body.style.overflow = "";
          lenisRef.current?.start();
          ScrollTrigger.refresh();
          setVisible(false);
        },
      });

      tl.to(letters, {
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.055,
        ease: "power3.out",
      });
      tl.to({}, { duration: 0.32 });
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
          <p
            ref={nameRef}
            className="flex items-baseline text-[clamp(2.75rem,8vw,5.5rem)] font-medium leading-none tracking-[-0.04em]"
          >
            {NAME.split("").map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                data-letter
                className="inline-block opacity-0 will-change-transform"
              >
                {letter}
              </span>
            ))}
          </p>
        </div>
      ) : null}

      <div ref={contentRef} className="will-change-transform">
        {children}
      </div>
    </>
  );
}
