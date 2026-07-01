import { Calendar } from "lucide-react";
import { ImagePlaceholder } from "@/shared/ui/image-placeholder";
import type { News } from "../model/types";

type Props = {
  news: News;
};

export function NewsArticle({ news }: Props) {
  return (
    <article className="flex flex-col gap-6">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-muted">
        <ImagePlaceholder src={news.image} alt={news.title} fill />
      </div>

      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />
        {news.date}
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{news.title}</h1>

      <div className="flex flex-col gap-4">
        {(news.content ?? [news.excerpt]).map((paragraph, index) => (
          <p key={index} className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
