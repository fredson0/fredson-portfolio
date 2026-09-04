export const LENIS_OPTIONS = {
  // Lerp mais alto = freada mais seca. 0.1 deixa uma cauda longa depois do wheel.
  lerp: 0.2,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1,
  syncTouch: false,
} as const;

export const REVEAL_MOTION = {
  y: 40,
  duration: 0.85,
  ease: [0.22, 1, 0.36, 1] as const,
} as const;

/** Root element used by Lenis scrollerProxy — pass to ScrollTrigger configs */
export const LENIS_SCROLLER = (): HTMLElement => document.documentElement;
