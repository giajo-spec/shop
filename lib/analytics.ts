type PlausibleFn = (event: string, options?: { props?: Record<string, string> }) => void;

/** Sends a Plausible custom event when the script is loaded; no-op otherwise. */
export function track(event: string, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const plausible = (window as unknown as { plausible?: PlausibleFn }).plausible;
  plausible?.(event, props ? { props } : undefined);
}
