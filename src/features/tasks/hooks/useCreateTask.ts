import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api";
import { TaskDto } from "@/shared/types/task";

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newTask: TaskDto) => createTask(newTask),
    onSuccess: (_newTask, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks", variables.column] });
    },
  });
};
