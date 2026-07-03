import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { routes } from "@/config/navigation";
import { Button } from "@/shared/ui/button";
import { NewsCard, mockNews } from "@/entities/news";

export function NewsSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10 gap-4">
          <h2 className="text-3xl font-bold text-foreground">Новини</h2>
          <Link
            href={routes.news}
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            Всі новини <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex flex-col divide-y divide-border">
          {mockNews.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>

        <div className="mt-10 flex">
          <Button asChild variant="default" size="xl">
            <Link href={routes.news}>Всі новини</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
