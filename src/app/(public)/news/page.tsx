import { getNewsList } from "@/entities/news/api/queries";
import { NewsPage } from "@/features/news-page";

export default async function Page() {
  const news = await getNewsList();
  return <NewsPage news={news} />;
}
