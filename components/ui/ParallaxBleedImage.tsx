"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

type ParallaxBleedImageProps = {
  src: string;
  alt: string;
  sectionClassName?: string;
  heightClassName?: string;
  mediaHeightClassName?: string;
};

export default function ParallaxBleedImage({
  src,
  alt,
  sectionClassName = "bg-[#f7f2e9]",
  heightClassName = "h-[115vh]",
  mediaHeightClassName = "h-[130%]",
}: ParallaxBleedImageProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const media = mediaRef.current;
      if (!section || !media) return;

      // Taller media inside a clipped window. Starts lower so the bottom
      // of the photo shows, then scrubs upward — bottom gets cropped
      // (Damai-style "shorts disappear" parallax).
      gsap.fromTo(
        media,
        { yPercent: 6 },
        {
          yPercent: -24,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${heightClassName} ${sectionClassName}`}
      aria-label={alt}
    >
      <div
        ref={mediaRef}
        className={`absolute inset-x-0 top-0 w-full will-change-transform ${mediaHeightClassName}`}
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover object-center"
        />
      </div>
    </section>
  );
}
