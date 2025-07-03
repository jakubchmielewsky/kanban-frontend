import { ApiResponse } from "@/shared/types/api";
import api from "../../lib/axios";
import { LoginData, RegisterData, User } from "@/shared/types/auth";

export const loginUser = async (
  data: LoginData
): Promise<ApiResponse<User>> => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const registerUser = async (
  data: RegisterData
): Promise<ApiResponse<User>> => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const logoutUser = async (): Promise<void> => {
  await api.get("/auth/logout");
};

export const fetchCurrentUser = async (): Promise<ApiResponse<User>> => {
  const res = await api.get("/users/me");
  return res.data;
};
