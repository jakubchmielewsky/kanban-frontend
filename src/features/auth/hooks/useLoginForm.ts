import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";
import { loginSchema } from "../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues } from "../schemas/loginSchema";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { ApiErrorResponse } from "@/shared/types/api";
import { toast } from "sonner";

export const useLoginForm = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useLogin();

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setUser(data.data);
        navigate("/boards");
      },
      onError: (error: AxiosError<ApiErrorResponse>) => {
        toast.error(
          error.response?.data?.message || "Login failed. Please try again."
        );
      },
    });
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending: loginMutation.isPending,
  };
};
