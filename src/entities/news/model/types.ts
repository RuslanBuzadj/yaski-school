export type News = {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  /** Rich-text HTML produced by the admin `TextEditor`; render with the `ck-content` class. */
  content?: string;
  image?: string | null;
};

/**
 * Plain structural contract accepted by the create/update Server Actions.
 * Lives here (not re-exported from `features/admin/news-page`) so the
 * `entities` layer never imports from `features`, per the FSD layer rule —
 * the feature's zod-inferred `NewsFormValues` already satisfies this shape.
 */
export type NewsInput = {
  title: string;
  excerpt: string;
  content?: string;
};
