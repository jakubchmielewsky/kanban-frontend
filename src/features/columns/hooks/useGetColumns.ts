import { useQuery } from "@tanstack/react-query";
import { fetchAllColumns } from "../api";

export const useGetColumns = (boardId: string | undefined) => {
  return useQuery({
    queryKey: ["columns", boardId],
    queryFn: () => fetchAllColumns(boardId || ""),
    enabled: !!boardId,
    staleTime: 1000 * 60 * 5,
    retry: true,
  });
};
