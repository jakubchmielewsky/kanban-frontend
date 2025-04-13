import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBoard } from "../api";
import { CreateUpdateBoardDto } from "../../../types/board";

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newBoard: CreateUpdateBoardDto) => createBoard(newBoard),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
};
