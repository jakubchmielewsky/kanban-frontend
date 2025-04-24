import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubtask } from "../api";

interface NewSubtaskPayload {
  title: string;
  task: string;
}

export const useCreateSubtask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: NewSubtaskPayload) =>
      createSubtask(payload.title, payload.task),
    onSuccess: (_newSubtask, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks", variables.task] });
    },
  });
};
