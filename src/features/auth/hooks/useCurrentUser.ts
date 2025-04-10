import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "../api";
import { useAuthStore } from "../stores/authStore";
import { useEffect } from "react";

export const useCurrentUser = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    } else if (query.isError) {
      setUser(null);
    }
  }, [query.data, query.isError, setUser]);

  return {
    ...query,
    user: query.data,
  };
};
