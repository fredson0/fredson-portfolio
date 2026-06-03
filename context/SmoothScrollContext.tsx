"use client";

import Lenis from "lenis";
import { ScrollTrigger } from "gsap/all";
import { createContext, useContext, useEffect, useRef, useState } from "react";

import { gsap } from "@/lib/gsap";

type SmoothScrollContextValue = {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue | undefined>(
  undefined
);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [enabled, setEnabled] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      smoothTouch: false,
    });

    lenisRef.current = lenis;
    gsap.ticker.lagSmoothing(0);

    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);
    ScrollTrigger.refresh();

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      lenis.destroy();
      lenisRef.current = null;
      rafRef.current = null;
    };
  }, [enabled]);

  return (
    <SmoothScrollContext.Provider value={{ enabled, setEnabled }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error("useSmoothScroll must be used within SmoothScrollProvider");
  }
  return context;
}
