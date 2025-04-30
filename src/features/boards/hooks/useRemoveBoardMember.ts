import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeBoardMember } from "../api";
import { useSafeParams } from "../../../shared/hooks/useSafeParams";

export const useRemoveBoardMember = () => {
  const { boardId } = useSafeParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (memberEmail: string) =>
      removeBoardMember(boardId, memberEmail),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members", boardId] });
    },
  });
};
