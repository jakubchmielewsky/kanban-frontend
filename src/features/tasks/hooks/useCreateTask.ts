import { useMutation } from "@tanstack/react-query";
import { createTask } from "../api";
import { CreateTaskDto } from "../../../shared/types/task";

export interface CreateTaskMutation {
  task: CreateTaskDto;
}

export const useCreateTask = (boardId: string) => {
  return useMutation({
    mutationFn: ({ task }: CreateTaskMutation) => createTask(boardId, task),
  });
};
