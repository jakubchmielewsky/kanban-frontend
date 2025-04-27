import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../api";

export interface DeleteTaskMutation {
  taskId: string;
}

export const useDeleteTask = (boardId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId }: DeleteTaskMutation) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", boardId] });
    },
  });
};
