"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

type ParallaxCaseImageProps = {
  src: string;
  alt: string;
};

export default function ParallaxCaseImage({ src, alt }: ParallaxCaseImageProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const frame = frameRef.current;
      const media = mediaRef.current;
      if (!frame || !media) return;

      gsap.fromTo(
        media,
        { yPercent: 4 },
        {
          yPercent: -8,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: frame,
            scroller: document.documentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope: frameRef }
  );

  return (
    <div ref={frameRef} className="relative overflow-hidden">
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="invisible block h-auto w-full"
      />
      <div
        ref={mediaRef}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full origin-center scale-[1.12] object-cover object-center"
        />
      </div>
    </div>
  );
}
