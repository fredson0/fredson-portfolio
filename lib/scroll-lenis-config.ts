export const LENIS_OPTIONS = {
  // Lerp fecha a distância até o alvo a cada frame.
  // Valores altos = freada mais seca (Dennis ~0.1). Duration+expo deixa um rastro longo.
  lerp: 0.1,
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
