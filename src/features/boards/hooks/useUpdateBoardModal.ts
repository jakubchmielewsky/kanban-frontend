import { useModalStore } from "@/shared/stores/useModalStore";
import { useUpdateBoard } from "./useUpdateBoard";
import { useState } from "react";
import { updateBoardSchema } from "../schemas/updateBoardSchema";

export const useUpdateBoardModal = (
  initialBoardName: string,
  boardId: string
) => {
  const [boardName, setBoardName] = useState(initialBoardName);
  const [errors, setErrors] = useState<{ boardName?: string; api?: string }>(
    {}
  );

  const closeModal = useModalStore((store) => store.closeModal);

  const updateBoardMutation = useUpdateBoard();

  const handleChange = (value: string) => {
    setErrors({});
    setBoardName(value);
  };

  const handleUpdateBoard = () => {
    const result = updateBoardSchema.safeParse({ boardName });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({ boardName: fieldErrors.boardName?.[0] || "Invalid input" });
      return;
    }

    setErrors({});

    try {
      updateBoardMutation.mutateAsync({
        boardId,
        updates: { name: boardName },
      });

      closeModal();
    } catch (error: any) {
      if (error?.response?.data?.err?.message) {
        setErrors((prev) => ({
          ...prev,
          api: error.response.data.err.message,
        }));
      } else {
        setErrors((prev) => ({ ...prev, api: "Failed to create board" }));
      }
    }
  };

  return {
    boardName,
    errors,
    handleChange,
    handleUpdateBoard,
    isPending: updateBoardMutation.isPending,
  };
};
