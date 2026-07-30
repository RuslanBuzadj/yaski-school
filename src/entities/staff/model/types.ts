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

/**
 * Plain structural contract accepted by the create/update Server Actions.
 * Lives here (not re-exported from `features/admin/staff-page`) so the
 * `entities` layer never imports from `features`, per the FSD layer rule —
 * the feature's zod-inferred `StaffFormValues` already satisfies this shape.
 */
export type StaffInput = {
  name: string;
  role: string;
  group: StaffGroup;
  category?: string;
  education?: string;
  experience?: string;
  subjects: string[];
  bio?: string;
};
