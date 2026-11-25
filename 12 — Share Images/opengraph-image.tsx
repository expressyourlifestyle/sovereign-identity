import { ogCard, OG_SIZE } from "@/lib/og";

export const alt = "Sovereign Identity — identity architecture for founders and leaders";
export const size = OG_SIZE;
export const contentType = "image/png";

/** The default card, inherited by any route without its own. */
export default function Image() {
  return ogCard({
    eyebrow: "Sovereign Identity",
    title: "Identity architecture for founders and leaders.",
  });
}
