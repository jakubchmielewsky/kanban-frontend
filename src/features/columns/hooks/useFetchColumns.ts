import { useQuery } from "@tanstack/react-query";
import { fetchColumns } from "../api";
import { useSafeParams } from "../../../shared/hooks/useSafeParams";

export const useFetchColumns = () => {
  const { boardId } = useSafeParams();

  return useQuery({
    queryKey: ["columns", boardId],
    queryFn: () => fetchColumns(boardId),
    staleTime: 1000 * 60 * 5,
    retry: true,
    enabled: !!boardId,
  });
};
