"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";

import { ACCENT_MUTED, DARK_BACKGROUND } from "@/lib/theme";
import { gsap, useGSAP } from "@/lib/gsap";

const marqueeText = "Full Stack · Web · Salvador · ";
const marqueeRepeats = 6;
const marqueeBlock = marqueeText.repeat(marqueeRepeats);
const marqueeDuration = 80;

/** Coloque sua foto em public/profile.png (PNG recortado, fundo transparente). */
const profileImageSrc = "/profile.png";

const marqueeTextClassName =
  "marquee-text shrink-0 font-cursive text-[28vw] font-medium normal-case leading-[0.82] tracking-[-0.02em] text-white md:text-[20vw] lg:text-[16vw] xl:text-[14vw]";

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" />
      <ellipse
        cx="24"
        cy="24"
        rx="10"
        ry="18"
        stroke="currentColor"
        strokeWidth="2"
      />
      <ellipse cx="24" cy="24" rx="18" ry="6" stroke="currentColor" strokeWidth="2" />
      <path
        d="M6 24h36"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const marqueeTweenRef = useRef<gsap.core.Tween | null>(null);
  const lastDirectionRef = useRef(1);

  useGSAP(
    () => {
      const marquee = marqueeRef.current;
      if (!marquee) {
        return;
      }

      gsap.set(marquee, { xPercent: 0 });

      const marqueeTween = gsap.to(marquee, {
        xPercent: -50,
        repeat: -1,
        duration: marqueeDuration,
        ease: "none",
        modifiers: {
          xPercent: gsap.utils.wrap(-50, 0),
        },
      });

      marqueeTweenRef.current = marqueeTween;

      return () => {
        marqueeTween.kill();
        marqueeTweenRef.current = null;
      };
    },
    { scope: sectionRef, dependencies: [] }
  );

  useLenis((lenis) => {
    const tween = marqueeTweenRef.current;
    if (!tween) return;

    // Lenis.velocity is px per frame; convert so a wheel tick is a real nudge.
    const velocity = lenis.velocity * 60;
    const absVelocity = Math.abs(velocity);

    if (absVelocity > 40) {
      lastDirectionRef.current = Math.sign(velocity);
    }

    const boost = gsap.utils.clamp(0, 15, absVelocity * 0.0028);
    tween.timeScale((1 + boost) * lastDirectionRef.current);
  });

  return (
    <section
      ref={sectionRef}
      data-header-dark
      className="relative z-10 min-h-[112vh] w-full text-white"
      style={{ backgroundColor: DARK_BACKGROUND }}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] flex justify-center">
        <img
          src={profileImageSrc}
          alt="Fredson Santana"
          className="block h-auto w-auto max-h-[112vh] max-w-[min(62vw,900px)] object-contain object-bottom max-md:max-h-[112vh] max-md:max-w-[min(90vw,520px)]"
          draggable={false}
        />
      </div>

      <div className="relative h-svh min-h-screen w-full overflow-x-clip">

      <div className="relative z-30 px-6 pt-24 pb-32 max-md:flex max-md:flex-col md:hidden">
        <div className="max-w-[min(100%,18rem)]">
          <p className="text-[clamp(1.75rem,7vw,2.25rem)] font-light leading-tight tracking-tight text-white/90">
            <span className="block">Desenvolvedor</span>
            <span className="block">web full stack</span>
          </p>
          <p className="mt-4 text-sm font-light tracking-[-0.02em] text-white/55">
            Soluções web de qualidade — do conceito à entrega
          </p>
        </div>
      </div>

      <div
        className="absolute bottom-[max(7.5rem,22vh)] right-6 z-30 md:hidden"
        aria-label="Localizado na Bahia, Brasil"
      >
        <GlobeIcon
          className="h-11 w-11 animate-[spin_20s_linear_infinite] text-white/90"
        />
      </div>

      <div className="absolute left-0 top-1/2 z-30 hidden -translate-y-1/2 px-6 md:block sm:px-10 lg:px-16">
        <div
          className="flex items-center gap-4 rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
        >
          <div className="text-left text-xs font-light leading-tight tracking-[0.08em] sm:text-sm">
            <span className="block">Localizado</span>
            <span className="block">na</span>
            <span className="block">Bahia, Brasil</span>
          </div>
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full"
            style={{ backgroundColor: ACCENT_MUTED }}
          >
            <GlobeIcon
              className="h-7 w-7 animate-[spin_20s_linear_infinite] text-white/85"
            />
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-1/2 z-30 hidden -translate-y-1/2 px-6 md:block sm:px-10 lg:px-16">
        <div className="max-w-sm text-left">
          <p className="text-3xl font-light leading-tight tracking-tight text-white/90 md:text-4xl lg:text-5xl">
            <span className="block">Desenvolvedor</span>
            <span className="block">web full stack</span>
          </p>
          <p className="mt-5 text-sm font-light tracking-[-0.02em] text-white/55 sm:text-base">
            Soluções web de qualidade — do conceito à entrega
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-[11vh] z-20 overflow-hidden max-md:bottom-[8vh]">
        <div
          ref={marqueeRef}
          className="marquee-container flex w-max flex-nowrap whitespace-nowrap will-change-transform"
        >
          <p className={marqueeTextClassName}>{marqueeBlock}</p>
          <p className={marqueeTextClassName} aria-hidden="true">
            {marqueeBlock}
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}
