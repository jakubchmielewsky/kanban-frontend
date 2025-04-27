import { Subtask, SubtaskDto } from "./subtask";

export interface Task {
  _id: string;
  title: string;
  description: string;
  columnId: string;
  boardId: string;
  subtasks: Subtask[];
  order: number;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  columnId: string;
  subtasks?: SubtaskDto[];
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  columnId?: string;
  subtasks?: SubtaskDto[];
  order?: number;
}
