import { z } from "zod";
import type { Event } from "@/entities/events";

export const eventFormSchema = z.object({
  title: z.string().trim().min(1, "Вкажіть заголовок"),
  date: z.string().trim().min(1, "Вкажіть дату"),
  time: z.string().trim().optional(),
  location: z.string().trim().optional(),
  excerpt: z.string().trim().min(1, "Вкажіть короткий опис"),
  content: z.string().optional(),
  image: z.string().nullable().optional(),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;

export const eventFormDefaultValues: EventFormValues = {
  title: "",
  date: "",
  time: "",
  location: "",
  excerpt: "",
  content: "",
  image: null,
};

export function eventToFormValues(event: Event): EventFormValues {
  return {
    title: event.title,
    date: event.date,
    time: event.time ?? "",
    location: event.location ?? "",
    excerpt: event.excerpt,
    content: event.content ?? "",
    image: event.image ?? null,
  };
}
