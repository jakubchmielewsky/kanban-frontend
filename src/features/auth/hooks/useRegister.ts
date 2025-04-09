import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api";
import { useAuthStore } from "../stores/authStore";

export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => setUser(data),
  });
};
