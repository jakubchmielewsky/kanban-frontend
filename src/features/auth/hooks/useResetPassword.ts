import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../api";
import { ResetPasswordData } from "@/shared/types/auth";
import { ApiErrorResponse, ApiResponse } from "@/shared/types/api";
import { AxiosError } from "axios";

export const useResetPassword = () => {
  return useMutation<
    ApiResponse<void>,
    AxiosError<ApiErrorResponse>,
    ResetPasswordData
  >({
    mutationFn: (data: ResetPasswordData) => resetPassword(data),
  });
};
