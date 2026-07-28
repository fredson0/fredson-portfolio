"use client";

import { useEffect, useRef, type RefObject } from "react";

import { gsap } from "@/lib/gsap";

type QuickToFn = ((value: number) => void) & { tween: gsap.core.Tween };

export function useMagnetic<T extends HTMLElement>(
  strength = 0.35
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    gsap.set(element, { x: 0, y: 0, force3D: true });

    const xTo = gsap.quickTo(element, "x", {
      duration: 0.45,
      ease: "power3.out",
    }) as QuickToFn;

    const yTo = gsap.quickTo(element, "y", {
      duration: 0.45,
      ease: "power3.out",
    }) as QuickToFn;

    const onMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      xTo((event.clientX - centerX) * strength);
      yTo((event.clientY - centerY) * strength);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", onMove);
    element.addEventListener("mouseleave", onLeave);

    return () => {
      element.removeEventListener("mousemove", onMove);
      element.removeEventListener("mouseleave", onLeave);
      xTo.tween.kill();
      yTo.tween.kill();
      gsap.set(element, { x: 0, y: 0 });
    };
  }, [strength]);

  return ref;
}
