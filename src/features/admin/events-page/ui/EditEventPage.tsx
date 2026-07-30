"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateEvent } from "@/entities/events/api/actions";
import type { Event } from "@/entities/events";
import { routes } from "@/config/navigation";
import { eventToFormValues } from "../model/schema";
import { EventForm } from "./EventForm";

type EditEventPageProps = {
  event: Event;
};

export function EditEventPage({ event }: EditEventPageProps) {
  const router = useRouter();

  return (
    <EventForm
      mode="edit"
      defaultValues={eventToFormValues(event)}
      defaultImageUrl={event.image}
      onSubmit={async (values, photo, sessionUploadedContentUrls) => {
        const result = await updateEvent(event.id, values, photo, sessionUploadedContentUrls);

        if ("error" in result) {
          toast.error(result.error);
          return;
        }

        toast.success("Зміни збережено");
        router.push(routes.admin.events);
      }}
    />
  );
}
