export type News = {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  content?: string[];
  image?: string | null;
};
