import { string, z } from "zod";

export const createBoardSchema = z.object({
  boardName: string().min(1, "Board name is required"),
});
