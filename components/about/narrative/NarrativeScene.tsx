"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import type { NarrativeSceneContent } from "@/lib/about/narrative-content";

type NarrativeSceneProps = {
  content: NarrativeSceneContent;
};

function NarrativeBodyLine({ children }: { children: string }) {
  return (
    <div className="overflow-hidden">
      <p className="narrative-body-line text-base font-light leading-relaxed tracking-[-0.02em] text-black/65 sm:text-lg">
        {children}
      </p>
    </div>
  );
}

export default function NarrativeScene({ content }: NarrativeSceneProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const collageRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const collage = collageRef.current;
      const title = titleRef.current;
      const copy = copyRef.current;

      if (!section || !collage || !title || !copy) {
        return;
      }

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const imageEls = collage.querySelectorAll<HTMLElement>(
        ".narrative-collage-item"
      );
      const bodyLines = copy.querySelectorAll<HTMLElement>(".narrative-body-line");
      const tags = copy.querySelector<HTMLElement>(".narrative-tags");

      if (reducedMotion) {
        gsap.set([imageEls, title, bodyLines, tags], {
          clearProps: "all",
          opacity: 1,
          y: 0,
          skewY: 0,
          rotateZ: 0,
        });
        return;
      }

      imageEls.forEach((element, index) => {
        gsap.set(element, {
          y: content.images[index]?.riseY ?? 100,
          opacity: 0,
        });
      });
      gsap.set(title, { y: 72, opacity: 0 });
      gsap.set(bodyLines, { y: 28, skewY: 2.2, rotateZ: 0.6, opacity: 0.4 });
      if (tags) {
        gsap.set(tags, { y: 18, opacity: 0 });
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });

      content.images.forEach((image, index) => {
        const element = imageEls[index];
        if (!element) {
          return;
        }

        timeline.to(
          element,
          {
            y: 0,
            opacity: 1,
            duration: image.duration,
            ease: "power3.out",
          },
          image.delay
        );
      });

      timeline.to(
        title,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        0
      );

      timeline.to(
        bodyLines,
        {
          y: 0,
          skewY: 0,
          rotateZ: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.09,
          ease: "power3.out",
        },
        0.22
      );

      if (tags) {
        timeline.to(
          tags,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power2.out",
          },
          0.38
        );
      }

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    { scope: sectionRef, dependencies: [content.id] }
  );

  return (
    <section
      ref={sectionRef}
      id={content.id}
      className="relative min-h-[min(112vh,960px)] overflow-hidden bg-white pb-16 pt-16 text-black sm:pb-20 md:min-h-[115vh] md:pt-20 lg:pb-24"
      aria-labelledby={`${content.id}-title`}
    >
      <div
        className="about-narrative-axis pointer-events-none absolute bottom-0 left-1/2 top-0 z-0 w-px -translate-x-1/2 bg-black/10"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <div
          ref={titleRef}
          id={`${content.id}-title`}
          className="relative z-20 max-w-[min(100%,20rem)] will-change-transform md:max-w-none"
        >
          {content.titleLines.map((line) => (
            <span
              key={line}
              className="block text-[clamp(2.75rem,11vw,5.5rem)] font-light leading-[0.92] tracking-[-0.04em] md:text-[clamp(4rem,8vw,7rem)]"
            >
              {line}
            </span>
          ))}
        </div>

        <div
          ref={collageRef}
          className="relative z-10 mx-auto mt-10 h-[min(52vh,420px)] w-full max-w-[min(100%,720px)] sm:mt-14 md:mt-16 md:h-[min(58vh,520px)] md:max-w-[820px]"
        >
          {content.images.map((image) => (
            <div
              key={image.src}
              className={`narrative-collage-item absolute overflow-hidden bg-black/[0.04] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)] will-change-transform ${image.layoutClassName}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-auto w-full object-cover"
                draggable={false}
              />
            </div>
          ))}
        </div>

        <div
          ref={copyRef}
          className="relative z-20 mt-10 max-w-xl md:mt-14 lg:mt-16"
        >
          <div className="flex flex-col gap-5">
            {content.body.map((paragraph) => (
              <NarrativeBodyLine key={paragraph}>{paragraph}</NarrativeBodyLine>
            ))}
          </div>

          <p
            className="narrative-tags mt-8 text-xs font-light uppercase tracking-tight text-black/40 sm:text-sm"
          >
            {content.tags}
          </p>
        </div>
      </div>
    </section>
  );
}
