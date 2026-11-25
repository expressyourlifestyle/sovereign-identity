"use client";

import { m, useReducedMotion } from "motion/react";
import { DUR, EASE, RISE, VIEWPORT } from "@/lib/motion";

/**
 * The default entrance: opacity with a small settle downward into place,
 * once, beginning just before the element clears the fold.
 *
 * mode="load" animates on mount instead of on scroll — the hero sequence —
 * and never replays. Under prefers-reduced-motion every variant collapses
 * to opacity only, at final position, near-instant.
 *
 * Server HTML carries no hidden state: the initial style is applied at
 * hydration, so a visitor without JavaScript reads a fully visible page.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : RISE }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{
        duration: reduced ? 0.01 : DUR.base,
        ease: EASE,
        delay: reduced ? 0 : delay,
      }}
    >
      {children}
    </m.div>
  );
}

/**
 * Masked rise for display type: each word lifts out of its own overflow
 * mask with a tight stagger, reading as a line reveal at every width
 * without measuring lines.
 *
 * The viewport observer sits on the unmasked container, never on the
 * masked words — a fully clipped element never intersects, so observing
 * the words themselves would leave the heading hidden forever. Children
 * inherit the trigger through variants. The full string sits on the
 * container as its accessible name; the fragments are presentation.
 */
export function TextReveal({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");

  return (
    <m.span
      aria-label={text}
      role="text"
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {words.map((w, i) => (
        // The space lives OUTSIDE the mask: trailing whitespace inside an
        // inline-block is trimmed, which would set the heading solid.
        <span key={i} aria-hidden>
          <span className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
            <m.span
              className="inline-block will-change-transform"
              variants={{
                hidden: { y: "112%" },
                show: {
                  y: "0%",
                  transition: { duration: DUR.reveal, ease: EASE, delay: delay + i * 0.035 },
                },
              }}
            >
              {w}
            </m.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </m.span>
  );
}

/**
 * A hairline that draws itself, left to right. Cheap, and it reads as
 * precision. The observer sits on an untransformed wrapper — a scaleX(0)
 * element has no area to intersect. Reduced motion renders it complete.
 */
export function DrawRule({
  delay = 0,
  tone = "default",
  className = "",
}: {
  delay?: number;
  /** "gold" is used only where the Founder's block annotation names the
   *  rule itself as the view's accent; it carries data-accent so the
   *  viewport audit counts it. */
  tone?: "default" | "strong" | "gold";
  className?: string;
}) {
  const reduced = useReducedMotion();
  const border =
    tone === "gold" ? "border-tertiary" : tone === "strong" ? "rule-strong" : "rule";
  const cls = `border-t ${border} ${className}`;
  const accent = tone === "gold" ? { "data-accent": true } : {};

  if (reduced) return <div aria-hidden {...accent} className={cls} />;

  return (
    <m.div
      aria-hidden
      {...accent}
      className="block"
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      <m.div
        className={`${cls} origin-left`}
        variants={{
          hidden: { scaleX: 0 },
          show: { scaleX: 1, transition: { duration: DUR.slow, ease: EASE, delay } },
        }}
      />
    </m.div>
  );
}
