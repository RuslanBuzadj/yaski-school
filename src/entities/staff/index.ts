export { StaffCard } from "./ui/StaffCard";
export { StaffProfile } from "./ui/StaffProfile";
export { staffGroupLabels, staffGroupOptions } from "./model/constants";
export { mockStaff } from "./model/mock";
export type { StaffMember, StaffGroup, StaffInput } from "./model/types";

// `api/queries.ts` and `api/actions.ts` are intentionally NOT re-exported
// here: they pull in Prisma (Node-only), and this barrel is also imported
// by client components (e.g. StaffForm, via `staffGroupOptions`). Bundling
// both in one module graph breaks the client build — same reason
// `features/admin/login-page`'s `model/actions.ts` is imported by direct
// path rather than through that feature's barrel. Import server-only code
// directly: `@/entities/staff/api/queries` / `@/entities/staff/api/actions`.
