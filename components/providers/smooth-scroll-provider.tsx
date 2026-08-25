"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";

import { LENIS_OPTIONS } from "@/lib/scroll-lenis-config";
import { gsap, ScrollTrigger } from "@/lib/gsap";

function LenisGsapSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const root = document.documentElement;

    const onLenisScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", onLenisScroll);

    ScrollTrigger.scrollerProxy(root, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: root.style.transform ? "transform" : "fixed",
    });

    ScrollTrigger.defaults({
      scroller: root,
    });

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const onRefresh = () => {
      lenis.resize();
    };

    ScrollTrigger.addEventListener("refresh", onRefresh);
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", onLenisScroll);
      gsap.ticker.remove(onTick);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      ScrollTrigger.scrollerProxy(root, {});
      ScrollTrigger.defaults({ scroller: window });
    };
  }, [lenis]);

  return null;
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <ReactLenis root autoRaf={false} options={LENIS_OPTIONS}>
      <LenisGsapSync />
      {children}
    </ReactLenis>
  );
}
