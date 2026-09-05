"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import { gsap } from "@/lib/gsap";
import ContactWordCycle from "@/components/sections/ContactWordCycle";

const socialLinks = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/fredson-santana-machado-filho-912655329/",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/fredson0",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/fredson_machado/",
  },
] as const;

type QuickToFn = ((value: number) => void) & { tween: gsap.core.Tween };

/** Curva branca elástica — controlY 100 = curvada; controlY 0 = achatada */
function buildElasticPath(controlY: number) {
  return `M0 0 Q 50 ${controlY} 100 0 L 100 100 L 0 100 Z`;
}

type ContactProps = {
  /** Desliga a animação de entrada amarrada ao scroll (útil em páginas curtas). */
  animatedEntrance?: boolean;
};

export default function Contact({ animatedEntrance = true }: ContactProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const magneticRef = useRef<HTMLAnchorElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const path = pathRef.current;
      const content = contentRef.current;

      if (!section || !path || !content) {
        return;
      }

      if (!animatedEntrance) {
        path.setAttribute("d", buildElasticPath(0));
        gsap.set(content, { y: 0 });
        return;
      }

      const curve = { controlY: 100 };

      path.setAttribute("d", buildElasticPath(curve.controlY));
      gsap.set(content, { y: -200 });

      const curveTween = gsap.to(curve, {
        controlY: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          scroller: document.documentElement,
          start: "top bottom",
          end: "top 82%",
          scrub: true,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          path.setAttribute("d", buildElasticPath(curve.controlY));
        },
      });

      const contentTween = gsap.fromTo(
        content,
        { y: -200 },
        {
          y: 0,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            scroller: document.documentElement,
            start: "top bottom",
            end: "top 82%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      return () => {
        curveTween.scrollTrigger?.kill();
        curveTween.kill();
        contentTween.scrollTrigger?.kill();
        contentTween.kill();
      };
    },
    { scope: sectionRef, dependencies: [animatedEntrance] }
  );

  useGSAP(
    () => {
      const magneticButton = magneticRef.current;
      if (!magneticButton) return;

      const xTo = gsap.quickTo(magneticButton, "x", {
        duration: 0.6,
        ease: "power3.out",
      }) as QuickToFn;

      const yTo = gsap.quickTo(magneticButton, "y", {
        duration: 0.6,
        ease: "power3.out",
      }) as QuickToFn;

      const onMagneticMove = (event: MouseEvent) => {
        const rect = magneticButton.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        xTo((event.clientX - centerX) * 0.28);
        yTo((event.clientY - centerY) * 0.28);
      };

      const onMagneticLeave = () => {
        xTo(0);
        yTo(0);
      };

      magneticButton.addEventListener("mousemove", onMagneticMove);
      magneticButton.addEventListener("mouseleave", onMagneticLeave);

      return () => {
        magneticButton.removeEventListener("mousemove", onMagneticMove);
        magneticButton.removeEventListener("mouseleave", onMagneticLeave);
        xTo.tween.kill();
        yTo.tween.kill();
      };
    },
    { dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      data-header-dark
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-black text-white"
    >
      <div className="pointer-events-none absolute left-0 top-[-99px] z-10 h-[100px] w-full overflow-visible">
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            ref={pathRef}
            d={buildElasticPath(100)}
            className="fill-white"
          />
        </svg>
      </div>

      <svg
        className="pointer-events-none absolute left-[-8%] top-1/2 h-[42vw] w-[18vw] -translate-y-1/2 text-white/80 max-md:hidden"
        viewBox="0 0 80 200"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M72 12 C 18 70, 18 130, 72 188"
          stroke="currentColor"
          strokeWidth="0.7"
        />
      </svg>
      <svg
        className="pointer-events-none absolute right-[-8%] top-1/2 h-[42vw] w-[18vw] -translate-y-1/2 text-white/80 max-md:hidden"
        viewBox="0 0 80 200"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 12 C 62 70, 62 130, 8 188"
          stroke="currentColor"
          strokeWidth="0.7"
        />
      </svg>

      <div
        ref={contentRef}
        className="mx-auto flex min-h-screen w-full max-w-[1400px] flex-1 flex-col justify-between px-6 pb-8 pt-28 md:px-16 lg:px-20"
      >
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="mb-8 flex items-center gap-3 sm:mb-10">
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-white/70" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#7CFF6B]" />
            </span>
            <p className="text-sm font-light tracking-[-0.02em] text-white sm:text-base md:text-lg">
              Tem um projeto?
            </p>
          </div>

          <h2 className="sr-only">Vamos trabalhar juntos. Me contate.</h2>
          <div
            className="font-medium leading-none tracking-[-0.06em] text-white"
            style={{ fontSize: "clamp(3.4rem, 13vw, 9.5rem)" }}
          >
            <ContactWordCycle />
          </div>

          <Link
            ref={magneticRef}
            href="/contact"
            className="mt-10 inline-flex items-center justify-between gap-4 rounded-full bg-white py-2 pl-5 pr-2 text-sm font-medium tracking-[-0.02em] will-change-transform sm:mt-12 sm:py-2.5 sm:pl-6 sm:pr-2.5 sm:text-base"
            style={{ color: "#111111" }}
          >
            <span style={{ color: "#111111" }}>Clique aqui</span>
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-base leading-none"
              style={{ color: "#ffffff" }}
              aria-hidden="true"
            >
              +
            </span>
          </Link>
        </div>

        <footer className="mt-16 border-t border-white/10 pt-8 sm:mt-20">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <nav aria-label="Social links">
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {socialLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-light tracking-[-0.02em] text-white/70 transition-colors duration-300 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <p className="text-sm font-light tracking-[-0.02em] text-white/45">
              © {new Date().getFullYear()} Fredson Santana
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-2 text-sm font-light tracking-[-0.02em] text-white/55 sm:mt-8 sm:flex-row sm:gap-10">
            <a
              href="mailto:fredsonmachado02@gmail.com"
              className="transition-colors hover:text-white"
            >
              fredsonmachado02@gmail.com
            </a>
            <a
              href="tel:+5571991407870"
              className="transition-colors hover:text-white"
            >
              +55 71 99140-7870
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
