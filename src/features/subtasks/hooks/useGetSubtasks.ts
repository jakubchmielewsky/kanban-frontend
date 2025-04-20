import { useQuery } from "@tanstack/react-query";
import { fetchSubtasks } from "../api";

export const useGetSubtasks = (taskId: string) => {
  return useQuery({
    queryKey: ["subtasks", taskId],
    queryFn: () => fetchSubtasks(taskId),
    staleTime: 1000 * 60 * 5,
  });
};
