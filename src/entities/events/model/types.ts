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
