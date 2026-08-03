"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateSiteSettings } from "@/entities/school/api/actions";
import { Button } from "@/shared/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { type SiteSettingsFormValues, siteSettingsFormSchema } from "../model/schema";

type SiteSettingsFormProps = {
  defaultValues: SiteSettingsFormValues;
};

export function SiteSettingsForm({ defaultValues }: SiteSettingsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SiteSettingsFormValues>({
    // @hookform/resolvers@5.4.0's zod v4 typings pin an internal core version
    // marker that predates zod@4.4.x, so the resolver mismatches structurally
    // at the type level only — cast around it; runtime behavior is unaffected.
    resolver: zodResolver(siteSettingsFormSchema as never) as unknown as Resolver<SiteSettingsFormValues>,
    defaultValues,
  });

  async function handleFormSubmit(values: SiteSettingsFormValues) {
    const result = await updateSiteSettings(values);

    if ("error" in result) {
      toast.error(result.error);
      return;
    }

    toast.success("Зміни збережено");
  }

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(handleFormSubmit)(event);
      }}
      className="flex flex-col gap-4"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Загальні налаштування сайту</h2>
          <p className="text-sm text-muted-foreground">
            Назва та опис показуються на головній сторінці й у футері; контакти — у футері та на
            сторінці «Контакти». Адреса закладу не редагується тут.
          </p>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          Зберегти
        </Button>
      </div>

      <FieldGroup className="max-w-2xl">
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">Назва закладу</FieldLabel>
          <Input id="name" {...register("name")} />
          <FieldError errors={[errors.name]} />
        </Field>

        <Field data-invalid={!!errors.description}>
          <FieldLabel htmlFor="description">Опис (головна сторінка)</FieldLabel>
          <Textarea id="description" rows={4} {...register("description")} />
          <FieldError errors={[errors.description]} />
        </Field>

        <Field data-invalid={!!errors.phone}>
          <FieldLabel htmlFor="phone">Телефон</FieldLabel>
          <Input id="phone" {...register("phone")} />
          <FieldError errors={[errors.phone]} />
        </Field>

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Електронна пошта</FieldLabel>
          <Input id="email" type="email" {...register("email")} />
          <FieldError errors={[errors.email]} />
        </Field>

        <Field data-invalid={!!errors.director}>
          <FieldLabel htmlFor="director">Директор</FieldLabel>
          <Input id="director" {...register("director")} />
          <FieldError errors={[errors.director]} />
        </Field>
      </FieldGroup>
    </form>
  );
}
