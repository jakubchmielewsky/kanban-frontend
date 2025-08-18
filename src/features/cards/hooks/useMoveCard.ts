import { useMutation } from "@tanstack/react-query";
import { moveCard } from "../api";
import { useSafeParams } from "@/shared/hooks/useSafeParams";
import { useActiveTeamStore } from "@/shared/stores/useActiveTeamStore";
import { MoveCardDto } from "@/shared/types/card";

interface MutationInput {
  cardId: string;
  data: MoveCardDto;
}

export const useMoveCard = () => {
  const activeTeam = useActiveTeamStore((s) => s.activeTeam);
  const { boardId } = useSafeParams();

  if (!activeTeam?.teamData._id) {
    throw new Error("Active team not found");
  }

  return useMutation({
    mutationFn: (input: MutationInput) =>
      moveCard(activeTeam.teamData._id, boardId, input.cardId, input.data),
  });
};
