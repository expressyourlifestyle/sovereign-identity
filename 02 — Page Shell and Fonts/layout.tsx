import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { DraftBanner } from "@/components/DraftBanner";
import { Grain } from "@/components/Grain";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { NOIR } from "@/lib/tokens";
import "./globals.css";

/**
 * Both families are self-hosted at build time by next/font and subset to
 * latin. Nothing is fetched from a font CDN at runtime. The display face is
 * preloaded by next/font because it carries the largest paint on every route.
 *
 * Cormorant Garamond is loaded at 500, 600 and italic: display sets at 600
 * (the optical compensation for a face that runs light on a black ground),
 * quotations set at 500 italic. Inter carries body at 400/500 and labels
 * at 600.
 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: NOIR.neutral,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://melvinnibbs.com"),
  title: {
    default: "Sovereign Identity",
    template: "%s · Sovereign Identity",
  },
  description: "Identity architecture for founders and leaders.",
  openGraph: { type: "website", siteName: "Sovereign Identity" },
  icons: {
    icon: [
      { url: "/images/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon/favicon.ico", sizes: "any" },
    ],
    apple: "/images/favicon/apple-touch-icon.png",
  },
  /**
   * Indexing is its own gate, separate from copy approval: the approved
   * copy can be shown on the temporary Vercel address long before launch,
   * and that address must never enter a search index. INDEXABLE is set to
   * true only once melvinnibbs.com points at this deployment.
   */
  robots:
    process.env.NEXT_PUBLIC_INDEXABLE === "true"
      ? undefined
      : { index: false, follow: false },
};

/**
 * Person and ProfessionalService, once, in the root. Only facts already on
 * the record: the Founder's name, the practice name, the domain. Nothing
 * legal-entity-shaped is asserted here because the entity question is an
 * open Founder item.
 */
const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://melvinnibbs.com/#founder",
      name: "Melvin Nibbs",
      jobTitle: "Founder and Architect",
      url: "https://melvinnibbs.com",
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://melvinnibbs.com/#practice",
      name: "Sovereign Identity",
      url: "https://melvinnibbs.com",
      founder: { "@id": "https://melvinnibbs.com/#founder" },
      description: "Identity architecture for founders and leaders.",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-neutral antialiased">
        {/* First in the tab order. Visually hidden until it is the one thing
            that matters. */}
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-[80] focus:bg-primary focus:px-5 focus:py-3 focus:text-neutral"
        >
          Skip to content
        </a>

        <MotionProvider>
          <DraftBanner />
          <Nav />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
        <Grain />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
        />
      </body>
    </html>
  );
}
