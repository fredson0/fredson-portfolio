export const LENIS_EASING = (t: number) =>
  Math.min(1, 1.001 - Math.pow(2, -10 * t));

export const LENIS_OPTIONS = {
  duration: 1.15,
  easing: LENIS_EASING,
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
