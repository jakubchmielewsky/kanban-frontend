import { useState } from "react";
import { useRegister } from "./useRegister";
import { registerSchema } from "../schemas/registerSchema";

export const useRegisterForm = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    passwordConfirm?: string;
    api?: string;
  }>({});

  const registerMutation = useRegister();

  type Field = keyof typeof values;
  const handleChange = (field: Field, value: string) => {
    setErrors((prev) => ({ ...prev, [field]: "", api: "" }));
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = registerSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors((prev) => ({
        ...prev,
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
        passwordConfirm: fieldErrors.passwordConfirm?.[0],
      }));
      return;
    }

    setErrors({});
    try {
      await registerMutation.mutateAsync(result.data);
    } catch (error: any) {
      if (error?.response?.data?.message.includes("Duplicate")) {
        setErrors((prev) => ({ ...prev, api: "User already exists" }));
      } else {
        setErrors((prev) => ({ ...prev, api: "Registration failed" }));
      }
    }
  };

  const isDisabled =
    registerMutation.isPending ||
    !!errors.email ||
    !!errors.password ||
    !!errors.passwordConfirm ||
    !!errors.api;

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    isDisabled,
    isPending: registerMutation.isPending,
  };
};
