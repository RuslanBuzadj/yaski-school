import type { StaffGroup } from "./types";

export const staffGroupLabels: Record<StaffGroup, string> = {
  administration: "Адміністрація",
  staff: "Персонал",
};

export const staffGroupOptions: { value: StaffGroup; label: string }[] = (
  Object.entries(staffGroupLabels) as [StaffGroup, string][]
).map(([value, label]) => ({ value, label }));
