import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../api";
import { Task } from "../../../shared/types/task";

interface UpdateTaskArgs {
  task: Task;
  sourceColumnId: string;
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ task }: UpdateTaskArgs) => updateTask(task),

    onSuccess: (_updatedTask, { task, sourceColumnId }) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", sourceColumnId],
      });

      queryClient.invalidateQueries({
        queryKey: ["tasks", task.column],
      });

      queryClient.invalidateQueries({ queryKey: ["task", task._id] });
    },
  });
};
