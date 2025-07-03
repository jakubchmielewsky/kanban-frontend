import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api";
import { ApiErrorResponse, ApiResponse } from "@/shared/types/api";
import { LoginData, User } from "@/shared/types/auth";
import { AxiosError } from "axios";

export const useLogin = () => {
  return useMutation<
    ApiResponse<User>,
    AxiosError<ApiErrorResponse>,
    LoginData
  >({
    mutationFn: loginUser,
  });
};
