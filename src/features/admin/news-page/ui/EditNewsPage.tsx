"use client";

import { useRouter } from "next/navigation";
import { updateNews } from "@/entities/news/api/actions";
import type { News } from "@/entities/news";
import { toast } from "sonner";
import { routes } from "@/config/navigation";
import { newsToFormValues } from "../model/schema";
import { NewsForm } from "./NewsForm";

type EditNewsPageProps = {
  news: News;
};

export function EditNewsPage({ news }: EditNewsPageProps) {
  const router = useRouter();

  return (
    <NewsForm
      mode="edit"
      defaultValues={newsToFormValues(news)}
      defaultImageUrl={news.image}
      onSubmit={async (values, photo, sessionUploadedContentUrls) => {
        const result = await updateNews(news.id, values, photo, sessionUploadedContentUrls);

        if ("error" in result) {
          toast.error(result.error);
          return;
        }

        toast.success("Зміни збережено");
        router.push(routes.admin.news);
      }}
    />
  );
}
