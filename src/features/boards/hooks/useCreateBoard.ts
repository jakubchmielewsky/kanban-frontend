import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBoard } from "../api";
import { CreateBoardDto } from "../../../shared/types/board";

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newBoard: CreateBoardDto) => createBoard(newBoard),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
};
