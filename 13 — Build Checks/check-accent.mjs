/**
 * The one-accent check.
 *
 * Layer 7: "One gold accent per view is a hard rule (a Contradiction-Sweep
 * trigger)." The Founder's own copy resolves what "view" means: every block
 * carries an annotation naming the single gold element in ITS view, and block
 * 1.7 reads "none. This view runs silver and obsidian only, so that the
 * refusals block below carries the accent."
 *
 * So the rule is one gold element per BLOCK, not per page. A page may carry
 * several, choreographed down the scroll. This checks that no single block
 * declares two.
 *
 * It reads the generated copy module, which means it checks the Founder's
 * words rather than a developer's summary of them.
 */
import { readFile } from "node:fs/promises";

const source = await readFile("src/content/pages.ts", "utf8");

// Each block emits `id: "1.1",` then its parts up to the next `id:`.
const blocks = source.split(/\n    id: /).slice(1);

let failed = 0;
let checked = 0;

for (const chunk of blocks) {
  const id = chunk.match(/^"([^"]+)"/)?.[1] ?? "?";
  const golds = (chunk.match(/kind: "cta_primary"/g) ?? []).length;
  checked++;

  if (golds > 1) {
    console.error(`  FAIL  block ${id}: ${golds} gold CTAs in one view.`);
    failed++;
  }
}

if (failed) {
  console.error(`\n${failed} block(s) violate the one-accent rule. See Canon v2.0 Layer 7.`);
  process.exit(1);
}
console.log(`  ok    ${checked} blocks, no block carries two gold elements.`);
