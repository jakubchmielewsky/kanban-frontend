import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "../api";
import { ApiErrorResponse, ApiResponse } from "@/shared/types/api";
import { AxiosError } from "axios";

export const useVerifyEmail = () => {
  return useMutation<ApiResponse<void>, AxiosError<ApiErrorResponse>, string>({
    mutationFn: verifyEmail,
  });
};
