import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../api";
import { Task } from "../../../shared/types/task";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (task: Task) => deleteTask(task._id),
    onSuccess: (_, { column }) => {
      queryClient.invalidateQueries({ queryKey: ["task"] });
      queryClient.invalidateQueries({ queryKey: ["tasks", column] });
    },
  });
};
