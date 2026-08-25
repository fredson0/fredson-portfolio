"use client";

import { useLenis } from "lenis/react";

type SmoothScrollContextValue = {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
  lenis: ReturnType<typeof useLenis>;
};

export function useSmoothScroll(): SmoothScrollContextValue {
  const lenis = useLenis();

  return {
    lenis,
    enabled: true,
    setEnabled: () => {},
  };
}
