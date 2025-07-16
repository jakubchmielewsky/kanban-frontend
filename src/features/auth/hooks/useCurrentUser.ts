import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "../api";

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  return query;
};
