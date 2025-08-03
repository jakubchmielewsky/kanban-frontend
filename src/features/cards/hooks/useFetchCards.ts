import { useQuery } from "@tanstack/react-query";
import { fetchCards } from "../api";
import { useSafeParams } from "@/shared/hooks/useSafeParams";
import { useActiveTeamStore } from "@/shared/stores/useActiveTeamStore";
import { AxiosError } from "axios";
import { ApiErrorResponse, ApiResponse } from "@/shared/types/api";
import { Card } from "@/shared/types/card";

export const useFetchCards = (listId: string) => {
  const activeTeam = useActiveTeamStore((s) => s.activeTeam);
  const { boardId } = useSafeParams();

  if (!activeTeam?.teamData._id) {
    throw new Error("Active team not found");
  }

  return useQuery<ApiResponse<Card[]>, AxiosError<ApiErrorResponse>>({
    queryKey: ["cards", listId],
    queryFn: () => fetchCards(activeTeam.teamData._id, boardId, listId),
    //staleTime: 1000 * 60 * 5,
    enabled: !!boardId && !!listId && !!activeTeam?.teamData._id,
  });
};
