import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles — Cornerstone Marketing",
  description:
    "Practical guides on websites, local SEO, and AI search for service businesses.",
  alternates: { canonical: "https://getcornerstonemarketing.com/articles" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ArticlesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f5f4f0]">
        <section className="pt-32 pb-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-neutral-400 text-xs font-semibold uppercase tracking-[0.24em] mb-4">
              Articles
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4 max-w-2xl">
              Practical guides for service businesses.
            </h1>
            <p className="text-neutral-500 text-lg max-w-xl">
              Websites, local SEO, and AI search — written for owners, not marketers.
            </p>
          </div>
        </section>

        <section className="px-4 sm:px-6 pb-24">
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-px bg-black/8">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="group bg-[#f5f4f0] hover:bg-white transition-colors p-6 sm:p-8 flex flex-col sm:flex-row sm:items-start gap-6"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-black mb-2 group-hover:underline underline-offset-4">
                      {article.title}
                    </h2>
                    <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2">
                      {article.description}
                    </p>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <p className="text-xs text-neutral-400">{formatDate(article.date)}</p>
                    <p className="text-xs text-neutral-400 mt-1">{article.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
