import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCard } from "../api";
import { useSafeParams } from "@/shared/hooks/useSafeParams";
import { useActiveTeamStore } from "@/shared/stores/useActiveTeamStore";

export const useCreateCard = (listId: string) => {
  const activeTeam = useActiveTeamStore((s) => s.activeTeam);
  const { boardId } = useSafeParams();

  if (!activeTeam?.teamData._id) {
    throw new Error("Active team not found");
  }

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (title: string) =>
      createCard(activeTeam.teamData._id, boardId, listId, title),

    //TODO: replace with socket.io update
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cards", boardId],
      });
    },
  });
};
