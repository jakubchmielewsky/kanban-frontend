import { useQuery } from "@tanstack/react-query";
import { getTeamBoards } from "../api";
import { ApiErrorResponse, ApiResponse } from "@/shared/types/api";
import { Board } from "@/shared/types/board";
import { AxiosError } from "axios";

export const useGetTeamBoards = (teamId: string) => {
  return useQuery<ApiResponse<Board[]>, AxiosError<ApiErrorResponse>>({
    queryKey: ["boards", teamId],
    queryFn: () => getTeamBoards(teamId),
    staleTime: 1000 * 60 * 5,
    enabled: !!teamId,
  });
};
