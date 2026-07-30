export { NewsCard } from "./ui/NewsCard";
export { NewsArticle } from "./ui/NewsArticle";
export { mockNews } from "./model/mock";
export type { News, NewsInput } from "./model/types";

// `api/queries.ts` and `api/actions.ts` are intentionally NOT re-exported
// here: they pull in Prisma (Node-only), and this barrel is also imported
// by client components. Import server-only code directly:
// `@/entities/news/api/queries` / `@/entities/news/api/actions`.
