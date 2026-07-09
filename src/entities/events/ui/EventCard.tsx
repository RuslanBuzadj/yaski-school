import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";
import { routes } from "@/config/navigation";
import { ImagePlaceholder } from "@/shared/ui/image-placeholder";
import type { Event } from "../model/types";

type Props = {
  event: Event;
};

export function EventCard({ event }: Props) {
  return (
    <article className="group flex gap-5 py-6 first:pt-0 last:pb-0">
      <div className="relative shrink-0 w-24 h-24 sm:w-32 sm:h-28 rounded-xl overflow-hidden bg-muted">
        <ImagePlaceholder src={event.image} alt={event.title} fill />
      </div>
      <div className="flex flex-col justify-center gap-1.5 min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {event.date}
          </span>
          {event.time && (
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {event.time}
            </span>
          )}
          {event.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {event.location}
            </span>
          )}
        </div>
        <Link href={`${routes.events}/${event.id}`}>
          <h3 className="font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 text-sm sm:text-base leading-snug">
            {event.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 hidden sm:block">
          {event.excerpt}
        </p>
      </div>
    </article>
  );
}
