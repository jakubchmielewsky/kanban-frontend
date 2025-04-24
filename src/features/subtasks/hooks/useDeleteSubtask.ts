import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSubtask } from "../api";

interface SubtaskDeletePayload {
  subtaskId: string;
  taskId: string;
}

export const useDeleteSubtask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SubtaskDeletePayload) => deleteSubtask(data.subtaskId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["subtasks", variables.taskId],
      });
    },
  });
};
