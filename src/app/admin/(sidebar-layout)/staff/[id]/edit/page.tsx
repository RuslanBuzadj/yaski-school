import { notFound } from "next/navigation";
import { EditStaffPage } from "@/features/admin/staff-page";
import { getStaffMember } from "@/entities/staff/api/queries";
import { parseId } from "@/shared/lib/utils";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const numericId = parseId(id);
  const member = numericId !== null ? await getStaffMember(numericId) : null;

  if (!member) {
    notFound();
  }

  return <EditStaffPage member={member} />;
}
