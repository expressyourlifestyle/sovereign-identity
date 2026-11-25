import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Prose, Wide } from "@/components/Section";
import { Reveal } from "@/components/motion/Reveal";
import { articles, PLACEHOLDER } from "@/content/journal";
import { HERO_MEDIA } from "@/lib/journal-media";

/** Pre-render every article at build time. */
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.standfirst,
    robots: PLACEHOLDER ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.standfirst,
      publishedTime: article.published,
    },
  };
}

/**
 * Route 5 — Journal Article. "The canonical article surface."
 * Placeholder throughout (lorem + graded stock), noindex until the flag
 * flips with the first approved article.
 */
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.standfirst,
        datePublished: article.published,
        author: { "@id": "https://melvinnibbs.com/#founder" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Journal", item: "https://melvinnibbs.com/journal" },
          {
            "@type": "ListItem",
            position: 2,
            name: article.category,
            item: `https://melvinnibbs.com/journal/category/${article.categorySlug}`,
          },
          { "@type": "ListItem", position: 3, name: article.title },
        ],
      },
    ],
  };

  return (
    <article className="pb-(--spacing-band)">
      <Prose className="pt-20 sm:pt-28">
        <Link
          href={`/journal/category/${article.categorySlug}`}
          className="label inline-flex min-h-11 items-center transition-colors duration-(--duration-fast) hover:text-primary"
        >
          {article.category}
        </Link>

        <h1 className="mt-6 max-w-[22ch] text-h1 sm:text-[length:var(--text-display)] sm:leading-(--text-display--line-height)">
          {article.title}
        </h1>

        <p className="mt-8 text-lead text-primary/90">{article.standfirst}</p>

        <time
          dateTime={article.published}
          className="mt-8 block border-t rule pt-6 text-small tabular-nums text-secondary"
        >
          {new Date(article.published).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      </Prose>

      {/* Not wrapped in a reveal: this is the route's LCP, and an animated
          LCP waits for hydration on a throttled phone. */}
      <Wide className="mt-12">
        <Image
          src={HERO_MEDIA[article.hero]}
          alt=""
          priority
          sizes="(max-width: 1024px) 100vw, 896px"
          placeholder="blur"
          className="aspect-[21/9] w-full rounded-lg border rule object-cover"
        />
      </Wide>

      <Prose className="mt-4">
        {article.sections.map((s, i) => (
          <Reveal key={i}>
            <section>
              {s.heading ? <h2 className="mt-14 max-w-[24ch] text-h2">{s.heading}</h2> : null}
              {s.paragraphs.map((p, j) => (
                <p key={j} className="mt-6">
                  {p}
                </p>
              ))}
            </section>
          </Reveal>
        ))}

        <Reveal>
          <p className="voice mt-14 border-l-2 rule-strong pl-7 text-h3 text-primary">
            {article.pull}
          </p>
        </Reveal>

        <nav aria-label="Journal" className="mt-16 border-t rule pt-8">
          <Link
            href="/journal"
            className="label inline-flex min-h-11 items-center text-secondary transition-colors duration-(--duration-fast) hover:text-primary"
          >
            ← All articles
          </Link>
        </nav>
      </Prose>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
