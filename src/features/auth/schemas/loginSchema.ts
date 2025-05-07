import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Incorrect email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
