"use client";

import { useRouter } from "next/navigation";
import type { News } from "@/entities/news";
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
      onSubmit={() => {
        // TODO: implement once backend is ready
        router.push(routes.admin.news);
      }}
    />
  );
}
