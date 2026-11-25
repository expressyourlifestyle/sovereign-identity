import type { TablePart } from "@/content/types";
import { Inline } from "./Inline";

/**
 * A table from the approved copy, set as a ledger: hairlines under rows,
 * no vertical rules, no zebra, tabular numerals wherever figures align.
 * The left column is the spine at full champagne; cells sit one step back.
 *
 * goldColumn / goldRowLabel carry the Founder's per-block accent
 * annotations ("the third column header", "the price column") into the
 * render. A table with no header (the booking strips) sets as definition
 * rows: term hairlined against value.
 *
 * Wide tables scroll inside their own container; the page never scrolls
 * sideways.
 */
export function Ledger({
  part,
  goldColumn,
  goldRowLabel,
}: {
  part: TablePart;
  goldColumn?: number;
  goldRowLabel?: string;
}) {
  const { header, rows } = part;

  if (!header.length) {
    return (
      <div className="my-10 border rule bg-surface px-6 py-2 sm:px-8">
        <dl>
          {rows.map((row, r) => (
            <div
              key={r}
              className="grid grid-cols-1 gap-x-8 border-b rule py-4 last:border-0 sm:grid-cols-[10rem_1fr]"
            >
              <dt className="label pt-0.5">{row[0]}</dt>
              <dd className="tabular-nums">
                <Inline text={row.slice(1).join(" ")} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }

  return (
    /* The scroll container is keyboard-reachable: a wide ledger on a narrow
       screen must be scrollable from the keyboard, not only by touch. */
    <div
      tabIndex={0}
      role="region"
      aria-label={header.filter(Boolean).join(", ") || "Table"}
      className="my-14 -mx-6 overflow-x-auto px-6 lg:mx-0 lg:px-0"
    >
      <table className="w-full min-w-2xl border-collapse text-left">
        <thead>
          <tr className="border-b rule-strong">
            {header.map((h, i) => (
              <th
                key={i}
                scope="col"
                className={`label pb-4 pr-8 align-bottom font-semibold ${
                  i === goldColumn ? "text-tertiary" : ""
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => {
            const goldRow = goldRowLabel !== undefined && row[0] === goldRowLabel;
            return (
              <tr key={r} className="border-b rule align-top last:border-0">
                {row.map((cell, c) => (
                  <td
                    key={c}
                    className={`py-6 pr-8 tabular-nums ${
                      c === 0
                        ? "font-medium text-primary"
                        : goldRow
                          ? "font-display text-h3 text-tertiary"
                          : ""
                    }`}
                  >
                    <Inline text={cell} />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
