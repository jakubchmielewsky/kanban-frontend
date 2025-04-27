import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api";
import { CreateTaskDto } from "../../../shared/types/task";

export interface CreateTaskMutation {
  task: CreateTaskDto;
}

export const useCreateTask = (boardId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ task }: CreateTaskMutation) => createTask(boardId, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", boardId] });
    },
  });
};
