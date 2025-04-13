import { useQuery } from "@tanstack/react-query";
import { fetchAllBoards } from "../api";

export const useGetBoards = () => {
  return useQuery({
    queryKey: ["boards"],
    queryFn: fetchAllBoards,
    staleTime: 1000 * 60 * 5,
    retry: true,
  });
};
