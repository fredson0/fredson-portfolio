"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/page-transition";
import { LIVE_SITE_ORB, LIVE_SITE_ORB_FILL } from "@/lib/theme";

type LiveSiteOrbProps = {
  href: string;
  label?: string;
};

export default function LiveSiteOrb({
  href,
  label = "Visite o site",
}: LiveSiteOrbProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const magnetRef = useRef<HTMLAnchorElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const fillRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const magnet = magnetRef.current;
      const text = textRef.current;
      const fill = fillRef.current;
      if (!root || !magnet || !text || !fill) return;

      const reducedMotion = prefersReducedMotion();

      gsap.set(magnet, { x: 0, y: 0, rotate: "0.001deg" });
      gsap.set(text, { x: 0, y: 0, rotate: "0.001deg" });
      gsap.set(fill, { y: "76%" });

      const enableMagnetic = !reducedMotion && window.innerWidth > 540;
      const strength = 100;
      const textStrength = 50;

      const onMove = (event: MouseEvent) => {
        const bounding = magnet.getBoundingClientRect();
        const x =
          (event.clientX - bounding.left) / magnet.offsetWidth - 0.5;
        const y =
          (event.clientY - bounding.top) / magnet.offsetHeight - 0.5;

        gsap.to(magnet, {
          x: x * strength,
          y: y * strength,
          rotate: "0.001deg",
          duration: 1.5,
          ease: "power4.out",
          overwrite: "auto",
        });
        gsap.to(text, {
          x: x * textStrength,
          y: y * textStrength,
          rotate: "0.001deg",
          duration: 1.5,
          ease: "power4.out",
          overwrite: "auto",
        });
      };

      const onLeave = () => {
        gsap.to(magnet, {
          x: 0,
          y: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.3)",
          overwrite: "auto",
        });
        gsap.to(text, {
          x: 0,
          y: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.3)",
          overwrite: "auto",
        });
        gsap.to(fill, {
          y: "-76%",
          duration: 0.6,
          ease: "power2.inOut",
          overwrite: "auto",
        });
      };

      const onEnter = () => {
        gsap.fromTo(
          fill,
          { y: "76%" },
          {
            y: "0%",
            duration: 0.6,
            ease: "power2.inOut",
            overwrite: "auto",
          }
        );
      };

      if (enableMagnetic) {
        magnet.addEventListener("mousemove", onMove);
      }
      magnet.addEventListener("mouseenter", onEnter);
      magnet.addEventListener("mouseleave", onLeave);

      return () => {
        magnet.removeEventListener("mousemove", onMove);
        magnet.removeEventListener("mouseenter", onEnter);
        magnet.removeEventListener("mouseleave", onLeave);
        gsap.killTweensOf([magnet, text, fill]);
      };
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="live-site-orb pointer-events-none">
      <a
        ref={magnetRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="live-site-orb-btn pointer-events-auto relative flex items-center justify-center overflow-hidden rounded-full text-white will-change-transform"
        style={{ backgroundColor: LIVE_SITE_ORB }}
      >
        <span
          ref={fillRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-[-25%] top-[-50%] z-0 block h-[200%] w-[150%] rounded-full"
          style={{ backgroundColor: LIVE_SITE_ORB_FILL }}
        />
        <span
          ref={textRef}
          className="relative z-10 inline-flex items-center gap-1.5 px-3 text-center text-[0.95rem] leading-none tracking-[-0.02em] text-white will-change-transform sm:text-base"
        >
          <span>{label}</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <path
              d="M2.8 11.2 11.2 2.8M11.2 2.8H3.9M11.2 2.8v7.3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>
    </div>
  );
}
