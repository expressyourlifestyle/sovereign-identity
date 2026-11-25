import Image, { type StaticImageData } from "next/image";

/**
 * The section ground vocabulary. Every section on the site draws its
 * treatment from this set and no other:
 *
 *   plain    the neutral page ground carrying the composition
 *   hairline plain, opened by a full-width rule
 *   surface  the raised ground, edge to edge
 *   image    a graded placeholder photograph under a deep neutral scrim,
 *            flat typography on top — photographic depth, flat colour
 *
 * Images are decorative by definition here (empty alt, hidden from AT) and
 * every one is a logged PLACEHOLDER pending the Founder's own media.
 */
export function Section({
  id,
  treatment = "plain",
  image,
  priority = false,
  scrim = 78,
  children,
  className = "",
}: {
  id?: string;
  treatment?: "plain" | "hairline" | "surface" | "image";
  image?: StaticImageData;
  /** Set on the one image ground that opens a route: it is the LCP element
   *  there, and a lazy LCP is the slowest thing a page can do. */
  priority?: boolean;
  /** Neutral overlay strength over an image ground, percent. */
  scrim?: 70 | 78 | 86;
  children: React.ReactNode;
  className?: string;
}) {
  const ground =
    treatment === "surface"
      ? "bg-surface"
      : treatment === "image"
        ? "relative isolate overflow-hidden bg-neutral"
        : "bg-neutral";

  const scrimCls =
    scrim === 70 ? "bg-neutral/70" : scrim === 86 ? "bg-neutral/86" : "bg-neutral/78";

  return (
    <section
      id={id}
      className={`${ground} ${treatment === "hairline" ? "border-t rule" : ""} ${className}`}
    >
      {treatment === "image" && image ? (
        <>
          <Image
            src={image}
            alt=""
            aria-hidden
            fill
            priority={priority}
            /* Half-size candidates on small screens: under the scrim the
               softness is invisible, and the decode cost on a throttled
               phone is what stands between this page and its LCP budget. */
            sizes="(max-width: 768px) 50vw, 100vw"
            /* The ground sits under a 70–86% neutral scrim: quality is
               invisible here, bytes are not. This is the LCP on routes that
               open on an image. */
            quality={45}
            /* No blur placeholder on the ground: the page behind it is
               already near-black, and the blur swap waits on hydration —
               which is exactly the render delay the LCP budget cannot
               afford on a throttled phone. */
            placeholder="empty"
            className="pointer-events-none -z-20 object-cover"
          />
          <div aria-hidden className={`absolute inset-0 -z-10 ${scrimCls}`} />
        </>
      ) : null}
      {children}
    </section>
  );
}

/** The two content widths. Prose holds the measure; wide is for ledgers. */
export function Prose({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-(--container-prose) px-6 lg:px-10 ${className}`}>{children}</div>;
}

export function Wide({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-5xl px-6 lg:px-10 ${className}`}>{children}</div>;
}
