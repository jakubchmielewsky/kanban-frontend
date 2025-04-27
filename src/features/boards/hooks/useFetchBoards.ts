import { useQuery } from "@tanstack/react-query";
import { fetchBoards } from "../api";

export const useFetchBoards = () => {
  return useQuery({
    queryKey: ["boards"],
    queryFn: fetchBoards,
    staleTime: 1000 * 60 * 5,
    retry: true,
  });
};
