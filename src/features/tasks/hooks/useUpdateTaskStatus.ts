import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskStatus } from "../api";

interface UpdateTaskStatusArgs {
  taskId: string;
  targetColumnId: string;
  sourceColumnId: string;
}

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, targetColumnId }: UpdateTaskStatusArgs) =>
      updateTaskStatus(taskId, targetColumnId),

    onSuccess: (_updatedTask, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.sourceColumnId],
      });
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.targetColumnId],
      });
    },
  });
};
