import type { CopyBlock as BlockData } from "@/content/types";
import { CopyBlock } from "./CopyBlock";
import { Calendar } from "./Calendar";
import { Wide } from "./Section";

/**
 * The booking surface, State A — blocks 3A.1 to 3A.4, merged into Work
 * With Me by the Founder ruling of 26 August. Payment first, scheduling
 * second; GoHighLevel enforces that order, not this component.
 *
 * The calendar renders inside 3A.3, whose annotation places the view's
 * gold inside the widget itself (the selected slot).
 */
export function BookingPanel({ blocks }: { blocks: BlockData[] }) {
  const stateA = blocks.filter((b) => b.id.startsWith("3A"));

  return (
    <section id="book" className="scroll-mt-24 border-t rule-strong bg-surface/60">
      <div className="py-(--spacing-band)">
        {stateA.map((b) => (
          <div key={b.id}>
            <CopyBlock block={b} ctaBase="#book" />
            {b.id === "3A.3" ? (
              <Wide className="pb-8">
                <Calendar />
              </Wide>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
