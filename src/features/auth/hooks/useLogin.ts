import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api";
import { useAuthStore } from "../stores/authStore";

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => setUser(data),
  });
};
