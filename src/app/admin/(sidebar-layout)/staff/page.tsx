import { getStaffMembers } from "@/entities/staff/api/queries";
import { AdminStaffPage } from "@/features/admin/staff-page";

export default async function Page() {
  const staff = await getStaffMembers();
  return <AdminStaffPage staff={staff} />;
}
