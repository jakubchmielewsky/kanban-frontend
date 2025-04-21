import { useQuery } from "@tanstack/react-query";
import { getTask } from "../api";

export const useGetOneTask = (taskId: string) => {
  return useQuery({
    queryKey: ["task"],
    queryFn: () => getTask(taskId),
  });
};
