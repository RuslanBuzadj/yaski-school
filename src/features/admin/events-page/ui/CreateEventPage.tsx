"use client";

import { useRouter } from "next/navigation";
import { routes } from "@/config/navigation";
import { eventFormDefaultValues } from "../model/schema";
import { EventForm } from "./EventForm";

export function CreateEventPage() {
  const router = useRouter();

  return (
    <EventForm
      mode="create"
      defaultValues={eventFormDefaultValues}
      onSubmit={() => {
        // TODO: implement once backend is ready
        router.push(routes.admin.events);
      }}
    />
  );
}
