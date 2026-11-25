/**
 * WCAG 2.2 AA, measured. Launches the production build in a real browser
 * and runs axe-core on every route at desktop and mobile widths. Fails on
 * any violation. Report written to reports/axe.json.
 *
 * Run:  npm run build && npm run start   (in one shell)
 *       node scripts/audit/axe.mjs       (in another; or CI does both)
 */
import { writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";
import { ROUTES } from "./routes.mjs";

const BASE = process.env.AUDIT_BASE ?? "http://localhost:3000";
const SIZES = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await chromium.launch();
const results = [];
let violations = 0;

for (const size of SIZES) {
  const context = await browser.newContext({
    viewport: { width: size.width, height: size.height },
  });
  const page = await context.newPage();
  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    const r = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    results.push({
      route,
      viewport: size.name,
      violations: r.violations,
      /* "Incomplete" = axe could not decide (e.g. a fixed overlay makes the
         background ambiguous). Not failures, but recorded: the one contrast
         bug this build has had lived exactly in that blind spot. */
      incomplete: r.incomplete.map((i) => ({ id: i.id, nodes: i.nodes.length })),
    });
    if (r.violations.length) {
      violations += r.violations.length;
      for (const v of r.violations) {
        console.error(`  FAIL  ${route} [${size.name}] ${v.id}: ${v.help} (${v.nodes.length} nodes)`);
      }
    } else {
      console.log(`  ok    ${route} [${size.name}]`);
    }
  }
  await context.close();
}

await browser.close();
await writeFile("reports/axe.json", JSON.stringify({ when: new Date().toISOString(), results }, null, 2));

if (violations) {
  console.error(`\n${violations} axe violation(s). Report: reports/axe.json`);
  process.exit(1);
}
console.log("\n  axe clean on every route at both widths. Report: reports/axe.json");
