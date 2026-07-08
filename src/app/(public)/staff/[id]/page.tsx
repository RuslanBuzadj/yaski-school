import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mockStaff } from "@/entities/staff";
import { StaffProfilePage } from "@/features/staff-profile-page";
import { findById, toIdParams } from "@/shared/lib/utils";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return toIdParams(mockStaff);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const member = findById(mockStaff, id);

  return { title: member ? member.name : "Колектив" };
}

export default async function StaffMemberPage({ params }: Props) {
  const { id } = await params;
  const member = findById(mockStaff, id);

  if (!member) {
    notFound();
  }

  return <StaffProfilePage member={member} />;
}
