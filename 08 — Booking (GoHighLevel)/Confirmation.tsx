import type { CopyBlock as BlockData } from "@/content/types";
import { CopyBlock } from "./CopyBlock";
import { Prose } from "./Section";

/**
 * State B, the post-booking confirmation — blocks 3B.1 to 3B.4, rendered
 * on the same route after GoHighLevel's ?booked=1 redirect, noindex.
 *
 * Honest limitation, unchanged from the first build: the parameter can be
 * typed, so this is unguessable-by-accident rather than cryptographically
 * unreachable. Nothing sensitive renders here; verifying against the GHL
 * API would put booking data on this site, which P3-2 forbids.
 *
 * The gold annotation for 3B.1 is "the confirmation mark" — the one drawn
 * element on the page, above the heading.
 */
export function Confirmation({ blocks }: { blocks: BlockData[] }) {
  const stateB = blocks.filter((b) => b.id.startsWith("3B"));

  return (
    <div className="pt-(--spacing-band)">
      <Prose>
        <p aria-hidden data-accent className="font-display text-h1 text-tertiary">
          ✓
        </p>
      </Prose>
      {stateB.map((b) => (
        <div key={b.id} id={b.id === "3B.3" ? "preparation" : undefined} className="scroll-mt-24">
          <CopyBlock block={b} hero={b.id === "3B.1"} ctaBase="#preparation" />
        </div>
      ))}
    </div>
  );
}
