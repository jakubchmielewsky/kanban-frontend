import { useRegister } from "./useRegister";
import { registerSchema } from "../schemas/registerSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormValues } from "../schemas/registerSchema";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/shared/types/api";
import { toast } from "sonner";

export const useRegisterForm = () => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerMutation = useRegister();

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        toast.success(
          "Registration successful! Check your email to verify your account."
        );
      },
      onError: (error: AxiosError<ApiErrorResponse>) => {
        toast.error(
          error.response?.data?.message ||
            "Registration failed. Please try again."
        );
      },
    });
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending: registerMutation.isPending,
  };
};
