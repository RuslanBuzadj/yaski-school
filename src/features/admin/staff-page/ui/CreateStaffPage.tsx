"use client";

import { useRouter } from "next/navigation";
import { routes } from "@/config/navigation";
import { staffFormDefaultValues } from "../model/schema";
import { StaffForm } from "./StaffForm";

export function CreateStaffPage() {
  const router = useRouter();

  return (
    <StaffForm
      mode="create"
      defaultValues={staffFormDefaultValues}
      onSubmit={() => {
        // TODO: implement once backend is ready
        router.push(routes.admin.staff);
      }}
    />
  );
}
