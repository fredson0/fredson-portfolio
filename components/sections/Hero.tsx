"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import { gsap } from "@/lib/gsap";

const marqueeText = "FREDSON SANTANA - ";
const marqueeCopies = 8;
const marqueeDuration = 360;
const marqueeTimeScale = 2;

/** Coloque sua foto em public/profile.png (PNG recortado, fundo transparente). */
const profileImageSrc = "/profile.png";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const marquee = marqueeRef.current;
      if (!marquee) {
        return;
      }

      const tween = gsap.to(marquee, {
        xPercent: -50,
        duration: marqueeDuration,
        ease: "none",
        repeat: -1,
      });

      const setDirection = (nextDirection: number) => {
        gsap.to(tween, {
          timeScale: marqueeTimeScale * nextDirection,
          duration: 0.6,
          ease: "power2.out",
          overwrite: true,
        });
      };

      const trigger = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => setDirection(self.direction || 1),
      });

      setDirection(1);

      return () => {
        trigger.kill();
        tween.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate z-0 min-h-screen w-full overflow-hidden bg-[#999d9e] text-white"
    >
      {/* Camada 10: retrato — object-contain evita cortar braço/cotovelo; sem overflow-hidden */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 -translate-x-1/2">
        <img
          src={profileImageSrc}
          alt="Fredson Santana"
          className="block h-[min(96vh,920px)] w-auto max-w-[min(88vw,980px)] object-contain object-bottom"
          draggable={false}
        />
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

      {/* Camada 20: letreiro no rodapé — na frente do torso (efeito Dennis) */}
      <div className="absolute inset-x-0 bottom-0 z-20 overflow-hidden pb-[1.5vh] md:pb-[2vh]">
        <div
          ref={marqueeRef}
          className="relative flex w-max whitespace-nowrap will-change-transform"
        >
          <div className="flex shrink-0 items-center">
            {Array.from({ length: marqueeCopies }).map((_, index) => (
              <span
                key={`marquee-a-${index}`}
                className="text-[22vw] font-semibold uppercase leading-[0.82] tracking-tight text-white/90 md:text-[15vw] lg:text-[13vw] xl:text-[11.5vw]"
              >
                {marqueeText}
              </span>
            ))}
          </div>
          <div className="flex shrink-0 items-center" aria-hidden="true">
            {Array.from({ length: marqueeCopies }).map((_, index) => (
              <span
                key={`marquee-b-${index}`}
                className="text-[22vw] font-semibold uppercase leading-[0.82] tracking-tight text-white/90 md:text-[15vw] lg:text-[13vw] xl:text-[11.5vw]"
              >
                {marqueeText}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
