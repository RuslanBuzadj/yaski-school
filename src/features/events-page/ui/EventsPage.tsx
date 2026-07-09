import { EventCard, mockEvents } from "@/entities/events";
import { PageBreadcrumb } from "@/widgets/breadcrumb";

export function EventsPage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <PageBreadcrumb items={[{ label: "Події" }]} />

        <div className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-16 h-16 rounded-full bg-yellow-300 dark:bg-yellow-400 blur-sm opacity-70 pointer-events-none" />
          <h1 className="relative text-3xl sm:text-4xl font-bold text-foreground">Події школи</h1>
        </div>

        <div className="flex flex-col divide-y divide-border">
          {mockEvents.map((item) => (
            <EventCard key={item.id} event={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
