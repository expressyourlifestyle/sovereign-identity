import Link from "next/link";

/**
 * The two actions in the system, and the only two.
 *
 * AccentAction is the sole carrier of tertiary — one per view, enforced at
 * the content layer (check-accent) and at runtime geometry (the viewport
 * audit reads data-accent). GhostAction is the deliberate second choice:
 * hairline, champagne, no colour spent on it.
 *
 * Hover is a 150ms shift, nothing lifts, nothing glows. Padding is the
 * spec's 12px 20px, radius the spec's md.
 */
const BASE =
  "label inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-center transition-colors duration-(--duration-fast)";

export function AccentAction({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      data-accent
      className={`${BASE} bg-tertiary text-on-primary hover:bg-tertiary/85`}
    >
      {children}
    </Link>
  );
}

export function GhostAction({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`${BASE} border rule-strong text-primary hover:border-secondary`}
    >
      {children}
    </Link>
  );
}

/** The button form, for the one true button in the system (error reset). */
export function AccentButton({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-accent
      className={`${BASE} cursor-pointer bg-tertiary text-on-primary hover:bg-tertiary/85`}
    >
      {children}
    </button>
  );
}
