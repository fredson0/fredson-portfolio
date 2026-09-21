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
        { yPercent: 8 },
        {
          yPercent: -16,
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
    <div
      ref={frameRef}
      className="relative aspect-[5/3] w-full overflow-hidden sm:aspect-[16/10]"
    >
      <div
        ref={mediaRef}
        className="absolute inset-x-0 -top-[12%] h-[130%] w-full will-change-transform"
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
}
