"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import { gsap } from "@/lib/gsap";

const profileImageSrc = "/profile.png";

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

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function Contact() {
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

      const curve = { controlY: 100 };

      path.setAttribute("d", buildElasticPath(curve.controlY));
      gsap.set(content, { y: -200 });

      const curveTween = gsap.to(curve, {
        controlY: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top top",
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
            start: "top bottom",
            end: "top top",
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
    { scope: sectionRef, dependencies: [] }
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const cleanups: Array<() => void> = [];

      const interactiveButtons =
        section.querySelectorAll<HTMLElement>(".contact-interactive");

      interactiveButtons.forEach((button) => {
        const fill = button.querySelector<HTMLElement>(".contact-fill-bg");
        if (!fill) {
          return;
        }

        gsap.set(fill, { scale: 0, transformOrigin: "center center" });

        const onEnter = () => {
          gsap.to(fill, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            overwrite: true,
          });
        };

        const onLeave = () => {
          gsap.to(fill, {
            scale: 0,
            duration: 0.4,
            ease: "power2.out",
            overwrite: true,
          });
        };

        button.addEventListener("mouseenter", onEnter);
        button.addEventListener("mouseleave", onLeave);

        cleanups.push(() => {
          button.removeEventListener("mouseenter", onEnter);
          button.removeEventListener("mouseleave", onLeave);
        });
      });

      const magneticButton = magneticRef.current;
      if (magneticButton) {
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
          xTo((event.clientX - centerX) * 0.35);
          yTo((event.clientY - centerY) * 0.35);
        };

        const onMagneticLeave = () => {
          xTo(0);
          yTo(0);
        };

        magneticButton.addEventListener("mousemove", onMagneticMove);
        magneticButton.addEventListener("mouseleave", onMagneticLeave);

        cleanups.push(() => {
          magneticButton.removeEventListener("mousemove", onMagneticMove);
          magneticButton.removeEventListener("mouseleave", onMagneticLeave);
          xTo.tween.kill();
          yTo.tween.kill();
        });
      }

      const pills = section.querySelectorAll<HTMLElement>(".contact-pill");

      pills.forEach((pill) => {
        const text = pill.querySelector<HTMLElement>(".contact-pill-text");
        if (!text) {
          return;
        }

        const xTo = gsap.quickTo(text, "x", {
          duration: 0.3,
          ease: "power2.out",
        }) as QuickToFn;

        const yTo = gsap.quickTo(text, "y", {
          duration: 0.3,
          ease: "power2.out",
        }) as QuickToFn;

        const onPillMove = (event: MouseEvent) => {
          const rect = pill.getBoundingClientRect();
          const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 16;
          const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
          xTo(clamp(offsetX, -8, 8));
          yTo(clamp(offsetY, -4, 4));
        };

        const onPillLeave = () => {
          xTo(0);
          yTo(0);
        };

        pill.addEventListener("mousemove", onPillMove);
        pill.addEventListener("mouseleave", onPillLeave);

        cleanups.push(() => {
          pill.removeEventListener("mousemove", onPillMove);
          pill.removeEventListener("mouseleave", onPillLeave);
          xTo.tween.kill();
          yTo.tween.kill();
        });
      });

      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    },
    { dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#141516] text-white"
    >
      {/* Linha elástica branca */}
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

      <div
        ref={contentRef}
        className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-between px-6 pb-8 pt-32 md:px-16 lg:px-20"
      >
        <div>
          {/* Parte superior */}
          <div className="flex flex-wrap items-center gap-5 md:gap-8">
            <div className="h-[70px] w-[70px] shrink-0 overflow-hidden rounded-full bg-[#999d9e] ring-2 ring-[#999d9e]">
              <img
                src={profileImageSrc}
                alt="Fredson Santana"
                className="h-full w-full object-cover object-[center_17%]"
                draggable={false}
              />
            </div>
            <h2 className="text-4xl font-light leading-[1.1] tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-7xl">
              Let&apos;s work
              <br />
              together
            </h2>
          </div>

          {/* Linha divisória + botão magnético */}
          <div className="relative my-12 w-full border-t border-zinc-700 md:my-20">
            <a
              ref={magneticRef}
              href="mailto:fredsonmachado02@gmail.com"
              className="contact-interactive absolute right-0 top-1/2 flex h-36 w-36 -translate-y-1/2 will-change-transform items-center justify-center overflow-hidden rounded-full border border-zinc-700 bg-[#141516] text-center md:h-44 md:w-44"
              aria-label="Get in touch"
            >
                <div
                  className="contact-fill-bg pointer-events-none absolute inset-0 z-0 rounded-full bg-[#3457dc]"
                  aria-hidden="true"
                />
                <span className="relative z-10 text-sm font-light leading-tight tracking-[-0.02em] md:text-base">
                  Get in
                  <br />
                  touch
                </span>
            </a>
          </div>

          {/* Cápsulas de contato */}
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:fredsonmachado02@gmail.com"
              className="contact-interactive contact-pill relative cursor-pointer overflow-hidden rounded-full border border-zinc-700 px-8 py-4"
            >
              <div
                className="contact-fill-bg pointer-events-none absolute inset-0 z-0 rounded-full bg-[#3457dc]"
                aria-hidden="true"
              />
              <span className="contact-pill-text relative z-10 block text-sm font-light md:text-base">
                fredsonmachado02@gmail.com
              </span>
            </a>

            <a
              href="tel:+5571991407870"
              className="contact-interactive contact-pill relative cursor-pointer overflow-hidden rounded-full border border-zinc-700 px-8 py-4"
            >
              <div
                className="contact-fill-bg pointer-events-none absolute inset-0 z-0 rounded-full bg-[#3457dc]"
                aria-hidden="true"
              />
              <span className="contact-pill-text relative z-10 block text-sm font-light md:text-base">
                +55 71 99140-7870
              </span>
            </a>
          </div>
        </div>

        <footer className="mt-16 flex flex-col gap-8 border-t border-white/10 pt-10 md:mt-24 md:flex-row md:items-end md:justify-between">
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
            © {new Date().getFullYear()} Fredson Santana. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  );
}
