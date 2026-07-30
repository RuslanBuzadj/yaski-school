import { getStaffMembers } from "@/entities/staff/api/queries";
import { StaffPage } from "@/features/staff-page";
import { Suspense } from "react";

export default async function Page() {
  const staff = await getStaffMembers();
  return <StaffPage staff={staff} />;
}
