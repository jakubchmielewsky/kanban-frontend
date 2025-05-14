import { z } from "zod";

export const SubtaskSchema = z.object({
  _id: z.string(),
  title: z.string().min(1, "Subtask title is required"),
  isCompleted: z.boolean().default(false),
});

export const EditTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().default(""),
  subtasks: z.array(SubtaskSchema).optional().default([]),
});

export type EditTaskInput = z.infer<typeof EditTaskSchema>;
