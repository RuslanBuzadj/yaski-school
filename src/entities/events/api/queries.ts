import "server-only";
import { format } from "date-fns";
import type { Event as PrismaEvent } from "@/generated/prisma/client";
import { prisma } from "@/shared/lib/prisma";
import type { Event } from "../model/types";

const DATE_FORMAT = "dd.MM.yyyy";

function toEvent(row: PrismaEvent): Event {
  return {
    id: row.id,
    date: format(row.date, DATE_FORMAT),
    time: row.time ?? undefined,
    location: row.location ?? undefined,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content ?? undefined,
    image: row.image,
  };
}

export async function getEvents(): Promise<Event[]> {
  const rows = await prisma.event.findMany({ orderBy: { date: "asc" } });
  return rows.map(toEvent);
}

export async function getEvent(id: number): Promise<Event | null> {
  const row = await prisma.event.findUnique({ where: { id } });
  return row ? toEvent(row) : null;
}
