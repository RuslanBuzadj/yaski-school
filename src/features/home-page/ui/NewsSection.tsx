import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { routes } from "@/config/navigation";
import { Button } from "@/shared/ui/button";
import { NewsCard } from "@/entities/news";
import { getNewsList } from "@/entities/news/api/queries";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/shared/ui/empty";

const PREVIEW_COUNT = 3;

export async function NewsSection() {
  const news = (await getNewsList()).slice(0, PREVIEW_COUNT);

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

        {news.length > 0 ? (
          <>
            <div className="flex flex-col divide-y divide-border">
              {news.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>

            <div className="mt-10 flex">
              <Button asChild variant="default" size="xl">
                <Link href={routes.news}>Всі новини</Link>
              </Button>
            </div>
          </>
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Newspaper />
              </EmptyMedia>
              <EmptyTitle>Новин поки немає</EmptyTitle>
              <EmptyDescription>
                Слідкуйте за оновленнями — незабаром тут з&apos;являться свіжі новини школи.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </div>
    </section>
  );
}
