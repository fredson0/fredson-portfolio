"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";

import { ACCENT_MUTED, DARK_BACKGROUND } from "@/lib/theme";
import { gsap, useGSAP } from "@/lib/gsap";

const marqueeText = "Fredson Santana · ";
const marqueeRepeats = 6;
const marqueeBlock = marqueeText.repeat(marqueeRepeats);
const marqueeDuration = 80;

/** Foto otimizada: WebP com alpha. PNG original tem ~4MB e trava no 4G. */
const profileImageMobile = "/profile-sm.webp";
const profileImageDesktop = "/profile.webp";

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

function DiagonalArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 7L17 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9 17H17V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const photoRef = useRef<HTMLDivElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const marqueeTweenRef = useRef<gsap.core.Tween | null>(null);
  const setPhotoY = useRef<((value: number) => void) | null>(null);
  const lastDirectionRef = useRef(1);

  useGSAP(
    () => {
      const photo = photoRef.current;
      if (!photo) {
        return;
      }

      gsap.set(photo, { y: 0, force3D: true });
      setPhotoY.current = gsap.quickSetter(photo, "y", "px") as (
        value: number
      ) => void;

      return () => {
        setPhotoY.current = null;
      };
    },
    { scope: sectionRef, dependencies: [] }
  );

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
        // Em reverso o playhead chega no tempo 0 e o loop morre.
        // Empurra várias iterações à frente — mesmo truque do helper oficial da GSAP.
        onReverseComplete() {
          this.totalTime(this.rawTime() + marqueeDuration * 10);
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
    if (tween) {
      const velocity = lenis.velocity * 60;
      const absVelocity = Math.abs(velocity);

      if (absVelocity > 40) {
        lastDirectionRef.current = Math.sign(velocity);
      }

      const boost = gsap.utils.clamp(0, 15, absVelocity * 0.0028);
      tween.timeScale((1 + boost) * lastDirectionRef.current);
    }

    const section = sectionRef.current;
    const setY = setPhotoY.current;
    if (!section || !setY) {
      return;
    }

    if (
      window.innerWidth < 768 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setY(0);
      return;
    }

    const remaining = lenis.targetScroll - lenis.scroll;
    const top = section.getBoundingClientRect().top - remaining;
    const progress = gsap.utils.clamp(0, 1, -top / section.offsetHeight);
    setY(progress * section.offsetHeight * -0.16);
  });

  return (
    <section
      ref={sectionRef}
      data-header-dark
      className="relative z-10 h-[100svh] min-h-[100svh] w-full overflow-hidden text-white md:h-[112vh] md:min-h-[112vh]"
      style={{ backgroundColor: DARK_BACKGROUND }}
    >
      <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
        <div
          ref={photoRef}
          className="absolute inset-x-0 bottom-0 flex h-full items-end justify-center md:top-0 md:h-[130%] md:will-change-transform"
        >
          <picture className="block h-auto w-[min(88vw,400px)] md:h-full md:w-auto md:max-w-[min(62vw,900px)]">
            <source
              media="(max-width: 767px)"
              srcSet={profileImageMobile}
              type="image/webp"
            />
            <img
              src={profileImageDesktop}
              alt="Fredson Santana"
              width={1400}
              height={2038}
              fetchPriority="high"
              decoding="async"
              className="block h-auto w-full object-contain object-bottom md:h-full md:w-auto"
              draggable={false}
            />
          </picture>
        </div>
      </div>

      <div className="relative h-full min-h-full w-full overflow-x-clip">

      <div
        className="absolute inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-30 flex items-end justify-between gap-8 px-6 md:hidden"
      >
        <div className="min-w-0">
          <DiagonalArrowIcon className="mb-2.5 h-4 w-4 text-white/90" />
          <p className="text-[17px] font-light leading-[1.2] tracking-[-0.02em] text-white/90">
            <span className="block">Desenvolvedor</span>
            <span className="block">web full stack</span>
          </p>
        </div>

        <div
          className="shrink-0 self-end"
          aria-label="Localizado na Bahia, Brasil"
        >
          <GlobeIcon
            className="h-10 w-10 animate-[spin_20s_linear_infinite] text-white/90"
          />
        </div>
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

      <div className="absolute inset-x-0 bottom-[11vh] z-20 overflow-hidden max-md:bottom-[16vh]">
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
