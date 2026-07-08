import { notFound } from "next/navigation";
import { EditStaffPage } from "@/features/admin/staff-page";
import { mockStaff } from "@/entities/staff";
import { findById } from "@/shared/lib/utils";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const member = findById(mockStaff, id);

  if (!member) {
    notFound();
  }

  return <EditStaffPage member={member} />;
}
