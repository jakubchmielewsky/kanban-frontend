import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api";

interface NewTask {
  title: string;
  description: string;
  subtasks: { title: string; isCompleted: boolean }[];
  column: string;
}

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newTask: NewTask) => createTask(newTask),
    onSuccess: (_newTask, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks", variables.column] });
    },
  });
};
