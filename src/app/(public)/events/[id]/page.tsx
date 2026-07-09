import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mockEvents } from "@/entities/events";
import { EventArticlePage } from "@/features/event-article-page";
import { findById, toIdParams } from "@/shared/lib/utils";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return toIdParams(mockEvents);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = findById(mockEvents, id);

  return { title: event ? event.title : "Події" };
}

export default async function EventItemPage({ params }: Props) {
  const { id } = await params;
  const event = findById(mockEvents, id);

  if (!event) {
    notFound();
  }

  return <EventArticlePage event={event} />;
}
