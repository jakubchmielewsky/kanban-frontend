import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api";

export const useGetTasks = (columnId: string) => {
  return useQuery({
    queryKey: ["tasks", columnId],
    queryFn: () => fetchTasks(columnId),
    staleTime: 1000 * 60 * 5,
  });
};
