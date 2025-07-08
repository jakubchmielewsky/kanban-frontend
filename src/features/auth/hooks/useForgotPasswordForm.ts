import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/shared/types/api";
import { toast } from "sonner";
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "../schemas/forgotPasswordSchema";
import { useForgotPassword } from "./useForgotPassword";

export const useForgotPasswordForm = () => {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const forgotPasswordMutation = useForgotPassword();

  const onSubmit = (data: ForgotPasswordFormValues) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: () => {
        toast.success("A reset link has been sent to your email.", {
          description: "Please check your inbox and follow the instructions.",
        });
      },
      onError: (error: AxiosError<ApiErrorResponse>) => {
        const errorMessage =
          error.response?.data?.message ||
          "An unexpected error occurred. Please try again later.";

        toast.error("Error", {
          description: errorMessage,
        });
      },
    });
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending: forgotPasswordMutation.isPending,
  };
};
