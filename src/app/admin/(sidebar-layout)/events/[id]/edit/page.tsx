import { notFound } from "next/navigation";
import { EditEventPage } from "@/features/admin/events-page";
import { getEvent } from "@/entities/events/api/queries";
import { parseId } from "@/shared/lib/utils";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const numericId = parseId(id);
  const event = numericId !== null ? await getEvent(numericId) : null;

  if (!event) {
    notFound();
  }

  return <EditEventPage event={event} />;
}
