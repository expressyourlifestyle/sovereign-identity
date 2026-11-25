import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { NOIR } from "@/lib/tokens";

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * The one share-card template. Typographic, on the tokens, one gold
 * element (the rule). Every route's card runs through here so a palette or
 * face change lands on all of them at once. The committed static Cormorant
 * instance is required because ImageResponse rejects variable fonts and a
 * build must not depend on a font CDN being up.
 */
export async function ogCard({ eyebrow, title }: { eyebrow: string; title: string }) {
  const font = await readFile(
    join(process.cwd(), "src/app/_fonts/CormorantGaramond-SemiBold.ttf"),
  );

  const long = title.length > 44;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 120px",
          background: NOIR.neutral,
          fontFamily: "Cormorant",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: "0.24em",
            color: NOIR.secondary,
            textTransform: "uppercase",
            fontFamily: "sans-serif",
            fontWeight: 600,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            marginTop: 44,
            fontSize: long ? 64 : 84,
            lineHeight: 1.05,
            color: NOIR.primary,
            maxWidth: 940,
          }}
        >
          {title}
        </div>
        <div style={{ marginTop: 56, width: 220, height: 2, background: NOIR.tertiary }} />
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [{ name: "Cormorant", data: font, weight: 600, style: "normal" }],
    },
  );
}
