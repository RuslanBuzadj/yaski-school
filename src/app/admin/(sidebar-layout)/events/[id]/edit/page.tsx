import { notFound } from "next/navigation";
import { EditEventPage } from "@/features/admin/events-page";
import { mockEvents } from "@/entities/events";
import { findById } from "@/shared/lib/utils";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const event = findById(mockEvents, id);

  if (!event) {
    notFound();
  }

  return <EditEventPage event={event} />;
}
