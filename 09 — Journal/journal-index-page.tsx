import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, Wide } from "@/components/Section";
import { Reveal } from "@/components/motion/Reveal";
import { WordsIn } from "@/components/motion/LoadReveal";
import { articles, categories, index, PLACEHOLDER } from "@/content/journal";
import { HERO_MEDIA } from "@/lib/journal-media";
import woven from "@/assets/stock/woven.jpg";

export const metadata: Metadata = {
  title: "Journal",
  description: index.standfirst,
  robots: PLACEHOLDER ? { index: false, follow: false } : undefined,
};

/**
 * Route 4 — Journal Index. "The master Journal structure."
 *
 * Everything rendered from journal.ts is placeholder (lorem + graded
 * stock) by Operator instruction, noindex until the first approved
 * article flips the flag.
 */
export default function JournalPage() {
  return (
    <>
      <Section treatment="image" image={woven} priority scrim={78}>
        <Wide className="pt-28 pb-16 sm:pt-36 sm:pb-20">
          <p className="label">{index.eyebrow}</p>
          <h1 className="mt-8 max-w-[18ch] text-display">
            <WordsIn delay={0.3} text={index.h1} />
          </h1>
          <p className="mt-7 max-w-(--container-prose) text-lead text-primary/90">
            {index.standfirst}
          </p>
        </Wide>
      </Section>

      <Wide>
        <nav aria-label="Journal categories" className="border-b rule py-5">
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/journal/category/${c.slug}`}
                  className="label inline-flex min-h-11 items-center text-secondary transition-colors duration-(--duration-fast) hover:text-primary"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="pb-(--spacing-band)">
          {articles.map((a) => (
            <li key={a.slug} className="border-b rule">
              <Reveal>
                <article className="group grid gap-8 py-12 sm:grid-cols-[14rem_1fr] sm:items-start">
                  <Link
                    href={`/journal/${a.slug}`}
                    tabIndex={-1}
                    aria-hidden
                    className="overflow-hidden rounded-lg border rule"
                  >
                    <Image
                      src={HERO_MEDIA[a.hero]}
                      alt=""
                      sizes="(max-width: 640px) 90vw, 224px"
                      placeholder="blur"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </Link>
                  <div>
                    <p className="label">{a.category}</p>
                    <h2 className="mt-4 max-w-[26ch] text-h2">
                      <Link
                        href={`/journal/${a.slug}`}
                        className="transition-colors duration-(--duration-fast) group-hover:text-secondary"
                      >
                        {a.title}
                      </Link>
                    </h2>
                    <p className="mt-5 max-w-(--container-prose)">{a.standfirst}</p>
                    <time
                      dateTime={a.published}
                      className="mt-5 block text-small tabular-nums text-secondary"
                    >
                      {new Date(a.published).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Wide>
    </>
  );
}
