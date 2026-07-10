import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().trim().min(1, "Вкажіть електронну пошту").email("Введіть коректну електронну пошту"),
  password: z.string().min(1, "Вкажіть пароль"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const loginFormDefaultValues: LoginFormValues = {
  email: "",
  password: "",
};
