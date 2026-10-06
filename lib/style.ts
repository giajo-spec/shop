import type { CSSProperties } from "react";

/** Reveal stagger delay, consumed by `[data-reveal]` transitions. */
export const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
