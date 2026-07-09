import { Calendar, Clock, MapPin } from "lucide-react";
import { ImagePlaceholder } from "@/shared/ui/image-placeholder";
import type { Event } from "../model/types";

type Props = {
  event: Event;
};

export function EventArticle({ event }: Props) {
  return (
    <article className="flex flex-col gap-6">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-muted">
        <ImagePlaceholder src={event.image} alt={event.title} fill />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          {event.date}
        </span>
        {event.time && (
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {event.time}
          </span>
        )}
        {event.location && (
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            {event.location}
          </span>
        )}
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{event.title}</h1>

      {event.content ? (
        <div
          className="ck-content text-sm sm:text-base text-muted-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ __html: event.content }}
        />
      ) : (
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{event.excerpt}</p>
      )}
    </article>
  );
}
