"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createNews } from "@/entities/news/api/actions";
import { routes } from "@/config/navigation";
import { newsFormDefaultValues } from "../model/schema";
import { NewsForm } from "./NewsForm";

export function CreateNewsPage() {
  const router = useRouter();

  return (
    <NewsForm
      mode="create"
      defaultValues={newsFormDefaultValues}
      onSubmit={async (values, photo, sessionUploadedContentUrls) => {
        const result = await createNews(values, photo ?? null, sessionUploadedContentUrls);

        if ("error" in result) {
          toast.error(result.error);
          return;
        }

        toast.success("Новину додано");
        router.push(routes.admin.news);
      }}
    />
  );
}
