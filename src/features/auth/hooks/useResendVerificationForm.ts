import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/shared/types/api";
import { toast } from "sonner";
import { useResendVerification } from "./useResendVerification";
import {
  ResendVerificationFormValues,
  resendVerificationSchema,
} from "../schemas/resendVerificationSchema";
import { useNavigate } from "react-router-dom";

export const useResendVerificationForm = () => {
  const navigate = useNavigate();
  const form = useForm<ResendVerificationFormValues>({
    resolver: zodResolver(resendVerificationSchema),
    defaultValues: {
      email: "",
    },
  });

  const resendVerificationMutation = useResendVerification();

  const onSubmit = (data: ResendVerificationFormValues) => {
    resendVerificationMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Verification email has been sent successfully.");
        navigate("/login");
      },
      onError: (error: AxiosError<ApiErrorResponse>) => {
        const errorMessage =
          error.response?.data?.message ||
          "Failed to resend verification email. Please try again later.";

        toast.error("Error", {
          description: errorMessage,
        });
      },
    });
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending: resendVerificationMutation.isPending,
  };
};
