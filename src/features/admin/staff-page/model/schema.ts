import { z } from "zod";
import type { StaffMember } from "@/entities/staff";

export const staffFormSchema = z.object({
  name: z.string().trim().min(1, "Вкажіть ПІБ"),
  role: z.string().trim().min(1, "Вкажіть посаду"),
  group: z.enum(["administration", "staff"]),
  category: z.string().trim().optional(),
  education: z.string().trim().optional(),
  experience: z.string().trim().optional(),
  subjects: z.array(z.string()),
  bio: z.string().optional(),
  image: z.string().nullable().optional(),
});

export type StaffFormValues = z.infer<typeof staffFormSchema>;

export const staffFormDefaultValues: StaffFormValues = {
  name: "",
  role: "",
  group: "staff",
  category: "",
  education: "",
  experience: "",
  subjects: [],
  bio: "",
  image: null,
};

export function staffMemberToFormValues(member: StaffMember): StaffFormValues {
  return {
    name: member.name,
    role: member.role,
    group: member.group,
    category: member.category ?? "",
    education: member.education ?? "",
    experience: member.experience ?? "",
    subjects: member.subjects ?? [],
    bio: member.bio ?? "",
    image: member.image ?? null,
  };
}
