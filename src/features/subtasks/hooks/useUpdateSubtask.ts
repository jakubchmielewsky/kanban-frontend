import { Subtask } from "../../../shared/types/subtask";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSubtask } from "../api";

export const useUpdateSubtask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedSubtask: Subtask) => updateSubtask(updatedSubtask),
    onSuccess: (updatedSubtask: Subtask) =>
      queryClient.invalidateQueries({
        queryKey: ["subtasks", updatedSubtask.task],
      }),
  });
};
