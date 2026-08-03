import { CalendarDays } from "lucide-react";
import { EventCard, type Event } from "@/entities/events";
import { PageBreadcrumb } from "@/widgets/breadcrumb";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/shared/ui/empty";

type EventsPageProps = {
  events: Event[];
};

export function EventsPage({ events }: EventsPageProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <PageBreadcrumb items={[{ label: "Події" }]} />

        <div className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-16 h-16 rounded-full bg-yellow-300 dark:bg-yellow-400 blur-sm opacity-70 pointer-events-none" />
          <h1 className="relative text-3xl sm:text-4xl font-bold text-foreground">Події школи</h1>
          <p className="relative mt-4 text-muted-foreground max-w-2xl mx-auto">
            Анонси та звіти про заходи, свята й конкурси, які проходять у нашому закладі.
          </p>
        </div>

        {events.length > 0 ? (
          <div className="flex flex-col divide-y divide-border">
            {events.map((item) => (
              <EventCard key={item.id} event={item} />
            ))}
          </div>
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CalendarDays />
              </EmptyMedia>
              <EmptyTitle>Подій поки немає</EmptyTitle>
              <EmptyDescription>
                Найближчим часом тут з&apos;являться анонси подій та заходів школи.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </div>
    </section>
  );
}
