"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { type Resolver, useForm } from "react-hook-form";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { PasswordInput } from "@/shared/ui/password-input";
import { login } from "../model/actions";
import { type LoginFormValues, loginFormDefaultValues, loginFormSchema } from "../model/schema";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    // @hookform/resolvers@5.4.0's zod v4 typings pin an internal core version
    // marker that predates zod@4.4.x, so the resolver mismatches structurally
    // at the type level only — cast around it; runtime behavior is unaffected.
    resolver: zodResolver(loginFormSchema as never) as unknown as Resolver<LoginFormValues>,
    defaultValues: loginFormDefaultValues,
  });

  const onSubmit = (values: LoginFormValues) => {
    setServerError(null);
    startTransition(async () => {
      const result = await login(values);
      if (result?.error) {
        setServerError(result.error);
      }
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Увійти до адміністративної панелі</CardTitle>
          <CardDescription>
            Введіть свої облікові дані, щоб отримати доступ до адміністративної панелі.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Електронна пошта</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  autoComplete="email"
                  {...register("email")}
                />
                <FieldError errors={[errors.email]} />
              </Field>
              <Field data-invalid={!!errors.password}>
                <FieldLabel htmlFor="password">Пароль</FieldLabel>
                <PasswordInput id="password" autoComplete="current-password" {...register("password")} />
                <FieldError errors={[errors.password]} />
              </Field>
              {serverError && (
                <Field>
                  <FieldError>{serverError}</FieldError>
                </Field>
              )}
              <Field>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Вхід..." : "Увійти"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
