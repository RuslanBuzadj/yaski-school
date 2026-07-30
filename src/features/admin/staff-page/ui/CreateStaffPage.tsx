"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createStaffMember } from "@/entities/staff/api/actions";
import { routes } from "@/config/navigation";
import { staffFormDefaultValues } from "../model/schema";
import { StaffForm } from "./StaffForm";

export function CreateStaffPage() {
  const router = useRouter();

  return (
    <StaffForm
      mode="create"
      defaultValues={staffFormDefaultValues}
      onSubmit={async (values, photo, sessionUploadedBioUrls) => {
        const result = await createStaffMember(values, photo ?? null, sessionUploadedBioUrls);

        if ("error" in result) {
          toast.error(result.error);
          return;
        }

        toast.success("Співробітника додано");
        router.push(routes.admin.staff);
      }}
    />
  );
}
