const hits = new Map<string, number[]>();

const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 5;

export function isRateLimited(key: string) {
  const now = Date.now();
  const timestamps = hits.get(key) ?? [];
  const recent = timestamps.filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);
  return false;
}
