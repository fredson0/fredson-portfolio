"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type GalleryMedia =
  | { type: "video"; src: string; poster?: string }
  | { type: "image"; src: string };

export type GalleryCard = {
  id: string;
  title: string;
  media: GalleryMedia;
};

const rowOneCards: GalleryCard[] = [
  {
    id: "r1-1",
    title: "Interface Study",
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop&q=80",
    },
  },
  {
    id: "r1-2",
    title: "Motion Loop",
    media: {
      type: "video",
      src: "https://cdn.coverr.co/videos/coverr-abstract-digital-lines-1576/1080p.mp4",
      poster:
        "https://images.unsplash.com/photo-1558591710-4bfb4a27904a?w=800&h=600&fit=crop&q=80",
    },
  },
  {
    id: "r1-3",
    title: "Product UI",
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=600&fit=crop&q=80",
    },
  },
  {
    id: "r1-4",
    title: "Data Viz",
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80",
    },
  },
];

const rowTwoCards: GalleryCard[] = [
  {
    id: "r2-1",
    title: "Brand System",
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop&q=80",
    },
  },
  {
    id: "r2-2",
    title: "Scroll Experience",
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
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
    },
  },
  {
    id: "r2-4",
    title: "Mobile Flow",
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80",
    },
  },
];

/** Duplica cards para a fileira ser mais larga que qualquer viewport */
function expandRow(cards: GalleryCard[]): GalleryCard[] {
  return [
    ...cards,
    ...cards.map((card) => ({ ...card, id: `${card.id}-dup` })),
  ];
}

const rowOneExpanded = expandRow(rowOneCards);
const rowTwoExpanded = expandRow(rowTwoCards);

function GalleryCardMedia({ media, title }: { media: GalleryMedia; title: string }) {
  if (media.type === "video") {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        poster={media.poster}
        className="h-full w-full object-cover"
        aria-label={title}
      >
        <source src={media.src} type="video/mp4" />
      </video>
    );
  }

  return (
    <img
      src={media.src}
      alt={title}
      className="h-full w-full object-cover"
      draggable={false}
    />
  );
}

function GalleryCardItem({ card }: { card: GalleryCard }) {
  return (
    <article className="w-[min(72vw,420px)] shrink-0 rounded-xl bg-[#e3e3e3] p-3 sm:w-[380px] sm:p-4">
      <div className="aspect-[4/3] overflow-hidden rounded-lg bg-[#d4d4d4]">
        <GalleryCardMedia media={card.media} title={card.title} />
      </div>
      <p className="mt-3 text-sm font-light tracking-[-0.02em] text-black/70">
        {card.title}
      </p>
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
      <div ref={rowRef} className={`flex w-max gap-8 will-change-transform ${className}`}>
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

  useGSAP(
    () => {
      const container = containerRef.current;
      const rowOne = rowOneRef.current;
      const rowTwo = rowTwoRef.current;

      if (!container || !rowOne || !rowTwo) {
        return;
      }

      gsap.set(rowOne, { xPercent: 5 });
      gsap.set(rowTwo, { xPercent: -25 });

      const rowOneTween = gsap.fromTo(
        rowOne,
        { xPercent: 5 },
        {
          xPercent: -20,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );

      const rowTwoTween = gsap.fromTo(
        rowTwo,
        { xPercent: -25 },
        {
          xPercent: 0,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );

      ScrollTrigger.refresh();

      return () => {
        rowOneTween.scrollTrigger?.kill();
        rowOneTween.kill();
        rowTwoTween.scrollTrigger?.kill();
        rowTwoTween.kill();
      };
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <section
      ref={containerRef}
      id="gallery"
      className="w-full overflow-hidden bg-white"
    >
      <div className="flex justify-center pb-12 pt-16 md:pt-20">
        <a
          href="#gallery"
          className="flex h-36 w-36 items-center justify-center rounded-full bg-[#1c1d20] text-center text-sm font-light leading-tight tracking-[-0.02em] text-white transition-colors duration-300 hover:bg-black md:h-40 md:w-40 md:text-base"
          aria-label="More work"
        >
          More
          <br />
          work
        </a>
      </div>

      <div className="flex w-full flex-col gap-8 overflow-hidden py-20">
        <GalleryRow
          rowRef={rowOneRef}
          cards={rowOneExpanded}
          className="gallery-row-one"
        />
        <GalleryRow
          rowRef={rowTwoRef}
          cards={rowTwoExpanded}
          className="gallery-row-two"
        />
      </div>
    </section>
  );
}
