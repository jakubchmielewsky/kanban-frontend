import { string, z } from "zod";

export const CreateColumnSchema = z.object({
  columnName: string().min(1, "Column name is required"),
});
