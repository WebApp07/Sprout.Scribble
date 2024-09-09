import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Inavlid email address",
  }),
  password: z.string().min(1, {
    message: "Password is reqiured",
  }),
  code: z.optional(z.string()),
});
