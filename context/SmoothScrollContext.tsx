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
      lerp: 0.1,
      smoothWheel: true,
    });

    lenisRef.current = instance;
    setLenis(instance);
    gsap.ticker.lagSmoothing(0);

    const root = document.documentElement;

    const onLenisScroll = () => {
      ScrollTrigger.update();
    };

    const onScrollTriggerRefresh = () => {
      instance.resize();
    };

    instance.on("scroll", onLenisScroll);

    ScrollTrigger.scrollerProxy(root, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          instance.scrollTo(value, { immediate: true });
        }
        return instance.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.addEventListener("refresh", onScrollTriggerRefresh);

    const raf = (time: number) => {
      instance.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);
    ScrollTrigger.refresh();

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      instance.off("scroll", onLenisScroll);
      ScrollTrigger.removeEventListener("refresh", onScrollTriggerRefresh);
      ScrollTrigger.scrollerProxy(root, {});
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
