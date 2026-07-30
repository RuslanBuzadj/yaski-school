export type Event = {
  id: number;
  date: string;
  time?: string;
  location?: string;
  title: string;
  excerpt: string;
  /** Rich-text HTML produced by the admin `TextEditor`; render with the `ck-content` class. */
  content?: string;
  image?: string | null;
};

/**
 * Plain structural contract accepted by the create/update Server Actions.
 * Lives here (not re-exported from `features/admin/events-page`) so the
 * `entities` layer never imports from `features`, per the FSD layer rule —
 * the feature's zod-inferred `EventFormValues` already satisfies this shape.
 * `date` is the same `dd.MM.yyyy` string the `DatePicker` produces.
 */
export type EventInput = {
  title: string;
  date: string;
  time?: string;
  location?: string;
  excerpt: string;
  content?: string;
};
