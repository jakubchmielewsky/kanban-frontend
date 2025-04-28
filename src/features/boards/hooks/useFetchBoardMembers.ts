import { useQuery } from "@tanstack/react-query";
import { fetchBoardMembers } from "../api";
import { useSafeParams } from "../../../shared/hooks/useSafeParams";

export const useFetchBoardMembers = () => {
  const { boardId } = useSafeParams();

  return useQuery({
    queryKey: ["members", boardId],
    queryFn: () => fetchBoardMembers(boardId),
    enabled: !!boardId,
  });
};
