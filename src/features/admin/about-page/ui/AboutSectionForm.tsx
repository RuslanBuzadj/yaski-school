"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Controller, type Resolver, useForm } from "react-hook-form";
import { routes } from "@/config/navigation";
import { slugify } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { type AboutSectionFormValues, aboutSectionFormSchema } from "../model/schema";

const TextEditor = dynamic(() => import("@/shared/ui/text-editor"), { ssr: false });

type AboutSectionFormProps = {
  mode: "create" | "edit";
  defaultValues: AboutSectionFormValues;
  onSubmit: (values: AboutSectionFormValues) => void;
};

export function AboutSectionForm({ mode, defaultValues, onSubmit }: AboutSectionFormProps) {
  const router = useRouter();
  const slugTouchedRef = useRef(mode === "edit");

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AboutSectionFormValues>({
    // @hookform/resolvers@5.4.0's zod v4 typings pin an internal core version
    // marker that predates zod@4.4.x, so the resolver mismatches structurally
    // at the type level only — cast around it; runtime behavior is unaffected.
    resolver: zodResolver(aboutSectionFormSchema as never) as unknown as Resolver<AboutSectionFormValues>,
    defaultValues,
  });

  const titleField = register("title");
  const slugField = register("slug");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex min-h-0 flex-1 flex-col gap-4">
      <div className="flex shrink-0 items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-foreground">
            {mode === "create" ? "Додати розділ" : "Редагувати розділ"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {mode === "create"
              ? "Заповніть дані нового розділу сторінки «Про заклад»."
              : "Змініть дані розділу та збережіть зміни."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" onClick={() => router.push(routes.admin.about)}>
            Скасувати
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {mode === "create" ? "Додати" : "Зберегти"}
          </Button>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <FieldGroup className="max-w-2xl">
          <Field data-invalid={!!errors.title}>
            <FieldLabel htmlFor="title">Назва розділу</FieldLabel>
            <Input
              id="title"
              {...titleField}
              onChange={(event) => {
                titleField.onChange(event);
                if (!slugTouchedRef.current) {
                  setValue("slug", slugify(event.target.value), { shouldValidate: true });
                }
              }}
            />
            <FieldError errors={[errors.title]} />
          </Field>

          <Field data-invalid={!!errors.slug}>
            <FieldLabel htmlFor="slug">Слаг (частина адреси сторінки)</FieldLabel>
            <Input
              id="slug"
              {...slugField}
              onChange={(event) => {
                slugTouchedRef.current = true;
                slugField.onChange(event);
              }}
            />
            <FieldError errors={[errors.slug]} />
          </Field>

          <Field>
            <FieldLabel>Зміст розділу</FieldLabel>
            <Controller
              control={control}
              name="content"
              render={({ field }) => <TextEditor value={field.value ?? ""} onChange={field.onChange} />}
            />
          </Field>
        </FieldGroup>
      </div>
    </form>
  );
}
