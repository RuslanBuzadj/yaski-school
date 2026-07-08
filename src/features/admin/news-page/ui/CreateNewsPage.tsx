"use client";

import { useRouter } from "next/navigation";
import { routes } from "@/config/navigation";
import { newsFormDefaultValues } from "../model/schema";
import { NewsForm } from "./NewsForm";

export function CreateNewsPage() {
  const router = useRouter();

  return (
    <NewsForm
      mode="create"
      defaultValues={newsFormDefaultValues}
      onSubmit={() => {
        // TODO: implement once backend is ready
        router.push(routes.admin.news);
      }}
    />
  );
}
