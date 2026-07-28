"use client";

import Lenis from "lenis";
import { ScrollTrigger } from "gsap/all";
import { createContext, useContext, useEffect, useRef, useState } from "react";

import { gsap } from "@/lib/gsap";

type SmoothScrollContextValue = {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
  lenis: Lenis | null;
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
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      setLenis(null);
      return undefined;
    }

    const instance = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      smoothTouch: false,
    });

    lenisRef.current = instance;
    setLenis(instance);
    gsap.ticker.lagSmoothing(0);

    const raf = (time: number) => {
      instance.raf(time);
      ScrollTrigger.update();
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);
    ScrollTrigger.refresh();

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
      rafRef.current = null;
    };
  }, [enabled]);

  return (
    <SmoothScrollContext.Provider value={{ enabled, setEnabled, lenis }}>
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
