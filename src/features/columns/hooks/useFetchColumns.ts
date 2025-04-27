import { useQuery } from "@tanstack/react-query";
import { fetchColumns } from "../api";

export const useFetchColumns = (boardId: string) => {
  return useQuery({
    queryKey: ["columns", boardId],
    queryFn: () => fetchColumns(boardId),
    staleTime: 1000 * 60 * 5,
    retry: true,
  });
};
