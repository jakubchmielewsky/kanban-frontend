import api from "../../lib/axios";
import { Column } from "../../types/column";

export const fetchAllColumns = async (columnId: string): Promise<Column[]> => {
  const res = await api.get(`/boards/${columnId}/columns`);
  return res.data.data.data;
};

// export const updateColumn = async (
//   boardId: string,
//   updatedBoard: CreateUpdateBoardDto
// ): Promise<Board> => {
//   const res = await api.patch(`/boards/${boardId}`, updatedBoard);
//   return res.data.data.data;
// };

// export const deleteColumn = async (boardId: string): Promise<Board> => {
//   const res = await api.delete(`/boards/${boardId}`);
//   return res.data;
// };

// export const createColumn = async (
//   newBoard: CreateUpdateBoardDto
// ): Promise<Board> => {
//   const res = await api.post(`/boards`, newBoard);
//   return res.data.data.data;
// };
