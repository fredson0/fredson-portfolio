"use client";

import { useRef } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const marqueeText = "FREDSON SANTANA — ";
const marqueeRepeats = 6;
const marqueeBlock = marqueeText.repeat(marqueeRepeats);
const marqueeDuration = 80;

/** Coloque sua foto em public/profile.png (PNG recortado, fundo transparente). */
const profileImageSrc = "/profile.png";
const heroBackground = "#999d9e";

const marqueeTextClassName =
  "marquee-text shrink-0 text-[22vw] font-semibold uppercase leading-[0.82] tracking-tight text-white/90 md:text-[15vw] lg:text-[13vw] xl:text-[11.5vw]";

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

      const trigger = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const velocity = self.getVelocity();

          if (Math.abs(velocity) > 1) {
            lastDirection = velocity >= 0 ? 1 : -1;
          }

          const direction = lastDirection;

          let speedBoost = Math.abs(velocity) * 0.0008;
          if (speedBoost > 3) {
            speedBoost = 3;
          }

          const targetTimeScale = (1 + speedBoost) * direction;

          gsap.to(marqueeTween, {
            timeScale: targetTimeScale,
            duration: 0.4,
            ease: "power1.out",
            overwrite: true,
          });
        },
      });

      return () => {
        trigger.kill();
        marqueeTween.kill();
      };
    },
    { dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate z-10 min-h-screen w-full overflow-x-hidden bg-[#999d9e] text-white"
    >
      {/* Camada 10: base colada na seção + foto inteira visível */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-center">
        <div className="leading-[0]" style={{ backgroundColor: heroBackground }}>
          <img
            src={profileImageSrc}
            alt="Fredson Santana"
            className="block h-auto max-h-[min(96vh,920px)] w-auto max-w-[min(52vw,720px)] max-md:max-w-[92vw]"
            draggable={false}
          />
        </div>
      </div>

      {/* Camada 30: localização (esquerda) */}
      <div className="absolute left-0 top-1/2 z-30 -translate-y-1/2 px-6 sm:px-10 lg:px-16">
        <div className="flex items-center gap-4 rounded-full bg-[#1c1d20] px-5 py-3 text-white shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
          <div className="text-left text-xs font-light leading-tight tracking-[0.08em] sm:text-sm">
            <span className="block">Localizado</span>
            <span className="block">na</span>
            <span className="block">Bahia, Brasil</span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#999d9e]">
            <svg
              className="h-7 w-7 animate-[spin_20s_linear_infinite] text-[#1c1d20]"
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
              <ellipse
                cx="24"
                cy="24"
                rx="18"
                ry="6"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M6 24h36"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Camada 30: profissão (direita) */}
      <div className="absolute right-0 top-1/2 z-30 -translate-y-1/2 px-6 sm:px-10 lg:px-16">
        <div className="max-w-sm text-left text-3xl font-light leading-tight tracking-tight text-white/85 md:text-4xl lg:text-5xl">
          <span className="block">Freelance</span>
          <span className="block">Developer &amp; Systems Analyst</span>
        </div>
      </div>

      {/* Camada 20: letreiro — duas cópias idênticas para loop infinito */}
      <div className="absolute inset-x-0 bottom-0 z-20 overflow-hidden pb-[1.5vh] md:pb-[2vh]">
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
