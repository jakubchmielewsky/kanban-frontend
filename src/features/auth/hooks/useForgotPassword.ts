import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../api";
import { ApiErrorResponse, ApiResponse } from "@/shared/types/api";
import { AxiosError } from "axios";
import { ForgotPasswordFormValues } from "../schemas/forgotPasswordSchema";

export const useForgotPassword = () => {
  return useMutation<
    ApiResponse<void>,
    AxiosError<ApiErrorResponse>,
    ForgotPasswordFormValues
  >({
    mutationFn: (data) => forgotPassword(data.email),
  });
};
