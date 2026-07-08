"use client";

import { useRouter } from "next/navigation";
import type { StaffMember } from "@/entities/staff";
import { routes } from "@/config/navigation";
import { staffMemberToFormValues } from "../model/schema";
import { StaffForm } from "./StaffForm";

type EditStaffPageProps = {
  member: StaffMember;
};

export function EditStaffPage({ member }: EditStaffPageProps) {
  const router = useRouter();

  return (
    <StaffForm
      mode="edit"
      defaultValues={staffMemberToFormValues(member)}
      onSubmit={() => {
        // TODO: implement once backend is ready
        router.push(routes.admin.staff);
      }}
    />
  );
}
