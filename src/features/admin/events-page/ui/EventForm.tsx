"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Controller, type Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import { routes } from "@/config/navigation";
import { Button } from "@/shared/ui/button";
import { DatePicker } from "@/shared/ui/date-picker";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import {
  TimePicker,
  TimePickerContent,
  TimePickerHour,
  TimePickerInput,
  TimePickerInputGroup,
  TimePickerMinute,
  TimePickerPeriod,
  TimePickerSeparator,
  TimePickerTrigger,
} from "@/shared/ui/time-picker";
import { UploadImage } from "@/shared/ui/upload-image";
import type { UploadPhotoValue } from "@/shared/ui/upload-photo";
import { type EventFormValues, eventFormSchema } from "../model/schema";

const TextEditor = dynamic(() => import("@/shared/ui/text-editor"), { ssr: false });

type EventFormProps = {
  mode: "create" | "edit";
  defaultValues: EventFormValues;
  /** Existing image URL to preview in edit mode; omit/null for create. */
  defaultImageUrl?: string | null;
  /**
   * `photo` mirrors the create/update actions' contract: `undefined` = keep
   * the current image (edit only), `null` = no/removed image, `File` = a
   * newly picked one.
   */
  onSubmit: (
    values: EventFormValues,
    photo: File | null | undefined,
    sessionUploadedContentUrls: string[]
  ) => Promise<void>;
};

export function EventForm({ mode, defaultValues, defaultImageUrl, onSubmit }: EventFormProps) {
  const router = useRouter();
  const [photo, setPhoto] = useState<UploadPhotoValue>(
    defaultImageUrl ? { kind: "existing", url: defaultImageUrl } : { kind: "none" }
  );
  const uploadedContentUrlsRef = useRef<string[]>([]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventFormValues>({
    // @hookform/resolvers@5.4.0's zod v4 typings pin an internal core version
    // marker that predates zod@4.4.x, so the resolver mismatches structurally
    // at the type level only — cast around it; runtime behavior is unaffected.
    resolver: zodResolver(eventFormSchema as never) as unknown as Resolver<EventFormValues>,
    defaultValues,
  });

  async function handleFormSubmit(values: EventFormValues) {
    try {
      const resolvedPhoto = photo.kind === "new" ? photo.file : photo.kind === "existing" ? undefined : null;
      await onSubmit(values, resolvedPhoto, uploadedContentUrlsRef.current);
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
            {mode === "create" ? "Додати подію" : "Редагувати подію"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {mode === "create"
              ? "Заповніть дані нової події."
              : "Змініть дані події та збережіть зміни."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" onClick={() => router.push(routes.admin.events)}>
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
            <FieldLabel>Зображення</FieldLabel>
            <UploadImage value={photo} onValueChange={setPhoto} />
          </Field>

          <Field data-invalid={!!errors.title}>
            <FieldLabel htmlFor="title">Заголовок</FieldLabel>
            <Input id="title" {...register("title")} />
            <FieldError errors={[errors.title]} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field data-invalid={!!errors.date}>
              <FieldLabel htmlFor="date">Дата</FieldLabel>
              <Controller
                control={control}
                name="date"
                render={({ field }) => <DatePicker id="date" value={field.value} onValueChange={field.onChange} />}
              />
              <FieldError errors={[errors.date]} />
            </Field>

            <Field data-invalid={!!errors.time}>
              <FieldLabel htmlFor="time">Час</FieldLabel>
              <Controller
                control={control}
                name="time"
                render={({ field }) => (
                  <FieldContent>
                  <TimePicker id="time" value={field.value} onValueChange={field.onChange}>
                    <TimePickerInputGroup>
                      <TimePickerInput segment="hour" />
                      <TimePickerSeparator />
                      <TimePickerInput segment="minute" />
                      <TimePickerTrigger />
                    </TimePickerInputGroup>
                    <TimePickerContent>
                      <TimePickerHour />
                      <TimePickerMinute />
                      <TimePickerPeriod />
                    </TimePickerContent>
                  </TimePicker>
                  </FieldContent>
                )}
              />
              <FieldError errors={[errors.time]} />
            </Field>
          </div>

          <Field data-invalid={!!errors.location}>
            <FieldLabel htmlFor="location">Місце проведення</FieldLabel>
            <Input id="location" {...register("location")} />
            <FieldError errors={[errors.location]} />
          </Field>

          <Field data-invalid={!!errors.excerpt}>
            <FieldLabel htmlFor="excerpt">Короткий опис</FieldLabel>
            <Textarea id="excerpt" rows={3} {...register("excerpt")} />
            <FieldError errors={[errors.excerpt]} />
          </Field>

          <Field>
            <FieldLabel>Опис події</FieldLabel>
            <Controller
              control={control}
              name="content"
              render={({ field }) => (
                <TextEditor
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onImageUpload={(url) => uploadedContentUrlsRef.current.push(url)}
                />
              )}
            />
          </Field>
        </FieldGroup>
      </div>
    </form>
  );
}
