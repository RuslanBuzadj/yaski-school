"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createEvent } from "@/entities/events/api/actions";
import { routes } from "@/config/navigation";
import { eventFormDefaultValues } from "../model/schema";
import { EventForm } from "./EventForm";

export function CreateEventPage() {
  const router = useRouter();

  return (
    <EventForm
      mode="create"
      defaultValues={eventFormDefaultValues}
      onSubmit={async (values, photo, sessionUploadedContentUrls) => {
        const result = await createEvent(values, photo ?? null, sessionUploadedContentUrls);

        if ("error" in result) {
          toast.error(result.error);
          return;
        }

        toast.success("Подію додано");
        router.push(routes.admin.events);
      }}
    />
  );
}
