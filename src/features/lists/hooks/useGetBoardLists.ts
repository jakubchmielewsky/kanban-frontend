import { useQuery } from "@tanstack/react-query";
import { getBoardLists } from "../api";
import { useSafeParams } from "../../../shared/hooks/useSafeParams";
import { useActiveTeamStore } from "@/shared/stores/useActiveTeamStore";

export const useGetBoardLists = () => {
  const activeTeam = useActiveTeamStore((s) => s.activeTeam);
  const { boardId } = useSafeParams();

  if (!activeTeam?.teamData._id) {
    throw new Error("Active team not found");
  }

  return useQuery({
    queryKey: ["lists", boardId],
    queryFn: () => getBoardLists(activeTeam.teamData._id, boardId),
    //staleTime: 1000 * 60 * 5,
    //retry: true,
  });
};
