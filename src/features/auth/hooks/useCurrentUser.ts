import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "../api";
import { useAuthStore } from "../stores/authStore";
import { useEffect } from "react";

export const useCurrentUser = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      setUser(query.data);
    } else {
      setUser(null);
    }
  }, [query.isSuccess, query.data, setUser]);

  return query;
};
