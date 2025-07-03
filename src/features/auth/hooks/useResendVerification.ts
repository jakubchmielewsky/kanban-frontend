import { useMutation } from "@tanstack/react-query";
import { resendVerificationEmail } from "../api";
import { ApiErrorResponse, ApiResponse } from "@/shared/types/api";
import { AxiosError } from "axios";
import { ResendVerificationFormValues } from "../schemas/resendVerificationSchema";

export const useResendVerification = () => {
  return useMutation<
    ApiResponse<void>,
    AxiosError<ApiErrorResponse>,
    ResendVerificationFormValues
  >({
    mutationFn: (data) => resendVerificationEmail(data.email),
  });
};
