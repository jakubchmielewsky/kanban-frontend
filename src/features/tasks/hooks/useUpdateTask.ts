import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../api";
import { Task, UpdateTaskDto } from "../../../shared/types/task";

export interface UpdateTaskMutation {
  taskId: string;
  updates: UpdateTaskDto;
}

export const useUpdateTask = (boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, updates }: UpdateTaskMutation) =>
      updateTask(taskId, updates),

    onMutate: async ({ taskId, updates }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", boardId] });

      const previousTasks = queryClient.getQueryData<Task[]>([
        "tasks",
        boardId,
      ]);

      const updatedTasks = previousTasks?.map((task) =>
        task._id === taskId ? { ...task, ...updates } : task
      );

      queryClient.setQueryData(["tasks", boardId], updatedTasks);

      return { previousTasks };
    },

    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["tasks", boardId], context?.previousTasks);
    },
  });
};
