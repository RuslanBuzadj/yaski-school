"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Controller, type Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import { routes } from "@/config/navigation";
import { staffGroupOptions } from "@/entities/staff";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputList } from "@/shared/ui/tags-input";
import { UploadPhoto, type UploadPhotoValue } from "@/shared/ui/upload-photo";
import { type StaffFormValues, staffFormSchema } from "../model/schema";

const TextEditor = dynamic(() => import("@/shared/ui/text-editor"), { ssr: false });

type StaffFormProps = {
  mode: "create" | "edit";
  defaultValues: StaffFormValues;
  /** Existing photo URL to preview in edit mode; omit/null for create. */
  defaultImageUrl?: string | null;
  /**
   * `photo` mirrors the create/update actions' contract: `undefined` = keep
   * the current photo (edit only), `null` = no/removed photo, `File` = a
   * newly picked one.
   */
  onSubmit: (
    values: StaffFormValues,
    photo: File | null | undefined,
    sessionUploadedBioUrls: string[]
  ) => Promise<void>;
};

export function StaffForm({ mode, defaultValues, defaultImageUrl, onSubmit }: StaffFormProps) {
  const router = useRouter();
  const [photo, setPhoto] = useState<UploadPhotoValue>(
    defaultImageUrl ? { kind: "existing", url: defaultImageUrl } : { kind: "none" },
  );
  const uploadedBioUrlsRef = useRef<string[]>([]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StaffFormValues>({
    // @hookform/resolvers@5.4.0's zod v4 typings pin an internal core version
    // marker that predates zod@4.4.x, so the resolver mismatches structurally
    // at the type level only — cast around it; runtime behavior is unaffected.
    resolver: zodResolver(staffFormSchema as never) as unknown as Resolver<StaffFormValues>,
    defaultValues,
  });

  async function handleFormSubmit(values: StaffFormValues) {
    try {
      const resolvedPhoto = photo.kind === "new" ? photo.file : photo.kind === "existing" ? undefined : null;
      await onSubmit(values, resolvedPhoto, uploadedBioUrlsRef.current);
    } catch {
      toast.error("Не вдалося зберегти дані. Спробуйте ще раз.");
    }
  }

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(handleFormSubmit)(event);
      }}
      className="flex min-h-0 flex-1 flex-col gap-4"
    >
      <div className="flex shrink-0 items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-foreground">
            {mode === "create" ? "Додати співробітника" : "Редагувати співробітника"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {mode === "create"
              ? "Заповніть дані нового співробітника."
              : "Змініть дані співробітника та збережіть зміни."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" onClick={() => router.push(routes.admin.staff)}>
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
            <FieldLabel>Фото</FieldLabel>
            <UploadPhoto value={photo} onValueChange={setPhoto} />
          </Field>

          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="name">ПІБ</FieldLabel>
            <Input id="name" {...register("name")} />
            <FieldError errors={[errors.name]} />
          </Field>

          <Field data-invalid={!!errors.role}>
            <FieldLabel htmlFor="role">Посада</FieldLabel>
            <Input id="role" {...register("role")} />
            <FieldError errors={[errors.role]} />
          </Field>

          <Field>
            <FieldLabel>Група</FieldLabel>
            <Controller
              control={control}
              name="group"
              render={({ field }) => (
                <div className="flex gap-1.5">
                  {staffGroupOptions.map((option) => (
                    <label
                      key={option.value}
                      className={cn(
                        "flex flex-1 cursor-pointer items-center gap-2 rounded-lg border border-input px-2.5 py-1.5 text-sm transition-colors",
                        "has-data-[state=checked]:border-primary/40 has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:text-primary"
                      )}
                    >
                      <Checkbox
                        checked={field.value === option.value}
                        onCheckedChange={(checked) => {
                          if (checked) field.onChange(option.value);
                        }}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              )}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="category">Кваліфікаційна категорія</FieldLabel>
            <Input id="category" {...register("category")} />
          </Field>

          <Field>
            <FieldLabel htmlFor="education">Освіта</FieldLabel>
            <Input id="education" {...register("education")} />
          </Field>

          <Field>
            <FieldLabel htmlFor="experience">Педагогічний стаж</FieldLabel>
            <Input id="experience" {...register("experience")} />
          </Field>

          <Field>
            <FieldLabel htmlFor="subjects">Предмети</FieldLabel>
            <Controller
              control={control}
              name="subjects"
              render={({ field }) => (
                <TagsInput id="subjects" value={field.value} onValueChange={field.onChange} className="w-full">
                  <TagsInputList>
                    {field.value.map((subject) => (
                      <TagsInputItem key={subject} value={subject}>
                        {subject}
                      </TagsInputItem>
                    ))}
                    <TagsInputInput placeholder="Додайте предмет…" />
                  </TagsInputList>
                </TagsInput>
              )}
            />
          </Field>

          <Field>
            <FieldLabel>Біографія</FieldLabel>
            <Controller
              control={control}
              name="bio"
              render={({ field }) => (
                <TextEditor
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onImageUpload={(url) => uploadedBioUrlsRef.current.push(url)}
                />
              )}
            />
          </Field>
        </FieldGroup>
      </div>
    </form>
  );
}
