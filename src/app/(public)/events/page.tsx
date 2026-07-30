import { getEvents } from "@/entities/events/api/queries";
import { EventsPage } from "@/features/events-page";

export default async function Page() {
  const events = await getEvents();
  return <EventsPage events={events} />;
}
