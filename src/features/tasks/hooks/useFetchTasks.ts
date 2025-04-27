import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api";

export const useFetchTasks = (boardId: string) => {
  return useQuery({
    queryKey: ["tasks", boardId],
    queryFn: () => fetchTasks(boardId),
    staleTime: 1000 * 60 * 5,
  });
};
