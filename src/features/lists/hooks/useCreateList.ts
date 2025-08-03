import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createList } from "../api";
import { useSafeParams } from "@/shared/hooks/useSafeParams";
import { useActiveTeamStore } from "@/shared/stores/useActiveTeamStore";

export const useCreateList = () => {
  const activeTeam = useActiveTeamStore((s) => s.activeTeam);
  const { boardId } = useSafeParams();
  const queryClient = useQueryClient();

  if (!activeTeam?.teamData._id) {
    throw new Error("Active team not found");
  }

  return useMutation({
    mutationFn: (name: string) =>
      createList(activeTeam.teamData._id, boardId, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["columns", boardId] });
    },
  });
};
