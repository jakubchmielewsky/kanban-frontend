import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setUser(data);
      navigate("/boards", { replace: true });
    },
  });
};
