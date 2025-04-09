import api from "../../lib/axios";
import { LoginData, RegisterData, User } from "@/types/auth";

export const loginUser = async (data: LoginData): Promise<User> => {
  const res = await api.post("/users/login", data);
  return res.data;
};

export const registerUser = async (data: RegisterData): Promise<User> => {
  const res = await api.post("/users/register", data);
  return res.data;
};

export const logoutUser = async (): Promise<void> => {
  await api.get("/users/logout");
};

export const fetchCurrentUser = async (): Promise<User> => {
  const res = await api.get("/users/me");
  return res.data;
};
