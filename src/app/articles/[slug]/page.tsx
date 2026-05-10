import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articles, getArticleBySlug } from "@/lib/articles";

// Static generation — build one page per article at deploy time
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} — Cornerstone Marketing`,
    description: article.description,
    alternates: {
      canonical: `https://getcornerstonemarketing.com/articles/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      url: `https://getcornerstonemarketing.com/articles/${article.slug}`,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  // JSON-LD Article schema for AI search + Google rich results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: "Cornerstone Marketing",
      url: "https://getcornerstonemarketing.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Cornerstone Marketing",
      url: "https://getcornerstonemarketing.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://getcornerstonemarketing.com/articles/${article.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="min-h-screen bg-[#f5f4f0]">
        {/* Header */}
        <section className="pt-32 pb-10 px-4 sm:px-6 border-b border-black/8">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/articles"
              className="inline-flex items-center gap-1.5 text-base font-semibold uppercase tracking-[0.18em] text-black hover:text-black transition-colors mb-8"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All articles
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight mb-6">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-base text-black">
              <span>{formatDate(article.date)}</span>
              <span>·</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="px-4 sm:px-6 py-12">
          <div className="max-w-3xl mx-auto">
            <div
              className="prose-article"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 pb-24">
          <div className="max-w-3xl mx-auto">
            <div className="bg-black text-white p-8 sm:p-10">
              <p className="text-black text-base font-semibold uppercase tracking-[0.24em] mb-3">
                Work with us
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                Ready to put this into practice?
              </h2>
              <p className="text-black text-lg leading-relaxed mb-6 max-w-lg">
                We build conversion-focused websites for service businesses — and help them
                show up in both traditional and AI-powered search. Book a free strategy call
                to see what&apos;s possible for yours.
              </p>
              <a
                href="/#contact"
                className="inline-block px-6 py-3 bg-white text-black font-semibold text-lg hover:bg-neutral-100 transition-colors"
              >
                Book a Free Call
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
