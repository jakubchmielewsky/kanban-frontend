import { useQuery } from "@tanstack/react-query";
import { getUserTeams } from "../api";
import { ApiErrorResponse, ApiResponse } from "@/shared/types/api";
import { Team } from "@/shared/types/team";
import { AxiosError } from "axios";

export const useGetUserTeams = () => {
  return useQuery<ApiResponse<Team[]>, AxiosError<ApiErrorResponse>>({
    queryKey: ["user-teams"],
    queryFn: getUserTeams,
  });
};
