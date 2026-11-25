/**
 * The TypeScript mirror of the Wealth Noir palette.
 *
 * globals.css is the source of truth for everything rendered by CSS. A few
 * surfaces cannot read CSS custom properties — the web manifest, the
 * generated OG cards, the viewport theme colour — and they import from here
 * instead of carrying their own hex. This file and globals.css are the only
 * two places in src/ where a colour literal may appear; the check-tokens
 * gate enforces that.
 */
export const NOIR = {
  primary: "#e9e3d4",
  secondary: "#8c8575",
  tertiary: "#c9a15a",
  neutral: "#0a0a09",
  surface: "#131211",
  onPrimary: "#0a0a09",
} as const;
