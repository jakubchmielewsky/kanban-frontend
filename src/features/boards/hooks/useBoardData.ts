import { useFetchBoards } from "../hooks/useFetchBoards";
import { useFetchColumns } from "../../columns/hooks/useFetchColumns";
import { useFetchTasks } from "../../tasks/hooks/useFetchTasks";
import { useSafeParams } from "../../../shared/hooks/useSafeParams";
import { useCurrentUser } from "../../../features/auth/hooks/useCurrentUser";

export const useBoardData = () => {
  const { user } = useCurrentUser();
  const { boardId } = useSafeParams();
  const boards = useFetchBoards();
  const selectedBoard = boards.data?.find((b) => b._id === boardId) || null;

  const columnsQuery = useFetchColumns();
  const tasksQuery = useFetchTasks(boardId);

  return {
    boardId,
    isOwner: selectedBoard?.ownerId === user?._id,
    columns: columnsQuery.data ?? [],
    tasks: tasksQuery.data ?? [],
    isLoading: columnsQuery.isLoading || tasksQuery.isLoading,
  };
};
