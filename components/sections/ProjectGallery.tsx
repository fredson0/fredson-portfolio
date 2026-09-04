"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";
import { useLenis } from "lenis/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type Lenis from "lenis";

export type GalleryMedia =
  | { type: "video"; src: string; poster?: string }
  | { type: "image"; src: string };

export type GalleryCard = {
  id: string;
  title: string;
  media: GalleryMedia;
  surface: string;
  inverted?: boolean;
};

const rowOneCards: GalleryCard[] = [
  {
    id: "r1-1",
    title: "ENEM+IA",
    surface: "#dfe3e8",
    media: {
      type: "video",
      src: "/projects/enem-ia/product-1.webm",
      poster: "/projects/enem-ia/project.png",
    },
  },
  {
    id: "r1-2",
    title: "ENEM+IA — Tutor",
    surface: "#e6dfd6",
    media: {
      type: "video",
      src: "/projects/enem-ia/hero-1.webm",
      poster: "/projects/enem-ia/project.png",
    },
  },
  {
    id: "r1-3",
    title: "Rei da Selva",
    surface: "#d4d8d2",
    media: {
      type: "video",
      src: "/projects/rei-da-selva/Reidaselvavideo.webm",
      poster: "/projects/rei-da-selva/reidaselva.webp",
    },
  },
  {
    id: "r1-4",
    title: "Rei da Selva — Site",
    surface: "#1c1d20",
    inverted: true,
    media: {
      type: "image",
      src: "/projects/rei-da-selva/reidaselva.webp",
    },
  },
];

const rowTwoCards: GalleryCard[] = [
  {
    id: "r2-1",
    title: "Brand System",
    surface: "#cfd6dc",
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop&q=80",
    },
  },
  {
    id: "r2-2",
    title: "Scroll Experience",
    surface: "#e8e2d8",
    media: {
      type: "video",
      src: "https://cdn.coverr.co/videos/coverr-coding-on-a-laptop-9765/1080p.mp4",
      poster:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
    },
  },
  {
    id: "r2-3",
    title: "SaaS Dashboard",
    surface: "#d6d9d4",
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
    },
  },
  {
    id: "r2-4",
    title: "Mobile Flow",
    surface: "#ddd8e0",
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80",
    },
  },
];

function GalleryCardMedia({ media, title }: { media: GalleryMedia; title: string }) {
  if (media.type === "video") {
    const isWebm = media.src.endsWith(".webm");

    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        poster={media.poster}
        className="absolute inset-0 h-full w-full object-cover"
        aria-label={title}
      >
        <source src={media.src} type={isWebm ? "video/webm" : "video/mp4"} />
      </video>
    );
  }

  return (
    <img
      src={media.src}
      alt={title}
      className="absolute inset-0 h-full w-full object-cover"
      draggable={false}
    />
  );
}

function GalleryCardItem({ card }: { card: GalleryCard }) {
  return (
    <article className="w-1/4 shrink-0 p-[1.25vw]">
      <div
        className="relative flex aspect-[4/3] items-center justify-center overflow-hidden"
        style={{ backgroundColor: card.surface }}
      >
        <div className="relative aspect-video w-[90%] overflow-hidden">
          <GalleryCardMedia media={card.media} title={card.title} />
        </div>
      </div>
    </article>
  );
}

function GalleryRow({
  rowRef,
  cards,
  className,
}: {
  rowRef: React.RefObject<HTMLDivElement | null>;
  cards: GalleryCard[];
  className: string;
}) {
  return (
    <div className="w-full overflow-hidden">
      <div
        ref={rowRef}
        className={`relative left-[-10vw] flex w-[120vw] will-change-transform ${className}`}
      >
        {cards.map((card) => (
          <GalleryCardItem key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

export default function ProjectGallery() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rowOneRef = useRef<HTMLDivElement | null>(null);
  const rowTwoRef = useRef<HTMLDivElement | null>(null);
  const setRowOneX = useRef<((value: number) => void) | null>(null);
  const setRowTwoX = useRef<((value: number) => void) | null>(null);

  useGSAP(
    () => {
      const rowOne = rowOneRef.current;
      const rowTwo = rowTwoRef.current;

      if (!rowOne || !rowTwo) {
        return;
      }

      gsap.set([rowOne, rowTwo], { x: 0, force3D: true });
      setRowOneX.current = gsap.quickSetter(rowOne, "x", "px") as (value: number) => void;
      setRowTwoX.current = gsap.quickSetter(rowTwo, "x", "px") as (value: number) => void;

      return () => {
        setRowOneX.current = null;
        setRowTwoX.current = null;
      };
    },
    { scope: containerRef, dependencies: [] }
  );

  const updateRows = useCallback((lenis: Lenis) => {
    const container = containerRef.current;
    const setOne = setRowOneX.current;
    const setTwo = setRowTwoX.current;

    if (!container || !setOne || !setTwo) {
      return;
    }

    // targetScroll congela no mesmo instante em que o wheel para.
    // animatedScroll ainda tem a cauda do lerp — era isso que fazia os cards
    // andarem um pouco depois do scroll “parar”.
    const remaining = lenis.targetScroll - lenis.scroll;
    const targetTop = container.getBoundingClientRect().top - remaining;
    const traveled = window.innerHeight - targetTop;
    const progress = gsap.utils.clamp(
      0,
      1,
      traveled / (window.innerHeight + container.offsetHeight)
    );
    const maxShift = Math.min(67, window.innerWidth * 0.042);
    const x = (progress - 0.5) * 2 * maxShift;

    setOne(-x);
    setTwo(x);
  }, []);

  useLenis(updateRows, [], 1);

  return (
    <section
      ref={containerRef}
      id="gallery"
      className="w-full overflow-hidden bg-white"
    >
      <div className="flex justify-center pb-12 pt-16 md:pt-20">
        <Link
          href="/work"
          className="flex h-36 w-36 items-center justify-center rounded-full bg-[#1c1d20] text-center text-sm font-light leading-tight tracking-[-0.02em] text-white transition-colors duration-300 hover:bg-black md:h-40 md:w-40 md:text-base"
          aria-label="More work"
        >
          More
          <br />
          work
        </Link>
      </div>

      <div className="flex w-full flex-col overflow-hidden py-20">
        <GalleryRow
          rowRef={rowOneRef}
          cards={rowOneCards}
          className="gallery-row-one"
        />
        <GalleryRow
          rowRef={rowTwoRef}
          cards={rowTwoCards}
          className="gallery-row-two"
        />
      </div>
    </section>
  );
}
