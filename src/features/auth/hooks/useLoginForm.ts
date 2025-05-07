import { useState } from "react";
import { useLogin } from "./useLogin";
import { loginSchema } from "../schemas/loginSchema";

export const useLoginForm = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    api?: string;
  }>({});
  const loginMutation = useLogin();

  type Field = keyof typeof values;
  const handleChange = (field: Field, value: string) => {
    setErrors((prev) => ({ ...prev, [field]: "", api: "" }));
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors((prev) => ({
        ...prev,
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      }));
      return;
    }

    setErrors({});
    try {
      await loginMutation.mutateAsync(result.data);
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setErrors((prev) => ({ ...prev, api: error.response.data.message }));
      } else {
        setErrors((prev) => ({ ...prev, api: "Authentication failed" }));
      }
    }
  };

  const isDisabled =
    loginMutation.isPending ||
    !!errors.email ||
    !!errors.password ||
    !!errors.api;

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    isDisabled,
    isPending: loginMutation.isPending,
  };
};
