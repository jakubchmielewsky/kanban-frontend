import { UpdateBoardDto } from "../../../shared/types/board";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBoard } from "../api";

export interface UpdateBoardMutation {
  boardId: string;
  updates: UpdateBoardDto;
}

export const useUpdateBoard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ boardId, updates }: UpdateBoardMutation) =>
      updateBoard(boardId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
};
