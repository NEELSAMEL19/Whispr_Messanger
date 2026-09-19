import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Please enter email").email("Invalid email address"),

  password: z.string().min(1, "Please enter password"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
