export type News = {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  /** Rich-text HTML produced by the admin `TextEditor`; render with the `ck-content` class. */
  content?: string;
  image?: string | null;
};
