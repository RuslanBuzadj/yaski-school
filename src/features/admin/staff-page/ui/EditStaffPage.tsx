"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateStaffMember } from "@/entities/staff/api/actions";
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
      defaultImageUrl={member.image}
      onSubmit={async (values, photo) => {
        const result = await updateStaffMember(member.id, values, photo);

        if ("error" in result) {
          toast.error(result.error);
          return;
        }

        toast.success("Зміни збережено");
        router.push(routes.admin.staff);
      }}
    />
  );
}
