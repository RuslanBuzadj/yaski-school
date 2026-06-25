import Link from "next/link";
import { Calendar } from "lucide-react";
import { routes } from "@/config/navigation";
import { ImagePlaceholder } from "@/shared/ui/image-placeholder";
import type { News } from "../model/types";

type Props = {
  news: News;
};

export function NewsCard({ news }: Props) {
  return (
    <article className="group flex gap-5 py-6 first:pt-0 last:pb-0">
      <div className="relative shrink-0 w-24 h-24 sm:w-32 sm:h-28 rounded-xl overflow-hidden bg-muted">
        <ImagePlaceholder src={news.image} alt={news.title} fill />
      </div>
      <div className="flex flex-col justify-center gap-1.5 min-w-0">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          {news.date}
        </div>
        <Link href={`${routes.news}/${news.id}`}>
          <h3 className="font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 text-sm sm:text-base leading-snug">
            {news.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 hidden sm:block">
          {news.excerpt}
        </p>
      </div>
    </article>
  );
}
