import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createColumn } from "../api";
import { CreateColumnDto } from "../../../shared/types/column";

export const useCreateColumn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newColumn: CreateColumnDto) =>
      createColumn(newColumn.boardId, newColumn),
    onSuccess: (_, { boardId }) => {
      queryClient.invalidateQueries({ queryKey: ["columns", boardId] });
    },
  });
};
