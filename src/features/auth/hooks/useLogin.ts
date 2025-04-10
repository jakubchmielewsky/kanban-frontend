import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data);
      navigate("/boards");
    },
  });
};
