export { EventCard } from "./ui/EventCard";
export { EventArticle } from "./ui/EventArticle";
export { mockEvents } from "./model/mock";
export type { Event, EventInput } from "./model/types";

// `api/queries.ts` and `api/actions.ts` are intentionally NOT re-exported
// here: they pull in Prisma (Node-only), and this barrel is also imported
// by client components. Import server-only code directly:
// `@/entities/events/api/queries` / `@/entities/events/api/actions`.
