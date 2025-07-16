import { ApiResponse } from "@/shared/types/api";
import api from "../../lib/axios";
import {
  LoginData,
  RegisterData,
  ResetPasswordData,
  User,
} from "@/shared/types/auth";

export const loginUser = async (
  data: LoginData
): Promise<ApiResponse<User>> => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const registerUser = async (
  data: RegisterData
): Promise<ApiResponse<void>> => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const logoutUser = async (): Promise<ApiResponse<void>> => {
  const res = await api.get("/auth/logout");
  return res.data;
};

export const verifyEmail = async (
  token: string
): Promise<ApiResponse<void>> => {
  const res = await api.post("/auth/verify", {
    verificationToken: token,
  });
  return res.data;
};

export const resendVerificationEmail = async (
  email: string
): Promise<ApiResponse<void>> => {
  const res = await api.post("/auth/resend", { email });
  return res.data;
};

export const forgotPassword = async (
  email: string
): Promise<ApiResponse<void>> => {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
};

export const resetPassword = async (
  data: ResetPasswordData
): Promise<ApiResponse<void>> => {
  const res = await api.post("/auth/reset-password", {
    resetToken: data.resetToken,
    newPassword: data.newPassword,
    confirmNewPassword: data.confirmNewPassword,
  });
  return res.data;
};

export const fetchCurrentUser = async (): Promise<ApiResponse<User>> => {
  const res = await api.get("/users/me");
  return res.data;
};
