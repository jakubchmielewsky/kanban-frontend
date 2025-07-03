import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api";
import { RegisterData } from "@/shared/types/auth";
import { ApiErrorResponse, ApiResponse } from "@/shared/types/api";
import { AxiosError } from "axios";

export const useRegister = () => {
  return useMutation<
    ApiResponse<void>,
    AxiosError<ApiErrorResponse>,
    RegisterData
  >({
    mutationFn: registerUser,
  });
};
