import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBoardMember } from "../api";
import { useSafeParams } from "../../../shared/hooks/useSafeParams";

export const useAddBoardMember = () => {
  const { boardId } = useSafeParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newMemberId: string) => addBoardMember(boardId, newMemberId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["members", boardId] }),
  });
};
