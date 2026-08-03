import { Newspaper } from "lucide-react";
import { NewsCard, type News } from "@/entities/news";
import { PageBreadcrumb } from "@/widgets/breadcrumb";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/shared/ui/empty";

type NewsPageProps = {
  news: News[];
};

export function NewsPage({ news }: NewsPageProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <PageBreadcrumb items={[{ label: "Новини" }]} />

        <div className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-16 h-16 rounded-full bg-yellow-300 dark:bg-yellow-400 blur-sm opacity-70 pointer-events-none" />
          <h1 className="relative text-3xl sm:text-4xl font-bold text-foreground">Новини школи</h1>
          <p className="relative mt-4 text-muted-foreground max-w-2xl mx-auto">
            Тут ми публікуємо актуальні новини, події та досягнення нашого закладу освіти.
          </p>
        </div>

        {news.length > 0 ? (
          <div className="flex flex-col divide-y divide-border">
            {news.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
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
