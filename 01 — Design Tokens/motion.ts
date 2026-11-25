/**
 * Motion tokens — the JS half of the token layer.
 *
 * The CSS half lives in globals.css (--ease-signature, --duration-*). The
 * two are kept in step by hand and by review; if a value changes here it
 * changes there in the same commit.
 *
 * The register is a title sequence, not a web animation showcase: long
 * durations, deep easing, generous stagger. Nothing bounces.
 */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const DUR = {
  fast: 0.15,
  base: 0.6,
  slow: 0.8,
  reveal: 0.9,
} as const;

/** Entrance rise, px. Content settles down into place, never jumps up. */
export const RISE = 14;

/** Shared viewport contract: animate once, begin before the element clears
 *  the fold so settled content is what the reader meets. */
export const VIEWPORT = { once: true, margin: "-80px" } as const;

/** The hero load sequence, seconds from first paint. Only the display line
 *  and the rule animate: the deck, eyebrow and action render static, because
 *  the largest above-fold text is usually the LCP and an entrance delay on
 *  it is paid for in full on a throttled phone. The flourish is spent where
 *  the premium read lives — the display type. */
export const HERO = {
  rule: 0.1,
  h1: 0.3,
} as const;
