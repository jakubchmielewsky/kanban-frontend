import { useQuery } from "@tanstack/react-query";
import { fetchAllColumns } from "../api";
import { useParams } from "react-router-dom";

export const useGetColumns = () => {
  const { boardId } = useParams();
  return useQuery({
    queryKey: ["columns", boardId],
    queryFn: () => fetchAllColumns(boardId as string),
    staleTime: 1000 * 60 * 5,
    retry: true,
    enabled: !!boardId,
  });
};
