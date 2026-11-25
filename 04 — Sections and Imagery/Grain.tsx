/**
 * Film grain over the whole composition.
 *
 * Generated, not stock: an SVG turbulence tile inlined as a data URI, so the
 * treatment ships in zero requests and carries no licence. At 4% opacity it
 * reads as material rather than as an effect — the difference between a
 * printed page and a screen. Fixed, non-interactive, invisible to assistive
 * tech, and inert under prefers-reduced-motion because it does not move.
 */
const TILE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70] opacity-[0.04]"
      style={{ backgroundImage: `url("${TILE}")` }}
    />
  );
}
