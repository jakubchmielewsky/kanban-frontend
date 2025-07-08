import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/shared/types/api";
import { toast } from "sonner";
import {
  ResetPasswordFormValues,
  resetPasswordSchema,
} from "../schemas/resetPasswordSchema";
import { useResetPassword } from "./useResetPassword";
import { useNavigate, useSearchParams } from "react-router-dom";

export const useResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const resetPasswordMutation = useResetPassword();

  const resetToken = searchParams.get("token");

  const onSubmit = (data: ResetPasswordFormValues) => {
    resetPasswordMutation.mutate(
      { ...data, resetToken: resetToken ?? "" },
      {
        onSuccess: () => {
          toast.success(
            "Password reset successful! You can now log in with your new password."
          );
          navigate("/login", { replace: true });
        },
        onError: (error: AxiosError<ApiErrorResponse>) => {
          toast.error(
            error.response?.data?.message ||
              "Password reset failed. Please try again."
          );
        },
      }
    );
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending: resetPasswordMutation.isPending,
  };
};
