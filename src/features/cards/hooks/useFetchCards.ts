import { useQuery } from "@tanstack/react-query";
import { fetchCards } from "../api";
import { useSafeParams } from "@/shared/hooks/useSafeParams";
import { useActiveTeamStore } from "@/shared/stores/useActiveTeamStore";
import { AxiosError } from "axios";
import { ApiErrorResponse, ApiResponse } from "@/shared/types/api";
import { Card } from "@/shared/types/card";

export const useFetchCards = () => {
  const activeTeam = useActiveTeamStore((s) => s.activeTeam);
  const { boardId } = useSafeParams();

  if (!activeTeam?.teamData._id) {
    throw new Error("Active team not found");
  }

  return useQuery<ApiResponse<Card[]>, AxiosError<ApiErrorResponse>>({
    queryKey: ["cards", boardId],
    queryFn: () => fetchCards(activeTeam.teamData._id, boardId),
    //staleTime: 1000 * 60 * 5,
    enabled: !!boardId && !!activeTeam?.teamData._id,
  });
};
