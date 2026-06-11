"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { gsap } from "@/lib/gsap";

export type Project = {
  id: string;
  title: string;
  category: string;
  imageSrc: string;
  href?: string;
};

const projects: Project[] = [
  {
    id: "twice",
    title: "TWICE",
    category: "Interaction & Development",
    imageSrc:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&h=1100&fit=crop&q=80",
    href: "#",
  },
  {
    id: "faculty",
    title: "THE FACULTY",
    category: "Interaction & Development",
    imageSrc:
      "https://images.unsplash.com/photo-1558591710-4bfb4a27904a?w=900&h=1100&fit=crop&q=80",
    href: "#",
  },
  {
    id: "nice",
    title: "NIC(T)E",
    category: "Web & Development",
    imageSrc:
      "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=900&h=1100&fit=crop&q=80",
    href: "#",
  },
  {
    id: "nexus",
    title: "NEXUS",
    category: "Systems Architecture",
    imageSrc:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&h=1100&fit=crop&q=80",
    href: "#",
  },
];

const MODAL_HEIGHT = 300;

type QuickToFn = ((value: number) => void) & { tween: gsap.core.Tween };

function animateRowText(row: HTMLElement, isActive: boolean) {
  const title = row.querySelector<HTMLElement>(".project-title");
  const category = row.querySelector<HTMLElement>(".project-category");

  if (!title || !category) {
    return;
  }

  gsap.to(title, {
    x: isActive ? -30 : 0,
    opacity: isActive ? 0.4 : 1,
    duration: 0.45,
    ease: "power2.out",
    overwrite: true,
  });

  gsap.to(category, {
    x: isActive ? 30 : 0,
    opacity: isActive ? 0.4 : 1,
    duration: 0.45,
    ease: "power2.out",
    overwrite: true,
  });
}

function ProjectModal({
  followRef,
  modalRef,
  stripRef,
}: {
  followRef: React.RefObject<HTMLDivElement | null>;
  modalRef: React.RefObject<HTMLDivElement | null>;
  stripRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={followRef}
      className="project-modal-follow pointer-events-none fixed left-0 top-0 z-[9999]"
      aria-hidden="true"
    >
      <div
        ref={modalRef}
        className="project-modal-container h-[300px] w-[400px] overflow-hidden bg-[#999d9e]"
      >
        <div ref={stripRef} className="project-modal-strip flex w-full flex-col">
          {projects.map((project) => (
            <div key={project.id} className="relative h-[300px] w-full shrink-0">
              <img
                src={project.imageSrc}
                alt=""
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-sm font-light tracking-tight text-white">
            View
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const followRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const xToRef = useRef<QuickToFn | null>(null);
  const yToRef = useRef<QuickToFn | null>(null);

  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!isMounted) {
      return;
    }

    const follow = followRef.current;
    const modal = modalRef.current;
    const section = sectionRef.current;
    const strip = stripRef.current;

    if (!follow || !modal || !section || !strip) {
      return;
    }

    gsap.set(follow, {
      x: 0,
      y: 0,
      xPercent: -50,
      yPercent: -50,
      clearProps: "transition",
    });

    gsap.set(modal, {
      scale: 0,
      opacity: 0,
      transformOrigin: "center center",
      clearProps: "transition",
    });

    gsap.set(strip, { y: 0 });

    xToRef.current?.tween.kill();
    yToRef.current?.tween.kill();

    xToRef.current = gsap.quickTo(follow, "x", {
      duration: 0.8,
      ease: "power3",
    }) as QuickToFn;

    yToRef.current = gsap.quickTo(follow, "y", {
      duration: 0.8,
      ease: "power3",
    }) as QuickToFn;

    const moveModal = (event: MouseEvent) => {
      xToRef.current?.(event.clientX);
      yToRef.current?.(event.clientY);
    };

    const onSectionEnter = () => {
      gsap.to(modal, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onSectionLeave = () => {
      setActiveIndex(null);

      gsap.utils
        .toArray<HTMLElement>(".project-row", section)
        .forEach((row) => animateRowText(row, false));

      gsap.to(modal, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", moveModal, { passive: true });
    section.addEventListener("mouseenter", onSectionEnter);
    section.addEventListener("mouseleave", onSectionLeave);

    const rows = gsap.utils.toArray<HTMLElement>(".project-row", section);
    const rowCleanups: Array<() => void> = [];

    rows.forEach((row, index) => {
      const onRowEnter = () => {
        setActiveIndex(index);
        animateRowText(row, true);
      };

      const onRowLeave = () => {
        animateRowText(row, false);
      };

      row.addEventListener("mouseenter", onRowEnter);
      row.addEventListener("mouseleave", onRowLeave);

      rowCleanups.push(() => {
        row.removeEventListener("mouseenter", onRowEnter);
        row.removeEventListener("mouseleave", onRowLeave);
      });
    });

    return () => {
      window.removeEventListener("mousemove", moveModal);
      section.removeEventListener("mouseenter", onSectionEnter);
      section.removeEventListener("mouseleave", onSectionLeave);
      rowCleanups.forEach((cleanup) => cleanup());

      xToRef.current?.tween.kill();
      yToRef.current?.tween.kill();
      xToRef.current = null;
      yToRef.current = null;

      gsap.killTweensOf([follow, modal, strip]);
    };
  }, [isMounted]);

  useLayoutEffect(() => {
    const strip = stripRef.current;

    if (!strip || activeIndex === null) {
      return;
    }

    gsap.to(strip, {
      y: -activeIndex * MODAL_HEIGHT,
      duration: 0.55,
      ease: "none",
      overwrite: true,
    });
  }, [activeIndex, isMounted]);

  return (
    <>
      <section
        ref={sectionRef}
        id="work"
        className="projects-section relative bg-white pb-24 text-black lg:pb-32"
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-16 lg:px-20">
          <div className="border-t border-black/10 pt-8 md:pt-10">
            <p className="text-xs font-light uppercase tracking-tight text-black/45 sm:text-sm">
              RECENT WORK
            </p>
          </div>

          <ul className="mt-2">
            {projects.map((project) => (
              <li key={project.id}>
                <a
                  href={project.href ?? "#"}
                  className="project-row flex w-full cursor-pointer items-center justify-between border-b border-black/10 py-10 md:py-12"
                >
                  <span className="project-title inline-block text-3xl font-light tracking-[-0.02em] sm:text-4xl md:text-5xl lg:text-6xl">
                    {project.title}
                  </span>
                  <span className="project-category inline-block text-right text-sm font-light tracking-[-0.02em] text-black/70 sm:text-base md:text-lg">
                    {project.category}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {isMounted &&
        createPortal(
          <ProjectModal
            followRef={followRef}
            modalRef={modalRef}
            stripRef={stripRef}
          />,
          document.body
        )}
    </>
  );
}
