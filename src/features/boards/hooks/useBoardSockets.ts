import { socket } from "../../../lib/socket";
import { useEffect } from "react";

export const useBoardSockets = (boardId: string) => {
  useEffect(() => {
    if (!boardId) return;

    socket.emit("join_board", boardId);

    return () => {
      socket.emit("leave_board", boardId);
    };
  }, [boardId]);
};
