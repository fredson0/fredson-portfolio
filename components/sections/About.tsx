"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import { gsap } from "@/lib/gsap";

const headlineLines = [
  "Construindo soluções digitais de alto impacto",
  "na era moderna. Juntos vamos desenhar",
  "sistemas robustos, sem enrolação e",
  "sempre na vanguarda da tecnologia.",
];

const secondaryLines = [
  "A combinação da minha paixão por",
  "arquitetura limpa, código performático",
  "e interfaces dinâmicas me coloca em um",
  "ponto estratégico para transformar ideias",
  "em produtos digitais de alta escala.",
];

const headlineTypography =
  "text-[1.65rem] font-light leading-[1.2] tracking-[-0.02em] sm:text-3xl md:text-4xl lg:text-[2.65rem] xl:text-5xl";

const secondaryTypography =
  "text-base font-light leading-[1.2] tracking-[-0.02em] text-black/80 sm:text-lg";

function TextLine({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="overflow-hidden">
      <p className={`about-reveal-line ${className}`}>{children}</p>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const buttonRef = useRef<HTMLAnchorElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const lines = section.querySelectorAll<HTMLElement>(".about-reveal-line");

      gsap.fromTo(
        lines,
        { yPercent: 100, opacity: 0.35 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.95,
          ease: "none",
          stagger: 0.14,
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            end: "bottom 20%",
            toggleActions: "play none none reset",
          },
        }
      );

      const button = buttonRef.current;
      if (!button) {
        return;
      }

      const xTo = gsap.quickTo(button, "x", { duration: 0.65, ease: "power3.out" });
      const yTo = gsap.quickTo(button, "y", { duration: 0.65, ease: "power3.out" });

      const onMove = (event: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        xTo((event.clientX - centerX) * 0.28);
        yTo((event.clientY - centerY) * 0.28);
      };

      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      button.addEventListener("mousemove", onMove);
      button.addEventListener("mouseleave", onLeave);

      return () => {
        button.removeEventListener("mousemove", onMove);
        button.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-white px-6 py-24 font-sans text-black sm:px-10 md:py-32 lg:px-16"
    >
      <div className="mx-auto flex max-w-[1680px] flex-col gap-14 lg:flex-row lg:items-start lg:justify-between lg:gap-10 xl:gap-16">
        <div className="w-full lg:w-[68%] lg:max-w-[62rem]">
          <div className="flex flex-col">
            {headlineLines.map((line) => (
              <TextLine key={line} className={headlineTypography}>
                {line}
              </TextLine>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col gap-10 lg:w-[32%] lg:max-w-md lg:pt-1">
          <div className="flex flex-col">
            {secondaryLines.map((line) => (
              <TextLine key={line} className={secondaryTypography}>
                {line}
              </TextLine>
            ))}
          </div>

          <a
            ref={buttonRef}
            href="#about"
            className="inline-flex will-change-transform"
            aria-label="About me"
          >
            <span className="flex h-36 w-36 items-center justify-center rounded-full bg-[#1c1d20] text-sm font-light tracking-[-0.02em] text-white transition-colors duration-300 hover:bg-black md:h-40 md:w-40 md:text-base">
              About me
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
