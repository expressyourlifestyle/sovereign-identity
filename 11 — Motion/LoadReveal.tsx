/**
 * Server-rendered load choreography. No client JS: the classes animate from
 * first paint (see LOAD SEQUENCES in globals.css), so the hero can be
 * cinematic without moving LCP behind hydration. Delays arrive in seconds
 * to match src/lib/motion.ts.
 */
export function RiseIn({
  delay = 0,
  className = "",
  children,
}: {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`anim-rise ${className}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

/** The word-masked display reveal, server-rendered. */
export function WordsIn({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <span aria-label={text} role="text" className={className}>
      {words.map((w, i) => (
        // The space lives outside the mask: trailing whitespace inside an
        // inline-block is trimmed, which would set the heading solid.
        <span key={i} aria-hidden>
          <span className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
            <span
              className="anim-word inline-block will-change-transform"
              style={{ animationDelay: `${delay + i * 0.035}s` }}
            >
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}

/** A hairline that draws itself from first paint. */
export function DrawnRule({
  delay = 0,
  tone = "default",
  className = "",
}: {
  delay?: number;
  tone?: "default" | "strong" | "gold";
  className?: string;
}) {
  const border =
    tone === "gold" ? "border-tertiary" : tone === "strong" ? "rule-strong" : "rule";
  return (
    <div
      aria-hidden
      {...(tone === "gold" ? { "data-accent": true } : {})}
      className={`anim-draw border-t ${border} ${className}`}
      style={{ animationDelay: `${delay}s` }}
    />
  );
}
