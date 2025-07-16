import api from "@/lib/axios";
import { ApiResponse } from "@/shared/types/api";
import { Team } from "@/shared/types/team";

export const getUserTeams = async (): Promise<ApiResponse<Team[]>> => {
  const res = await api.get("/teams");
  return res.data;
};
