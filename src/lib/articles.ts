export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO 8601, e.g. "2026-04-28"
  readTime: string; // e.g. "5 min read"
  tags: string[];
  content: string; // HTML string rendered on the detail page
};

// Registry — import each article and add it here. Order = display order on listing page.
import { article as whyWebsitesDontConvert } from "@/content/articles/why-service-business-websites-dont-convert";
import { article as aiSearchLocalBusiness } from "@/content/articles/how-ai-search-is-changing-local-business";

export const articles: Article[] = [
  whyWebsitesDontConvert,
  aiSearchLocalBusiness,
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
