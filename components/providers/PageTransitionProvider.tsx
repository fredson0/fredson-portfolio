"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  PAGE_TRANSITION_Z,
  clipPathForProgress,
  getTransitionGrid,
  isInternalNavigationClick,
  prefersReducedMotion,
  shuffleInPlace,
} from "@/lib/page-transition";

const PIXEL_COLORS = ["#1c1d20", "#1c1d20", "#2a2b2e", "#111214"];
const PIXEL_IN_OPACITY = [0.4, 0.65, 0.85, 1, 1];

function waitForPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

function waitUntil(predicate: () => boolean, timeoutMs = 2000) {
  return new Promise<void>((resolve) => {
    const started = performance.now();

    const tick = () => {
      if (predicate() || performance.now() - started > timeoutMs) {
        resolve();
        return;
      }
      requestAnimationFrame(tick);
    };

    tick();
  });
}

function waitForPageImages() {
  const images = Array.from(document.images).filter(
    (image) => !image.closest("[data-page-transition-root]")
  );

  return Promise.race([
    Promise.all(
      images.map((image) => {
        if (image.complete && image.naturalWidth > 0) return Promise.resolve();
        return image.decode().catch(() => undefined);
      })
    ),
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, 450);
    }),
  ]);
}

function buildPixelGrid(axis: "x" | "y", cols: number, rows: number) {
  const grid = document.createElement("div");
  grid.style.cssText = `
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    flex-direction: ${axis === "x" ? "row" : "column"};
    pointer-events: none;
  `;

  const primary = axis === "x" ? cols : rows;
  const secondary = axis === "x" ? rows : cols;
  const columns: HTMLElement[] = [];

  for (let i = 0; i < primary; i += 1) {
    const column = document.createElement("div");
    column.style.cssText = `
      flex: 1 1 0%;
      display: flex;
      flex-direction: ${axis === "x" ? "column" : "row"};
      min-width: 0;
      min-height: 0;
    `;

    for (let j = 0; j < secondary; j += 1) {
      const pixel = document.createElement("div");
      const color = PIXEL_COLORS[Math.floor(Math.random() * PIXEL_COLORS.length)] ?? PIXEL_COLORS[0];
      pixel.style.cssText = `
        flex: 1 1 0%;
        opacity: 0;
        background: ${color};
        will-change: opacity;
      `;
      column.appendChild(pixel);
    }

    columns.push(column);
    grid.appendChild(column);
  }

  return { grid, columns };
}

function captureSnapshot(scrollY: number) {
  const layer = document.createElement("div");
  layer.dataset.pageTransitionRoot = "true";
  layer.setAttribute("aria-hidden", "true");
  layer.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: ${PAGE_TRANSITION_Z};
    overflow: hidden;
    pointer-events: none;
    background: transparent;
  `;

  const snapshot = document.createElement("div");
  snapshot.style.cssText = `
    position: absolute;
    inset: 0;
    overflow: hidden;
    clip-path: inset(0 0 0 0);
    will-change: clip-path;
  `;

  const clone = document.body.cloneNode(true) as HTMLElement;
  clone.querySelectorAll("[data-page-transition-root], nextjs-portal, script").forEach((node) => {
    node.remove();
  });
  clone.querySelectorAll("video, audio").forEach((media) => {
    const el = media as HTMLMediaElement;
    el.pause();
    el.removeAttribute("autoplay");
  });

  clone.style.cssText = `
    position: absolute;
    top: ${-scrollY}px;
    left: 0;
    width: 100%;
    margin: 0;
    pointer-events: none;
  `;

  snapshot.appendChild(clone);
  layer.appendChild(snapshot);
  document.documentElement.appendChild(layer);

  return { layer, snapshot };
}

function playWave(
  snapshot: HTMLElement,
  columns: HTMLElement[],
  axis: "x" | "y"
) {
  const colCount = columns.length;
  const duration = 1.05;
  const fade = 0.18;
  const hold = 0.26;
  const step = duration / colCount;

  return new Promise<void>((resolve) => {
    const tl = gsap.timeline({
      onComplete: resolve,
    });

    columns.forEach((column, col) => {
      const pixels = shuffleInPlace(Array.from(column.children) as HTMLElement[]);
      const start = col * step;

      pixels.forEach((pixel, index) => {
        const jitter = (index / Math.max(pixels.length - 1, 1)) * fade;
        const opacity =
          PIXEL_IN_OPACITY[Math.floor(Math.random() * PIXEL_IN_OPACITY.length)] ?? 1;
        tl.set(pixel, { opacity }, start + jitter);
      });

      tl.set(
        snapshot,
        { clipPath: clipPathForProgress(axis, ((col + 1) / colCount) * 100) },
        start + fade * 0.5
      );

      pixels.forEach((pixel, index) => {
        const jitter = (index / Math.max(pixels.length - 1, 1)) * fade;
        tl.set(pixel, { opacity: 0 }, start + hold + jitter);
      });
    });
  });
}

export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const busyRef = useRef(false);
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (busyRef.current) {
        event.preventDefault();
        return;
      }

      const navigation = isInternalNavigationClick(event);
      if (!navigation) return;

      event.preventDefault();
      const href = `${navigation.url.pathname}${navigation.url.search}${navigation.url.hash}`;

      if (prefersReducedMotion()) {
        router.push(href);
        return;
      }

      void runTransition(href);
    };

    const runTransition = async (href: string) => {
      busyRef.current = true;
      const previousPath = pathnameRef.current;
      const targetPath = new URL(href, window.location.href).pathname;
      const scrollY = lenis?.scroll ?? window.scrollY;

      lenis?.stop();
      document.documentElement.style.cursor = "wait";

      const { layer, snapshot } = captureSnapshot(scrollY);
      const { cols, rows, axis } = getTransitionGrid();
      const { grid, columns } = buildPixelGrid(axis, cols, rows);
      layer.appendChild(grid);

      router.push(href);

      await waitUntil(() => pathnameRef.current === targetPath);
      window.scrollTo(0, 0);
      lenis?.scrollTo(0, { immediate: true });
      await waitForPaint();
      await waitForPageImages();
      await waitForPaint();
      ScrollTrigger.refresh();

      if (pathnameRef.current === previousPath && targetPath !== previousPath) {
        layer.remove();
        lenis?.start();
        document.documentElement.style.cursor = "";
        busyRef.current = false;
        return;
      }

      await playWave(snapshot, columns, axis);

      layer.remove();
      document.documentElement.style.cursor = "";
      lenis?.start();
      ScrollTrigger.refresh();
      busyRef.current = false;
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [lenis, router]);

  return <>{children}</>;
}
