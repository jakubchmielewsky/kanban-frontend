import { useModalStore } from "@/shared/stores/useModalStore";
import { useState } from "react";
import { useCreateBoard } from "./useCreateBoard";
import { createBoardSchema } from "../schemas/createBoardSchema";

export const useCreateBoardModal = () => {
  const [boardName, setBoardName] = useState("");
  const [errors, setErrors] = useState<{ boardName?: string; api?: string }>(
    {}
  );
  const closeModal = useModalStore((store) => store.closeModal);

  const createBoard = useCreateBoard();

  const handleChange = (value: string) => {
    setErrors({});
    setBoardName(value);
  };

  const handleCreateBoard = async () => {
    const result = createBoardSchema.safeParse({ boardName });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({ boardName: fieldErrors.boardName?.[0] || "Invalid input" });
      return;
    }

    setErrors({});

    try {
      await createBoard.mutateAsync({ name: result.data.boardName });
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
    handleCreateBoard,
    isPending: createBoard.isPending,
  };
};
