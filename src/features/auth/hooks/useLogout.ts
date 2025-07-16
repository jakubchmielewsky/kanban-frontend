import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../api";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => navigate("/login"),
  });
};
