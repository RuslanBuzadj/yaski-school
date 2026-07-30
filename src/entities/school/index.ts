export { schoolContacts, antiCorruptionNotice } from "./model/contacts";
export { aboutSections } from "./model/about-sections";
export type { AboutSection, AboutSectionInput } from "./model/about-sections";

// `api/queries.ts` and `api/actions.ts` are intentionally NOT re-exported
// here: they pull in Prisma (Node-only), and this barrel is also imported
// by client components. Import server-only code directly:
// `@/entities/school/api/queries` / `@/entities/school/api/actions`.
