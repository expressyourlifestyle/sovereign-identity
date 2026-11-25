/**
 * The contrast check.
 *
 * A dark, warm palette is exactly the kind that looks correct and fails a
 * real reader. This measures rather than trusts: every pairing that carries
 * words must clear WCAG AA for body text (4.5:1), and the two non-text
 * indicators must clear 3:1. Values are read out of globals.css so the check
 * cannot drift from the stylesheet it is checking.
 */
import { readFile } from "node:fs/promises";

const css = await readFile("src/app/globals.css", "utf8");

const hex = (name) => {
  const m = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!m) {
    console.error(`  FAIL  token --color-${name} not found in globals.css`);
    process.exit(1);
  }
  return m[1];
};

const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const toHex = (c) =>
  "#" + c.map((x) => Math.round(x).toString(16).padStart(2, "0")).join("");
const mix = (a, b, pct) => {
  const [ra, rb] = [rgb(a), rgb(b)];
  return toHex(ra.map((x, i) => x * pct + rb[i] * (1 - pct)));
};

const lum = (h) => {
  const c = rgb(h)
    .map((x) => x / 255)
    .map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const primary = hex("primary");
const secondary = hex("secondary");
const tertiary = hex("tertiary");
const neutral = hex("neutral");
const surface = hex("surface");
const onPrimary = hex("on-primary");

/** Body ink is primary blended 81% over the ground; recompute the blend the
 *  same way color-mix does rather than trusting a comment. */
const ink = mix(primary, neutral, 0.81);

const CASES = [
  // [label, fg, bg, minimum]
  ["primary on neutral", primary, neutral, 4.5],
  ["primary on surface", primary, surface, 4.5],
  ["body ink (primary 81%) on neutral", ink, neutral, 4.5],
  ["body ink (primary 81%) on surface", ink, surface, 4.5],
  ["secondary on neutral", secondary, neutral, 4.5],
  ["secondary on surface", secondary, surface, 4.5],
  ["tertiary on neutral", tertiary, neutral, 4.5],
  ["on-primary on tertiary (button)", onPrimary, tertiary, 4.5],
  // Non-text: the focus ring and the accent as a UI edge.
  ["focus ring (primary) on neutral", primary, neutral, 3],
  ["focus ring (primary) on surface", primary, surface, 3],
];

let failed = 0;
for (const [label, fg, bg, min] of CASES) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  console.log(
    `  ${ok ? "ok  " : "FAIL"}  ${label}: ${r.toFixed(2)}:1 (needs ${min}:1)` +
      (label.startsWith("body ink") ? `  [${ink}]` : ""),
  );
  if (!ok) failed++;
}

if (failed) {
  console.error(`\n${failed} pairing(s) below WCAG AA. Fix the token, not the check.`);
  process.exit(1);
}
