import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mockStaff } from "@/entities/staff";
import { StaffProfilePage } from "@/features/staff-profile-page";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return mockStaff.map((member) => ({ id: String(member.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const member = mockStaff.find((item) => String(item.id) === id);

  return { title: member ? member.name : "Колектив" };
}

export default async function StaffMemberPage({ params }: Props) {
  const { id } = await params;
  const member = mockStaff.find((item) => String(item.id) === id);

  if (!member) {
    notFound();
  }

  return <StaffProfilePage member={member} />;
}
