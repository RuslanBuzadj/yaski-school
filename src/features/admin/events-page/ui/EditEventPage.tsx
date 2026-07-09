"use client";

import { useRouter } from "next/navigation";
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
      onSubmit={() => {
        // TODO: implement once backend is ready
        router.push(routes.admin.events);
      }}
    />
  );
}
