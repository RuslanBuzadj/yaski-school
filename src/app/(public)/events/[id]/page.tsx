import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEvent } from "@/entities/events/api/queries";
import { EventArticlePage } from "@/features/event-article-page";
import { parseId } from "@/shared/lib/utils";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const numericId = parseId(id);
  const event = numericId !== null ? await getEvent(numericId) : null;

  return { title: event ? event.title : "Події" };
}

export default async function EventItemPage({ params }: Props) {
  const { id } = await params;
  const numericId = parseId(id);
  const event = numericId !== null ? await getEvent(numericId) : null;

  if (!event) {
    notFound();
  }

  return <EventArticlePage event={event} />;
}
