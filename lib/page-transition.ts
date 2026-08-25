export const PAGE_TRANSITION_Z = 40000;

const SKIP_PREFIXES = ["/admin", "/api"];

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function shuffleInPlace<T>(items: T[]) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const current = items[i];
    items[i] = items[j] as T;
    items[j] = current as T;
  }
  return items;
}

export function isInternalNavigationClick(event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return false;
  }

  const anchor = (event.target as HTMLElement | null)?.closest("a");
  if (!anchor) return null;
  if (anchor.hasAttribute("download") || anchor.dataset.noTransition === "true") {
    return null;
  }
  if (anchor.target && anchor.target !== "_self") return null;

  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return null;
  }

  let url: URL;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return null;
  }

  if (url.origin !== window.location.origin) return null;
  if (SKIP_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))) {
    return null;
  }

  const current = `${window.location.pathname}${window.location.search}`;
  const next = `${url.pathname}${url.search}`;
  if (current === next) return null;

  return { anchor, url };
}

export function getTransitionGrid() {
  const landscape = window.innerWidth >= window.innerHeight;
  if (landscape) {
    const cols = 12;
    const rows = Math.max(8, Math.round((window.innerHeight / window.innerWidth) * cols));
    return { cols, rows, axis: "x" as const };
  }

  const rows = 12;
  const cols = Math.max(6, Math.round((window.innerWidth / window.innerHeight) * rows));
  return { cols, rows, axis: "y" as const };
}

export function clipPathForProgress(axis: "x" | "y", percent: number) {
  const value = Math.min(100, Math.max(0, percent));
  return axis === "x" ? `inset(0 0 0 ${value}%)` : `inset(${value}% 0 0 0)`;
}
