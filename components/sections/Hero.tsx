"use client";

import { useRef } from "react";

import { ACCENT_MUTED, DARK_BACKGROUND } from "@/lib/theme";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const marqueeText = "Full Stack · Web · Salvador · ";
const marqueeRepeats = 6;
const marqueeBlock = marqueeText.repeat(marqueeRepeats);
const marqueeDuration = 80;

/** Coloque sua foto em public/profile.png (PNG recortado, fundo transparente). */
const profileImageSrc = "/profile.png";

const marqueeTextClassName =
  "marquee-text shrink-0 font-cursive text-[24vw] font-semibold normal-case leading-[0.95] tracking-normal text-white/90 md:text-[16vw] lg:text-[14vw] xl:text-[12vw]";

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

      marqueeTween.timeScale(1);

      let lastDirection = 1;
      let speedTween: gsap.core.Tween | null = null;

      const trigger = ScrollTrigger.create({
        scroller: document.documentElement,
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const velocity = self.getVelocity();

          if (Math.abs(velocity) > 1) {
            lastDirection = velocity >= 0 ? 1 : -1;
          }

          let speedBoost = Math.abs(velocity) * 0.0008;
          if (speedBoost > 3) {
            speedBoost = 3;
          }

          const targetTimeScale =
            Math.max(1 + speedBoost, 0.25) * lastDirection;

          const currentTimeScale = marqueeTween.timeScale();
          const crossesZero =
            (currentTimeScale > 0.05 && targetTimeScale < -0.05) ||
            (currentTimeScale < -0.05 && targetTimeScale > 0.05);

          speedTween?.kill();

          // Evita congelar: nunca anima o timeScale passando por zero
          if (crossesZero) {
            gsap.set(marqueeTween, { timeScale: targetTimeScale });
          } else {
            speedTween = gsap.to(marqueeTween, {
              timeScale: targetTimeScale,
              duration: 0.4,
              ease: "power1.out",
              overwrite: true,
            });
          }
        },
      });

      return () => {
        speedTween?.kill();
        trigger.kill();
        marqueeTween.kill();
      };
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      data-header-dark
      className="relative isolate z-10 min-h-screen w-full overflow-x-hidden text-white"
      style={{ backgroundColor: DARK_BACKGROUND }}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] flex items-end justify-center max-md:z-0">
        <div
          className="leading-[0]"
          style={{ backgroundColor: DARK_BACKGROUND }}
        >
          <img
            src={profileImageSrc}
            alt="Fredson Santana"
            className="block h-auto max-h-[min(96vh,920px)] w-auto max-w-[min(52vw,720px)] max-md:max-h-[min(62vh,520px)] max-md:max-w-[min(78vw,420px)]"
            draggable={false}
          />
        </div>
      </div>

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

      <div className="absolute inset-x-0 bottom-0 z-20 overflow-hidden pb-[2vh] max-md:pb-3 md:pb-[2vh]">
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
    </section>
  );
}
