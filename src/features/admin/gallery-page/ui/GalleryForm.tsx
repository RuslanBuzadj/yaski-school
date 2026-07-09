"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type Resolver, useFieldArray, useForm } from "react-hook-form";
import { routes } from "@/config/navigation";
import { Button } from "@/shared/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { ImagePlaceholder } from "@/shared/ui/image-placeholder";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { UploadGallery } from "@/shared/ui/upload-gallery";
import { UploadImage } from "@/shared/ui/upload-image";
import { type GalleryFormValues, galleryFormSchema } from "../model/schema";

type GalleryFormProps = {
  mode: "create" | "edit";
  defaultValues: GalleryFormValues;
  onSubmit: (values: GalleryFormValues) => void;
};

export function GalleryForm({ mode, defaultValues, onSubmit }: GalleryFormProps) {
  const router = useRouter();
  const [coverFiles, setCoverFiles] = useState<File[]>([]);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GalleryFormValues>({
    // @hookform/resolvers@5.4.0's zod v4 typings pin an internal core version
    // marker that predates zod@4.4.x, so the resolver mismatches structurally
    // at the type level only — cast around it; runtime behavior is unaffected.
    resolver: zodResolver(galleryFormSchema as never) as unknown as Resolver<GalleryFormValues>,
    defaultValues,
  });

  const { fields, remove } = useFieldArray({ control, name: "images" });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex min-h-0 flex-1 flex-col gap-4">
      <div className="flex shrink-0 items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-foreground">
            {mode === "create" ? "Додати альбом" : "Редагувати альбом"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {mode === "create"
              ? "Заповніть дані нового фотоальбому."
              : "Змініть дані альбому та збережіть зміни."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" onClick={() => router.push(routes.admin.gallery)}>
            Скасувати
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {mode === "create" ? "Додати" : "Зберегти"}
          </Button>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <FieldGroup className="max-w-2xl">
          <Field>
            <FieldLabel>Обкладинка</FieldLabel>
            <UploadImage value={coverFiles} onValueChange={setCoverFiles} />
          </Field>

          <Field data-invalid={!!errors.title}>
            <FieldLabel htmlFor="title">Назва</FieldLabel>
            <Input id="title" {...register("title")} />
            <FieldError errors={[errors.title]} />
          </Field>

          <Field data-invalid={!!errors.description}>
            <FieldLabel htmlFor="description">Опис</FieldLabel>
            <Textarea id="description" rows={4} {...register("description")} />
            <FieldError errors={[errors.description]} />
          </Field>

          {fields.length > 0 && (
            <Field>
              <FieldLabel>Фото альбому</FieldLabel>
              <div className="flex flex-col gap-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-3 rounded-lg border p-2">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-muted">
                      <ImagePlaceholder src={field.src ?? null} alt={field.caption || "Фото"} fill />
                    </div>
                    <Input
                      placeholder="Підпис до фото"
                      className="flex-1"
                      {...register(`images.${index}.caption` as const)}
                    />
                    <Button type="button" variant="ghost" size="icon-sm" onClick={() => remove(index)}>
                      <Trash2 />
                      <span className="sr-only">Видалити фото</span>
                    </Button>
                  </div>
                ))}
              </div>
            </Field>
          )}

          <Field>
            <FieldLabel>Додати нові фото</FieldLabel>
            <UploadGallery value={newImageFiles} onValueChange={setNewImageFiles} />
          </Field>
        </FieldGroup>
      </div>
    </form>
  );
}
