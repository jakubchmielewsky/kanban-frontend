import { useMutation } from "@tanstack/react-query";
import { updateList } from "../api";
import { useSafeParams } from "@/shared/hooks/useSafeParams";
import { useActiveTeamStore } from "@/shared/stores/useActiveTeamStore";
import { UpdateListDto } from "@/shared/types/column";

interface MutationInput {
  listId: string;
  data: UpdateListDto;
}

export const useUpdateList = () => {
  const activeTeam = useActiveTeamStore((s) => s.activeTeam);
  const { boardId } = useSafeParams();

  if (!activeTeam?.teamData._id) {
    throw new Error("Active team not found");
  }

  return useMutation({
    mutationFn: (input: MutationInput) =>
      updateList(activeTeam.teamData._id, boardId, input.listId, input.data),
  });
};
