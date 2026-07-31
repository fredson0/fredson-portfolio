"use client";

import { useCallback, useRef } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const PROBE_FONT_SIZE = 100;

export default function AboutVerticalIntro() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const textScaleRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  const fitVerticalTitle = useCallback(() => {
    const pin = pinRef.current;
    const wrap = textRef.current;
    const title = titleRef.current;

    if (!pin || !wrap || !title) {
      return;
    }

    const targetHeight = pin.clientHeight;

    gsap.set(wrap, {
      rotation: 90,
      x: 0,
      y: 0,
      opacity: 1,
      transformOrigin: "left center",
    });

    title.style.fontSize = `${PROBE_FONT_SIZE}px`;
    const widthAtProbe = title.offsetWidth;

    if (!widthAtProbe) {
      return;
    }

    const fittedFontSize = (targetHeight * PROBE_FONT_SIZE) / widthAtProbe;
    title.style.fontSize = `${fittedFontSize}px`;

    gsap.set(wrap, {
      position: "absolute",
      left: "50%",
      top: 0,
      rotation: 90,
      transformOrigin: "left center",
      x: 0,
      y: 0,
    });

    const pinRect = pin.getBoundingClientRect();
    let wrapRect = wrap.getBoundingClientRect();

    const deltaY = pinRect.top - wrapRect.top;
    const centerOffsetX =
      pinRect.left + pinRect.width / 2 - (wrapRect.left + wrapRect.width / 2);

    gsap.set(wrap, { x: centerOffsetX, y: deltaY });

    wrapRect = wrap.getBoundingClientRect();
    const heightError = pinRect.bottom - wrapRect.bottom;

    if (Math.abs(heightError) > 0.5) {
      const correctedFontSize = fittedFontSize * (targetHeight / wrapRect.height);
      title.style.fontSize = `${correctedFontSize}px`;

      gsap.set(wrap, { x: 0, y: 0 });
      wrapRect = wrap.getBoundingClientRect();

      const correctedDeltaY = pinRect.top - wrapRect.top;
      const correctedCenterX =
        pinRect.left + pinRect.width / 2 - (wrapRect.left + wrapRect.width / 2);

      gsap.set(wrap, { x: correctedCenterX, y: correctedDeltaY });
    }
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      const text = textRef.current;
      const textScale = textScaleRef.current;
      const line = lineRef.current;

      if (!section || !pin || !text || !textScale || !line) {
        return;
      }

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const setup = () => {
        fitVerticalTitle();
        ScrollTrigger.refresh();
      };

      if (document.fonts?.ready) {
        document.fonts.ready.then(setup);
      } else {
        setup();
      }

      const resizeObserver = new ResizeObserver(() => {
        fitVerticalTitle();
        ScrollTrigger.refresh();
      });

      resizeObserver.observe(pin);

      if (reducedMotion) {
        gsap.set(text, { opacity: 0, visibility: "hidden" });
        gsap.set(line, { scaleY: 1, opacity: 1 });
        return () => resizeObserver.disconnect();
      }

      gsap.set(pin, { perspective: 1400 });
      gsap.set(textScale, {
        scaleY: 1,
        rotateX: 0,
        transformOrigin: "center center",
        transformStyle: "preserve-3d",
        transformPerspective: 1400,
      });

      gsap.set(line, {
        scaleY: 0,
        opacity: 0,
        transformOrigin: "center top",
      });

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=115%",
        pin: pin,
        scrub: 0.55,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const thin = progress;

          // Afinamento no eixo da espessura (não na altura F→A).
          // rotateX cria a sensação 3D de “ficar em pé” como no Atypikal.
          gsap.set(textScale, {
            scaleY: 1 - thin * 0.94,
            rotateX: -thin * 72,
            opacity: Math.max(0, 1 - thin * 1.15),
          });

          gsap.set(line, {
            scaleY: Math.min(1, progress * 1.1),
            opacity: Math.min(1, progress * 1.35),
          });
        },
      });

      return () => {
        resizeObserver.disconnect();
        trigger.kill();
      };
    },
    { scope: sectionRef, dependencies: [fitVerticalTitle] }
  );

  return (
    <section
      ref={sectionRef}
      id="about-intro"
      className="relative bg-white text-black"
      aria-label="Fredson Santana"
    >
      <div
        ref={pinRef}
        className="relative h-screen min-h-[100dvh] overflow-hidden"
        style={{ perspective: "1400px" }}
      >
        <div
          ref={lineRef}
          className="about-narrative-axis pointer-events-none absolute top-0 left-1/2 z-[1] h-full w-px -translate-x-1/2 bg-black/10 will-change-transform"
          aria-hidden="true"
        />

        <div ref={textRef} className="z-[2] will-change-transform">
          <div
            ref={textScaleRef}
            className="will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <h1
              ref={titleRef}
              className="whitespace-nowrap font-bold uppercase leading-none tracking-[-0.06em] text-black"
            >
              Fredson Santana
            </h1>
          </div>
        </div>

        <p
          className="absolute bottom-8 left-6 text-xs font-light tracking-tight text-black/35 sm:left-10 lg:left-16"
          aria-hidden="true"
        >
          ↓
        </p>
      </div>
    </section>
  );
}
