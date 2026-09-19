import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name")
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Please enter email")
    .email("Invalid email address"),

  password: z
    .string()
    .min(1, "Please enter password")
    .min(6, "Password must be at least 6 characters"),
  phone: z.string().trim().min(7, "Phone number is required"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
