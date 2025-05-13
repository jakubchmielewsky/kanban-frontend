import { z } from "zod";

export const manageMembersSchema = z.object({
  newMemberEmail: z
    .string()
    .min(1, "Email is required")
    .email("Incorrect email"),
});
