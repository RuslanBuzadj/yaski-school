export type StaffMember = {
  id: number;
  name: string;
  role: string;
  image?: string | null;
  category?: string;
  education?: string;
  experience?: string;
  subjects?: string[];
  bio?: string;
};
