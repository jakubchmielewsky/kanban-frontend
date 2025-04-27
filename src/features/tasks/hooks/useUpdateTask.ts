import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../api";
import { UpdateTaskDto } from "../../../shared/types/task";

export interface UpdateTaskMutation {
  taskId: string;
  updates: UpdateTaskDto;
}

export const useUpdateTask = (boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, updates }: UpdateTaskMutation) =>
      updateTask(taskId, updates),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", boardId],
      });
    },
  });
};
