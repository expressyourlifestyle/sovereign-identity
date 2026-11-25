/**
 * The token check.
 *
 * "No raw hex, no arbitrary colour, anywhere in a component — a raw hex in
 * a component is a build failure." The palette lives in exactly two files:
 * globals.css and its TypeScript mirror src/lib/tokens.ts. Everything else
 * must reference tokens.
 *
 * src/content/ is exempt because it holds the Founder's copy, which is text,
 * not styling.
 */
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const ALLOWED = new Set(["src/app/globals.css", "src/lib/tokens.ts"]);
const HEX = /#[0-9a-fA-F]{3,8}\b/g;

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(ts|tsx|css)$/.test(e.name)) yield p;
  }
}

let failed = 0;
for await (const file of walk("src")) {
  if (ALLOWED.has(file) || file.startsWith("src/content/")) continue;
  const lines = (await readFile(file, "utf8")).split("\n");
  lines.forEach((line, i) => {
    // Ignore hex inside comments; the ban is on values, not on prose.
    const code = line.replace(/\/\*.*?\*\//g, "").replace(/^\s*(\/\/|\*).*/, "");
    const hits = code.match(HEX);
    if (hits) {
      console.error(`  FAIL  ${file}:${i + 1}  raw colour ${hits.join(", ")}`);
      failed++;
    }
  });
}

if (failed) {
  console.error(`\n${failed} raw colour(s) outside the token layer. Use a token.`);
  process.exit(1);
}
console.log("  ok    no raw colours outside globals.css and src/lib/tokens.ts.");
