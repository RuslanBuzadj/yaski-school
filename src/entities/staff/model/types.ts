export type StaffGroup = "administration" | "staff";

export type StaffMember = {
  id: number;
  name: string;
  role: string;
  group: StaffGroup;
  image?: string | null;
  category?: string;
  education?: string;
  experience?: string;
  subjects?: string[];
  bio?: string;
};
