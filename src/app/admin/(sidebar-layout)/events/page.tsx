import { getEvents } from "@/entities/events/api/queries";
import { AdminEventsPage } from "@/features/admin/events-page";

export default async function Page() {
  const events = await getEvents();
  return <AdminEventsPage events={events} />;
}
