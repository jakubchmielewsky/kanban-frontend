import { useSafeParams } from "@/shared/hooks/useSafeParams";
import { useModalStore } from "@/shared/stores/useModalStore";
import { useState } from "react";
import { useCreateColumn } from "./useCreateColumn";
import { CreateColumnSchema } from "../schemas/createColumnSchema";

export const useCreateColumnModal = () => {
  const [columnName, setColumnName] = useState("");
  const [errors, setErrors] = useState<{
    columnName?: string;
    api?: string;
  }>();
  const closeModal = useModalStore((store) => store.closeModal);
  const { boardId } = useSafeParams();

  const createColumnMutation = useCreateColumn();

  const handleCreateColumn = () => {
    const validation = CreateColumnSchema.safeParse({ columnName });

    if (!validation.success) {
      setErrors((prev) => ({
        ...prev,
        columnName: validation.error.flatten().fieldErrors.columnName?.[0],
      }));
      return;
    }

    try {
      createColumnMutation.mutateAsync({ name: columnName, boardId });
      closeModal();
    } catch (error) {
      //TODO: toast api error
    }
  };

  return {
    columnName,
    setColumnName,
    errors,
    handleCreateColumn,
    isPending: createColumnMutation.isPending,
  };
};
