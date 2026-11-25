"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Primary navigation. The three links are fixed by the Route Structure
 * Canon ("Primary Navigation (Locked)"); Contact is retired to the footer.
 *
 * Transparent over the hero, then the ground and a hairline arrive on the
 * first scroll — the bar is part of the composition until the page moves,
 * then it is furniture. No blur, no glass: a solid ground at high alpha.
 *
 * The Lion mark is gold and the accent rule is one gold ACTION per view;
 * the mark is identity, not interaction, kept small enough to read as a
 * signature. If the Founder rules the stricter reading, this is a one-line
 * change to a champagne filter.
 */
const LINKS = [
  { href: "/about", label: "About" },
  { href: "/work-with-me", label: "Work With Me" },
  { href: "/journal", label: "Journal" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-(--duration-fast) ${
        scrolled ? "rule bg-neutral/95" : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-10"
      >
        <Link
          href="/"
          aria-label="Sovereign Identity — home"
          className="group flex min-h-11 items-center gap-3"
        >
          <Image
            src="/images/lion-mark.png"
            alt=""
            width={26}
            height={26}
            priority
            className="h-[26px] w-auto"
          />
          <span className="label hidden text-primary transition-opacity duration-(--duration-fast) group-hover:opacity-80 sm:inline">
            Sovereign Identity
          </span>
        </Link>

        <ul className="flex items-center gap-6 sm:gap-10">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="label inline-flex min-h-11 items-center text-secondary transition-colors duration-(--duration-fast) hover:text-primary"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
