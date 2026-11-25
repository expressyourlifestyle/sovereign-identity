/**
 * The FAQ accordion, native disclosure elements: keyboard complete, screen-
 * reader complete, zero JavaScript. The Founder's annotation reads
 * "Accordion marks render silver", so the marker is a champagne rotation
 * and nothing here touches gold.
 */
export function Faq({ pairs }: { pairs: Array<[string, string]> }) {
  return (
    <div className="mt-12 border-t rule">
      {pairs.map(([q, a], i) => (
        <details key={i} className="group border-b rule">
          <summary className="flex min-h-11 cursor-pointer list-none items-baseline justify-between gap-6 py-6 font-display text-h3 text-primary marker:content-none [&::-webkit-details-marker]:hidden">
            <span>{q}</span>
            <span
              aria-hidden
              className="text-secondary transition-transform duration-(--duration-fast) group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-(--container-prose) pb-8">{a}</p>
        </details>
      ))}
    </div>
  );
}
