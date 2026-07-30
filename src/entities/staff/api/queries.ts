import "server-only";
import type { StaffMember as PrismaStaffMember } from "@/generated/prisma/client";
import { prisma } from "@/shared/lib/prisma";
import type { StaffMember } from "../model/types";

function toStaffMember(row: PrismaStaffMember): StaffMember {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    group: row.group,
    image: row.image,
    category: row.category ?? undefined,
    education: row.education ?? undefined,
    experience: row.experience ?? undefined,
    subjects: row.subjects,
    bio: row.bio ?? undefined,
  };
}

export async function getStaffMembers(): Promise<StaffMember[]> {
  const rows = await prisma.staffMember.findMany({ orderBy: { id: "asc" } });
  return rows.map(toStaffMember);
}

export async function getStaffMember(id: number): Promise<StaffMember | null> {
  const row = await prisma.staffMember.findUnique({ where: { id } });
  return row ? toStaffMember(row) : null;
}
