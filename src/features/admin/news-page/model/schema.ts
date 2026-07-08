import { z } from "zod";
import type { News } from "@/entities/news";

export const newsFormSchema = z.object({
  title: z.string().trim().min(1, "Вкажіть заголовок"),
  excerpt: z.string().trim().min(1, "Вкажіть короткий опис"),
  content: z.string().optional(),
  image: z.string().nullable().optional(),
});

export type NewsFormValues = z.infer<typeof newsFormSchema>;

export const newsFormDefaultValues: NewsFormValues = {
  title: "",
  excerpt: "",
  content: "",
  image: null,
};

export function newsToFormValues(news: News): NewsFormValues {
  return {
    title: news.title,
    excerpt: news.excerpt,
    content: news.content ?? "",
    image: news.image ?? null,
  };
}
