import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubtask } from "../api";
import { SubtaskDto } from "../../../shared/types/subtask";

export const useCreateSubtask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newSubtask: SubtaskDto) => createSubtask(newSubtask),
    onSuccess: (_newSubtask, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks", variables.task] });
    },
  });
};
