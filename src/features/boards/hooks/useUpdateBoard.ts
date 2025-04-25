import { Board } from "../../../shared/types/board";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBoard } from "../api";

export const useUpdateBoard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (board: Board) => updateBoard(board),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
};
