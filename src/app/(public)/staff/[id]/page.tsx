import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStaffMember } from "@/entities/staff/api/queries";
import { StaffProfilePage } from "@/features/staff-profile-page";
import { parseId } from "@/shared/lib/utils";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const numericId = parseId(id);
  const member = numericId !== null ? await getStaffMember(numericId) : null;

  return { title: member ? member.name : "Колектив" };
}

export default async function StaffMemberPage({ params }: Props) {
  const { id } = await params;
  const numericId = parseId(id);
  const member = numericId !== null ? await getStaffMember(numericId) : null;

  if (!member) {
    notFound();
  }

  return <StaffProfilePage member={member} />;
}
