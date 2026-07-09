import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { routes } from "@/config/navigation";
import type { Event } from "@/entities/events";
import { EventArticle } from "@/entities/events";
import { PageBreadcrumb } from "@/widgets/breadcrumb";

type Props = {
  event: Event;
};

export function EventArticlePage({ event }: Props) {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <PageBreadcrumb items={[{ label: "Події", href: routes.events }, { label: event.title }]} />
        <Link
          href={routes.events}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Всі події
        </Link>
        <EventArticle event={event} />
      </div>
    </section>
  );
}
