import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { routes } from "@/config/navigation";
import type { News } from "@/entities/news";
import { NewsArticle } from "@/entities/news";
import { PageBreadcrumb } from "@/widgets/breadcrumb";

type Props = {
  news: News;
};

export function NewsArticlePage({ news }: Props) {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <PageBreadcrumb items={[{ label: "Новини", href: routes.news }, { label: news.title }]} />
        <Link
          href={routes.news}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Всі новини
        </Link>
        <NewsArticle news={news} />
      </div>
    </section>
  );
}
