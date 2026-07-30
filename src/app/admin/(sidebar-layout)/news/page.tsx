import { getNewsList } from "@/entities/news/api/queries";
import { AdminNewsPage } from "@/features/admin/news-page";

export default async function Page() {
  const news = await getNewsList();
  return <AdminNewsPage news={news} />;
}
